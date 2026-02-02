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
}

const queryCache = new Map<string, CacheEntry<any>>()

// Cache TTL: 60 seconds in dev, 5 minutes in production
const CACHE_TTL = import.meta.env.DEV ? 60 * 1000 : 5 * 60 * 1000

// Generate a cache key from query + params
function getCacheKey(query: string, params?: QueryParams): string {
  return `${query}::${JSON.stringify(params || {})}`
}

// Clear expired cache entries periodically
function cleanCache() {
  const now = Date.now()
  for (const [key, entry] of queryCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL) {
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
}

export async function loadQuery<T>({
  query,
  params,
  request
}: LoadQueryArgs): Promise<{ data: T; perspective: 'published' | 'previewDrafts' }> {
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

  const perspective = isPreview ? 'previewDrafts' : 'published'

  // For published content, check cache first
  if (!isPreview) {
    const cacheKey = getCacheKey(query, params)
    const cached = queryCache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      if (import.meta.env.DEV) {
        console.log('[loadQuery] CACHE HIT:', cacheKey.substring(0, 50) + '...')
      }
      return { data: cached.data as T, perspective }
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
    console.log(`[loadQuery] Fetched in ${duration}ms:`, query.substring(0, 50) + '...')
  }

  // Cache the result for published content
  if (!isPreview) {
    const cacheKey = getCacheKey(query, params)
    queryCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    })
  }

  return { data: result, perspective }
}

// Export function to manually clear cache (useful for webhooks)
export function clearQueryCache() {
  queryCache.clear()
  console.log('[loadQuery] Cache cleared')
}
