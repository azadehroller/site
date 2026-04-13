// Test endpoint to check cookie state
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request, cookies }) => {
  const cookieHeader = request.headers.get('cookie') || ''
  const hasSanityPreview = cookies.has('sanity-preview')
  const sanityPreviewValue = cookies.get('sanity-preview')

  return new Response(JSON.stringify({
    cookieHeader,
    hasSanityPreview,
    sanityPreviewValue: sanityPreviewValue?.value,
    visualEditingEnvVar: import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED,
    timestamp: new Date().toISOString()
  }, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}
