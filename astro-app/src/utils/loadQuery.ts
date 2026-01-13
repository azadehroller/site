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

  const result = await sanityClient.fetch<T>(query, params ?? {}, {
    perspective,
    // Only enable stega when actually in preview mode. Otherwise, it pollutes strings
    // (e.g. alt text) with invisible Unicode used for click-to-edit.
    stega: visualEditingEnabled && isPreview,
    // Use token only when you actually need to read drafts
    ...(isPreview && token ? { token } : {}),
    // Prefer fresh data when VE is on; use CDN otherwise
    useCdn: !(visualEditingEnabled || isPreview)
  })

  return { data: result, perspective }
}
