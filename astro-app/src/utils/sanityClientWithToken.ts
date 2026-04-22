// Sanity client with token for preview URL secret validation.
//
// IMPORTANT: this module must NEVER throw at import time. If it did, any route
// that imports it (e.g. /api/draft-mode/enable) would fail to register on
// Vercel — and Vercel would respond with **404** for that route (not a useful
// 500), making the misconfiguration extremely hard to diagnose. We hit exactly
// this on the first Vercel deploy of the Studio→Vercel preview wiring: the
// Sanity Presentation tool tried to enable draft mode, the endpoint 404'd, and
// the iframe could never enter preview mode → "visual editing disabled".
//
// To make missing-env-var failures *visible*, the actual env-var checks happen
// inside `getClientWithToken()` and produce a clear 500 with a message via the
// caller, instead of a misleading 404.
import { createClient, type SanityClient } from '@sanity/client'

let cachedClient: SanityClient | undefined

export class SanityClientConfigError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SanityClientConfigError'
  }
}

/**
 * Build (and memoise) a Sanity client suitable for server-side reads that need
 * a token (e.g. validating preview URL secrets, reading drafts).
 *
 * Throws `SanityClientConfigError` — NOT plain `Error` — when env vars are
 * missing, so callers can distinguish "misconfigured" from genuine runtime
 * failures and respond accordingly.
 */
export function getClientWithToken(): SanityClient {
  if (cachedClient) return cachedClient

  const projectId =
    import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
    import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID
  const dataset =
    import.meta.env.PUBLIC_SANITY_DATASET ||
    import.meta.env.PUBLIC_SANITY_STUDIO_DATASET
  const token = import.meta.env.SANITY_API_READ_TOKEN

  const missing: string[] = []
  if (!projectId) missing.push('PUBLIC_SANITY_PROJECT_ID (or PUBLIC_SANITY_STUDIO_PROJECT_ID)')
  if (!dataset) missing.push('PUBLIC_SANITY_DATASET (or PUBLIC_SANITY_STUDIO_DATASET)')
  if (!token) missing.push('SANITY_API_READ_TOKEN')

  if (missing.length > 0) {
    throw new SanityClientConfigError(
      `Sanity client is missing required env var(s): ${missing.join(', ')}. ` +
        `Set these in the Vercel project settings (Settings → Environment Variables) ` +
        `and redeploy.`
    )
  }

  cachedClient = createClient({
    projectId,
    dataset,
    useCdn: false,
    apiVersion: '2024-12-08',
    token,
  })
  return cachedClient
}

/**
 * Backward-compatible export. Lazy proxy so existing `import { clientWithToken }`
 * call sites keep working WITHOUT triggering env-var validation at import time.
 *
 * Each property/method access materialises the underlying client on first use.
 */
export const clientWithToken = new Proxy({} as SanityClient, {
  get(_target, prop, receiver) {
    const real = getClientWithToken() as unknown as Record<string | symbol, unknown>
    const value = real[prop as string]
    return typeof value === 'function' ? (value as (...args: unknown[]) => unknown).bind(real) : value
  },
})
