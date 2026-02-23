// ─── Base Spacing Scale (multiples of 4) ─────────────────────────────────────
export const SPACING = {
  0:  0,
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  7:  28,
  8:  32,
  9:  36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
} as const;

// ─── Semantic Spacing Aliases ─────────────────────────────────────────────────
export const SPACING_XS  = SPACING[1];   // 4
export const SPACING_SM  = SPACING[2];   // 8
export const SPACING_MD  = SPACING[4];   // 16
export const SPACING_LG  = SPACING[6];   // 24
export const SPACING_XL  = SPACING[8];   // 32
export const SPACING_2XL = SPACING[12];  // 48

// ─── Component-specific Depth Constants ──────────────────────────────────────
export const BUTTON_DEPTH        = 3;
export const BUTTON_DEPTH_TILTED = 8;
export const CARD_DEPTH          = 3;

// ─── Bottom Sheet ─────────────────────────────────────────────────────────────
export const BOTTOM_SHEET_NOTCH_HEIGHT = 4;
export const BOTTOM_SHEET_NOTCH_WIDTH  = 40;
export const BOTTOM_SHEET_BORDER_RADIUS = 16;
