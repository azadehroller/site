import type { MiddlewareHandler } from 'astro';
import { resolveAbTest, resolveComponentAbTest, resolveGeo } from './utils/experiments';

// Enable logging in development to see caching behavior
const DEBUG_CACHE = import.meta.env.DEV;

/**
 * Middleware for adding caching headers to responses
 * and assigning A/B test cookies to new visitors.
 */
export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);

  // Resolve A/B test data BEFORE rendering so pages can read it from locals
  if (!url.pathname.startsWith('/api/') && !url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|eot)$/)) {
    const { userGroup, userId, isNew } = resolveAbTest(context.request);
    context.locals.abTest = { userGroup, userId, isNew };

    const hcTest = resolveComponentAbTest('headingComposition', context.request);
    context.locals.abTestHeadingComposition = hcTest;

    context.locals.geo = resolveGeo(context.request);
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
  
  // Blog posts - cache longer since they change less frequently
  if (url.pathname.startsWith('/blog/') && url.pathname !== '/blog/') {
    response.headers.set(
      'Cache-Control', 
      'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
    );
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
  if (DEBUG_CACHE) {
    console.log(`[Cache] ${url.pathname} → PAGE (1min browser, 5min CDN)`);
  }
  
  return response;
};
