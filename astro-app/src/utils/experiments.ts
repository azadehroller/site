/**
 * A/B Testing utilities for Astro
 * Mirrors the Next.js implementation pattern from @sanity/personalization-plugin
 */

type Experiment = Record<
  string,
  { label: string; variants: { id: string; label: string }[] }
>;

export type AbTestData = {
  userGroup: string;
  userId: string;
  isNew: boolean;
};

// Must match the experiments configured in studio/sanity.config.ts
const EXPERIMENTS: Experiment = {
  'homepage-title': {
    label: 'Homepage Title',
    variants: [
      { id: 'control', label: 'Control' },
      { id: 'variant', label: 'Variant' },
    ],
  },
};

const AB_TEST_COOKIE = 'ab-test';

function parseAbTestCookie(
  request: Request
): { userGroup: string; userId: string } | undefined {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${AB_TEST_COOKIE}=([^;]+)`));
  if (!match) return undefined;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return undefined;
  }
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Resolve the A/B test assignment from the cookie, or create a new one.
 * Called from middleware BEFORE page rendering so the data is immediately
 * available via Astro.locals on the very first page load.
 */
export function resolveAbTest(request: Request): AbTestData {
  const existing = parseAbTestCookie(request);
  if (existing) {
    return { ...existing, isNew: false };
  }
  return {
    userGroup: Math.random() > 0.5 ? 'control' : 'variant',
    userId: generateUUID(),
    isNew: true,
  };
}

/**
 * Get the variant object for a given experiment using data from Astro.locals.
 */
export function getExperimentValue(
  experimentName: string,
  abTest: AbTestData
): { variant: { id: string; label: string } | undefined } {
  const experiment = EXPERIMENTS[experimentName];
  if (!experiment) return { variant: undefined };
  return {
    variant: experiment.variants.find((v) => v.id === abTest.userGroup),
  };
}

// ---------------------------------------------------------------------------
// Component-level A/B testing
// ---------------------------------------------------------------------------

export type ComponentAbTestData = {
  bucketValue: number;
  isNew: boolean;
};

function parsePlainCookie(name: string, request: Request): string | undefined {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Resolve a component-level A/B test cookie.
 * The cookie stores a random float [0,1) that is reused to bucket users into
 * whichever variant count a particular component instance defines.
 */
export function resolveComponentAbTest(
  componentName: string,
  request: Request
): ComponentAbTestData {
  const cookieName = `ab-${componentName}`;
  const raw = parsePlainCookie(cookieName, request);
  if (raw !== undefined) {
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed >= 0 && parsed < 1) {
      return { bucketValue: parsed, isNew: false };
    }
  }
  return {
    bucketValue: Math.random(),
    isNew: true,
  };
}

/**
 * Given a bucket value and the number of variants (not counting control),
 * return the selected index: 0 = control, 1..n = variant index.
 */
export function pickVariantIndex(bucketValue: number, variantCount: number): number {
  if (variantCount <= 0) return 0;
  const totalSlots = variantCount + 1; // control + variants
  return Math.min(Math.floor(bucketValue * totalSlots), variantCount);
}

// ---------------------------------------------------------------------------
// Geo-region detection
// ---------------------------------------------------------------------------

const REGION_MAP: Record<string, string> = {
  // Americas
  US: 'AMER', CA: 'AMER', MX: 'AMER', BR: 'AMER', AR: 'AMER', CL: 'AMER',
  CO: 'AMER', PE: 'AMER', VE: 'AMER', EC: 'AMER', CR: 'AMER', PA: 'AMER',
  PR: 'AMER', DO: 'AMER', GT: 'AMER', UY: 'AMER', PY: 'AMER', BO: 'AMER',
  // UK (separate from EMEA so editors can target UK specifically)
  GB: 'UK',
  // EMEA (Europe, Middle East, Africa — excluding UK)
  DE: 'EMEA', FR: 'EMEA', ES: 'EMEA', IT: 'EMEA', NL: 'EMEA', BE: 'EMEA',
  CH: 'EMEA', AT: 'EMEA', SE: 'EMEA', NO: 'EMEA', DK: 'EMEA', FI: 'EMEA',
  PL: 'EMEA', PT: 'EMEA', IE: 'EMEA', CZ: 'EMEA', RO: 'EMEA', GR: 'EMEA',
  HU: 'EMEA', IL: 'EMEA', AE: 'EMEA', SA: 'EMEA', ZA: 'EMEA', EG: 'EMEA',
  NG: 'EMEA', KE: 'EMEA', TR: 'EMEA', UA: 'EMEA', RU: 'EMEA',
  // Asia Pacific
  AU: 'APAC', NZ: 'APAC', JP: 'APAC', KR: 'APAC', CN: 'APAC', IN: 'APAC',
  SG: 'APAC', HK: 'APAC', TW: 'APAC', TH: 'APAC', MY: 'APAC', ID: 'APAC',
  PH: 'APAC', VN: 'APAC', PK: 'APAC', BD: 'APAC',
};

export type GeoData = {
  countryCode: string;
  region: string;
};

/**
 * Resolve the visitor's country from Netlify's geo headers.
 * Falls back to 'XX' / 'UNKNOWN' when running locally or when
 * the header is missing.
 */
export function resolveGeo(request: Request): GeoData {
  // Netlify provides X-Country; Cloudflare uses CF-IPCountry
  const countryCode = (
    request.headers.get('x-country') ||
    request.headers.get('cf-ipcountry') ||
    ''
  ).toUpperCase();

  if (!countryCode) {
    return { countryCode: 'XX', region: 'UNKNOWN' };
  }

  return {
    countryCode,
    region: REGION_MAP[countryCode] || 'UNKNOWN',
  };
}

/**
 * Check whether a variant with targetRegions matches the visitor's geo.
 * A variant matches if:
 *  - targetRegions is empty/undefined (global — matches everyone)
 *  - targetRegions contains the visitor's broad region (AMER, EMEA, APAC, UK)
 *  - targetRegions contains the visitor's exact country code (US, DE, etc.)
 */
export function variantMatchesGeo(
  targetRegions: string[] | undefined,
  geo: GeoData
): boolean {
  if (!targetRegions || targetRegions.length === 0) return true;
  return targetRegions.some(
    (r) => r === geo.region || r === geo.countryCode
  );
}
