/**
 * Color utility functions for neopop-rn.
 * Mirrors the logic from iOS PopHelper, Android NeoPopHelper,
 * Flutter ColorUtils, and Web hexToRGBA utility.
 */

// ─── Internal Helpers ─────────────────────────────────────────────────────────

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function parseHex(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;
  const num = parseInt(full.slice(0, 6), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => clamp(v, 0, 255).toString(16).padStart(2, '0')).join('');
}

// ─── Exported Utilities ───────────────────────────────────────────────────────

/**
 * Convert a hex color string to an rgba() or rgb() CSS string.
 * Mirrors the web library's hexToRGBA utility.
 */
export function hexToRGBA(hex: string, alpha?: number): string {
  const [r, g, b] = parseHex(hex);
  if (alpha !== undefined) {
    return `rgba(${r},${g},${b},${clamp(alpha, 0, 1)})`;
  }
  return `rgb(${r},${g},${b})`;
}

/**
 * Get the relative luminance of a hex color (0 = black, 1 = white).
 * Uses WCAG formula.
 */
export function getLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * (r as number) + 0.7152 * (g as number) + 0.0722 * (b as number);
}

/** Returns true if the color is perceptually dark (luminance < 0.3). */
export function isColorDark(hex: string): boolean {
  return getLuminance(hex) < 0.3;
}

/** Returns black or white depending on which contrasts better with the given color. */
export function getContrastColor(hex: string): string {
  return getLuminance(hex) > 0.179 ? '#0d0d0d' : '#ffffff';
}

/**
 * Adjust the lightness of a hex color by a delta (-1 to +1).
 * Positive = lighter, negative = darker.
 */
export function adjustLightness(hex: string, delta: number): string {
  const [r, g, b] = parseHex(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [nr, ng, nb] = hslToRgb(h, s, clamp(l + delta, 0, 1));
  return rgbToHex(nr, ng, nb);
}

/**
 * Derive the horizontal (right) edge color from a face color.
 * Mirrors iOS PopHelper.horizontalEdgeColor and Flutter ColorUtils.getHorizontalShadow.
 * Luminance < 0.3 → lighten by 20%; else → darken by 10%.
 */
export function getHorizontalShadow(hex: string): string {
  return isColorDark(hex)
    ? adjustLightness(hex, +0.2)
    : adjustLightness(hex, -0.1);
}

/**
 * Derive the vertical (bottom) edge color from a face color.
 * Mirrors iOS PopHelper.verticalEdgeColor and Flutter ColorUtils.getVerticalShadow.
 * Luminance < 0.3 → lighten by 10%; else → darken by 20%.
 */
export function getVerticalShadow(hex: string): string {
  return isColorDark(hex)
    ? adjustLightness(hex, +0.1)
    : adjustLightness(hex, -0.2);
}

/**
 * Derive all four edge colors from a face color.
 * Right edge = horizontal shadow. Bottom edge = vertical shadow.
 */
export function deriveEdgeColor(faceColor: string): {
  right: string;
  bottom: string;
} {
  return {
    right:  getHorizontalShadow(faceColor),
    bottom: getVerticalShadow(faceColor),
  };
}

/**
 * Derive a highlight edge color (lighter) for elevated stroke or inner border.
 */
export function deriveHighlightEdgeColor(faceColor: string): string {
  return isColorDark(faceColor)
    ? adjustLightness(faceColor, +0.3)
    : adjustLightness(faceColor, -0.3);
}
