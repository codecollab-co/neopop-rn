# Milestones — neopop-rn

> Status key: ✅ Done · 🔲 Pending · 🚧 In progress · ❌ Blocked

---

## MS-01 · Project scaffold & CI ✅

**Target version:** v0.1.0
**Completed:** 2026-02-24

- [x] `react-native-builder-bob` build pipeline (CJS + ESM + TS declarations)
- [x] TypeScript strict config (`tsconfig.json`)
- [x] ESLint + Prettier config
- [x] Babel config (Reanimated plugin)
- [x] Jest + jest-expo config
- [x] GitHub Actions CI workflow (`ci.yml`)
- [x] GitHub Actions release workflow (`release.yml`)
- [x] `package.json` entry points (`main`, `module`, `types`, `react-native`, `source`)
- [x] `CHANGELOG.md` + `README.md` initial content
- [x] Storybook example app (`example/`)
- [x] Apache-2.0 license

---

## MS-02 · Design token system ✅

**Target version:** v0.1.0
**Completed:** 2026-02-24

- [x] `src/primitives/colors.ts` — base colors, POP_BLACK/WHITE scales, 7 brand palettes, 4 semantic arrays
- [x] `src/primitives/spacing.ts` — SPACING object + named aliases (XS/SM/MD/LG/XL/2XL)
- [x] `src/primitives/typography.ts` — FontType enum, FontWeight enum, LINE_HEIGHT_MULTIPLIER, LETTER_SPACING_MAP, TEXT_TRANSFORM_MAP, DEFAULT_FONT_FAMILY
- [x] `src/primitives/opacity.ts` — OPACITY scale + named aliases
- [x] `src/primitives/buttons.ts` — BUTTON_SIZE tokens, shimmer defaults, press animation constants, tilted button geometry constants
- [x] `src/primitives/index.ts` barrel with JSDoc

---

## MS-03 · Theme system ✅

**Target version:** v0.1.0
**Completed:** 2026-02-24

- [x] `src/theme/types.ts` — `ThemeConfig`, `ColorMode`, 14 per-component color config interfaces, `NeoPopContextValue`
- [x] `src/theme/NeoPopProvider.tsx` — React context, `mergeDeep` integration, `useNeoPopTheme` hook
- [x] `src/theme/defaultDarkTheme.ts` — full dark palette with section comments
- [x] `src/theme/defaultLightTheme.ts` — full light palette with section comments
- [x] `src/theme/index.ts` barrel

---

## MS-04 · Utilities & hooks ✅

**Target version:** v0.1.0
**Completed:** 2026-02-24

- [x] `colorUtils.ts` — hexToRGBA, getLuminance, isColorDark, getContrastColor, adjustLightness, getHorizontalShadow, getVerticalShadow, deriveEdgeColor, deriveHighlightEdgeColor
- [x] `helpers.ts` — isEmpty, isObject, mergeDeep, getRandomInt, currencyFormatter, generateTextStyle
- [x] `haptics.ts` — triggerHaptic with lazy expo-haptics require
- [x] `useAutoFocus` — focuses TextInput after configurable delay
- [x] `useClientHeight` — measures component height via onLayout
- [x] `useDelayMount` — defers render by timeout
- [x] `useScrollIntoView` — programmatic scroll via measureLayout

---

## MS-05 · Skia rendering layer ✅

**Target version:** v0.1.0
**Completed:** 2026-02-24

- [x] `NeoPop3DSurface` — 5-face Skia Canvas renderer (face Rect + 4 parallelogram edges)
- [x] `EdgeColorDeriver` — auto-derives darker edge tones from face color with per-edge overrides
- [x] `NeoPopTiltGeometry` — pure geometry: facePoints[4], plunkPoints[4], canvasWidth/Height
- [x] `SkiaLoadingGuard` — WASM init wait on web, immediate render on native
- [x] `src/skia/index.ts` barrel

---

