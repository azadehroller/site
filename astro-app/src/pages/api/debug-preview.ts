// Debug endpoint to check preview configuration
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request, cookies }) => {
  const cookieHeader = request.headers.get('cookie') || ''
  const previewCookie = cookies.get('sanity-preview')
  const isPreview = /\bsanity-preview=true\b/.test(cookieHeader)

  const debug = {
    environment: {
      SANITY_API_READ_TOKEN: import.meta.env.SANITY_API_READ_TOKEN ? 'SET (hidden)' : 'NOT SET',
      PUBLIC_SANITY_VISUAL_EDITING_ENABLED: import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED,
      PUBLIC_SANITY_PROJECT_ID: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
      PUBLIC_SANITY_DATASET: import.meta.env.PUBLIC_SANITY_DATASET,
    },
    cookies: {
      all: cookieHeader,
      previewCookie: previewCookie?.value || 'NOT SET',
      isPreviewDetected: isPreview,
    },
    request: {
      url: request.url,
      origin: new URL(request.url).origin,
    }
  }

  return new Response(JSON.stringify(debug, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
