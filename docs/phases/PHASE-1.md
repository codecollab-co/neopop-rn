# Phase 1 — Design Tokens, Theme System & Core Components ✅

> **Version:** v0.1.0
> **Status:** ✅ Complete (2026-02-24)
> **Theme:** Foundational primitives + first 7 user-facing components

---

## Goal

Implement the complete design token system, theme context, utilities, hooks, Skia rendering layer, and the first batch of high-priority components. Publish v0.1.0 to npm.

---

## Deliverables

### MS-02 · Design token system ✅

- [x] `src/primitives/colors.ts`
  - [x] `POP_BLACK` scale (10 shades)
  - [x] `POP_WHITE` scale (10 shades)
  - [x] 7 brand color palettes (teal, green, yellow, red, purple, blue, orange)
  - [x] 4 semantic arrays: `SEMANTIC_WARNING`, `SEMANTIC_ERROR`, `SEMANTIC_SUCCESS`, `SEMANTIC_INFO`
  - [x] Named constants: `COLOR_BLACK`, `COLOR_WHITE`, `COLOR_TRANSPARENT`
- [x] `src/primitives/spacing.ts`
  - [x] `SPACING` object (4, 8, 12, 16, 20, 24, 32, 40, 48, 64)
  - [x] Named aliases: `SPACING_XS`, `SPACING_SM`, `SPACING_MD`, `SPACING_LG`, `SPACING_XL`, `SPACING_2XL`
- [x] `src/primitives/typography.ts`
  - [x] `FontType` enum (heading, subHeading, body, label, caption, overline)
  - [x] `FontWeight` enum (thin, light, regular, medium, semiBold, bold, extraBold, black)
  - [x] `LINE_HEIGHT_MULTIPLIER` — per-FontType multipliers
  - [x] `LETTER_SPACING_MAP` — per-FontType letter spacing values
  - [x] `TEXT_TRANSFORM_MAP` — per-FontType text transform
  - [x] `DEFAULT_FONT_FAMILY` — system font family constant
- [x] `src/primitives/opacity.ts`
  - [x] `OPACITY` scale (0.04, 0.08, 0.12, 0.16, 0.24, 0.32, 0.40, 0.56, 0.72, 0.88, 1.0)
  - [x] Named aliases: `OPACITY_DISABLED` = 0.4
- [x] `src/primitives/buttons.ts`
  - [x] `BUTTON_SIZE` tokens (small/medium/large height/padding)
  - [x] `SHIMMER_*` defaults (angle, duration, width)
  - [x] `BUTTON_PRESS_DURATION_MS` = 80
  - [x] `BUTTON_RELEASE_DAMPING` = 16, `BUTTON_RELEASE_STIFFNESS` = 150
  - [x] Tilted button geometry constants (default depth, angle, shadow distance)
- [x] `src/primitives/index.ts` — barrel export with JSDoc

### MS-03 · Theme system ✅

- [x] `src/theme/types.ts`
  - [x] `ThemeConfig` interface — 14 per-component color config sub-interfaces
  - [x] `ColorMode` = `'dark' | 'light'`
  - [x] `NeoPopContextValue` — `{ colorMode, theme, resolvedTheme }`
  - [x] 14 component color config interfaces: `ButtonColorConfig`, `CardColorConfig`, `ShimmerColorConfig`, `CheckboxColorConfig`, `RadioColorConfig`, `ToggleColorConfig`, `InputFieldColorConfig`, `DropdownColorConfig`, `TagsColorConfig`, `BottomSheetColorConfig`, `FloatingButtonColorConfig`, `TiltedButtonColorConfig`, `ScoreMeterColorConfig`, `ToastColorConfig`
- [x] `src/theme/NeoPopProvider.tsx`
  - [x] React Context creation + `NeoPopProvider` component
  - [x] `mergeDeep` integration for partial theme overrides
  - [x] `useNeoPopTheme()` hook — reads resolved theme from context
- [x] `src/theme/defaultDarkTheme.ts` — complete dark palette with section comments per component
- [x] `src/theme/defaultLightTheme.ts` — complete light palette with section comments per component
- [x] `src/theme/index.ts` — barrel export

### MS-04 · Utilities & hooks ✅

- [x] `src/utils/colorUtils.ts`
  - [x] `hexToRGBA(hex, alpha)` — hex + alpha → `rgba(r,g,b,a)` string
  - [x] `getLuminance(hex)` — relative luminance per WCAG formula
  - [x] `isColorDark(hex)` — boolean based on luminance threshold
  - [x] `getContrastColor(hex)` → black or white for maximum contrast
  - [x] `adjustLightness(hex, amount)` — lighten/darken
  - [x] `getHorizontalShadow(color)` → right-edge shadow style object
  - [x] `getVerticalShadow(color)` → bottom-edge shadow style object
  - [x] `deriveEdgeColor(faceColor)` → darker tone for 3D edges
  - [x] `deriveHighlightEdgeColor(faceColor)` → lighter tone for highlight edges
- [x] `src/utils/helpers.ts`
  - [x] `isEmpty(value)` — null/undefined/empty string/empty array check
  - [x] `isObject(value)` — plain object type guard
  - [x] `mergeDeep(target, source)` — recursive deep merge (used by theme system)
  - [x] `getRandomInt(min, max)` — inclusive random integer
  - [x] `currencyFormatter(amount, currency, locale)` — Intl.NumberFormat wrapper
  - [x] `generateTextStyle(fontType, fontWeight)` → React Native `TextStyle` object