## MS-06 · Core components (Phase 1) ✅

**Target version:** v0.1.0
**Completed:** 2026-02-24

- [x] `NeoPopButton` — elevated/flat/stroke variants, press animation, shimmer, adjacency support, 9-point position
- [x] `NeoPopCard` — pressable 3D card via NeoPop3DSurface
- [x] `NeoPopShimmer` — diagonal sweep animation (standalone wrapper)
- [x] `NeoPopTypography` — FontType/FontWeight token system, allowFontScaling=false
- [x] `NeoPopToast` (partial) — ToastProvider + useToast hook implemented; **NeoPopToast.tsx visual component is a stub**
- [x] Layout helpers: Row, Column, PageContainer, HorizontalDivider, HorizontalSpacer, VerticalSpacer
- [x] Icon helpers: Chevron (View-based), Cross (View-based), Pointer (View-based)
- [x] JSDoc on all public APIs
- [x] v0.1.0 GitHub release

---

## MS-07 · All stub components (Phase 2) ✅

**Target version:** v0.2.0
**Completed:** 2026-02-24

- [x] `NeoPopBack` — westward Chevron + optional heading + right-element slot
- [x] `NeoPopHeader` — heading, description, back chevron, right-element
- [x] `NeoPopTags` — semantic presets (warning/error/success/info/custom) + icon slot + noContainer
- [x] `NeoPopCheckbox` — View-based 3D plunk box, spring-animated checkmark, label, haptics
- [x] `NeoPopRadio` — circular ring, spring-animated inner dot, label, haptics
- [x] `NeoPopToggle` — interpolateColor track, spring thumb translation, trackDrawable/thumbDrawable
- [x] `NeoPopInputField` — animated border, label, error, character count, useAutoFocus, multiline
- [x] `NeoPopDropdown` — withTiming chevron rotation, label + value display, disabled state
- [x] `NeoPopBottomSheet` — forwardRef, useImperativeHandle (.open/.close), PanGesture drag-to-dismiss, overlay, notch
- [x] `NeoPopSlider` — PanGesture thumb, step-snapping + withSpring, haptics per step
- [x] `NeoPopFloatingButton` — levitation withRepeat loop, shape variants, shimmer, imperative ref API (enable/disable/startShimmer/stopShimmer)
- [x] `NeoPopTiltedButton` — Skia Canvas parallelogram, computeTiltGeometry, floating bob, tap press
- [x] `NeoPopScoreMeter` — Skia semi-circle arc, useSharedValueEffect bridge, animated sweep, dot, legends
- [x] v0.2.0 GitHub release

---

## MS-08 · Fix live stubs & Skia icon migration 🔲

**Target version:** v0.3.0
**Phase:** 3

- [ ] `NeoPopToast.tsx` — implement the visual toast component (animated slide-in, swipe-to-dismiss, colorConfig)
- [ ] `Chevron.tsx` — replace View-based chevron with Skia Path rendering
- [ ] `Cross.tsx` — replace View-based cross with Skia Path rendering
- [ ] `Pointer.tsx` — replace View-based pointer with Skia Path rendering
- [ ] Validate `useSharedValueEffect` Skia bridge across Skia ≥1.0 versions

---

## MS-09 · Storybook stories for all 20 components 🔲

**Target version:** v0.3.0
**Phase:** 3

