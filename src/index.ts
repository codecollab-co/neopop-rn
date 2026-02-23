// ─── Primitives ───────────────────────────────────────────────────────────────
export {
  COLOR_BLACK, COLOR_WHITE, COLOR_RED, COLOR_YELLOW, COLOR_BLUE, COLOR_GREEN, TRANSPARENT,
  POP_BLACK, POP_WHITE,
  POLI_PURPLE, ORANGE_SUNSHINE, PARK_GREEN, PINK_PONG, MANNNA, NEO_PACCHA, YOYO,
  SEMANTIC_ERROR, SEMANTIC_WARNING, SEMANTIC_INFO, SEMANTIC_SUCCESS,
} from './primitives/colors';

export {
  SPACING, SPACING_XS, SPACING_SM, SPACING_MD, SPACING_LG, SPACING_XL, SPACING_2XL,
  BUTTON_DEPTH, BUTTON_DEPTH_TILTED, CARD_DEPTH,
  BOTTOM_SHEET_NOTCH_HEIGHT, BOTTOM_SHEET_NOTCH_WIDTH, BOTTOM_SHEET_BORDER_RADIUS,
} from './primitives/spacing';

export {
  FontType, FontWeight, TextOverflow,
  LINE_HEIGHT_MULTIPLIER, LETTER_SPACING_MAP, TEXT_TRANSFORM_MAP, DEFAULT_FONT_FAMILY,
} from './primitives/typography';

export {
  OPACITY, DISABLED_OPACITY, OVERLAY_OPACITY, SHIMMER_OPACITY, PRESSED_OPACITY, HINT_OPACITY,
} from './primitives/opacity';

export {
  BUTTON_SIZE, BUTTON_PRESS_DURATION_MS, BUTTON_RELEASE_DAMPING, BUTTON_RELEASE_STIFFNESS,
  SHIMMER_WIDTH, SHIMMER_GAP_WIDTH, SHIMMER_DURATION_MS, SHIMMER_DELAY_MS,
  TILTED_BUTTON_DEPTH, TILTED_BUTTON_SHADOW_DIST, TILTED_BUTTON_Y_POS_FACTOR,
  TILTED_BUTTON_FLOATING_MS, TILTED_BUTTON_FLOAT_DELAY_MS, TILTED_BUTTON_TAP_MS,
} from './primitives/buttons';

export type { ButtonSizeToken } from './primitives/buttons';

// ─── Theme ────────────────────────────────────────────────────────────────────
export { NeoPopProvider, useNeoPopTheme } from './theme/NeoPopProvider';
export { defaultDarkTheme } from './theme/defaultDarkTheme';
export { defaultLightTheme } from './theme/defaultLightTheme';
export type {
  ColorMode, ThemeConfig, NeoPopContextValue, EdgeColors,
  NeoPopButtonColorConfig, NeoPopCardColorConfig, NeoPopShimmerColorConfig,
  NeoPopCheckboxColorConfig, NeoPopRadioColorConfig, NeoPopToggleColorConfig,
  NeoPopToggleOnOffColors, NeoPopInputFieldColorConfig, NeoPopDropdownColorConfig,
  NeoPopTagsColorConfig, NeoPopToastColorConfig, NeoPopScoreMeterColorConfig,
  NeoPopBottomSheetColorConfig, NeoPopFloatingButtonColorConfig, NeoPopTiltedButtonColorConfig,
} from './theme/types';

// ─── Utils ────────────────────────────────────────────────────────────────────
export {
  hexToRGBA, getLuminance, isColorDark, getContrastColor, adjustLightness,
  getHorizontalShadow, getVerticalShadow, deriveEdgeColor, deriveHighlightEdgeColor,
} from './utils/colorUtils';

export {
  isEmpty, isObject, mergeDeep, getRandomInt,
  isImageLoaded, currencyFormatter, generateTextStyle,
} from './utils/helpers';

export { triggerHaptic } from './utils/haptics';
export type { HapticType } from './utils/haptics';

// ─── Hooks ────────────────────────────────────────────────────────────────────
export { useAutoFocus }      from './hooks/useAutoFocus';
export { useClientHeight }   from './hooks/useClientHeight';
export { useDelayMount }     from './hooks/useDelayMount';
export { useScrollIntoView } from './hooks/useScrollIntoView';

