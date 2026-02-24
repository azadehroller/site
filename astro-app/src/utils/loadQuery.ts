// /src/lib/loadQuery.ts
import { sanityClient } from 'sanity:client' // provided by @sanity/astro
import type { QueryParams } from 'sanity'

/**
 * You MUST set this on the server (no PUBLIC_):
 * SANITY_API_READ_TOKEN=<Viewer token>
 */
const visualEditingEnabled =
  String(import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED) === 'true'
const token = import.meta.env.SANITY_API_READ_TOKEN

// Simple in-memory cache for published content
// This dramatically speeds up navigation by avoiding repeated API calls
type CacheEntry<T> = {
  data: T
  timestamp: number
  revalidating?: boolean // Flag to prevent duplicate background revalidations
}

const queryCache = new Map<string, CacheEntry<any>>()

// Tiered cache TTL configuration
// Different content types have different update frequencies
const CACHE_TTL_CONFIG = {
  // Global components (header/footer/chatbot) change infrequently
  global: import.meta.env.DEV ? 60 * 1000 : 30 * 60 * 1000, // 30 min in prod
  // Page content (homepage, etc.) changes more often
  page: import.meta.env.DEV ? 60 * 1000 : 10 * 60 * 1000, // 10 min in prod
  // Default for other queries
  default: import.meta.env.DEV ? 60 * 1000 : 5 * 60 * 1000, // 5 min in prod
}

// Get cache TTL based on query type
function getCacheTTL(queryType?: string): number {
  if (queryType && queryType in CACHE_TTL_CONFIG) {
    return CACHE_TTL_CONFIG[queryType as keyof typeof CACHE_TTL_CONFIG]
  }
  return CACHE_TTL_CONFIG.default
}

// Generate a cache key from query + params
function getCacheKey(query: string, params?: QueryParams): string {
  return `${query}::${JSON.stringify(params || {})}`
}

// Clear expired cache entries periodically
// Uses the longest TTL to ensure we don't delete entries prematurely
function cleanCache() {
  const now = Date.now()
  const maxTTL = Math.max(...Object.values(CACHE_TTL_CONFIG))
  for (const [key, entry] of queryCache.entries()) {
    if (now - entry.timestamp > maxTTL) {
      queryCache.delete(key)
    }
  }
}

// Run cache cleanup every minute
if (typeof setInterval !== 'undefined') {
  setInterval(cleanCache, 60 * 1000)
}

type LoadQueryArgs = {
  query: string
  params?: QueryParams
  request?: Request // pass Astro's request in from pages/load functions
  queryType?: 'global' | 'page' | 'default' // Query type for tiered caching
}

export async function loadQuery<T>({
  query,
  params,
  request,
  queryType
}: LoadQueryArgs): Promise<{ data: T; perspective: 'published' | 'drafts' }> {
  // Detect preview from cookie set by /api/draft-mode/enable
  const cookieHeader = request?.headers.get('cookie') || ''
  const isPreview = /\bsanity-preview=true\b/.test(cookieHeader)

  // Debug logging (only in development)
  if (import.meta.env.DEV) {
    console.log('[loadQuery] Preview mode:', {
      isPreview,
      visualEditingEnabled,
      hasToken: !!token,
      cookieHeader: cookieHeader.substring(0, 50) + '...'
    })
  }

  if (visualEditingEnabled && isPreview && !token) {
    throw new Error(
      'SANITY_API_READ_TOKEN is required to read drafts when Visual Editing is enabled.'
    )
  }

  const perspective = isPreview ? 'drafts' : 'published'
  const cacheTTL = getCacheTTL(queryType)
  const staleTime = cacheTTL * 2 // Serve stale for 2x TTL

  // For published content, check cache first
  if (!isPreview) {
    const cacheKey = getCacheKey(query, params)
    const cached = queryCache.get(cacheKey)

    if (cached) {
      const age = Date.now() - cached.timestamp

      // Cache hit - serve immediately
      if (age < cacheTTL) {
        if (import.meta.env.DEV) {
          console.log(`[loadQuery] CACHE HIT (${queryType || 'default'}, age=${Math.round(age / 1000)}s, TTL=${Math.round(cacheTTL / 1000)}s):`, cacheKey.substring(0, 50) + '...')
        }
        return { data: cached.data as T, perspective }
      }

      // Stale but acceptable - serve stale and revalidate in background
      if (age < staleTime && !cached.revalidating) {
        if (import.meta.env.DEV) {
          console.log(`[loadQuery] STALE-WHILE-REVALIDATE (${queryType || 'default'}, age=${Math.round(age / 1000)}s):`, cacheKey.substring(0, 50) + '...')
        }

        // Mark as revalidating to prevent duplicate requests
        cached.revalidating = true

        // Background revalidation (don't await)
        // IMPORTANT: Preserve stega in background revalidation for visual editing
        sanityClient.fetch<T>(query, params ?? {}, {
          perspective,
          stega: visualEditingEnabled && perspective === 'drafts', // Enable stega for preview drafts
          useCdn: perspective === 'published', // Use CDN for published, bypass for drafts
        }).then(result => {
          // Update cache with fresh data
          queryCache.set(cacheKey, {
            data: result,
            timestamp: Date.now(),
            revalidating: false
          })
          if (import.meta.env.DEV) {
            console.log(`[loadQuery] Background revalidation complete:`, cacheKey.substring(0, 50) + '...')
          }
        }).catch(err => {
          console.error('[loadQuery] Background revalidation failed:', err)
          // Reset revalidating flag on error so we can retry later
          if (cached) {
            cached.revalidating = false
          }
        })

        // Return stale data immediately
        return { data: cached.data as T, perspective }
      }
    }
  }

  const startTime = Date.now()

  const result = await sanityClient.fetch<T>(query, params ?? {}, {
    perspective,
    // Only enable stega when actually in preview mode. Otherwise, it pollutes strings
    // (e.g. alt text) with invisible Unicode used for click-to-edit.
    stega: visualEditingEnabled && isPreview,
    // Use token only when you actually need to read drafts
    ...(isPreview && token ? { token } : {}),
    // Use CDN for published content (faster, cached globally)
    // Only bypass CDN in preview mode when we need fresh draft data
    useCdn: !isPreview,
  })

  const duration = Date.now() - startTime

  if (import.meta.env.DEV) {
    console.log(`[loadQuery] Fetched in ${duration}ms (${queryType || 'default'}, TTL=${cacheTTL}ms):`, query.substring(0, 50) + '...')
  }

  // Cache the result for published content
  if (!isPreview) {
    const cacheKey = getCacheKey(query, params)
    queryCache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
      revalidating: false
    })
  }

  return { data: result, perspective }
}

// Export function to manually clear cache (useful for webhooks)
export function clearQueryCache() {
  queryCache.clear()
  console.log('[loadQuery] Cache cleared')
}
