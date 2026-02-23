// ─── Font Type ────────────────────────────────────────────────────────────────
export enum FontType {
  HEADING       = 'heading',
  CAPS          = 'caps',
  BODY          = 'body',
  SERIF_HEADING = 'serif-heading',
}

// ─── Font Weight ──────────────────────────────────────────────────────────────
export enum FontWeight {
  EXTRA_BOLD = '800',
  BOLD       = '700',
  SEMI_BOLD  = '600',
  MEDIUM     = '500',
  REGULAR    = '400',
  THIN       = '300',
}

// ─── Text Overflow ────────────────────────────────────────────────────────────
export enum TextOverflow {
  ELLIPSIS = 'ellipsis',
  CLIP     = 'clip',
}

// ─── Line Height Multipliers per Font Type ────────────────────────────────────
export const LINE_HEIGHT_MULTIPLIER: Record<FontType, number> = {
  [FontType.HEADING]:       1.2,
  [FontType.CAPS]:          1.3,
  [FontType.BODY]:          1.5,
  [FontType.SERIF_HEADING]: 1.15,
};

// ─── Letter Spacing (px) per Font Type ───────────────────────────────────────
export const LETTER_SPACING_MAP: Record<FontType, number> = {
  [FontType.HEADING]:        -0.5,
  [FontType.CAPS]:            1.5,
  [FontType.BODY]:            0,
  [FontType.SERIF_HEADING]:  -0.3,
};

// ─── Text Transform per Font Type ─────────────────────────────────────────────
export const TEXT_TRANSFORM_MAP: Record<FontType, 'uppercase' | 'none'> = {
  [FontType.HEADING]:       'none',
  [FontType.CAPS]:          'uppercase',
  [FontType.BODY]:          'none',
  [FontType.SERIF_HEADING]: 'none',
};

// ─── Default Font Families ────────────────────────────────────────────────────
export const DEFAULT_FONT_FAMILY: Record<FontType, string> = {
  [FontType.HEADING]:       'System',
  [FontType.CAPS]:          'System',
  [FontType.BODY]:          'System',
  [FontType.SERIF_HEADING]: 'Georgia',
};
