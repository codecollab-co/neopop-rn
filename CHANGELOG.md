# Changelog

All notable changes to `neopop-rn` will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project scaffold
- Full design token system (colors, spacing, typography, opacity, button sizes)
- Theme system: `NeoPopProvider`, `useNeoPopTheme`, dark/light defaults
- Color utilities: `hexToRGBA`, `getHorizontalShadow`, `getVerticalShadow`, `deriveEdgeColor`, `getLuminance`
- Helper utilities: `isEmpty`, `isObject`, `mergeDeep`, `currencyFormatter`, `generateTextStyle`
- Haptics utility: `triggerHaptic` wrapping `expo-haptics`
- Custom hooks: `useAutoFocus`, `useClientHeight`, `useDelayMount`, `useScrollIntoView`
- Skia layer: `NeoPop3DSurface`, `EdgeColorDeriver`, `NeoPopTiltGeometry`, `SkiaLoadingGuard`
- Component stubs: all 20 components with full TypeScript interfaces
- `NeoPopButton` — initial implementation with press animation and adjacency support
- Layout helpers: `Row`, `Column`, `PageContainer`, `HorizontalDivider`, `HorizontalSpacer`, `VerticalSpacer`
- Icon helpers: `Chevron`, `Pointer`, `Cross`
- Storybook example app setup
- CI/CD GitHub Actions workflows
