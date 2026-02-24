# Discussion — neopop-rn

> Design decisions, trade-offs, open questions, and alternatives considered.
> Last updated: 2026-02-24

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

**Why View-based for Chevron/Cross/Pointer (current):**
- These are simple shapes (L-shaped line + rotation for Chevron, two crossed lines for Cross) achievable with `View` + `transform: [{ rotate }]`.
- Adding Skia Canvas overhead for a 20×20 icon is disproportionate.
- **Phase 3 migration:** These will move to Skia `Path` rendering to support variable stroke width, color, and consistent cross-platform rendering. The API surface (props) won't change.

**`SkiaLoadingGuard`:**
- On Expo Web, `@shopify/react-native-skia` initializes asynchronously (WASM module loading). Without a guard, the first render throws.
- `SkiaLoadingGuard` subscribes to Skia's ready signal and delays rendering Skia-dependent components until the WASM module is initialized.
- On native, the ready signal fires synchronously — zero overhead.

**`useSharedValueEffect` concern:**
- `NeoPopScoreMeter` bridges Reanimated → Skia via `useSharedValueEffect` + `useValue`. This API is `@shopify/react-native-skia`'s internal hook for driving Skia values from Reanimated shared values.
- **Risk:** this API's stability across Skia ≥1.0 versions is not guaranteed. An alternative is driving the arc sweep from JS-thread state + `useDerivedValue` to a Skia `useValue`. If `useSharedValueEffect` is removed in a future Skia version, we will fall back to this approach.

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

**Decision:** On-device Storybook via `@storybook/react-native` 7.x inside the `example/` Expo app.

**Why on-device Storybook:**
- NeoPop components have physical animations (press, spring, levitation) that are best validated on real device hardware, not a web renderer.
- The Storybook React Native server mode streams stories to the device over the Metro bundler connection — no separate build step.

**Current state:**
- Only `NeoPopButton.stories.tsx` exists (Phase 1 scaffold).
- Phase 3 (MS-09) adds stories for all 20 components.

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

**Decision:** Jest (`jest-expo` preset) + `@testing-library/react-native`. Coverage gate: >90% enforced in CI from Phase 4.

**Why `jest-expo` preset:**
- Handles Expo module mocking and Babel transforms automatically.
- `transformIgnorePatterns` is pre-configured to transform `react-native-*`, `@expo/*`, `@shopify/react-native-skia` — libraries that ship untransformed ESM.

**Test layers planned (Phase 4, MS-12):**

| Layer | Scope | Tool |
|---|---|---|
| Unit — utilities | `colorUtils`, `helpers`, `haptics` | Jest |
| Unit — hooks | `useAutoFocus`, `useClientHeight`, `useDelayMount`, `useScrollIntoView` | RNTL `renderHook` |
| Unit — theme | `NeoPopProvider`, `mergeDeep`, `defaultDark/LightTheme` | Jest |
| Component — render | All 20+ components, snapshot + prop validation | RNTL `render` |
| Component — interaction | Press, toggle, gesture via `fireEvent` | RNTL `fireEvent` |
| Animation — mocked | `useSharedValue` mocked; assert final values | Jest + Reanimated mocks |

**Reanimated mocking:**
- `react-native-reanimated` ships a Jest mock (`@mocks/reanimated`). This replaces shared values with plain JS objects and runs `withTiming`/`withSpring` synchronously.
- This makes animation state testable without a real Reanimated runtime.

**Skia mocking:**
- `@shopify/react-native-skia` has a Jest mock package. Skia `Canvas`, `Path`, etc. render as `null` or stubs in tests.
- Tests for Skia components validate prop passing and visibility, not pixel output.

**Coverage gate progression:**
- Phase 3 (v0.3.0): no gate (tests are being written)
- Phase 4 (v0.4.0): >90% gate enforced in CI — build fails below threshold
- Codecov badge in README showing live coverage.

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

**Current a11y state:**
- Basic `accessibilityRole` and `accessibilityState` are present in implemented components (architectural contract, section 5 in ARCHITECTURE.md).
- No systematic audit or screen reader testing has been done yet.
- Phase 4 (MS-13) is the formal audit.

---

## 11. Documentation strategy

**Decision:** Markdown docs now → Docusaurus at v1.0.

**Rationale:**
- Writing Docusaurus MDX before the API is stable wastes effort — prop tables and examples will change as the API evolves through v0.x.
- Markdown files in `docs/` are version-controlled alongside code and require no build pipeline. They're immediately available to contributors.
- At v1.0, when the API is frozen, invest in a Docusaurus site with interactive prop tables, versioned docs, and Algolia search.

**Docs structure:**
```
docs/
├── ARCHITECTURE.md   ← Technical architecture (this session)
├── MILESTONES.md     ← All milestones with ✅/🔲 status
├── PLAN.md           ← Master plan, roadmap, workstreams
├── DISCUSSION.md     ← This file
├── phases/           ← Per-phase detailed plans
│   ├── PHASE-0.md through PHASE-7.md
├── components/       ← Per-component docs (Phase 5+)
│   └── NeoPopButton.md, NeoPopCard.md, ...
├── THEMING.md        ← Comprehensive theming guide (Phase 5)
├── TOKENS.md         ← Full design token reference (Phase 5)
├── CONTRIBUTING.md   ← Contributor guide (Phase 5)
└── MIGRATION.md      ← v0.x → v1.0 migration guide (Phase 5)
```

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

| # | Question | Status | Owner |
|---|---|---|---|
| OQ-01 | Should `NeoPopToast` support a queue of multiple toasts, or replace-and-dismiss? | Open | Phase 3 |
| OQ-02 | `useSharedValueEffect` Skia bridge — will it remain in `@shopify/react-native-skia` ≥2.0? | Open | Monitor Skia changelog |
| OQ-03 | Should icon components (Chevron/Cross/Pointer) accept a `style` prop in addition to `color`/`size`? | Open | Phase 3 API audit |
| OQ-04 | `NeoPopFloatingButton.delayTouchEvents` prop is declared in types but not implemented — remove or implement? | Open | Phase 3 |
| OQ-05 | Should `NeoPopSlider` support a range (two thumbs) variant, or is that a separate component? | Open | Phase 4 planning |
| OQ-06 | `NeoPopOTPInput` — should it support biometric/autofill integration (one-time-code keyboard type)? | Open | Phase 3 MS-10 |
| OQ-07 | Should design token export (Style Dictionary) run in library CI or as a separate tool? | Open | Phase 6 planning |
| OQ-08 | `NeoPopProgressBar` — circular vs. horizontal — should these be `variant` prop or two separate components? | Open | Phase 3 MS-10 |
