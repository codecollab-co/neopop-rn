/**
 * Theme barrel — exports the theme provider, hook, built-in themes, and all theme types.
 *
 * Usage:
 *   import { NeoPopProvider, useNeoPopTheme, defaultDarkTheme } from 'neopop-rn/theme';
 */
export { NeoPopProvider, useNeoPopTheme } from './NeoPopProvider';
export { defaultDarkTheme } from './defaultDarkTheme';
export { defaultLightTheme } from './defaultLightTheme';
export type {
  ColorMode,
  ThemeConfig,
  NeoPopContextValue,
  EdgeColors,
  NeoPopButtonColorConfig,
  NeoPopCardColorConfig,
  NeoPopShimmerColorConfig,
  NeoPopCheckboxColorConfig,
  NeoPopRadioColorConfig,
  NeoPopToggleColorConfig,
  NeoPopToggleOnOffColors,
  NeoPopInputFieldColorConfig,
  NeoPopDropdownColorConfig,
  NeoPopTagsColorConfig,
  NeoPopToastColorConfig,
  NeoPopScoreMeterColorConfig,
  NeoPopBottomSheetColorConfig,
  NeoPopFloatingButtonColorConfig,
  NeoPopTiltedButtonColorConfig,
} from './types';
