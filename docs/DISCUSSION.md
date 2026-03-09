# Discussion — neopop-rn

> Design decisions, trade-offs, open questions, and alternatives considered.
> Last updated: 2026-03-08

---

## Table of Contents

1. [Why a unified RN port?](#1-why-a-unified-rn-port)
2. [Animation engine choice](#2-animation-engine-choice)
3. [Skia vs View-based 3D geometry](#3-skia-vs-view-based-3d-geometry)
4. [Gesture handling](#4-gesture-handling)
5. [Theme system design](#5-theme-system-design)
6. [TypeScript strictness](#6-typescript-strictness)
7. [Build system](#7-build-system)
8. [Storybook strategy](#8-storybook-strategy)
9. [Test strategy](#9-test-strategy)
10. [Accessibility approach](#10-accessibility-approach)
11. [Documentation strategy](#11-documentation-strategy)
12. [Versioning and stability](#12-versioning-and-stability)
13. [New Architecture timing](#13-new-architecture-timing)
14. [Open questions](#14-open-questions)

---

## 1. Why a unified RN port?

**Background:** CRED's NeoPop design system was published as four separate SDKs — iOS (Swift/UIKit), Android (Compose), Web (React), and Flutter (Dart). Each was an independent codebase targeting its platform's native stack.

**Problem:** React Native + Expo teams had no first-class option. Workarounds — using the web SDK inside a WebView, or hand-rolling NeoPop visuals — produced either poor performance or inconsistent fidelity.

**Decision:** A single `neopop-rn` package that targets iOS, Android, and Expo Web from one TypeScript codebase, leveraging cross-platform primitives (Reanimated, RNGH, Skia).

**Trade-offs:**
- We accept that pixel-for-pixel fidelity on every platform is hard. Web rendering via Skia/WASM has more overhead than pure CSS. We mitigate this with `SkiaLoadingGuard`.
- A single package creates a larger peer-dependency surface (`react-native-skia`, `reanimated`, `gesture-handler`). Apps not needing Skia components still pull in the peer. Accepted as the cost of a unified API.

---

## 2. Animation engine choice

**Decision:** `react-native-reanimated` ≥ 3, UI-thread only. No JS-thread animations.

**Why Reanimated over Animated API:**
- Reanimated worklets run on the UI thread — animations survive heavy JS thread load (network calls, re-renders, JSON parsing).
- `withSpring`, `withTiming`, `withRepeat`, `withSequence` provide composable, declarative animation primitives.
- `useSharedValue` + `useAnimatedStyle` keeps animation state off the JS thread entirely.
- `interpolateColor` (UI-thread) avoids the JS-thread `Animated.Value.interpolate` overhead.

**Why not the built-in `Animated` API:**
- `Animated` runs on the JS thread by default (unless `useNativeDriver: true`, which has severe constraints).
- `useNativeDriver: true` cannot animate layout properties (`width`, `height`, `padding`, `margin`) — NeoPop components frequently need these.
- `Animated` does not have a modern `interpolateColor` on the UI thread.

**Alternatives considered:**
- **`moti`** (Framer Motion-inspired Reanimated wrapper) — rejected because it adds an abstraction layer that makes fine-grained NeoPop animation tuning harder. We prefer direct `withTiming`/`withSpring` calls.
- **Lottie animations** — not applicable; NeoPop animations are programmatic, not asset-based.

**Animation constants** (from `src/primitives/buttons.ts`):
```ts
BUTTON_PRESS_DURATION_MS = 80
BUTTON_RELEASE_DAMPING = 16
BUTTON_RELEASE_STIFFNESS = 150
```
These are the canonical NeoPop press-feel parameters, derived from the original CRED design system.

---

## 3. Skia vs View-based 3D geometry

**Decision:** Use `@shopify/react-native-skia` for all parallelogram/arc geometry; keep simple icons (Chevron, Cross, Pointer) as View-based for now, migrating in Phase 3.

**Why Skia for parallelogram edges:**
- A NeoPop 3D button has 4 edge faces that are parallelograms — trapezoids offset from the face rectangle. This geometry **cannot be expressed with View transforms alone**. `transform: [{ skewX }]` skews the whole subtree including children, distorting text.
- Skia `Path` draws an arbitrary polygon — 4 arbitrary points, filled with a solid color. Pixel-accurate, no child distortion.
- Skia `addArc()` for `NeoPopScoreMeter` gives a true SVG-quality arc that `react-native-svg` could also do, but Skia is already a dependency and avoids adding yet another peer.

**Chevron/Cross/Pointer — now Skia-rendered (migrated in v2.0):**
- All three icons were migrated from View-based to `Skia.Path.Make()` rendering in v2.0 (MS-08).
- Chevron: rotation via `Skia.Matrix()` transforms. Cross: two diagonal `lineTo` paths. Pointer: shaft + filled arrowhead.
- Variable stroke width and cross-platform consistency are now supported.
- API surface (props) unchanged from original View-based version.
- In v2.3.0 (MS-22): `accessibilityRole="button"/"image"` and `accessibilityLabel` prop added to all three.

**`SkiaLoadingGuard`:**
- On Expo Web, `@shopify/react-native-skia` initializes asynchronously (WASM module loading). Without a guard, the first render throws.
- `SkiaLoadingGuard` subscribes to Skia's ready signal and delays rendering Skia-dependent components until the WASM module is initialized.
- On native, the ready signal fires synchronously — zero overhead.

**`useSharedValueEffect` — resolved (v2.0):**
- `NeoPopScoreMeter` was originally planned to use `useSharedValueEffect` + `useValue`. In v2.0, we adopted `useDerivedValue` instead: a `SharedValue<SkPath>` is derived directly from the sweep animation and passed to `<Path path={...}>` as an `AnimatedProp<T>`.
- `@shopify/react-native-skia` ≥1.3 accepts `SharedValue<SkPath>` directly — no `useSharedValueEffect` required. This resolves the stability risk entirely. See OQ-02 below.

---

## 4. Gesture handling

**Decision:** `react-native-gesture-handler` ≥ 2 with the new `Gesture` builder API (`Gesture.Pan()`, `GestureDetector`).

**Why RNGH over RN's built-in `PanResponder`:**
- `PanResponder` runs on the JS thread — gesture callbacks are blocked by slow JS execution.
- RNGH gesture recognizers run on the native UI thread, delivering sub-millisecond response.
- `Gesture.Simultaneous()` and `Gesture.Race()` compositors make complex gesture choreography declarable (BottomSheet pan + scroll inside sheet).

**New vs. legacy API:**
- RNGH v2 introduced the `Gesture` builder API (`GestureDetector` + `Gesture.Pan()`).
- We use only the new API — `PanGestureHandler` (legacy) is not used anywhere.
- Benefit: the new API handles simultaneous gesture recognition and native-thread callbacks more reliably.

**Specific gesture decisions:**

| Component | Gesture | Notes |
|---|---|---|
| `NeoPopBottomSheet` | `Gesture.Pan()` | drag-to-dismiss; DISMISS_THRESHOLD=0.4 (40% of sheet height) |
| `NeoPopSlider` | `Gesture.Pan()` | thumb drag; step-snapping + `withSpring` on release |
| `NeoPopButton` | `Pressable` (RN core) | simple tap, no complex gesture recognition needed |
| `NeoPopTiltedButton` | `Gesture.Tap()` | tap press-in/out with tap translation |
| `NeoPopFloatingButton` | `Pressable` | imperative ref API is primary interaction surface |

---

## 5. Theme system design

**Decision:** `mergeDeep` for theme overrides (not shallow merge); single `NeoPopProvider` context.

**Why deep merge:**
- NeoPop themes have deeply nested color configs. For example, `button.edgeColors.bottom` is 3 levels deep.
- A shallow merge of `theme.button` would wipe out all un-overridden button subkeys if the consumer passes even one override.
- `mergeDeep` from `src/utils/helpers.ts` recursively merges, so `{ button: { edgeColors: { bottom: '#f00' } } }` only overrides that one color.

**Color resolution chain (per component):**
```
colorConfig prop (highest)
    ↓
colorMode prop on component
    ↓
NeoPopProvider theme override
    ↓
defaultDark/LightTheme
    ↓
hardcoded constant fallback (lowest)
```
This chain means:
- A consumer can always override a single component instance via `colorConfig`.
- A global style override goes in `NeoPopProvider`.
- The library always has a sane fallback even with no provider.

**Alternatives considered:**
- **CSS variables / React Native stylesheet theming** — RN does not support CSS variables natively. Stylesheet-based theming requires re-creating all style objects on theme change, triggering unnecessary re-renders.
- **Styled-components / Emotion** — adds a significant dependency and runtime overhead. NeoPop's color system is deterministic (not dynamic per-render), so a context-based lookup is more appropriate.
- **Per-component prop-only theming** — would require passing `colorConfig` everywhere. Provider context allows global theming without prop drilling.

---

## 6. TypeScript strictness

**Decision:** Full TypeScript strict mode + `--noUnusedLocals` + `--noUnusedParameters`.

**Why strict:**
- `neopop-rn` is a public library. Every exported prop interface is a contract with consumers. Strict typing ensures contracts are explicit and IDE-completable.
- `strict` enables `strictNullChecks`, `strictFunctionTypes`, `noImplicitAny` — all critical for a library where consumers rely on type inference.

**Why `noUnusedLocals/Params`:**
- Unused variables in library code are almost always bugs (forgotten cleanup, dead code path).
- CI enforces zero TypeScript errors — dead code cannot sneak through.

**`export type` discipline:**
- All type-only re-exports use `export type` (TypeScript 3.8+).
- This prevents accidental value imports and enables `isolatedModules` compatibility.
- Phase 5 (MS-14) includes a full audit of this.

---

## 7. Build system

**Decision:** `react-native-builder-bob` producing CJS + ESM + TypeScript declarations.

**Why builder-bob:**
- Designed specifically for React Native libraries.
- Zero-config Babel + TypeScript pipeline.
- Produces all three targets from one source tree without manual Rollup/webpack config.

**Entry points:**
```json
"main":         "lib/commonjs/index",  ← Jest, Node.js tools
"module":       "lib/module/index",    ← bundlers (Metro, webpack)
"types":        "lib/typescript/index.d.ts",
"react-native": "src/index",          ← Metro during dev (bypasses build)
"source":       "src/index"           ← Expo Metro
```

The `"react-native"` and `"source"` fields point directly to `src/`, meaning the example app and any Expo app using `file:../` path get the raw source — no build step during development.

**`sideEffects: false`:**
- Declares the package is tree-shakeable. Bundlers can drop unused components from the consumer bundle.
- This is safe because neopop-rn has no module-level side effects (no `window` mutations, no global registrations outside React context).

---

## 8. Storybook strategy

**Decision:** Dual Storybook setup — on-device (`@storybook/react-native` 7.x in `example/`) for native fidelity + web Storybook (`storybook/`) for CI-friendly review.

**Why on-device Storybook:**
- NeoPop components have physical animations (press, spring, levitation) that are best validated on real device hardware, not a web renderer.
- The Storybook React Native server mode streams stories to the device over the Metro bundler connection — no separate build step.

**Why web Storybook (added v2.2.0):**
- Web Storybook enables story review without a physical device or simulator.
- 30 web stories in `storybook/stories/` cover all Foundation tokens + all 27 components.
- Deployed as a static site alongside the Docusaurus docs site.

**Current state (v2.2.0):**
- 30 web stories (`storybook/stories/`) + 23 on-device stories (`example/`).
- 5 Foundation stories: Introduction, Colors, Icons, Layout, Spacing, Typography.
- All 27 components have at least one story with dark/light mode variants.

**Stories structure per component:**
```tsx
// Default story
export const Default = () => <NeoPopButton label="Pay" onPress={() => {}} />;
// Variant stories
export const Flat = () => <NeoPopButton buttonFace="flat" ... />;
export const Stroke = () => <NeoPopButton buttonFace="stroke" ... />;
// Dark/light theme toggle via Storybook decorator
```

**`colorMode` toggle:** A global Storybook decorator wraps every story in `NeoPopProvider` with a toolbar-controlled `colorMode` switch. This lets reviewers preview every component in both themes.

---

## 9. Test strategy

**Decision:** Jest (`react-native` preset) + `@testing-library/react-native`. Coverage gate enforced in CI.

**Why `react-native` preset (not `jest-expo`):**
- The `jest-expo` preset was originally planned but the project uses the `react-native` preset with custom `transformIgnorePatterns` to handle ESM packages.
- `transformIgnorePatterns` configured to transform `react-native-reanimated`, `react-native-gesture-handler`, `@shopify/react-native-skia`, and `expo-haptics`.

**Test layers (completed in MS-21, v2.3.0):**

| Layer | Scope | Tool | Status |
|---|---|---|---|
| Unit — utilities | `colorUtils`, `helpers`, `haptics` | Jest | ✅ |
| Unit — hooks | `useAutoFocus`, `useClientHeight`, `useDelayMount`, `useScrollIntoView` | RNTL `renderHook` | ✅ |
| Unit — theme | `NeoPopProvider`, `mergeDeep`, `defaultDark/LightTheme` | Jest | ✅ |
| Component — render | All 27 components, prop validation | RNTL `render` | ✅ |
| Component — interaction | Press, toggle, gesture via `fireEvent` + gesture mocks | RNTL `fireEvent` | ✅ |
| Component — a11y props | `UNSAFE_getByProps` for role/state/value | RNTL | ✅ |

**Reanimated mocking:**
- `jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))` — replaces shared values with plain JS objects; `withTiming`/`withSpring` run synchronously.

**Skia mocking:**
- `@shopify/react-native-skia` is manually mocked per test file: `Canvas`, `Path`, `Circle` return stubs; `Skia.Path.Make()`, `Skia.Paint()`, `Skia.Color()`, `Skia.Matrix()` return jest function chains.
- `useDerivedValue` is mocked to return `{ current: 0 }`.

**Gesture Handler mocking:**
- `react-native-gesture-handler` is mocked: `Gesture.Pan()` returns a chainable mock object with `onBegin`, `onUpdate`, `onEnd`, `onFinalize` etc. all returning `this`.

**Coverage achieved (v2.3.0):**
- 36 test suites · 389 tests · zero failures
- ~79% statements · ~74% branches · ~71% functions · ~81% lines
- Jest `coverageThreshold` enforced: 75% statements, 70% branches, 65% functions, 78% lines

---

## 10. Accessibility approach

**Decision:** Formal dedicated a11y audit sprint in Phase 4 (not per-component during development).

**Rationale:**
- Adding a11y props per-component during development leads to inconsistent coverage (some components get thorough a11y treatment, others minimal).
- A dedicated audit phase ensures systematic WCAG 2.1 AA coverage across all components in one focused effort.
- Screen reader testing (VoiceOver + TalkBack) requires physical devices — batching this into one sprint is more efficient.

**A11y requirements per component (from WCAG 2.1 AA):**
- `accessibilityRole` on every interactive element (button, checkbox, radio, slider, etc.)
- `accessibilityState` for stateful components (`checked`, `selected`, `disabled`, `expanded`)
- `accessibilityLabel` for icon-only buttons (Chevron, Cross in NeoPopBack)
- `accessibilityHint` for non-obvious interactions (BottomSheet swipe-to-dismiss)
- Contrast ratio ≥ 4.5:1 for text, ≥ 3:1 for UI components in both default themes
- `accessibilityLiveRegion="polite"` on `NeoPopToast` for screen reader announcements
- Focus trap in `NeoPopBottomSheet` when open

**Current a11y state (v2.3.0):**
- MS-22 formal audit complete. All 27 components have correct `accessibilityRole`, `accessibilityState`, `accessibilityValue`, and `accessibilityLabel` where required.
- 9 components received fixes in v2.3.0: NeoPopInputField, NeoPopScoreMeter, NeoPopSwipeRow, NeoPopCarousel, NeoPopDatePicker, NeoPopShimmer, Chevron, Cross, Pointer.
- Contrast ratio check complete; all key default-theme pairs pass WCAG 2.1 AA.
- `docs/ACCESSIBILITY.md` published with full audit results, screen reader testing matrix, and consumer guide.
- On-device VoiceOver/TalkBack smoke tests pending (require physical devices; documented in ACCESSIBILITY.md).

---

## 11. Documentation strategy

**Decision:** Markdown docs now → Docusaurus at v1.0.

**Rationale:**
- Writing Docusaurus MDX before the API is stable wastes effort — prop tables and examples will change as the API evolves through v0.x.
- Markdown files in `docs/` are version-controlled alongside code and require no build pipeline. They're immediately available to contributors.
- At v1.0, when the API is frozen, invest in a Docusaurus site with interactive prop tables, versioned docs, and Algolia search.

**Docs structure (current — v2.3.0):**
```
docs/
├── ARCHITECTURE.md     ← Technical architecture (v2.2.0)
├── MILESTONES.md       ← All milestones MS-01 through MS-24 with status
├── PLAN.md             ← Master plan, roadmap, workstreams, decision log
├── DISCUSSION.md       ← This file
├── ACCESSIBILITY.md    ← A11y contract, contrast ratios, SR testing matrix (v2.3.0)
├── THEMING.md          ← Comprehensive theming guide ✅
├── TOKENS.md           ← Full design token reference ✅
├── CONTRIBUTING.md     ← Contributor guide ✅
├── MIGRATION.md        ← v0.x → v2.0 migration guide ✅
├── phases/             ← Per-phase detailed plans
│   ├── PHASE-0.md through PHASE-7.md ✅
│   └── PHASE-9.md ✅ (in progress)
└── components/         ← Per-component docs ✅ (30 pages)
    └── NeoPopButton.md, NeoPopCard.md, ... (all 27 components + icons + layout)
```

**Docusaurus site (v2.0+):** Live at `https://codecollab-co.github.io/neopop-rn/`. Served from `website/` directory; auto-deployed on release tag via GitHub Actions.

---

## 12. Versioning and stability

**Decision:** Semantic Versioning; no stability guarantee until v1.0.0.

| Version range | Guarantee |
|---|---|
| `0.x.y` | No stability guarantee. Props may change between minor versions. |
| `1.0.0` | Stable public API. Breaking changes only in major versions. |
| `2.0.0+` | Major = breaking (prop renames, removed components, peer dep bumps). |

**v1.0 definition (from user Q&A):**
- All 28+ components implemented and tested.
- Test coverage >90%, enforced in CI.
- Stable API (full prop-interface audit complete).
- Full markdown docs (per-component pages).
- Zero open P0/P1 bugs.

**Why publish early at v0.1.0:**
- Early publishing allows real-world API feedback before the API is frozen.
- GitHub Discussions are the primary feedback channel during v0.x.
- `peerDependencies` are broad ranges (`>=3.0.0`, `>=2.0.0`) to avoid unnecessary friction during this period.

---

## 13. New Architecture timing

**Decision:** Target New Architecture (Fabric + Turbo Modules) in v2.0, not v1.0.

**Rationale:**
- React Native's New Architecture (`newArchEnabled: true`) was stable in RN 0.76. Many Expo SDK 51 projects still run the old bridge.
- `@shopify/react-native-skia` ≥1.0 supports both architectures via an interop layer. Turbo Module support is still maturing.
- `react-native-reanimated` 3.x supports New Architecture; v4 (RC) is changing worklet APIs — we need stability before committing.
- v1.0 targets RN ≥ 0.73 (stable, broad compatibility). v2.0 will raise the floor to RN ≥ 0.76 and remove the interop layer.

**Migration in v2.0 will involve:**
- Removing any `findNodeHandle` / bridge calls (if introduced).
- Validating all Fabric renderer paths for custom Skia components.
- Raising peer dep floors: `react-native >= 0.76`, `react >= 18.3`.
- A dedicated migration guide (MS-19 checklist).

---

## 14. Open Questions

| # | Question | Status | Resolution |
|---|---|---|---|
| OQ-01 | Should `NeoPopToast` support a queue of multiple toasts, or replace-and-dismiss? | ✅ Resolved | Queue supported via `maxToasts` prop on `ToastProvider`. Default is replace-and-dismiss (maxToasts=1); consumers set higher values for queuing. |
| OQ-02 | `useSharedValueEffect` Skia bridge — will it remain in `@shopify/react-native-skia` ≥2.0? | ✅ Resolved | Eliminated entirely. `NeoPopScoreMeter` now uses `useDerivedValue` → `SharedValue<SkPath>` passed directly to `<Path path={...}>` as `AnimatedProp<T>`. Compatible with Skia ≥1.3; no internal API dependency. |
| OQ-03 | Should icon components (Chevron/Cross/Pointer) accept a `style` prop in addition to `color`/`size`? | ✅ Resolved | `style` prop added (`StyleProp<ViewStyle>`) — passed to the wrapping `Canvas`. Consumers can position icons via `style`. |
| OQ-04 | `NeoPopFloatingButton.delayTouchEvents` prop — remove or implement? | ✅ Resolved | Removed before v2.0. Not present in the public types (`NeoPopFloatingButtonProps`). No consumer-facing deprecation needed as this was never documented. |
| OQ-05 | Should `NeoPopSlider` support a range (two thumbs) variant? | ⏸ Deferred | Single-thumb slider ships in v2.0. Two-thumb range variant deferred to a future minor version. Would be a new component (`NeoPopRangeSlider`) rather than a `variant` prop to avoid complexity. |
| OQ-06 | `NeoPopOTPInput` — biometric/autofill integration? | ✅ Resolved | `keyboardType="number-pad"` and `textContentType="oneTimeCode"` (iOS) applied. SMS autofill works on iOS 12+ via system integration. Android autofill via `autoComplete="sms-otp"` is set. |
| OQ-07 | Should design token export (Style Dictionary) run in library CI or as a separate tool? | ✅ Resolved | `npm run tokens` script (`token-build/build.js`) generates all formats into `tokens/`. CI does not auto-run tokens on every push — only on release. Token outputs are committed to the repo so consumers can use them without running the build. |
| OQ-08 | `NeoPopProgressBar` — `variant` prop or two separate components? | ✅ Resolved | Single `NeoPopProgressBar` component with `variant="horizontal" \| "circular"` prop. Implemented in MS-10 (v2.0). Both variants share animation logic and color resolution; the canvas geometry differs. |
