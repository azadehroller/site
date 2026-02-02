/**
 * Utility to clean Sanity stega (steganography) characters from strings.
 * Stega embeds invisible Unicode characters for visual editing click-to-edit.
 * These must be stripped for proper rendering in animations, etc.
 */

// Comprehensive regex to remove all invisible/control Unicode characters
// Includes: zero-width spaces, joiners, marks, formatting chars, and private use areas
const STEGA_REGEX = /[\u0000-\u001F\u007F-\u009F\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180E\u200B-\u200F\u2028-\u202F\u2060-\u206F\u3000\u3164\uFE00-\uFE0F\uFEFF\uFFF0-\uFFFF]/g;

/**
 * Remove stega/invisible Unicode characters from a string
 */
export function cleanStega(str: unknown): string {
  // Return empty string for falsy values or non-strings
  if (!str || typeof str !== 'string') return '';
  
  // First pass: remove known invisible characters
  let cleaned = str.replace(STEGA_REGEX, '');
  
  // For CSS variable values, extract just the var() syntax to ensure clean value
  if (cleaned.includes('var(--')) {
    const match = cleaned.match(/var\(--[a-zA-Z0-9-]+\)/);
    if (match) {
      return match[0];
    }
  }
  
  return cleaned.trim();
}

/**
 * Clean stega from all string values in an object (shallow)
 */
export function cleanStegaObject<T extends Record<string, unknown>>(obj: T): T {
  const cleaned = { ...obj };
  for (const key in cleaned) {
    if (typeof cleaned[key] === 'string') {
      (cleaned as Record<string, unknown>)[key] = cleanStega(cleaned[key] as string);
    }
  }
  return cleaned;
}