// ─── Skia Layer ───────────────────────────────────────────────────────────────
export { NeoPop3DSurface }     from './skia/NeoPop3DSurface';
export { deriveEdgeColors }    from './skia/EdgeColorDeriver';
export { computeTiltGeometry } from './skia/NeoPopTiltGeometry';
export { SkiaLoadingGuard }    from './skia/SkiaLoadingGuard';
export type { NeoPop3DSurfaceProps }              from './skia/NeoPop3DSurface';
export type { DerivedEdgeColors, EdgeColorInput } from './skia/EdgeColorDeriver';
export type { TiltConfig, TiltGeometryResult }   from './skia/NeoPopTiltGeometry';

// ─── Components ───────────────────────────────────────────────────────────────
export { NeoPopButton } from './components/NeoPopButton';
export type { NeoPopButtonProps, ButtonVariant, ButtonSize, ButtonPosition, NeoPopButtonShimmerConfig } from './components/NeoPopButton';

export { NeoPopTiltedButton } from './components/NeoPopTiltedButton';
export type { NeoPopTiltedButtonProps } from './components/NeoPopTiltedButton';

export { NeoPopFloatingButton } from './components/NeoPopFloatingButton';
export type { NeoPopFloatingButtonProps, NeoPopFloatingButtonRef } from './components/NeoPopFloatingButton';

export { NeoPopCard } from './components/NeoPopCard';
export type { NeoPopCardProps } from './components/NeoPopCard';

export { NeoPopShimmer } from './components/NeoPopShimmer';
export type { NeoPopShimmerProps, NeoPopShimmerConfig } from './components/NeoPopShimmer';

export { NeoPopCheckbox } from './components/NeoPopCheckbox';
export type { NeoPopCheckboxProps } from './components/NeoPopCheckbox';

export { NeoPopRadio } from './components/NeoPopRadio';
export type { NeoPopRadioProps } from './components/NeoPopRadio';

export { NeoPopToggle } from './components/NeoPopToggle';
export type { NeoPopToggleProps } from './components/NeoPopToggle';

export { NeoPopInputField } from './components/NeoPopInputField';
export type { NeoPopInputFieldProps } from './components/NeoPopInputField';

export { NeoPopDropdown } from './components/NeoPopDropdown';
export type { NeoPopDropdownProps } from './components/NeoPopDropdown';

export { NeoPopSlider } from './components/NeoPopSlider';
export type { NeoPopSliderProps, NeoPopThumbConfig, NeoPopTrackConfig } from './components/NeoPopSlider';

export { NeoPopBottomSheet } from './components/NeoPopBottomSheet';
export type { NeoPopBottomSheetProps, NeoPopBottomSheetRef } from './components/NeoPopBottomSheet';

export { NeoPopHeader } from './components/NeoPopHeader';
export type { NeoPopHeaderProps } from './components/NeoPopHeader';

export { NeoPopBack } from './components/NeoPopBack';
export type { NeoPopBackProps } from './components/NeoPopBack';

export { NeoPopTags } from './components/NeoPopTags';
export type { NeoPopTagsProps, TagType } from './components/NeoPopTags';

export { NeoPopToast, ToastProvider, useToast } from './components/NeoPopToast';
export type { NeoPopToastProps, ToastConfig, ToastType, UseToastReturn, ToastProviderProps } from './components/NeoPopToast';

export { NeoPopScoreMeter } from './components/NeoPopScoreMeter';
export type { NeoPopScoreMeterProps } from './components/NeoPopScoreMeter';

export { NeoPopTypography } from './components/NeoPopTypography';
export type { NeoPopTypographyProps } from './components/NeoPopTypography';
// FontType, FontWeight, TextOverflow are already exported from './primitives/typography' above

export { Row, Column, PageContainer, HorizontalDivider, HorizontalSpacer, VerticalSpacer } from './components/layout';
export type { RowProps, ColumnProps, PageContainerProps, HorizontalDividerProps, HorizontalSpacerProps, VerticalSpacerProps } from './components/layout';

export { Chevron, Pointer, Cross } from './components/icons';
export type { ChevronProps, ChevronDirection, PointerProps, CrossProps } from './components/icons';
