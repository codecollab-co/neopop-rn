// ─── Opacity Scale ────────────────────────────────────────────────────────────
export const OPACITY = {
  0:   0,
  5:   0.05,
  10:  0.1,
  20:  0.2,
  30:  0.3,
  40:  0.4,
  50:  0.5,
  60:  0.6,
  70:  0.7,
  80:  0.8,
  90:  0.9,
  95:  0.95,
  100: 1,
} as const;

// ─── Semantic Opacity Aliases ─────────────────────────────────────────────────
export const DISABLED_OPACITY = OPACITY[40];
export const OVERLAY_OPACITY  = OPACITY[60];
export const SHIMMER_OPACITY  = OPACITY[50];
export const PRESSED_OPACITY  = OPACITY[80];
export const HINT_OPACITY     = OPACITY[60];
