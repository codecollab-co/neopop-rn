# Changelog

All notable changes to `neopop-rn` will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.3.0] - 2026-03-09

### Added
- Full test coverage: 36 suites, 389 tests, ~79% statement coverage (MS-21)
- WCAG 2.1 AA accessibility audit with `accessibilityRole`, `accessibilityState`, `accessibilityValue` on all 27 components (MS-22)
- `docs/ACCESSIBILITY.md` — formal a11y contract per component, contrast ratios, screen reader testing matrix
- `docs/PERFORMANCE.md` — FPS profiling, Skia render time, JS thread budget, bundle size analysis
- Performance regression tests (`__tests__/perf/performance.test.ts`) for `mergeDeep`, `hexToRGBA`, `generateTextStyle`, `deriveEdgeColor`, `getLuminance`
- Codecov badge in README.md
- `docs/components/NeoPopScoreMeter.md` — missing component doc
- `docs/phases/PHASE-9.md` — Phase 9 deliverables and checklists
- Accessibility props: `accessibilityLabel` on Chevron/Cross/Pointer icons, `accessibilityRole="progressbar"` + `accessibilityValue` on NeoPopScoreMeter, per-slide labels on NeoPopCarousel dots, column labels on NeoPopDatePicker, action panel labels on NeoPopSwipeRow, shimmer overlay hidden from screen readers

### Changed
- `@internal` exports (utils, hooks, Skia internals) marked as deprecated for v3.0 removal (previously said v1.0)
- `docs/CONTRIBUTING.md` — corrected coverage thresholds, peer dep versions, test file paths
- `docs/THEMING.md` — added theme integration levels section (theme-aware vs colorConfig-only)
- `docs/MIGRATION.md` — "removed APIs" → "deprecated APIs" (still exported in v2.x)
- `docs/ARCHITECTURE.md` — added storybook.yml workflow, corrected story/test counts
- `docs/DISCUSSION.md`, `docs/PLAN.md` — corrected story count (30 web), test counts (36 suites, 389 tests)
- `docs/MILESTONES.md` — MS-20 through MS-24 marked complete

## [2.2.0] - 2026-03-07

### Added
- Published to npm as `@codecollab.co/neopop-rn@2.1.0`
- NeoPop web Storybook playground with 29 stories (Foundation + all 27 components)
- Docusaurus documentation site with full CRED-inspired dark theme
- Design token export (CSS, Figma, Android XML, iOS Swift)
- New Architecture (React Native 0.76+ Fabric/JSI) compatibility audit
- Performance benchmarks for all 27 components (<1ms render budget, <50KB bundle)

### Changed
- Accent color updated to Electric Blue (`#0066FF`)
- Typography updated to Outfit (geometric, CRED-style)
- Peer dependencies raised to React Native ≥0.76, Skia ≥1.3, Reanimated ≥3.6

## [2.0.0-alpha.1] - 2026-03-06

### Changed (MS-19 — New Architecture)
- Peer dependency floors raised for v2.0 New Architecture support:
  react >= 18.3, react-native >= 0.76, @shopify/react-native-skia >= 1.3,
  react-native-reanimated >= 3.6, react-native-gesture-handler >= 2.14,
  expo-haptics >= 14
- `docs/ARCHITECTURE.md` rewritten with full New Architecture compatibility
  matrix for all 27 components
- `docs/MIGRATION.md` — v1.x → v2.0 upgrade guide appended
- Confirmed zero usage of deprecated bridge APIs (findNodeHandle, UIManager,
  setNativeProps, requireNativeComponent, unstable_*) across all 27 components

## [1.0.0] - 2026-03-05

### Added (MS-16 — Docusaurus docs site)
- `website/` — Docusaurus 3.x documentation site with NeoPop dark theme
- Homepage hero with feature grid, component count, and platform support
- Full sidebar with all 27 components, layout helpers, and icon docs
- All `docs/components/*.md` migrated to MDX at `website/docs/components/`
- `docs/THEMING.md`, `TOKENS.md`, `CONTRIBUTING.md`, `MIGRATION.md` migrated to MDX
- `website/docs/getting-started.mdx` — installation, setup, peer deps, quick example
- `.github/workflows/docs.yml` — deploys to GitHub Pages on every `v*` tag push
- `package.json` `homepage` field points to `https://codecollab-co.github.io/neopop-rn/`

### Added (MS-17 — Design token export)
- `token-build/` — Style Dictionary v4 config exporting `src/primitives/` tokens to 4 formats
- `tokens/css/variables.css` — all tokens as CSS custom properties (`--neopop-*`)
- `tokens/figma/tokens.json` — Figma Tokens plugin-compatible JSON
- `tokens/android/colors.xml` + `dimens.xml` — Android resource files
- `tokens/ios/NeoPopTokens.swift` — iOS Swift class with `UIColor` + `CGFloat` constants
- `npm run tokens` script to regenerate all token output files

