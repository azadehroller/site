import type { APIRoute } from 'astro';
import { createHmac } from 'crypto';
import { clearQueryCache } from '../../utils/loadQuery';

/**
 * Webhook endpoint for Sanity to trigger cache purge/revalidation.
 * 
 * When content is published in Sanity, this webhook:
 * 1. Validates the request using a secret
 * 2. Purges the Netlify cache for affected URLs
 * 3. Optionally triggers a build for critical pages
 * 
 * Setup in Sanity:
 * 1. Go to sanity.io/manage → Your Project → API → Webhooks
 * 2. Create a new webhook with:
 *    - Name: "Netlify Cache Purge"
 *    - URL: https://your-site.netlify.app/api/revalidate
 *    - Trigger on: Create, Update, Delete
 *    - Filter: _type in ["post", "page", "landingPage", "homepage"]
 *    - Secret: (generate a secure random string)
 * 3. Add SANITY_WEBHOOK_SECRET to your Netlify environment variables
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
    
    // Purge Netlify cache using their Cache-Tag API
    // This requires Netlify's cache purge API or using their instant purge feature
    const netlifyPurgeToken = import.meta.env.NETLIFY_CACHE_PURGE_TOKEN;
    const netlifySiteId = import.meta.env.NETLIFY_SITE_ID;
    
    if (netlifyPurgeToken && netlifySiteId && urlsToPurge.length > 0) {
      // Use Netlify's instant cache purge API
      const purgeResponse = await fetch(
        `https://api.netlify.com/api/v1/sites/${netlifySiteId}/purge`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${netlifyPurgeToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paths: urlsToPurge }),
        }
      );
      
      if (!purgeResponse.ok) {
        console.error('[Revalidate] Failed to purge Netlify cache:', await purgeResponse.text());
      } else {
        console.log(`[Revalidate] Purged ${urlsToPurge.length} URLs from Netlify cache`);
      }
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${_type} update`,
        purgedUrls: urlsToPurge 
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
