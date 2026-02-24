// /src/pages/api/draft-mode/disable.ts
import type { APIRoute } from 'astro'

/**
 * Disable draft mode by clearing the preview cookie.
 * Called when exiting the Presentation Tool or when explicitly disabling preview mode.
 */
export const GET: APIRoute = async ({ request, redirect, cookies }) => {
  // Clear the preview cookie
  cookies.delete('sanity-preview', {
    path: '/',
  })

  // Best-effort return to where we came from
  const referer = request.headers.get('referer')
  const backTo = referer && referer.startsWith('http') ? referer : '/'

  // Redirect with CORS headers (dynamic origin to support both local and production Studio)
  const response = redirect(backTo, 307)
  response.headers.set('Access-Control-Allow-Origin', request.headers.get('origin') || '*')
  response.headers.set('Access-Control-Allow-Credentials', 'true')

  return response
}

// Handle preflight requests for CORS
export const OPTIONS: APIRoute = async ({ request }) => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
    },
  })
}
