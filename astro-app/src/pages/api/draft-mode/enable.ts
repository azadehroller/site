// /src/pages/api/draft-mode/enable.ts
import type { APIRoute } from 'astro'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import {
  getClientWithToken,
  SanityClientConfigError,
} from '@utils/sanityClientWithToken'

/**
 * Enable draft mode for visual editing with Sanity Presentation Tool.
 * Uses @sanity/preview-url-secret for seamless integration with Sanity Studio.
 *
 * The Presentation Tool will automatically:
 * 1. Generate and store a preview secret in Sanity
 * 2. Call this endpoint with the secret
 * 3. This endpoint validates the secret against Sanity's database
 * 4. Sets the preview cookie if valid
 *
 * Notes for Vercel deploys:
 * - This route MUST always exist as a registered route, even when env vars are
 *   missing. If we threw at module-import time the Astro/Vercel build would
 *   fail to register the route and Vercel would return a misleading 404 to the
 *   Presentation tool, surfacing as "visual editing disabled" with no clue why.
 *   Env-var checks therefore happen lazily inside the handler and produce a
 *   real 500 with a useful message.
 */
export const GET: APIRoute = async ({ request, redirect, cookies }) => {
  const origin = request.headers.get('origin') || '*'
  const corsHeaders = (status: number) => ({
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true',
    // Avoid leaking error pages into Sanity preview cache
    'Cache-Control': status >= 400 ? 'no-store' : 'private, no-cache',
  })

  // Validate the preview URL secret using Sanity's standard validation.
  // Lazily resolve the Sanity client so missing env vars produce a clear 500
  // here instead of breaking module load (→ Vercel 404).
  let isValid: boolean
  let redirectTo: string
  try {
    const result = await validatePreviewUrl(getClientWithToken(), request.url)
    isValid = result.isValid
    redirectTo = result.redirectTo ?? '/'
  } catch (err) {
    if (err instanceof SanityClientConfigError) {
      console.error('[draft-mode/enable] Configuration error:', err.message)
      return new Response(
        JSON.stringify({ error: 'misconfigured', detail: err.message }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders(500) } }
      )
    }
    console.error('[draft-mode/enable] Unexpected error validating preview URL:', err)
    return new Response(
      JSON.stringify({ error: 'validation_failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders(500) } }
    )
  }

  if (!isValid) {
    return new Response('Invalid secret', { status: 401, headers: corsHeaders(401) })
  }

  // Detect if we're in production (HTTPS)
  const isProduction = new URL(request.url).protocol === 'https:'

  // Set the preview cookie to enable draft mode
  cookies.set('sanity-preview', 'true', {
    path: '/',
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
  })

  // Redirect to the requested page with CORS headers
  const response = redirect(redirectTo, 307)
  for (const [k, v] of Object.entries(corsHeaders(307))) {
    response.headers.set(k, v)
  }
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
