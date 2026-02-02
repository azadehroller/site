import type { MiddlewareHandler } from 'astro';

// Enable logging in development to see caching behavior
const DEBUG_CACHE = import.meta.env.DEV;

/**
 * Middleware for adding caching headers to responses.
 * This dramatically improves performance by allowing:
 * 1. Edge CDN (Netlify) to cache pages
 * 2. Browser to cache pages
 * 3. Stale-while-revalidate for instant loads
 */
export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  const url = new URL(context.request.url);
  
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
  // stale-while-revalidate allows serving cached content while fetching fresh
  if (url.pathname.startsWith('/blog/') && url.pathname !== '/blog/') {
    response.headers.set(
      'Cache-Control', 
      'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
    );
    if (DEBUG_CACHE) {
      console.log(`[Cache] ${url.pathname} → BLOG POST (5min browser, 1hr CDN)`);
    }
    // max-age=300: Browser caches for 5 minutes
    // s-maxage=3600: CDN caches for 1 hour
    // stale-while-revalidate=86400: Serve stale for up to 24h while refreshing in background
    return response;
  }
  
  // Other pages (landing pages, industries, etc.)
  // Shorter cache but still beneficial
  response.headers.set(
    'Cache-Control',
    'public, max-age=60, s-maxage=300, stale-while-revalidate=3600'
  );
  if (DEBUG_CACHE) {
    console.log(`[Cache] ${url.pathname} → PAGE (1min browser, 5min CDN)`);
  }
  // max-age=60: Browser caches for 1 minute
  // s-maxage=300: CDN caches for 5 minutes
  // stale-while-revalidate=3600: Serve stale for up to 1 hour while refreshing
  
  return response;
};
