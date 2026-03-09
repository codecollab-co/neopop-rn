# Architecture — neopop-rn

> Last updated: 2026-03-08 · Version: 2.2.0

---

## Rendering model

`neopop-rn` renders entirely through the standard React Native view tree — it does not ship any
native modules of its own and does not fork the bridge. The rendering pipeline
has three distinct execution contexts:

| Context | Technology | Thread |
|---|---|---|
| React component tree | React Native Fabric (RN >= 0.76) | JS thread |
| Animation shared values and worklets | `react-native-reanimated` >= 3.6 | UI thread (JSI worklet) |
| Skia canvas painting | `@shopify/react-native-skia` >= 1.3 | GPU render thread |
| Gesture recognisers | `react-native-gesture-handler` >= 2.14 | UI thread (native driver) |

Under the New Architecture (`newArchEnabled=true`), Fabric replaces the legacy
Paper renderer. Because `neopop-rn` contains no custom native views, all 27
components continue to render as standard Fabric host components (`View`, `Text`,
`TextInput`, `Pressable`, `FlatList`, etc.). No Shadow Node changes, no C++ JSI
bridge stubs, and no native module registration are required.

Reanimated 3 worklets are compiled to Hermes bytecode and execute on the UI
thread using JSI. This model is identical under both Paper and Fabric — the
worklet executor does not rely on the legacy asynchronous bridge at all.

Skia paints to a `<Canvas>` view whose backing is a GPU surface (Metal on iOS,
OpenGL/Vulkan on Android). The Skia render thread is independent of both the JS
thread and the UI thread, so Skia animations never block React renders.

---

## Component categories and New Architecture compatibility

### Pure JS/RN (no native modules)

These components use only standard React Native core primitives (`View`, `Text`,
`TextInput`, `Pressable`, `FlatList`, `ScrollView`, `StyleSheet`). They carry
zero peer-dependency requirements beyond `react` and `react-native` itself, and
are trivially compatible with Fabric.

| Component | Primary RN primitives used |
|---|---|
| `NeoPopTypography` | `Text` |
| `NeoPopCard` | `View`, `Pressable` (wraps `NeoPop3DSurface`) |
| `NeoPopTags` | `View`, `Text`, `Pressable` |
| `NeoPopHeader` | `View`, `Text`, `Pressable` |
| `NeoPopBack` | `View`, `Text`, `Pressable` |
| `NeoPopInputField` | `TextInput`, `View`, `Text` |
| `NeoPopDropdown` | `Pressable`, `View`, `Text` |
| `NeoPopOTPInput` | `TextInput` (multi-box), `View`, `Text` |
| `Row`, `Column`, `PageContainer` | `View`, `StyleSheet` |
| `HorizontalDivider`, `HorizontalSpacer`, `VerticalSpacer` | `View` |

None of these components call any bridge API, access `NativeModules`, or use
`findNodeHandle` / `setNativeProps`. They are unconditionally New Arch safe.

### Reanimated worklets (UI thread)

These components use `react-native-reanimated` for animations that run on the
UI thread via Hermes JSI worklets. All shared values are created with
`useSharedValue`; all derived styles are computed inside `useAnimatedStyle`
worklets; transitions use `withTiming`, `withSpring`, and `withRepeat`. No
`runOnJS` bridge calls are made inside animation frames.

`react-native-reanimated` >= 3.6 ships full Fabric support. Its JSI worklet
executor bypasses the asynchronous bridge entirely and is therefore New Arch
safe by design.