- [ ] `NeoPopButton.stories.tsx` — expand existing (add: Flat, Stroke, Shimmer, Adjacent, All sizes, Disabled, Dark/Light)
- [ ] `NeoPopCard.stories.tsx`
- [ ] `NeoPopShimmer.stories.tsx`
- [ ] `NeoPopTypography.stories.tsx`
- [ ] `NeoPopToast.stories.tsx`
- [ ] `NeoPopBack.stories.tsx`
- [ ] `NeoPopHeader.stories.tsx`
- [ ] `NeoPopTags.stories.tsx`
- [ ] `NeoPopCheckbox.stories.tsx`
- [ ] `NeoPopRadio.stories.tsx`
- [ ] `NeoPopToggle.stories.tsx`
- [ ] `NeoPopInputField.stories.tsx`
- [ ] `NeoPopDropdown.stories.tsx`
- [ ] `NeoPopBottomSheet.stories.tsx`
- [ ] `NeoPopSlider.stories.tsx`
- [ ] `NeoPopFloatingButton.stories.tsx`
- [ ] `NeoPopTiltedButton.stories.tsx`
- [ ] `NeoPopScoreMeter.stories.tsx`
- [ ] Layout helpers stories (`Row`, `Column`, `PageContainer`)
- [ ] Icons stories (`Chevron`, `Cross`, `Pointer`)
- [ ] Storybook toolbar: dark/light colorMode toggle in all stories
- [ ] README update: `yarn example ios/android/web` instructions verified

---

## MS-10 · New components batch 1 🔲

**Target version:** v0.3.0
**Phase:** 3

- [ ] `NeoPopOTPInput` — multi-box OTP/PIN entry, auto-advance, mask mode, animated border highlight
- [ ] `NeoPopProgressBar` — horizontal + circular animated progress with NeoPop 3D depth
- [ ] `NeoPopAccordion` — collapsible section, spring expand/collapse, optional NeoPop edge styling

---

## MS-11 · New components batch 2 🔲

**Target version:** v0.4.0
**Phase:** 4

- [ ] `NeoPopDatePicker` — swipeable wheel date picker with NeoPop styling
- [ ] `NeoPopCarousel` — horizontal gesture-driven item carousel
- [ ] `NeoPopStepper` — +/− quantity stepper with animated value transitions
- [ ] `NeoPopSwipeRow` — swipe-to-reveal action row

---

## MS-12 · Full test suite (>90% coverage) 🔲

**Target version:** v0.4.0
**Phase:** 4

- [ ] Unit tests for all utility functions (`colorUtils`, `helpers`, `haptics`)
- [ ] Unit tests for all hooks (`useAutoFocus`, `useClientHeight`, `useDelayMount`, `useScrollIntoView`)
- [ ] Unit tests for theme system (`NeoPopProvider`, `mergeDeep`, `defaultDark/LightTheme`)
- [ ] Component render tests for all 20+ components (snapshot + prop validation)
- [ ] Interaction tests (press, gesture, toggle) via RNTL `fireEvent`
- [ ] Animation tests (shared value transitions mocked)
- [ ] CI coverage gate: fail build if coverage < 90%
- [ ] Codecov badge in README showing live coverage %
- [ ] Coverage report uploaded on every CI run

---

## MS-13 · Accessibility (a11y) audit 🔲

**Target version:** v0.4.0
**Phase:** 4 (formal dedicated phase)

- [ ] Audit all 20+ components for `accessibilityRole` correctness
- [ ] Audit all interactive components for `accessibilityState` (disabled, checked, selected, expanded)
- [ ] Audit all interactive components for `accessibilityLabel` / `accessibilityHint`
- [ ] Contrast ratio check: all default theme color pairs meet WCAG 2.1 AA (4.5:1 text, 3:1 UI)
- [ ] Screen reader testing: iOS VoiceOver + Android TalkBack smoke test for every component
- [ ] Focus management: NeoPopBottomSheet traps focus when open
- [ ] `accessibilityLiveRegion` on NeoPopToast
- [ ] Document a11y props in each component's JSDoc and in `docs/`
- [ ] A11y test helpers added to `__tests__/` where feasible

---

## MS-14 · API stability freeze 🔲

**Target version:** v0.5.0 (pre-v1.0)
**Phase:** 5

