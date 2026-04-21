import type { APIRoute } from 'astro';
import { createHmac } from 'crypto';
import { clearQueryCache } from '@utils/loadQuery';

/**
 * Webhook endpoint for Sanity to trigger cache purge/revalidation.
 *
 * When content is published in Sanity, this webhook:
 * 1. Validates the request using a secret
 * 2. Clears the in-memory Sanity query cache
 * 3. Purges the host CDN's cache for affected URLs
 *
 * Cross-platform: detects Netlify vs Vercel from the env vars present and
 * calls the matching purge API. Both branches can be active simultaneously
 * during the migration comparison phase (set both env-var groups, hit both
 * webhooks via two Sanity webhook configs).
 *
 * Setup in Sanity:
 * 1. Go to sanity.io/manage → Your Project → API → Webhooks
 * 2. Create a webhook for EACH platform you want to keep fresh:
 *    - URL: https://<host>/api/revalidate
 *    - Trigger on: Create, Update, Delete
 *    - Filter: _type in ["post", "page", "landingPage", "homepage", "industry", "feature", "header", "footer", "siteSettings"]
 *    - Secret: (generate a secure random string)
 *
 * Required env vars per platform:
 *   Netlify: NETLIFY_CACHE_PURGE_TOKEN, NETLIFY_SITE_ID
 *   Vercel:  VERCEL_TOKEN, VERCEL_PROJECT_ID, optionally VERCEL_TEAM_ID
 *   Both:    SANITY_WEBHOOK_SECRET, SITE
 */

const WEBHOOK_SECRET = import.meta.env.SANITY_WEBHOOK_SECRET;

// Validate webhook signature from Sanity
function isValidSignature(body: string, signature: string | null): boolean {
  if (!WEBHOOK_SECRET || !signature) return false;
  
  const hmac = createHmac('sha256', WEBHOOK_SECRET);
  hmac.update(body);
  const expectedSignature = hmac.digest('hex');
  
  return signature === expectedSignature;
}

// Map document types to URL paths for cache invalidation
function getUrlsForDocument(doc: any): string[] {
  const urls: string[] = [];
  const baseUrl = import.meta.env.SITE || '';
  
  switch (doc._type) {
    case 'post':
      if (doc.slug?.current) {
        urls.push(`${baseUrl}/blog/${doc.slug.current}`);
        // Also invalidate blog listing pages
        urls.push(`${baseUrl}/blog`);
        urls.push(`${baseUrl}/blog/page/*`);
        // Topic pages if post has topics
        if (doc.topics?.length) {
          urls.push(`${baseUrl}/blog/topic/*`);
        }
      }
      break;
      
    case 'page':
    case 'landingPage':
      if (doc.slug?.current) {
        urls.push(`${baseUrl}/${doc.slug.current}`);
      }
      break;
      
    case 'homepage':
      urls.push(`${baseUrl}/`);
      break;
      
    case 'industry':
      if (doc.slug?.current) {
        urls.push(`${baseUrl}/industries/${doc.slug.current}`);
        urls.push(`${baseUrl}/industries`);
      }
      break;
      
    case 'feature':
      if (doc.slug?.current) {
        urls.push(`${baseUrl}/features/${doc.slug.current}`);
      }
      break;
      
    case 'header':
    case 'footer':
    case 'siteSettings':
      // Global components - invalidate everything
      urls.push(`${baseUrl}/*`);
      break;
  }
  
  return urls;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();
    const signature = request.headers.get('sanity-webhook-signature');
    
    // Validate webhook signature
    if (!isValidSignature(body, signature)) {
      console.warn('[Revalidate] Invalid webhook signature');
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const payload = JSON.parse(body);
    const { _type, _id, slug } = payload;
    
    console.log(`[Revalidate] Received webhook for ${_type}:${_id}`);
    
    // Clear the in-memory query cache to ensure fresh data
    clearQueryCache();
    
    // Get URLs to purge
    const urlsToPurge = getUrlsForDocument(payload);
    
    // Purge platform CDN cache. Both branches run independently so a single
    // deploy that has both env-var sets configured will purge both — useful
    // during the Netlify→Vercel comparison window.
    const purgeResults = await Promise.allSettled([
      purgeNetlify(urlsToPurge),
      purgeVercel(urlsToPurge),
    ]);

    const purgedOn: string[] = [];
    purgeResults.forEach((r, i) => {
      const platform = i === 0 ? 'netlify' : 'vercel';
      if (r.status === 'fulfilled' && r.value) purgedOn.push(platform);
      if (r.status === 'rejected') {
        console.error(`[Revalidate] ${platform} purge failed:`, r.reason);
      }
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${_type} update`,
        purgedUrls: urlsToPurge,
        purgedOn,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('[Revalidate] Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

/**
 * Purge Netlify's CDN cache via their instant-purge API.
 * No-op when Netlify env vars are not configured.
 * Returns true on successful purge, false on no-op, throws on API error.
 */
async function purgeNetlify(urls: string[]): Promise<boolean> {
  const token = import.meta.env.NETLIFY_CACHE_PURGE_TOKEN;
  const siteId = import.meta.env.NETLIFY_SITE_ID;
  if (!token || !siteId || urls.length === 0) return false;

  const res = await fetch(
    `https://api.netlify.com/api/v1/sites/${siteId}/purge`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paths: urls }),
    }
  );

  if (!res.ok) {
    throw new Error(`Netlify purge ${res.status}: ${await res.text()}`);
  }
  console.log(`[Revalidate] Purged ${urls.length} URLs from Netlify cache`);
  return true;
}

/**
 * Purge Vercel's edge cache via the platform's revalidation API.
 * No-op when Vercel env vars are not configured.
 *
 * Vercel doesn't accept arbitrary path lists like Netlify; instead the API
 * triggers a revalidation that invalidates cached responses for the project.
 * For finer-grained control, Cache-Tag headers + purge-by-tag would be the
 * next iteration — see middleware.ts for the spot to add tags.
 *
 * Reference: https://vercel.com/docs/rest-api/endpoints#purge-data-cache
 */
async function purgeVercel(urls: string[]): Promise<boolean> {
  const token = import.meta.env.VERCEL_TOKEN;
  const projectId = import.meta.env.VERCEL_PROJECT_ID;
  const teamId = import.meta.env.VERCEL_TEAM_ID; // optional for team-scoped projects
  if (!token || !projectId || urls.length === 0) return false;

  const teamQuery = teamId ? `?teamId=${encodeURIComponent(teamId)}` : '';
  const res = await fetch(
    `https://api.vercel.com/v1/projects/${encodeURIComponent(projectId)}/cache${teamQuery}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Vercel purge ${res.status}: ${await res.text()}`);
  }
  console.log(`[Revalidate] Purged Vercel data cache (${urls.length} URLs touched in payload)`);
  return true;
}
