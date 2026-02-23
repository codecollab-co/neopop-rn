# Changelog

All notable changes to `neopop-rn` will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-02-24

### Added
- `NeoPopBack` — pressable back-navigation row with westward Chevron + optional heading
- `NeoPopHeader` — page header with back button, heading, description, and right-element slot
- `NeoPopTags` — pill/badge with semantic type presets (warning/error/success/info/custom)
- `NeoPopCheckbox` — 3D plunk box with spring-animated checkmark, optional label
- `NeoPopRadio` — circular ring with spring-animated inner dot, optional label
- `NeoPopToggle` — pill track with `interpolateColor` background + spring thumb translation
- `NeoPopInputField` — animated border focus, label, error message, character count
- `NeoPopDropdown` — pressable trigger with `withTiming` chevron rotation
- `NeoPopBottomSheet` — imperative ref API (`.open()` / `.close()`), PanGesture drag-to-dismiss, overlay backdrop
- `NeoPopSlider` — PanGesture-driven thumb with step-snapping and haptic feedback
- `NeoPopFloatingButton` — levitation loop, shape variants (rectangle/pill/circle), shimmer, imperative ref API
- `NeoPopTiltedButton` — Skia Canvas parallelogram face + plunk shadow, floating bob, tap press animation
- `NeoPopScoreMeter` — Skia Canvas semi-circular arc gauge, animated sweep from oldReading → reading, dot indicator, legends

## [0.1.0] - 2026-02-24

### Added
- Initial project scaffold
- Full design token system (colors, spacing, typography, opacity, button sizes)
- Theme system: `NeoPopProvider`, `useNeoPopTheme`, dark/light defaults
- Color utilities: `hexToRGBA`, `getHorizontalShadow`, `getVerticalShadow`, `deriveEdgeColor`, `getLuminance`
- Helper utilities: `isEmpty`, `isObject`, `mergeDeep`, `currencyFormatter`, `generateTextStyle`
- Haptics utility: `triggerHaptic` wrapping `expo-haptics`
- Custom hooks: `useAutoFocus`, `useClientHeight`, `useDelayMount`, `useScrollIntoView`
- Skia layer: `NeoPop3DSurface` with real Skia Canvas parallelogram rendering, `EdgeColorDeriver`, `NeoPopTiltGeometry`, `SkiaLoadingGuard`
- `NeoPopButton` — press animation, shimmer overlay, colorMode, adjacency edge support
- `NeoPopCard` — pressable 3D card via `NeoPop3DSurface`
- `NeoPopShimmer` — diagonal sweep animation
- `NeoPopTypography` — full font system with FontType/FontWeight tokens
- `NeoPopToast` + `ToastProvider` + `useToast` hook
- Layout helpers: `Row`, `Column`, `PageContainer`, `HorizontalDivider`, `HorizontalSpacer`, `VerticalSpacer`
- Icon helpers: `Chevron`, `Pointer`, `Cross`
- Full TypeScript interfaces for all 20 components
- JSDoc comments across all public APIs
- Storybook example app setup
- CI/CD GitHub Actions workflows
