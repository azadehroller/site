/**
 * Production hostname helpers.
 *
 * Used to gate analytics, marketing tags, and form embeds (HubSpot, Facebook,
 * Clarity, PostHog, etc.) so they only fire on the real production domain.
 *
 * Staging Netlify deploys are still PROD builds (`import.meta.env.PROD === true`),
 * so a build-time flag is not enough — we need a request-time hostname check.
 *
 * Add new aliases here if production ever serves from another hostname.
 */
export const PRODUCTION_HOSTNAMES = ['www.roller.software', 'roller.software'] as const;

export const PRODUCTION_BASE = 'https://www.roller.software';

export function isProductionHost(hostname: string | null | undefined): boolean {
  if (!hostname) return false;
  return (PRODUCTION_HOSTNAMES as readonly string[]).includes(hostname.toLowerCase());
}