| Component | Reanimated APIs used |
|---|---|
| `NeoPopButton` | `useSharedValue`, `useAnimatedStyle`, `withTiming`, `withSpring` |
| `NeoPopTiltedButton` | `useSharedValue`, `useAnimatedStyle`, `withTiming`, `withSpring`, `withRepeat` |
| `NeoPopFloatingButton` | `useSharedValue`, `useAnimatedStyle`, `withRepeat`, `withSequence`, `withTiming` |
| `NeoPopShimmer` | `useSharedValue`, `useAnimatedStyle`, `withRepeat`, `withTiming` |
| `NeoPopCheckbox` | `useSharedValue`, `useAnimatedStyle`, `withSpring` |
| `NeoPopRadio` | `useSharedValue`, `useAnimatedStyle`, `withSpring` |
| `NeoPopToggle` | `useSharedValue`, `useAnimatedStyle`, `withSpring`, `interpolateColor` |
| `NeoPopBottomSheet` | `useSharedValue`, `useAnimatedStyle`, `withSpring`, `withTiming` |
| `NeoPopToast` | `useSharedValue`, `useAnimatedStyle`, `withSpring` |
| `NeoPopAccordion` | `useSharedValue`, `useAnimatedStyle`, `withSpring` |
| `NeoPopStepper` | `useSharedValue`, `useAnimatedStyle`, `withSpring` |
| `NeoPopProgressBar` | `useSharedValue`, `useAnimatedStyle`, `withTiming` |
| `NeoPopSwipeRow` | `useSharedValue`, `useAnimatedStyle`, `withSpring` |
| `NeoPopCarousel` | `useSharedValue`, `useAnimatedStyle`, `withSpring` |
| `NeoPopDatePicker` | `useSharedValue`, `useAnimatedStyle`, `withTiming` |

### Skia Canvas (GPU thread)

These components use `@shopify/react-native-skia` to paint custom 2D/3D shapes
onto a `<Canvas>` view backed by a hardware-accelerated GPU surface. Skia runs
on its own render thread, independent of both the JS and UI threads.

`@shopify/react-native-skia` >= 1.3 ships with Fabric-compatible `<Canvas>` and
supporting JSI bindings. The `useSharedValueEffect` / `useValue` bridge that
`NeoPopScoreMeter` uses to animate a Skia paint parameter is provided by Skia's
own Reanimated integration, which is likewise New Arch safe.

| Component | Skia API surface used |
|---|---|
| `NeoPop3DSurface` | `<Canvas>`, `<Rect>`, `<Path>`, `<Paint>` |
| `NeoPopTiltedButton` | `<Canvas>`, `<Path>`, `computeTiltGeometry` |
| `NeoPopScoreMeter` | `<Canvas>`, `Skia.Path.addArc()`, `useSharedValueEffect`, `useValue` |
| `NeoPopProgressBar` (circular variant) | `<Canvas>`, `Skia.Path.addArc()` |
| `Chevron`, `Cross`, `Pointer` icons | `<Canvas>`, `<Path>` (Skia Path rendering) |

`NeoPop3DSurface` is consumed internally by `NeoPopButton`, `NeoPopCard`, and
`NeoPopTiltedButton`. Its children are rendered into an absolute-positioned
`<View>` overlay with `pointerEvents="box-none"`, which is fully Fabric-safe.

### RNGH gestures (native driver)

These components use `react-native-gesture-handler` v2's Gesture API
(`Gesture.Pan()`, `Gesture.Tap()`, `Gesture.Simultaneous()`) wrapped in
`<GestureDetector>`. All gesture handlers run on the UI thread via the native
driver; no `useNativeDriver: false` overrides exist anywhere in the codebase.

`react-native-gesture-handler` >= 2.14 ships full Fabric (RN New Architecture)
support, including the `RNGHRootView` removal that was required under Fabric. No
`<GestureHandlerRootView>` wrapping changes are needed in consumer apps; the
standard wrapper continues to work identically.

| Component | Gesture APIs used |
|---|---|
| `NeoPopSlider` | `Gesture.Pan()`, `GestureDetector` |
| `NeoPopBottomSheet` | `Gesture.Pan()`, `GestureDetector` |
| `NeoPopSwipeRow` | `Gesture.Pan()`, `GestureDetector` |
| `NeoPopCarousel` | `Gesture.Pan()`, `GestureDetector` |
| `NeoPopToast` (dismiss) | `Gesture.Pan()`, `GestureDetector` |

---

## Deprecated API audit results

A systematic grep was run across all files matching `src/**/*.{ts,tsx}` for
every deprecated React Native bridge API pattern. Results as of v2.0.0-alpha.1:

### `findNodeHandle` usage: none found

`findNodeHandle` is a legacy Paper API that converts a React component ref into
a native node handle for use with `UIManager.measure()` and friends. It does not
exist in Fabric. **Zero usages found** across all 27 components and all
supporting layers (primitives, theme, utils, hooks, skia).

### `UIManager` usage: none found

`UIManager` is the legacy bridge dispatcher for imperative native view
operations (`measure`, `focus`, `blur`, `dispatchViewManagerCommand`). Under
New Architecture these operations are dispatched via Fabric's synchronous JSI
layer. **Zero usages found** across all source files.

