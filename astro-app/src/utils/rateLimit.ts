/**
 * Simple in-memory rate limiter for the chatbot API.
 * Limits requests per IP address to prevent abuse.
 *
 * Note: For multi-instance deployments (e.g., serverless),
 * consider using Redis or a dedicated rate limiting service.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Configuration
const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 10; // 10 requests per window

// Clean up expired entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetAt) {
        rateLimitStore.delete(key);
      }
    }
  }, WINDOW_MS);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check if a request from the given identifier is allowed.
 * Returns whether the request is allowed and remaining quota.
 */
export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  const now = Date.now();
  const key = `chat:${identifier}`;

  let entry = rateLimitStore.get(key);

  // Create new entry if none exists or window expired
  if (!entry || now > entry.resetAt) {
    entry = {
      count: 0,
      resetAt: now + WINDOW_MS,
    };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(key, entry);

  const allowed = entry.count <= MAX_REQUESTS;
  const remaining = Math.max(0, MAX_REQUESTS - entry.count);

  return {
    allowed,
    remaining,
    resetAt: entry.resetAt,
  };
}
