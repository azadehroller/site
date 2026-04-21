import type { MiddlewareHandler } from 'astro';
import { resolveAbTest, resolveComponentAbTest, resolveGeo } from './utils/experiments';

// Enable logging in development to see caching behavior
const DEBUG_CACHE = import.meta.env.DEV;

// Custom request header that the CDN keys cache entries on (via response Vary).
// See computeAbVariant + AB_VARIANT_BUCKETS below.
const AB_VARIANT_HEADER = 'x-ab-variant';
const AB_VARIANT_BUCKETS = 10; // coarse-grain bucketValue floats so cache shards stay small

/**
 * Discretize the AB context into a short, deterministic string so two visitors
 * in the same variant produce the same value (and therefore the same CDN cache
 * key). Format: `g<0|1>-h<0..9>` (20 possible combinations max — bounded cache
 * fan-out per URL).
 *
 * Why not vary on the raw cookie values? Because `ab-headingComposition`
 * stores `Math.random()` as a float — every visitor has a unique value, which
 * would produce per-visitor cache entries (~useless). Discretising fixes that.
 *
 * Returns null when no AB context is available (e.g. asset routes).
 */
function computeAbVariant(locals: App.Locals): string | null {
  const ab = locals.abTest;
  const hc = locals.abTestHeadingComposition;
  if (!ab && !hc) return null;

  const parts: string[] = [];
  if (ab?.userGroup) {
    parts.push(`g${ab.userGroup === 'control' ? '0' : '1'}`);
  }
  if (hc) {
    const bucket = Math.min(
      Math.floor(hc.bucketValue * AB_VARIANT_BUCKETS),
      AB_VARIANT_BUCKETS - 1
    );
    parts.push(`h${bucket}`);
  }
  return parts.length > 0 ? parts.join('-') : null;
}

/**
 * Append a value to a multi-valued header (e.g. Vary), avoiding duplicates.
 */
function appendHeader(headers: Headers, name: string, value: string): void {
  const existing = headers.get(name);
  if (!existing) {
    headers.set(name, value);
    return;
  }
  const tokens = existing.split(',').map((t) => t.trim().toLowerCase());
  if (tokens.includes(value.toLowerCase())) return;
  headers.set(name, `${existing}, ${value}`);
}

/**
 * Middleware for adding caching headers to responses
 * and assigning A/B test cookies to new visitors.
 */
