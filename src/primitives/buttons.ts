// ─── Button Size Tokens ───────────────────────────────────────────────────────
export interface ButtonSizeToken {
  height: number;
  paddingHorizontal: number;
  iconHeight: number;
  fontSize: number;
  borderRadius: number;
}

export const BUTTON_SIZE: Record<'big' | 'medium' | 'small', ButtonSizeToken> = {
  big:    { height: 50, paddingHorizontal: 30, iconHeight: 20, fontSize: 16, borderRadius: 0 },
  medium: { height: 40, paddingHorizontal: 20, iconHeight: 16, fontSize: 14, borderRadius: 0 },
  small:  { height: 30, paddingHorizontal: 25, iconHeight: 14, fontSize: 12, borderRadius: 0 },
} as const;

// ─── Shimmer Defaults ─────────────────────────────────────────────────────────
export const SHIMMER_WIDTH        = 20;
export const SHIMMER_GAP_WIDTH    = 5;
export const SHIMMER_DURATION_MS  = 2000;
export const SHIMMER_DELAY_MS     = 2000;

// ─── Tilt Button Geometry ─────────────────────────────────────────────────────
export const TILTED_BUTTON_DEPTH          = 8.0;
export const TILTED_BUTTON_SHADOW_DIST    = 20.0;
export const TILTED_BUTTON_Y_POS_FACTOR   = 6.0;
export const TILTED_BUTTON_FLOATING_MS    = 1500;
export const TILTED_BUTTON_FLOAT_DELAY_MS = 750;
export const TILTED_BUTTON_TAP_MS         = 100;
export const TILTED_BUTTON_SHIMMER_WIDTH  = 24.0;
export const TILTED_BUTTON_SHIMMER_DELAY  = 2000;
export const TILTED_BUTTON_SHIMMER_DUR    = 1500;

// ─── Button Press Animation ───────────────────────────────────────────────────
export const BUTTON_PRESS_DURATION_MS   = 80;
export const BUTTON_RELEASE_DAMPING     = 15;
export const BUTTON_RELEASE_STIFFNESS   = 300;