### Changed (MS-18 — v1.0 GA)
- **Stable API guarantee**: all public exports in `src/index.ts` are now semver-stable
- README: v1.0 stability banner, docs site link, token export table
- `package.json` `homepage` field added

## [0.6.0] - 2026-03-04

### Fixed (CI)
- Release workflow now auto-creates the GitHub release before uploading the package tarball, resolving the "release not found" failure that occurred during v0.5.0

## [0.5.0] - 2026-03-04

### Added (MS-15 — Documentation)
- Per-component markdown docs for all 27 components + layout helpers + icons in `docs/components/`
- `docs/THEMING.md` — comprehensive theming guide with mergeDeep system, dark/light comparison, colorConfig deep-dive
- `docs/TOKENS.md` — full design token reference (colors, spacing, typography, opacity, button tokens)
- `docs/CONTRIBUTING.md` — contributor guide with setup, commit conventions, PR checklist, how to add a component
- `docs/MIGRATION.md` — v0.x → v1.0 migration guide including deprecated props and internal API removals
- README refreshed: 27-component table with doc links, platform support, quick-start, docs index

### Changed (MS-14 — API Stability Freeze)
- Removed `NeoPopFloatingButton.delayTouchEvents` prop (OQ-04: was never implemented, always a no-op)
- Added `@internal` JSDoc to all non-public helpers: `isEmpty`, `isObject`, `mergeDeep`, `getRandomInt`, `isImageLoaded`, `currencyFormatter`, `generateTextStyle`, `useAutoFocus`, `useClientHeight`, `useDelayMount`, `useScrollIntoView`, `deriveEdgeColors`, `computeTiltGeometry`, `SkiaLoadingGuard`
- `src/index.ts` now separates public API from `@internal` sections with removal-in-v1.0 notices
- Confirmed OQ-03 resolved: all icon components (`Chevron`, `Cross`, `Pointer`) consistently expose `style` prop
- All type-only re-exports verified to use `export type` — confirmed clean

## [0.4.0] - 2026-03-04

### Added
- `NeoPopStepper` — increment/decrement control with spring bounce label animation, controlled/uncontrolled modes, haptics, `accessibilityRole="adjustable"` + `accessibilityValue`
- `NeoPopSwipeRow` — pan-gesture swipe row with configurable left/right action panels, velocity-aware snap, spring return on partial drag
- `NeoPopCarousel` — horizontal item carousel with imperative ref API (`scrollToIndex`, `goNext`, `goPrev`), pan gesture with velocity bias, dot indicators
- `NeoPopDatePicker` — three-column FlatList scroll wheels (Day/Month/Year) with `snapToInterval`, automatic day clamping on month/year change, `getItemLayout` optimization

### Fixed (Accessibility — WCAG 2.1 AA)
- `NeoPopSlider`: thumb now exposes `accessibilityValue={{ min, max, now }}` so screen readers announce the current position as a numeric value
- `NeoPopBottomSheet`: sheet panel now sets `accessibilityViewIsModal={true}` when open, trapping VoiceOver/TalkBack focus correctly
- `NeoPopCheckbox`: moved `accessibilityRole="checkbox"` and `accessibilityState` to the `Pressable` root (previously on inner `View`), making screen-reader activation reliable

### Changed (DX)
- Jest preset switched from `jest-expo` to `react-native` (removes Expo SDK dependency, works in any bare RN project)
- Added 12 test suites / 155 tests covering: all utils, all hooks, theme system, and 4 key interactive components
- Per-directory coverage thresholds enforced: utils ≥85% statements / ≥90% lines, hooks ≥90% statements/lines, NeoPopProvider ≥95% statements/lines
- `moduleNameMapper` now also maps `@codecollab.co/neopop-rn` → `src/index` for scoped-package imports in tests

## [0.3.0] - 2026-02-27

### Added
- `NeoPopOTPInput` — multi-box OTP/PIN entry with auto-advance focus, mask mode, error state, and `onComplete` callback
- `NeoPopProgressBar` — horizontal bar and circular Skia arc variants with `withTiming` progress animation
- `NeoPopAccordion` — spring expand/collapse with animated chevron rotation, controlled and uncontrolled modes

### Changed
- `NeoPopToast` — replaced stub with full implementation: spring slide-in from bottom, swipe-down-to-dismiss gesture, semantic type colors, icon slot, accessibility `liveRegion`
- `Chevron` icon — migrated from View-based to Skia Path rendering (crisp at any pixel density)
- `Cross` icon — migrated from View-based to Skia Path rendering
- `Pointer` icon — migrated from View-based to Skia Path rendering

### Added (DX)
- Storybook stories for all 23 components in `example/src/stories/`
- `NeoPopOTPInputColorConfig`, `NeoPopProgressBarColorConfig`, `NeoPopAccordionColorConfig` added to `ThemeConfig`

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