### `setNativeProps` usage: none found

`setNativeProps` is a performance escape hatch from the legacy Paper era that
mutates native view properties without going through the React reconciler. It is
not supported on Fabric hosts. **Zero usages found** — all imperative state
mutations in `neopop-rn` go through Reanimated shared values.

### `requireNativeComponent` usage: none found

`requireNativeComponent` registers a legacy Paper native component. Under New
Architecture, custom native components use the Fabric Component API (codegen +
`codegenNativeComponent`). Because `neopop-rn` ships no native views of its
own, this API is not needed. **Zero usages found**.

### `unstable_` API usage: none found

React's `unstable_*` APIs (e.g., `unstable_batchedUpdates`,
`unstable_flushAllWithoutAsserting`) are internal implementation details that
may be removed without notice. **Zero usages found** — the library uses
only stable React APIs (`useState`, `useEffect`, `useRef`, `useContext`,
`createContext`, `forwardRef`, `memo`).

### `NativeModules` usage: none found

Direct `NativeModules` access bypasses the Turbo Module JSI layer and relies on
the legacy bridge serialisation. **Zero usages found** — haptic feedback is
accessed via `expo-haptics` (which itself provides a proper Expo module
abstraction), not through `NativeModules` directly.

### `dispatchViewManagerCommand` usage: none found

`dispatchViewManagerCommand` sends commands to legacy Paper ViewManagers. It
has no Fabric equivalent (Fabric uses ref-based methods via codegen). **Zero
usages found**.

---

## New Architecture compatibility matrix

The table below covers every symbol exported from `src/index.ts`. "New Arch
safe" means the component works correctly when `newArchEnabled=true` is set in
`gradle.properties` / `Podfile` with RN >= 0.76.

| Component / export | Category | New Arch safe | Notes |
|---|---|---|---|
| `NeoPopButton` | Reanimated + Skia | Yes | Skia via `NeoPop3DSurface`; worklets on UI thread |
| `NeoPopTiltedButton` | Reanimated + Skia + Gestures | Yes | Skia Canvas parallelogram; `Gesture.Tap` |
| `NeoPopFloatingButton` | Reanimated | Yes | Levitation loop via `withRepeat`; no native module calls |
| `NeoPopCard` | Skia | Yes | Wraps `NeoPop3DSurface`; no gesture or animation state |
| `NeoPopShimmer` | Reanimated | Yes | Diagonal sweep via `withRepeat(withTiming)` |
| `NeoPopCheckbox` | Reanimated | Yes | Spring checkmark; no native module calls |
| `NeoPopRadio` | Reanimated | Yes | Spring inner-dot; no native module calls |
| `NeoPopToggle` | Reanimated | Yes | `interpolateColor` thumb track; UI thread only |
| `NeoPopInputField` | Pure JS | Yes | Animated border via `withTiming`; RN `TextInput` |
| `NeoPopDropdown` | Reanimated | Yes | `withTiming` chevron rotation |
| `NeoPopSlider` | Reanimated + RNGH | Yes | `Gesture.Pan` UI thread; no `useNativeDriver:false` |
| `NeoPopBottomSheet` | Reanimated + RNGH | Yes | `Gesture.Pan` drag-to-dismiss; spring open/close |
| `NeoPopHeader` | Pure JS | Yes | Static layout; `Pressable` |
| `NeoPopBack` | Pure JS | Yes | Static layout; `Pressable` with Chevron |
| `NeoPopTags` | Pure JS | Yes | Static badge; semantic color variants |
| `NeoPopToast` / `ToastProvider` / `useToast` | Reanimated + RNGH | Yes | Spring slide-in; `Gesture.Pan` dismiss |
| `NeoPopScoreMeter` | Skia + Reanimated bridge | Yes | `useSharedValueEffect` from `@shopify/react-native-skia` >= 1.3 |
| `NeoPopTypography` | Pure JS | Yes | `Text` only; font token system |
| `Row`, `Column`, `PageContainer` | Pure JS | Yes | `View` wrappers; no RN APIs |
| `HorizontalDivider`, `HorizontalSpacer`, `VerticalSpacer` | Pure JS | Yes | `View` spacers |
| `Chevron`, `Cross`, `Pointer` | Skia | Yes | Skia Path icons; crisp at any pixel density |
| `NeoPopOTPInput` | Pure JS | Yes | Multi-`TextInput` grid; `useAutoFocus` hook |
| `NeoPopProgressBar` | Reanimated + Skia | Yes | Horizontal (Reanimated) + circular (Skia arc) variants |
| `NeoPopAccordion` | Reanimated | Yes | Spring expand/collapse; animated chevron |
| `NeoPopStepper` | Reanimated | Yes | Spring label animation; haptics; `accessibilityRole="adjustable"` |
| `NeoPopSwipeRow` | Reanimated + RNGH | Yes | `Gesture.Pan` velocity-aware snap |
| `NeoPopCarousel` | Reanimated + RNGH | Yes | `Gesture.Pan` with velocity bias; dot indicators |
| `NeoPopDatePicker` | Pure JS + Reanimated | Yes | `FlatList` `snapToInterval` scroll wheels; `withTiming` column |
| `NeoPop3DSurface` | Skia | Yes | Core Skia canvas primitive; children via `View` overlay |
| `NeoPopProvider` / `useNeoPopTheme` | Pure JS | Yes | React Context only; no RN bridge APIs |
| Design tokens (colors, spacing, typography, opacity, buttons) | Pure JS | Yes | Plain TypeScript constants; no React/RN dependency |
| Color utilities (`hexToRGBA`, `getLuminance`, etc.) | Pure JS | Yes | Pure functions; no RN APIs |
| `triggerHaptic` | `expo-haptics` | Yes | Expo module abstraction; New Arch safe in `expo-haptics` >= 14 |