export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);

  // Block _debug routes in production
  if (url.pathname.startsWith('/_debug') && !import.meta.env.DEV) {
    return new Response(null, { status: 404 });
  }

  // Resolve A/B test data BEFORE rendering so pages can read it from locals
  if (!url.pathname.startsWith('/api/') && !url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|eot)$/)) {
    const { userGroup, userId, isNew } = resolveAbTest(context.request);
    context.locals.abTest = { userGroup, userId, isNew };

    const hcTest = resolveComponentAbTest('headingComposition', context.request);
    context.locals.abTestHeadingComposition = hcTest;

    context.locals.geo = resolveGeo(context.request);

    // Inject a deterministic AB-variant header on the REQUEST before passing
    // control downstream. On Vercel, this middleware compiles to an Edge
    // Function (`edgeMiddleware: true`) that runs before the CDN cache lookup,
    // so a header set here participates in cache-key computation via the
    // `Vary: x-ab-variant` response header set further down.
    //
    // On Netlify this header is simply visible to the SSR function — Netlify
    // uses its own `Netlify-Vary` directive for cache sharding, so this is a
    // no-op there (and harmless).
    const variant = computeAbVariant(context.locals);
    if (variant) {
      context.request.headers.set(AB_VARIANT_HEADER, variant);
    }
  }

  const response = await next();

  // Set cookies for new visitors after the response is created
  if (context.locals.abTest?.isNew) {
    const { userGroup, userId } = context.locals.abTest;
    const cookieValue = JSON.stringify({ userGroup, userId });
    response.headers.append(
      'Set-Cookie',
      `ab-test=${encodeURIComponent(cookieValue)}; Path=/; Max-Age=31536000; SameSite=Lax`
    );
  }
  if (context.locals.abTestHeadingComposition?.isNew) {
    const { bucketValue } = context.locals.abTestHeadingComposition;
    response.headers.append(
      'Set-Cookie',
      `ab-headingComposition=${bucketValue}; Path=/; Max-Age=31536000; SameSite=Lax`
    );
  }
  
  // Check if this is a preview/draft mode request
  const isPreview = context.cookies.get('sanity-preview')?.value === 'true';
  
  // Don't cache preview/draft content or API routes
  if (isPreview || url.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    // Explicitly tell Netlify CDN not to cache preview/API responses
    response.headers.set('Netlify-CDN-Cache-Control', 'private, no-cache, no-store, must-revalidate');
    if (DEBUG_CACHE) {
      console.log(`[Cache] ${url.pathname} → NO CACHE (${isPreview ? 'preview mode' : 'API route'})`);
    }
    return response;
  }
  
  // Cache static assets aggressively (1 year)
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|eot)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    if (DEBUG_CACHE) {
      console.log(`[Cache] ${url.pathname} → STATIC ASSET (1 year)`);
    }
    return response;
  }
  
  // Cookies that legitimately change page content (A/B test buckets).
  // Listing them in Netlify-Vary tells the Netlify CDN to (a) shard cache by these
  // cookie values and (b) IGNORE every other cookie when computing the cache key.
  // Without this, any cookie on the request (HubSpot __hstc, Facebook _fbp, GTM
  // _gcl_au, etc.) causes the durable cache to bypass entirely → 800ms+ TTFB.
  const NETLIFY_VARY = 'query,cookie=ab-test|ab-headingComposition';

  // CDN-Cache-Control is the IETF standard header Vercel (and other modern CDNs)
  // respect for edge caching, independent of the browser-facing Cache-Control.
  // We mirror the Netlify-CDN-Cache-Control values so both platforms cache the
  // same way. The Netlify-only `durable` flag is omitted because it has no
  // standard equivalent — Vercel's cache is naturally durable across deploys.
  //
  // AB-variant cache sharding on Vercel is handled via the `x-ab-variant`
  // request header (set above) + `Vary: x-ab-variant` in the response (set per
  // SSR branch below). The header value is discretized so cache fan-out per
  // URL stays bounded (≤ 20 entries) — see computeAbVariant.
  const CDN_CACHE_BLOG = 'public, max-age=3600, stale-while-revalidate=86400';
  const CDN_CACHE_PAGE = 'public, max-age=300, stale-while-revalidate=3600';

  // Blog index - cache like blog posts (was falling through to generic 5min rule)
  if (url.pathname === '/blog' || url.pathname === '/blog/') {
    response.headers.set(
      'Cache-Control',
      'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
    );
    // Netlify CDN-specific header: tells Netlify Edge to cache independently of browser Cache-Control
    // Without this, Netlify may not cache SSR responses at the CDN layer, causing every request
    // to hit the origin serverless function (cold start + Sanity API call = slow TTFB)
    response.headers.set(
      'Netlify-CDN-Cache-Control',
      'public, max-age=3600, stale-while-revalidate=86400, durable'
    );
    response.headers.set('Netlify-Vary', NETLIFY_VARY);
    response.headers.set('CDN-Cache-Control', CDN_CACHE_BLOG);
    appendHeader(response.headers, 'Vary', AB_VARIANT_HEADER);
    if (DEBUG_CACHE) {
      console.log(`[Cache] ${url.pathname} → BLOG INDEX (5min browser, 1hr CDN)`);
    }
    return response;
  }

  // Blog posts - cache longer since they change less frequently
  if (url.pathname.startsWith('/blog/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
    );
    response.headers.set(
      'Netlify-CDN-Cache-Control',
      'public, max-age=3600, stale-while-revalidate=86400, durable'
    );
    response.headers.set('Netlify-Vary', NETLIFY_VARY);
    response.headers.set('CDN-Cache-Control', CDN_CACHE_BLOG);
    appendHeader(response.headers, 'Vary', AB_VARIANT_HEADER);
    if (DEBUG_CACHE) {
      console.log(`[Cache] ${url.pathname} → BLOG POST (5min browser, 1hr CDN)`);
    }
    return response;
  }

  // Other pages (landing pages, industries, etc.)
  response.headers.set(
    'Cache-Control',
    'public, max-age=60, s-maxage=300, stale-while-revalidate=3600'
  );
  // Netlify CDN caches for 5 min with 1hr stale-while-revalidate
  // 'durable' flag tells Netlify to persist cache across deploys (safe because webhook purges on content change)
  response.headers.set(
    'Netlify-CDN-Cache-Control',
    'public, max-age=300, stale-while-revalidate=3600, durable'
  );
  response.headers.set('Netlify-Vary', NETLIFY_VARY);
  response.headers.set('CDN-Cache-Control', CDN_CACHE_PAGE);
  appendHeader(response.headers, 'Vary', AB_VARIANT_HEADER);
  if (DEBUG_CACHE) {
    console.log(`[Cache] ${url.pathname} → PAGE (1min browser, 5min CDN)`);
  }

  return response;
};
