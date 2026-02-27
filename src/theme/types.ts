import type { ColorValue } from 'react-native';

export type ColorMode = 'dark' | 'light';

// ─── Per-component color config interfaces ────────────────────────────────────

export interface EdgeColors {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export interface NeoPopButtonColorConfig {
  color?: string;
  edgeColors?: EdgeColors;
  borderColor?: string;
  disabledColor?: string;
  disabledEdgeColor?: string;
}

export interface NeoPopCardColorConfig {
  color?: string;
  edgeColors?: EdgeColors;
  borderColor?: string;
}

export interface NeoPopShimmerColorConfig {
  color?: string;
}

export interface NeoPopCheckboxColorConfig {
  background?: string;
  border?: string;
  checkmarkColor?: string;
  leftPlunk?: string;
  topPlunk?: string;
  disabledBackground?: string;
}

export interface NeoPopRadioColorConfig {
  background?: string;
  border?: string;
  plunk?: string;
  dotBackground?: string;
  containerConfig?: {
    borderColor?: string;
    backgroundColor?: string;
    activeBackgroundColor?: string;
    activeBorderColor?: string;
    color?: string;
  };
}

export interface NeoPopToggleOnOffColors {
  switchBackground: string;
  switchBorder: string;
  buttonBackground: string;
  buttonBorder: string;
  buttonMarkBackground: string;
}

export interface NeoPopToggleColorConfig {
  on: NeoPopToggleOnOffColors;
  off: NeoPopToggleOnOffColors;
}

export interface NeoPopInputFieldColorConfig {
  textColor?: string;
  labelColor?: string;
  caretColor?: string;
  errorColor?: string;
  placeholderColor?: string;
  borderColor?: string;
  activeBorderColor?: string;
  backgroundColor?: string;
}

export interface NeoPopDropdownColorConfig {
  border?: string;
  text?: string;
  chevron?: string;
  background?: string;
}

export interface NeoPopTagsColorConfig {
  background?: string;
  color?: string;
}

export interface NeoPopToastColorConfig {
  background: string;
  color: string;
}

export interface NeoPopScoreMeterColorConfig {
  meterStrokeColor: {
    excellent: string;
    average: string;
    poor: string;
  };
  meterStrokeBackground?: string;
  meterBorderColor?: string;
  dotColor?: string;
  indicatorColors?: {
    neutral?: string;
    increment?: string;
    decrement?: string;
  };
  scoreContainerBackground?: string;
  scoreContainerBorder?: string;
  scoreColor?: string;
}

export interface NeoPopBottomSheetColorConfig {
  background?: string;
  notchColor?: string;
  overlayColor?: string;
  plunkColor?: string;
}

export interface NeoPopFloatingButtonColorConfig {
  color?: string;
  borderColor?: string;
  edgeColor?: string;
  shadowColor?: string;
  disabledColor?: string;
}

export interface NeoPopTiltedButtonColorConfig {
  color?: string;
  plunkColor?: string;
  shadowColor?: string;
  borderColor?: string;
}

export interface NeoPopOTPInputColorConfig {
  borderColor?: string;
  activeBorderColor?: string;
  errorBorderColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface NeoPopProgressBarColorConfig {
  trackColor?: string;
  fillColor?: string;
  labelColor?: string;
}

export interface NeoPopAccordionColorConfig {
  headerBackground?: string;
  headerTextColor?: string;
  chevronColor?: string;
  bodyBackground?: string;
  edgeColor?: string;
}

// ─── Full Theme Config ────────────────────────────────────────────────────────

export interface ThemeConfig {
  colorMode: ColorMode;
  colors?: {
    background?: ColorValue;
    surface?: ColorValue;
    text?: ColorValue;
    subtext?: ColorValue;
    border?: ColorValue;
  };
  button?: NeoPopButtonColorConfig;
  card?: NeoPopCardColorConfig;
  shimmer?: NeoPopShimmerColorConfig;
  checkbox?: NeoPopCheckboxColorConfig;
  radio?: NeoPopRadioColorConfig;
  toggle?: NeoPopToggleColorConfig;
  inputField?: NeoPopInputFieldColorConfig;
  dropdown?: NeoPopDropdownColorConfig;
  tags?: NeoPopTagsColorConfig;
  bottomSheet?: NeoPopBottomSheetColorConfig;
  floatingButton?: NeoPopFloatingButtonColorConfig;
  tiltedButton?: NeoPopTiltedButtonColorConfig;
  scoreMeter?: NeoPopScoreMeterColorConfig;
  otpInput?: NeoPopOTPInputColorConfig;
  progressBar?: NeoPopProgressBarColorConfig;
  accordion?: NeoPopAccordionColorConfig;
}

export interface NeoPopContextValue extends ThemeConfig {}