---

## Peer dependency requirements for v2.0

v2.0 raises minimum peer dependency versions to guarantee Fabric compatibility
across all components. The reasons for each floor are explained below.

| Package | v1.x minimum | v2.0 minimum | Reason |
|---|---|---|---|
| `react` | >= 18.0.0 | >= 18.3.0 | React 18.3 stabilises `use()`, removes deprecated `defaultProps` on function components, fixes a concurrent mode edge case in `startTransition` |
| `react-native` | >= 0.71.0 | >= 0.76.0 | RN 0.76 ships New Architecture on by default; Fabric event system is stable; Bridgeless mode available |
| `@shopify/react-native-skia` | >= 1.0.0 | >= 1.3.0 | 1.3 added stable Fabric `<Canvas>` host component; `useSharedValueEffect` API stabilised |
| `react-native-reanimated` | >= 3.0.0 | >= 3.6.0 | 3.6 completed full Fabric + Bridgeless support; JSI worklet executor confirmed stable |
| `react-native-gesture-handler` | >= 2.0.0 | >= 2.14.0 | 2.14 removed requirement for `<GestureHandlerRootView>` workaround under Fabric |
| `expo-haptics` (optional) | >= 13.0.0 | >= 14.0.0 | Expo SDK 51+ (haptics 14) ships Expo Modules Core architecture compatible with New Architecture |

### Enabling New Architecture in consumer apps

**Android (`android/gradle.properties`)**

```properties
newArchEnabled=true
```

**iOS (`ios/Podfile`)**

```ruby
ENV['RCT_NEW_ARCH_ENABLED'] = '1'
```

No changes to component usage, theme configuration, or animation APIs are
required in consumer application code.

---

## Interop layer policy

React Native ships an "Interop Layer" for RN 0.73–0.75 that allows legacy Paper
components to run side-by-side with Fabric without modification. `neopop-rn`
does **not** depend on the Interop Layer because:

1. It ships no custom native components of its own (no `requireNativeComponent`).
2. All three peer-dependency native libraries (`react-native-reanimated`,
   `react-native-gesture-handler`, `@shopify/react-native-skia`) ship their own
   Fabric-native implementations at the versions required by v2.0.
3. `expo-haptics` uses the Expo Modules Core which provides its own Fabric bridge.

Therefore, `neopop-rn` v2.0 works in **strict mode** (`newArchEnabled=true` +
Interop Layer disabled) without any compatibility shims.

For consumers still on RN 0.73–0.75 (with the Interop Layer active), `neopop-rn`
v1.x continues to be supported; the New Architecture path requires RN >= 0.76.

---

## Concurrent Mode compatibility

