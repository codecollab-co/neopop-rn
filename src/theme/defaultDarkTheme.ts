/**
 * Default dark-mode theme for neopop-rn.
 *
 * Token values are drawn from the NeoPop design system's dark palette.
 * Override specific sections by passing a partial `theme` to `NeoPopProvider`.
 */
import type { ThemeConfig } from './types';
import { COLOR_BLACK, COLOR_WHITE, POP_BLACK, POP_WHITE, COLOR_GREEN, SEMANTIC_ERROR, SEMANTIC_SUCCESS } from '../primitives/colors';

/** Pre-built dark theme — pass to NeoPopProvider via `colorMode="dark"` (the default). */
export const defaultDarkTheme: ThemeConfig = {
  colorMode: 'dark',
  // ── Global surface colors ──────────────────────────────────────────────────
  colors: {
    background: COLOR_BLACK,
    surface:    POP_BLACK[300],
    text:       COLOR_WHITE,
    subtext:    POP_BLACK[100],
    border:     POP_BLACK[200],
  },
  // ── NeoPopButton ──────────────────────────────────────────────────────────
  button: {
    color:              COLOR_WHITE,
    edgeColors:         { bottom: POP_BLACK[100], right: POP_BLACK[100] },
    borderColor:        COLOR_WHITE,
    disabledColor:      POP_BLACK[100],
    disabledEdgeColor:  POP_BLACK[200],
  },
  // ── NeoPopCard ────────────────────────────────────────────────────────────
  card: {
    color:      POP_BLACK[300],
    edgeColors: { bottom: POP_BLACK[200], right: POP_BLACK[200] },
    borderColor: POP_BLACK[200],
  },
  // ── NeoPopShimmer ─────────────────────────────────────────────────────────
  shimmer: {
    color: 'rgba(255,248,229,0.49)',
  },
  // ── NeoPopCheckbox ────────────────────────────────────────────────────────
  checkbox: {
    background:         COLOR_WHITE,
    border:             COLOR_WHITE,
    checkmarkColor:     COLOR_BLACK,
    leftPlunk:          POP_BLACK[100],
    topPlunk:           POP_BLACK[100],
    disabledBackground: POP_BLACK[100],
  },
  // ── NeoPopRadio ───────────────────────────────────────────────────────────
  radio: {
    background:  COLOR_BLACK,
    border:      COLOR_WHITE,
    plunk:       POP_BLACK[100],
    dotBackground: COLOR_WHITE,
  },
  // ── NeoPopToggle ──────────────────────────────────────────────────────────
  toggle: {
    on: {
      switchBackground:     COLOR_GREEN,
      switchBorder:         COLOR_GREEN,
      buttonBackground:     COLOR_WHITE,
      buttonBorder:         COLOR_WHITE,
      buttonMarkBackground: COLOR_GREEN,
    },
    off: {
      switchBackground:     POP_BLACK[200],
      switchBorder:         POP_BLACK[100],
      buttonBackground:     POP_WHITE[200],
      buttonBorder:         POP_WHITE[200],
      buttonMarkBackground: POP_BLACK[100],
    },
  },
  // ── NeoPopInputField ──────────────────────────────────────────────────────
  inputField: {
    textColor:        COLOR_WHITE,
    labelColor:       POP_BLACK[100],
    caretColor:       COLOR_WHITE,
    errorColor:       SEMANTIC_ERROR[4],
    placeholderColor: POP_BLACK[100],
    borderColor:      POP_BLACK[200],
    activeBorderColor: COLOR_WHITE,
    backgroundColor:  COLOR_BLACK,
  },
  // ── NeoPopDropdown ────────────────────────────────────────────────────────
  dropdown: {
    border:     POP_BLACK[200],
    text:       COLOR_WHITE,
    chevron:    COLOR_WHITE,
    background: COLOR_BLACK,
  },
  // ── NeoPopTags ────────────────────────────────────────────────────────────
  tags: {
    background: POP_BLACK[300],
    color:      COLOR_WHITE,
  },
  // ── NeoPopBottomSheet ─────────────────────────────────────────────────────
  bottomSheet: {
    background:   POP_BLACK[300],
    notchColor:   POP_BLACK[200],
    overlayColor: 'rgba(0,0,0,0.7)',
    plunkColor:   POP_BLACK[100],
  },
  // ── NeoPopFloatingButton ──────────────────────────────────────────────────
  floatingButton: {
    color:        COLOR_WHITE,
    borderColor:  COLOR_WHITE,
    edgeColor:    POP_BLACK[100],
    shadowColor:  POP_BLACK[200],
    disabledColor: POP_BLACK[100],
  },
  // ── NeoPopTiltedButton ────────────────────────────────────────────────────
  tiltedButton: {
    color:       COLOR_WHITE,
    plunkColor:  POP_BLACK[100],
    shadowColor: POP_BLACK[200],
    borderColor: COLOR_WHITE,
  },
  // ── NeoPopScoreMeter ──────────────────────────────────────────────────────
  scoreMeter: {
    meterStrokeColor: {
      excellent: SEMANTIC_SUCCESS[4],
      average:   '#F5A623',
      poor:      SEMANTIC_ERROR[4],
    },
    meterStrokeBackground: POP_BLACK[200],
    dotColor:              COLOR_WHITE,
    scoreColor:            COLOR_WHITE,
    scoreContainerBackground: COLOR_BLACK,
    scoreContainerBorder:  POP_BLACK[200],
  },
};
