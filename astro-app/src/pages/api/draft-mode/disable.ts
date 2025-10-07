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

  return redirect(backTo, 307)
}