- [x] `src/utils/haptics.ts`
  - [x] `triggerHaptic(type)` — lazy-requires `expo-haptics`, no-ops if not available
- [x] `src/utils/index.ts` — barrel export
- [x] `src/hooks/useAutoFocus.ts` — focuses a `TextInput` ref after configurable delay
- [x] `src/hooks/useClientHeight.ts` — measures component height via `onLayout`
- [x] `src/hooks/useDelayMount.ts` — defers child render by timeout
- [x] `src/hooks/useScrollIntoView.ts` — programmatic scroll via `measureLayout`
- [x] `src/hooks/index.ts` — barrel export

### MS-05 · Skia rendering layer ✅

- [x] `src/skia/NeoPop3DSurface.tsx`
  - [x] 5-face 3D box on Skia `<Canvas>`: face `<Rect>` + 4 parallelogram edge `<Path>` elements
  - [x] Optional `<Rect style="stroke">` for face border/outline
  - [x] Canvas total size = `(width + leftDepth + rightDepth) × (height + topDepth + bottomDepth)`
  - [x] Children rendered via absolute `<View>` overlay with `pointerEvents="box-none"`
- [x] `src/skia/EdgeColorDeriver.tsx` — auto-derives darker edge tones from face color; supports per-edge color overrides
- [x] `src/skia/NeoPopTiltGeometry.ts`
  - [x] `computeTiltGeometry(config)` — pure math, no React
  - [x] Returns `facePoints[4]`, `plunkPoints[4]`, `canvasWidth`, `canvasHeight`
- [x] `src/skia/SkiaLoadingGuard.tsx` — WASM init wait on Expo Web; immediate render on native
- [x] `src/skia/index.ts` — barrel export

### MS-06 · Core components (Phase 1 batch) ✅

- [x] `NeoPopButton`
  - [x] `buttonFace` variants: `elevated` / `flat` / `stroke`
  - [x] Press animation: `translateX`/`translateY` `withTiming` press-in, `withSpring` press-out
  - [x] Shimmer overlay via `NeoPopShimmer` (toggled by `showShimmer` prop)
  - [x] Adjacency edge control (9-point position grid: left/center/right × top/center/bottom)
  - [x] `disabled` state: opacity 0.4, interaction blocked
  - [x] `colorMode` prop + full `colorConfig` theming
  - [x] JSDoc on component + all props
- [x] `NeoPopCard`
  - [x] Pressable 3D card via `NeoPop3DSurface`
  - [x] `onPress` callback, `disabled` state
  - [x] `colorConfig` + `colorMode` theming
- [x] `NeoPopShimmer`
  - [x] Diagonal sweep animation via `withRepeat(withSequence(...))`
  - [x] `shimmerAngle`, `shimmerDuration`, `shimmerWidth` customizable
  - [x] Standalone wrapper — wraps any child content
- [x] `NeoPopTypography`
  - [x] `FontType` + `FontWeight` token integration
  - [x] `allowFontScaling={false}` (NeoPop design requires fixed sizes)
  - [x] Full style pass-through
- [x] `NeoPopToast` (partial)
  - [x] `ToastProvider` — manages toast queue state
  - [x] `useToast()` hook — `{ show, hide, isVisible, config }`
  - [x] `NeoPopToast.tsx` — **visual component is a stub** (renders nothing; full implementation in Phase 3)
- [x] Layout helpers
  - [x] `Row` — horizontal flex container with `align` + `justify` props
  - [x] `Column` — vertical flex container with `align` + `justify` props
  - [x] `PageContainer` — screen-level safe-area padding wrapper
  - [x] `HorizontalDivider` — thin horizontal line separator
  - [x] `HorizontalSpacer` — fixed-width invisible spacer
  - [x] `VerticalSpacer` — fixed-height invisible spacer
- [x] Icon helpers
  - [x] `Chevron` — View-based directional chevron (north/south/east/west), `size`, `color`, `strokeWidth`
  - [x] `Cross` — View-based × icon, `size`, `color`, `strokeWidth`
  - [x] `Pointer` — View-based pointer/arrow icon
- [x] JSDoc on all public APIs
- [x] `src/index.ts` — single public barrel exporting everything

### Release ✅

- [x] `package.json` version set to `0.1.0`
- [x] `CHANGELOG.md` updated with `[0.1.0]` section
- [x] Commit: `chore(release): 0.1.0`
- [x] Tag: `v0.1.0`
- [x] Pushed to `main` + tags
- [x] GitHub release created with release notes

---

## Definition of Done ✅

- [x] `yarn typecheck` passes with zero errors
- [x] `yarn lint` passes with zero warnings
- [x] `yarn test` passes
- [x] `v0.1.0` tagged and pushed
- [x] GitHub release created
- [x] `CHANGELOG.md` updated
- [x] `docs/MILESTONES.md` MS-02 through MS-06 checked

---

## Known Issues Carried Forward

- `NeoPopToast.tsx` visual component is a stub — `ToastProvider` and `useToast` work, but the rendered toast UI is unimplemented. Addressed in Phase 3 (MS-08).
- `Chevron`, `Cross`, `Pointer` are View-based, not Skia. Addressed in Phase 3 (MS-08).