React 18's Concurrent Mode (`createRoot`, `startTransition`, `useDeferredValue`,
`Suspense`) is fully compatible with `neopop-rn` because:

1. **No tearing**: all state in `neopop-rn` is either pure React state
   (`useState`, `useReducer`) or Reanimated shared values (which live outside
   the React tree and are therefore immune to render-phase tearing).

2. **No synchronous external stores without `useSyncExternalStore`**: the
   `NeoPopProvider` theme context is a standard React context value — no
   external mutable store, no custom subscriber pattern.

3. **No side effects in render**: every component follows the rule that only
   `useEffect` / `useLayoutEffect` / worklet callbacks may produce side effects.
   Render functions are pure.

4. **Suspense boundaries**: `SkiaLoadingGuard` wraps the Skia canvas with a
   `<Suspense>` fallback so that Skia's asynchronous initialisation is handled
   without blocking the React tree. This pattern is Concurrent Mode safe.

5. **`forwardRef` usage**: `NeoPopFloatingButton`, `NeoPopBottomSheet`, and
   `NeoPopCarousel` use `forwardRef` to expose imperative ref APIs. These are
   fully compatible with React 18's concurrent renderer.

6. **`startTransition` safe**: none of `neopop-rn`'s internal state updates
   (theme changes, color mode switches) use synchronous DOM/native mutations
   that would conflict with deferred rendering.

---

## Bundle architecture (CJS + ESM + TypeScript declarations)

`react-native-builder-bob` produces three output targets from `src/`:

| Target | Output path | Resolution entry | Used by |
|---|---|---|---|
| CommonJS (with ES module hints) | `lib/commonjs/` | `package.json "main"` | Node.js, Jest |
| ES Module | `lib/module/` | `package.json "module"` | Webpack, Rollup, Vite |
| TypeScript declarations | `lib/typescript/` | `package.json "types"` | IDEs, `tsc --noEmit` |

**Metro / Expo direct source resolution:**

```json
"react-native": "src/index",
"source":       "src/index"
```

Metro always resolves `"react-native"` / `"source"` first, bypassing the
compiled `lib/` outputs during development. This means any consumer using Metro
(standard Expo or bare RN project) runs the raw TypeScript source through their
own Babel transform pipeline, which respects their own `tsconfig.json` and
Babel preset.

**`sideEffects: false`** is declared in `package.json`, enabling tree-shaking
in webpack and other bundlers. Because all exports are pure (no module-level
effects), this is safe.

**TypeScript compilation target:** `ES2020` with `"module": "commonjs"` for
the CJS output and `"module": "ES2020"` for the ESM output. The declaration
output uses `"declaration": true` and `"declarationMap": true` so IDE
"go-to-definition" correctly maps to the `.tsx` source files.

**No `exports` field (conditional exports):** The package intentionally omits
the `"exports"` field for broad toolchain compatibility. Metro, webpack, and
older bundlers that do not support the Node `"exports"` field all fall through
to `"main"` / `"module"` / `"react-native"`, which are universally supported.
A future v3.0 milestone may add `"exports"` once conditional export support
stabilises across the RN ecosystem.

---

## Skia WASM on web

`@shopify/react-native-skia` ships a WASM-based renderer for Expo Web targets.
On web, Skia loads `canvaskit.wasm` asynchronously at runtime. This affects the
following `neopop-rn` components when targeting `expo-web` / React Native Web:

| Component | Web behaviour |
|---|---|
| `NeoPop3DSurface` | Renders via Skia WASM; `SkiaLoadingGuard` shows a `<Suspense>` fallback until WASM loads |
| `NeoPopButton` | Skia 3D surface via `NeoPop3DSurface`; same WASM loading caveat applies |
| `NeoPopCard` | Same as `NeoPopButton` |
| `NeoPopTiltedButton` | Full Skia canvas; WASM load required |
| `NeoPopScoreMeter` | Full Skia arc; WASM load required |
| `NeoPopProgressBar` (circular) | Skia arc variant; WASM load required |
| `Chevron`, `Cross`, `Pointer` icons | Skia Path icons; WASM load required |

**Performance recommendation for web:** Code-split the Skia-heavy components
(score meter, tilted button) behind a dynamic `import()` with a `<Suspense>`
boundary so the initial bundle does not block the main thread waiting for WASM.

