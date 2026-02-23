import type { ThemeConfig } from './types';
import { COLOR_BLACK, COLOR_WHITE, POP_BLACK, POP_WHITE, COLOR_GREEN, SEMANTIC_ERROR, SEMANTIC_SUCCESS } from '../primitives/colors';

export const defaultLightTheme: ThemeConfig = {
  colorMode: 'light',
  colors: {
    background: COLOR_WHITE,
    surface:    POP_WHITE[300],
    text:       COLOR_BLACK,
    subtext:    POP_BLACK[100],
    border:     POP_WHITE[100],
  },
  button: {
    color:              COLOR_BLACK,
    edgeColors:         { bottom: POP_BLACK[100], right: POP_BLACK[100] },
    borderColor:        COLOR_BLACK,
    disabledColor:      POP_WHITE[100],
    disabledEdgeColor:  POP_WHITE[200],
  },
  card: {
    color:      COLOR_WHITE,
    edgeColors: { bottom: POP_WHITE[100], right: POP_WHITE[100] },
    borderColor: POP_WHITE[100],
  },
  shimmer: {
    color: 'rgba(255,255,255,0.6)',
  },
  checkbox: {
    background:         COLOR_BLACK,
    border:             COLOR_BLACK,
    checkmarkColor:     COLOR_WHITE,
    leftPlunk:          POP_BLACK[200],
    topPlunk:           POP_BLACK[200],
    disabledBackground: POP_WHITE[100],
  },
  radio: {
    background:   COLOR_WHITE,
    border:       COLOR_BLACK,
    plunk:        POP_WHITE[100],
    dotBackground: COLOR_BLACK,
  },
  toggle: {
    on: {
      switchBackground:     COLOR_GREEN,
      switchBorder:         COLOR_GREEN,
      buttonBackground:     COLOR_WHITE,
      buttonBorder:         COLOR_WHITE,
      buttonMarkBackground: COLOR_GREEN,
    },
    off: {
      switchBackground:     POP_WHITE[200],
      switchBorder:         POP_WHITE[100],
      buttonBackground:     POP_BLACK[100],
      buttonBorder:         POP_BLACK[100],
      buttonMarkBackground: POP_WHITE[100],
    },
  },
  inputField: {
    textColor:        COLOR_BLACK,
    labelColor:       POP_BLACK[100],
    caretColor:       COLOR_BLACK,
    errorColor:       SEMANTIC_ERROR[4],
    placeholderColor: POP_BLACK[100],
    borderColor:      POP_WHITE[100],
    activeBorderColor: COLOR_BLACK,
    backgroundColor:  COLOR_WHITE,
  },
  dropdown: {
    border:     POP_WHITE[100],
    text:       COLOR_BLACK,
    chevron:    COLOR_BLACK,
    background: COLOR_WHITE,
  },
  tags: {
    background: POP_WHITE[300],
    color:      COLOR_BLACK,
  },
  bottomSheet: {
    background:   COLOR_WHITE,
    notchColor:   POP_WHITE[100],
    overlayColor: 'rgba(0,0,0,0.4)',
    plunkColor:   POP_WHITE[100],
  },
  floatingButton: {
    color:        COLOR_BLACK,
    borderColor:  COLOR_BLACK,
    edgeColor:    POP_WHITE[100],
    shadowColor:  POP_WHITE[200],
    disabledColor: POP_WHITE[100],
  },
  tiltedButton: {
    color:       COLOR_BLACK,
    plunkColor:  POP_WHITE[100],
    shadowColor: POP_WHITE[200],
    borderColor: COLOR_BLACK,
  },
  scoreMeter: {
    meterStrokeColor: {
      excellent: SEMANTIC_SUCCESS[4],
      average:   '#F5A623',
      poor:      SEMANTIC_ERROR[4],
    },
    meterStrokeBackground: POP_WHITE[100],
    dotColor:              COLOR_BLACK,
    scoreColor:            COLOR_BLACK,
    scoreContainerBackground: COLOR_WHITE,
    scoreContainerBorder:  POP_WHITE[100],
  },
};
