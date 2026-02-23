import type { FontType, FontWeight } from '../primitives/typography';
import { LINE_HEIGHT_MULTIPLIER, LETTER_SPACING_MAP, TEXT_TRANSFORM_MAP } from '../primitives/typography';
import type { TextStyle } from 'react-native';

// ─── isEmpty ──────────────────────────────────────────────────────────────────
/** Returns true if value is null, undefined, empty string, empty array,
 *  empty object, empty Map, or empty Set. */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === 'object') return Object.keys(value as object).length === 0;
  return false;
}

// ─── isObject ─────────────────────────────────────────────────────────────────
/** Type guard — returns true only for plain objects (not arrays, Maps, etc.). */
export function isObject(item: unknown): item is Record<string, unknown> {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
}

// ─── mergeDeep ────────────────────────────────────────────────────────────────
/** Recursively deep-merges source objects into a target.
 *  Used by NeoPopProvider to merge theme overrides. */
export function mergeDeep<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  const result = { ...target };
  for (const source of sources) {
    for (const key in source) {
      const srcVal = source[key];
      const tgtVal = result[key];
      if (isObject(srcVal) && isObject(tgtVal)) {
        (result as Record<string, unknown>)[key] = mergeDeep(
          tgtVal as Record<string, unknown>,
          srcVal as Record<string, unknown>,
        );
      } else if (srcVal !== undefined) {
        (result as Record<string, unknown>)[key] = srcVal;
      }
    }
  }
  return result;
}

// ─── getRandomInt ─────────────────────────────────────────────────────────────
/** Returns a random integer between min and max (both inclusive). */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ─── isImageLoaded ────────────────────────────────────────────────────────────
/** Web-only: returns a Promise that resolves when an image has loaded,
 *  or rejects if it fails. No-ops on native. */
export function isImageLoaded(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

// ─── currencyFormatter ────────────────────────────────────────────────────────
/** Formats a number as a currency string (INR or USD). */
export function currencyFormatter(
  amount: number | string,
  fallback: string = '',
  minimumFractionDigits: number = 0,
  currency: 'inr' | 'usd' = 'inr',
): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return fallback;
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits,
    }).format(num);
  } catch {
    return fallback;
  }
}

// ─── generateTextStyle ────────────────────────────────────────────────────────
/** Generate a React Native TextStyle object from NeoPop typography tokens. */
export function generateTextStyle(
  fontType: FontType,
  fontSize: number,
  fontWeight: FontWeight,
  color: string = '#ffffff',
  fontFamily?: string,
): TextStyle {
  const lineHeight = Math.round(fontSize * LINE_HEIGHT_MULTIPLIER[fontType]);
  const letterSpacing = LETTER_SPACING_MAP[fontType];
  const textTransform = TEXT_TRANSFORM_MAP[fontType];

  return {
    fontSize,
    fontWeight: fontWeight as TextStyle['fontWeight'],
    lineHeight,
    letterSpacing,
    textTransform,
    color,
    ...(fontFamily ? { fontFamily } : {}),
  };
}