**WASM bundle size:** `canvaskit.wasm` is approximately 6.8 MB uncompressed /
2.4 MB Brotli-compressed. The host application is responsible for serving it
with appropriate cache headers (`Cache-Control: public, max-age=31536000,
immutable`).

**CSP requirements:** Skia WASM requires `'unsafe-eval'` or a suitable
`script-src` hash in the Content Security Policy. For Strict CSP environments,
use the `disableWorkerThread` Skia build flag and load WASM with a `<script>`
tag using a nonce.

**Pure-JS fallback on web:** Components in the "Pure JS/RN" and "Reanimated
worklets" categories render correctly on Expo Web without any Skia dependency.
If you target web and want to avoid the WASM overhead entirely, avoid importing
the Skia-dependent components listed above.

---

## Repository layout

```
neopop-rn/
├── src/                        ← Library source (ships to npm)
│   ├── index.ts                ← Single public barrel — all exports
│   ├── primitives/             ← Design tokens (no React, no RN deps)
│   ├── theme/                  ← NeoPopProvider context + dark/light presets
│   ├── utils/                  ← Color math, helpers, haptics
│   ├── hooks/                  ← Custom React hooks
│   ├── skia/                   ← Skia Canvas primitives
│   └── components/             ← 27 UI components
│       ├── <ComponentName>/
│       │   ├── <ComponentName>.tsx
│       │   ├── <ComponentName>.types.ts
│       │   └── index.ts
│       ├── layout/
│       └── icons/
├── __tests__/
├── example/                    ← Expo + Storybook on-device runner
├── docs/                       ← Planning, architecture, migration docs
├── .github/workflows/
│   ├── ci.yml                  ← PR validation (typecheck + lint + test)
│   ├── docs.yml                ← GitHub Pages deploy on v* tag
│   ├── release.yml             ← npm publish on v* tag
│   └── new-arch.yml            ← New Architecture bridge API audit
├── tokens/                     ← Style Dictionary token outputs
├── token-build/                ← Style Dictionary config
├── website/                    ← Docusaurus docs site
├── package.json                ← v2.0.0-alpha.1
├── tsconfig.json
├── CHANGELOG.md
└── README.md
```

---

## Layer dependency rules

| Layer | May import from | May NOT import from |
|---|---|---|
| `primitives` | Nothing | Everything else |
| `theme` | `primitives`, `utils/helpers` | `components`, `hooks`, `skia` |
| `utils` | `primitives` | `theme`, `components`, `hooks`, `skia` |
| `hooks` | `primitives`, `utils` | `theme`, `components`, `skia` |
| `skia` | `primitives`, `utils` | `theme`, `components`, `hooks` |
| `components` | All layers above | Other components only via documented cross-deps |

These rules are enforced by ESLint import-order configuration and code review.
Violations result in a CI lint failure.

---

## Animation contract

All animated components follow a uniform contract to guarantee Concurrent Mode
and New Architecture compatibility:

- **Shared values** are created with `useSharedValue` — never mutated on the JS
  thread during a render pass.
- **Animated styles** are derived with `useAnimatedStyle` — the worklet closure
  captures shared values by reference and runs on the UI thread.
- **Press-in transitions:** `withTiming` at approximately 80 ms.
- **Press-out / spring return:** `withSpring` with the `BUTTON_RELEASE_DAMPING`
  and `BUTTON_RELEASE_STIFFNESS` constants from `src/primitives/buttons.ts`.
- **Loops:** `withRepeat(withSequence(…))` — always cancelled via
  `cancelAnimation(sharedValue)` in `useEffect` cleanup to prevent memory leaks
  after component unmount.
- **Colour interpolation:** `interpolateColor` from Reanimated — runs on the UI
  thread, never triggers a React re-render.
- **No `useNativeDriver: false`:** the old-style `Animated` API with
  `useNativeDriver: false` is not used anywhere in the library. All animations
  are Reanimated-based and UI-thread native.

---

## Theme system

```
NeoPopProvider (React Context)
       │
       ├── colorMode: 'dark' | 'light'
       ├── theme: Partial<ThemeConfig>   ← consumer overrides
       │
       └── resolved = mergeDeep(base, theme)
                        │
                        ├── defaultDarkTheme   (when colorMode='dark')
                        └── defaultLightTheme  (when colorMode='light')
```

