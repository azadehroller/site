// /src/pages/api/draft-mode/enable.ts
import type { APIRoute } from 'astro'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { clientWithToken } from '../../../utils/sanityClientWithToken'

/**
 * Enable draft mode for visual editing with Sanity Presentation Tool.
 * Uses @sanity/preview-url-secret for seamless integration with Sanity Studio.
 *
 * The Presentation Tool will automatically:
 * 1. Generate and store a preview secret in Sanity
 * 2. Call this endpoint with the secret
 * 3. This endpoint validates the secret against Sanity's database
 * 4. Sets the preview cookie if valid
 */
export const GET: APIRoute = async ({ request, redirect, cookies }) => {
  // Validate the preview URL secret using Sanity's standard validation
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    clientWithToken,
    request.url
  )

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  // Set the preview cookie to enable draft mode
  cookies.set('sanity-preview', 'true', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    // For HTTPS in production, add: secure: true
  })

  // Redirect to the requested page
  return redirect(redirectTo, 307)
}