- [ ] Full prop-interface audit: no ambiguous prop names, no redundant props
- [ ] Deprecation notices for any props being renamed/removed before v1.0
- [ ] `MIGRATION.md` created for any breaking changes since v0.1.0
- [ ] `src/index.ts` audit: everything exported is intentional, nothing leaks internals
- [ ] `@internal` JSDoc tag on all internal helpers to prevent accidental use
- [ ] TypeScript `export type` audit: type-only re-exports use `export type`

---

## MS-15 · Markdown docs coverage 🔲

**Target version:** v0.5.0
**Phase:** 5

- [ ] Per-component markdown pages in `docs/components/`
  - [ ] Prop table (all props, types, defaults, description)
  - [ ] Usage code examples (dark + light mode)
  - [ ] Theming / colorConfig section
  - [ ] Known limitations / gotchas
- [ ] `docs/THEMING.md` — comprehensive theming guide
- [ ] `docs/TOKENS.md` — full design token reference with color swatches
- [ ] `docs/CONTRIBUTING.md` — full contributor guide
- [ ] `docs/MIGRATION.md` — v0.x → v1.0 migration guide
- [ ] Update `README.md` to link to all docs

---

## MS-16 · Docusaurus docs site 🔲

**Target version:** v1.0.0
**Phase:** 6

- [ ] Docusaurus 3.x site scaffold in `website/` or separate repo
- [ ] All markdown from MS-15 migrated to MDX
- [ ] Interactive prop tables (via Storybook addon or custom MDX component)
- [ ] Versioned docs (v0.x archive, v1.0 current)
- [ ] Searchable (Algolia DocSearch or built-in)
- [ ] Dark mode matching NeoPop aesthetic
- [ ] Deployed to GitHub Pages or Vercel on release tag
- [ ] Link in `README.md` and `package.json` homepage field

---

## MS-17 · Design token export (Figma / Style Dictionary) 🔲

**Target version:** v1.0.0
**Phase:** 6

- [ ] Style Dictionary config to export `src/primitives/` as:
  - [ ] Figma Tokens JSON
  - [ ] CSS custom properties
  - [ ] Android `colors.xml` / `dimens.xml`
  - [ ] iOS Swift color constants
- [ ] Figma component library published (manual or via Tokens plugin)
- [ ] `docs/TOKENS.md` updated to reference exported formats
- [ ] Token export included in release CI pipeline

---

## MS-18 · v1.0 GA release 🔲

**Target version:** v1.0.0
**Phase:** 6

- [ ] All MS-08 through MS-17 complete
- [ ] Zero open P0/P1 GitHub issues
- [ ] `package.json` `"version": "1.0.0"`
- [ ] Stable API guarantee documented in `README.md`
- [ ] Full GitHub release notes with migration guide link
- [ ] npm publish with `latest` tag
- [ ] Announcement post / social media

---

## MS-19 · React Native New Architecture (v2.0) 🔲

**Target version:** v2.0.0
**Phase:** 7

- [ ] Fabric renderer compatibility audit for all components
- [ ] Turbo Module compatibility for gesture handler + Reanimated + Skia
- [ ] Remove any deprecated `findNodeHandle` / bridge calls
- [ ] Test on RN 0.76+ with `newArchEnabled: true`
- [ ] `interopLayerEnabled` flag removal — pure New Architecture
- [ ] Concurrent Mode compatibility (no legacy `unstable_` APIs)
- [ ] Update peer dependency floors: `react-native >= 0.76`, `react >= 18.3`
- [ ] v2.0 migration guide: document all breaking changes

---

## MS-20 · Performance benchmarking 🔲

**Target version:** v2.0.0
**Phase:** 7

- [ ] FPS profiling for each animated component (Reanimated Profiler)
- [ ] Skia render time per frame for NeoPop3DSurface, TiltedButton, ScoreMeter
- [ ] JS thread budget measurement (< 1ms per frame target)
- [ ] Bundle size analysis (`react-native-bundle-visualizer`)
- [ ] Tree-shaking validation: unused components do not inflate bundle
- [ ] Performance regression tests added to CI