`ThemeConfig` contains one key per component:
`colors`, `button`, `card`, `shimmer`, `checkbox`, `radio`, `toggle`,
`inputField`, `dropdown`, `tags`, `bottomSheet`, `floatingButton`,
`tiltedButton`, `scoreMeter`, `otpInput`, `progressBar`, `accordion`.

**Override priority (per component, highest to lowest):**

```
colorConfig prop
    ↓
colorMode prop on component
    ↓
NeoPopProvider theme override
    ↓
defaultDark/LightTheme
    ↓
hardcoded constant fallback
```

---

## Build system

`react-native-builder-bob` version `^0.23` produces the three output targets
described in the bundle architecture section above. The build command is
`npm run prepare` (aliased to `bob build`).

**Entry point resolution under Metro:**
Metro resolves `"react-native"` before `"main"`, so it always reads from
`src/index.ts` directly. The `lib/` directory is only used by Node.js (Jest,
server-side tools) and by webpack-based bundlers.

---

## CI/CD pipeline

### `ci.yml` — runs on every PR and push to `main`

```
checkout → node 20 → npm ci
    → npm run typecheck   (tsc --noEmit)
    → npm run lint        (eslint --max-warnings 0)
    → npm test -- --coverage
    → upload coverage to Codecov
```

### `new-arch.yml` — runs on every PR and push to `main`

```
checkout → node 20 → npm ci
    → npm run typecheck
    → npm run lint
    → grep audit for deprecated bridge APIs across src/**/*.{ts,tsx}
    → npm test -- --passWithNoTests
```

Exits with code 1 if any of the following patterns are found:
`findNodeHandle`, `UIManager.`, `requireNativeComponent`, `setNativeProps`,
`dispatchViewManagerCommand`, `unstable_batchedUpdates`,
`unstable_flushAllWithoutAsserting`.

### `release.yml` — runs on `v*` tags

```
checkout → node 20 → npm ci
    → npm run typecheck
    → npm run lint
    → npm test
    → npm run prepare   (bob build → lib/)
    → npm publish --access public
```

### `storybook.yml` — runs on `v*` tags

Deploys the web Storybook to the `/storybook/` subfolder of GitHub Pages.

```
checkout → node 20 → npm ci (in storybook/)
    → npx storybook build
    → deploy to GitHub Pages /storybook/
```

---

## What changed in v2.1 → v2.2

**v2.1.0 (Feb 2026)**
- Incremental fixes and polish; see `CHANGELOG.md` for full detail.

**v2.2.0 (Mar 2026)**
- Web Storybook: 30 stories added to `storybook/` directory (Storybook 7.x web build), replacing on-device-only story coverage.
- Playground: 30 interactive web stories covering all Foundation tokens + all 27 components.
- Logo: 3D blue cube (`#0066FF`) replaces earlier yellow cube in README, docs, and playground.
- Website: light mode background pinned to `#ffffff` across all sections; custom 404 page; `keep_files` on docs deploy to preserve static assets across releases.
- No API changes — all props, types, and component interfaces are unchanged from v2.0.

---

## Phase 9 — Quality Hardening (v2.3.0, in progress)

The following quality initiatives are being tracked in `docs/phases/PHASE-9.md`:

| Milestone | Status | Summary |
|---|---|---|
| MS-21 · Full test suite | ✅ Complete | 36 suites · 389 tests · ~79% coverage · Jest threshold enforced |
| MS-22 · A11y audit | ✅ Complete | WCAG 2.1 AA · 9 components fixed · `docs/ACCESSIBILITY.md` published |
| MS-23 · Performance benchmarks | 🔲 Pending | FPS profiling · Skia render time · bundle size · CI regression gates |
| MS-24 · Doc reconciliation | 🚧 In progress | MILESTONES/PLAN/DISCUSSION/ARCHITECTURE sync |

---

## Versioning policy

`neopop-rn` follows [Semantic Versioning](https://semver.org):

| Version range | Guarantee |
|---|---|
| `0.x.y` | No stability guarantee — props may change between minor versions |
| `1.0.0` | Stable public API — breaking changes only in major versions (shipped as v2.0.0) |
| `2.0.0+` | Major = breaking (prop renames, removed components, RN peer dep bumps) |

The v2.0 line targets React Native New Architecture exclusively. A deprecation
notice for at least one minor version is required before any prop is removed
from a stable API surface.
