# Changelog

All notable changes to `neopop-rn` will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
