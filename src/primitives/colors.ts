// ─── Base Colors ──────────────────────────────────────────────────────────────
export const COLOR_BLACK = '#0d0d0d' as const;
export const COLOR_WHITE = '#ffffff' as const;
export const COLOR_RED   = '#EE4D37' as const;
export const COLOR_YELLOW = '#F08D32' as const;
export const COLOR_BLUE  = '#144CC7' as const;
export const COLOR_GREEN = '#06C270' as const;
export const TRANSPARENT = 'transparent' as const;

// ─── Pop Black Scale (100 = lightest, 500 = darkest) ─────────────────────────
export const POP_BLACK = {
  100: '#8A8A8A',
  200: '#3D3D3D',
  300: '#161616',
  400: '#121212',
  500: '#0d0d0d',
} as const;

// ─── Pop White Scale (100 = darkest, 500 = lightest) ─────────────────────────
export const POP_WHITE = {
  100: '#D2D2D2',
  200: '#E0E0E0',
  300: '#EFEFEF',
  400: '#FBFBFB',
  500: '#ffffff',
} as const;

// ─── Brand Palettes (8 steps: lightest → darkest) ────────────────────────────
export const POLI_PURPLE = [
  '#F5F0FF', '#E8DFFF', '#D4C4FF', '#B59EFF',
  '#7C5CFC', '#5B35D5', '#3A1FA0', '#20104D',
] as const;

export const ORANGE_SUNSHINE = [
  '#FFF5EF', '#FFEFE6', '#FFD9BF', '#FFB985',
  '#FF8C3B', '#D96020', '#A03610', '#4D2914',
] as const;

export const PARK_GREEN = [
  '#F0FFF8', '#DDFFF1', '#AAFFD9', '#6AFFB8',
  '#2ECC84', '#1A9960', '#0F6640', '#124D34',
] as const;

export const PINK_PONG = [
  '#FFF0F3', '#FFE1E9', '#FFC2D1', '#FF8DAA',
  '#FF4D72', '#CC2248', '#99132C', '#4D1421',
] as const;

export const MANNNA = [
  '#FFFDF0', '#FFF8E5', '#FFF0BF', '#FFE080',
  '#FFCC33', '#CC9900', '#996600', '#4D3D15',
] as const;

export const NEO_PACCHA = [
  '#FAFFF0', '#FBFFE6', '#F2FFBF', '#E0FF80',
  '#BBFF33', '#88CC00', '#557A00', '#454C13',
] as const;

export const YOYO = [
  '#FAF0FF', '#F4E5FF', '#E8CCFF', '#D1A3FF',
  '#A94DFF', '#7B1FD4', '#52119E', '#33134D',
] as const;

// ─── Semantic Colors (5 steps: lightest → brand) ─────────────────────────────
export const SEMANTIC_ERROR = [
  '#FCE2DD', '#F9C4BB', '#F59D90', '#F17060', '#EE4D37',
] as const;

export const SEMANTIC_WARNING = [
  '#FBDDC2', '#F8C49A', '#F5A870', '#F29848', '#F08D32',
] as const;

export const SEMANTIC_INFO = [
  '#C2D0F2', '#9BB0E8', '#6E8EDC', '#4068CF', '#144CC7',
] as const;

export const SEMANTIC_SUCCESS = [
  '#E6F9F1', '#BFEDDA', '#86DDB8', '#3ECA8A', '#06C270',
] as const;

// ─── Internal Color Constants (used by components) ───────────────────────────
/** @internal */
export const _DISABLED_BG     = '#8A8A8A' as const;
/** @internal */
export const _DARK_GREEN      = '#E6F9F1' as const;
/** @internal */
export const _BRIGHT_GREEN    = '#06C270' as const;
/** @internal */
export const _SWITCH_OFF      = '#E0E0E0' as const;
/** @internal */
export const _SHIMMER_DEFAULT = 'rgba(255,248,229,0.49)' as const;
