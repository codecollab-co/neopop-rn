# Performance — neopop-rn

> **Version:** v2.2.0 | **Last updated:** 2026-03-09

This document summarizes the performance characteristics of `neopop-rn`. For the full raw benchmark data, see [`perf/BENCHMARKS.md`](../perf/BENCHMARKS.md).

---

## Executive Summary

| Metric | Target | Result |
|--------|--------|--------|
| Full library ESM size (gzip) | < 50 KB | **~45 KB** — Pass |
| Per-component average size (gzip) | < 3 KB | **~2.2 KB** — Pass |
| JS thread work per frame | < 1 ms | **< 0.5 ms** — Pass |
| Reanimated UI-thread coverage | 100% of animated components | **18/18** — Pass |
| Skia draw calls per canvas component | < 10 per frame | **≤ 6** — Pass |
| Tree-shaking support | `sideEffects: false` | **Yes** — Pass |

---

## 1. FPS Profiling Results

All animated components target **60 FPS** (16.67 ms per frame) on mid-range devices (Pixel 6 / iPhone 12).

Every animated component uses **Reanimated 3 worklets on the UI thread** — zero JS bridge calls occur during animations, even at 60 FPS. The JS thread is only involved at gesture _start_ (setting up shared values) and gesture _end_ (triggering JS callbacks like `onPress`).

| Component | Animation Type | Thread | Target | Status |
|-----------|---------------|--------|--------|--------|
| `NeoPopButton` | Press sink + spring release | UI thread | 60 FPS | Pass |
| `NeoPopTiltedButton` | Bob levitation loop | UI thread | 60 FPS | Pass |
| `NeoPopFloatingButton` | Levitation `withRepeat` loop | UI thread | 60 FPS | Pass |
| `NeoPopCard` | Press sink + spring release | UI thread | 60 FPS | Pass |
| `NeoPopToggle` | `interpolateColor` + thumb spring | UI thread | 60 FPS | Pass |
| `NeoPopCheckbox` | Spring scale checkmark | UI thread | 60 FPS | Pass |
| `NeoPopRadio` | Spring dot scale | UI thread | 60 FPS | Pass |
| `NeoPopSlider` | Pan gesture thumb translate | UI thread | 60 FPS | Pass |
| `NeoPopStepper` | Spring label scale | UI thread | 60 FPS | Pass |
| `NeoPopBottomSheet` | Gesture-driven translateY | UI thread | 60 FPS | Pass |
| `NeoPopSwipeRow` | Pan gesture translateX | UI thread | 60 FPS | Pass |
| `NeoPopCarousel` | Pan gesture slide + snap spring | UI thread | 60 FPS | Pass |
| `NeoPopInputField` | Border color `withTiming` | UI thread | 60 FPS | Pass |
| `NeoPopDropdown` | Chevron rotation `withTiming` | UI thread | 60 FPS | Pass |
| `NeoPopAccordion` | Height spring expand/collapse | UI thread | 60 FPS | Pass |
| `NeoPopToast` | Slide-in spring + swipe dismiss | UI thread | 60 FPS | Pass |
| `NeoPopProgressBar` | `withTiming` progress fill | UI thread | 60 FPS | Pass |
| `NeoPopShimmer` | Diagonal shimmer sweep | UI thread | 60 FPS | Pass |

### Frame Budget Breakdown

| Budget item | Cost | Notes |
|-------------|------|-------|
| JS thread work per gesture event | < 0.5 ms | Worklets handle all animation math on UI thread |
| `useAnimatedStyle` evaluation | < 0.1 ms/frame | Pure worklet, no JS serialization |
| `withTiming`/`withSpring` per frame | < 0.05 ms | Native Reanimated C++ implementation |
| Main thread layout | Native only | No JS layout during animation |
| Gesture recognition | Native RNGH v2 | Zero JS bridge for pan/tap events |

---

## 2. Skia Render Time

All Skia canvas components target **≤ 2 ms** render time per frame.

| Component | Canvas Operations | Estimated CPU Time | GPU Usage |
|-----------|------------------|--------------------|-----------|
| `NeoPop3DSurface` | 1 Rect + up to 4 Path — **static, rendered once** | < 0.5 ms on mount, 0 ms after | Low |
| `NeoPopTiltedButton` | 5 paths + bob animation at 60 fps | ~1 ms/frame | Low-medium |
| `NeoPopScoreMeter` | 2 arc paths + 1 Circle knob (animated `SharedValue<SkPath>`) | ~0.8 ms/frame during animation | Low |
| `NeoPopProgressBar` (circular) | 1 animated arc path | ~0.5 ms/frame during animation | Low |
| `Chevron` | 1 static Skia Path | < 0.2 ms on mount, 0 ms after | Negligible |
| `Cross` | 1 static Skia Path | < 0.2 ms on mount, 0 ms after | Negligible |
| `Pointer` | 1 static Skia Path | < 0.2 ms on mount, 0 ms after | Negligible |

### Skia Optimization Patterns

1. **`useDerivedValue` for `SkPath`** — `NeoPopScoreMeter` and circular `NeoPopProgressBar` compute animated arc paths inside a `useDerivedValue` worklet, producing a `SharedValue<SkPath>` passed directly to `<Path />`. No JS bridge crossing during path updates.

2. **Static paths via `useMemo`** — `NeoPop3DSurface` computes all face/edge paths once, keyed on geometry props. No per-frame allocation.

3. **`SkiaLoadingGuard` for web** — On web, Skia uses WASM which requires async initialization. The guard suspends canvas rendering until WASM is ready, without blocking the rest of the UI.

4. **Peer dependency isolation** — `@shopify/react-native-skia` is a peer dependency. Apps that don't use Skia components don't pay the WASM download cost.

---

## 3. JS Thread Budget

**Target:** ≤ 1 ms JS thread cost per frame during animations.

All 18 animated components use Reanimated 3 worklets running entirely on the UI thread. There are zero `Animated` API usages with `useNativeDriver: false` in the codebase.

During 10 simultaneous animations (button press + toggle + slider + bottom sheet + carousel + accordion + shimmer + toast + checkbox + radio), JS thread time per frame remains **< 0.5 ms** because all animation drivers are UI-thread worklets.

---

## 4. Bundle Size

### Per-export bundle impact (gzip)

| Import Group | Estimated Gzip Size |
|-------------|---------------------|
| `NeoPopButton` only | ~2.8 KB |
| All non-Skia components (21) | ~35 KB |
| All Skia components (NeoPop3DSurface, TiltedButton, ScoreMeter, circular ProgressBar, icons) | ~10 KB |
| Full library (all 27 components + primitives + theme) | ~45 KB |
| Primitives + theme tokens | ~3.5 KB |

> Skia canvas components add ~0 KB to the bundle — `@shopify/react-native-skia` is a peer dependency, not bundled. Reanimated worklets are compiled separately by the Reanimated Babel plugin — zero extra JS bundle overhead.

### Tree-shaking

The library declares `"sideEffects": false` in `package.json`. The `"module"` field points to ESM output produced by `react-native-builder-bob`. Bundlers that respect the `module` field (Expo/Metro, webpack, Rollup) will tree-shake unused exports.

**Validated:** Importing only `NeoPopButton` does not include `NeoPopCarousel`, `NeoPopDatePicker`, or any Skia canvas component in the final bundle.

### Bundle size regression prevention

The `perf/bundle-size.js` script tracks compiled output size and runs as a CI job on every PR and push to `main`. See `.github/workflows/ci.yml`.

| Metric | Warning Threshold |
|--------|------------------|
| `lib/` total ESM (gzip) | > 50 KB |
| Individual component ESM (gzip) | > 5 KB |
| `useSharedValue` per component | > 5 |
| `Gesture` handlers per component | > 2 |

---

## 5. Memory Profile

Typical animated component: 1–2 `SharedValue` objects (~64 bytes each on the native heap) + 1 worklet closure compiled to native bytecode. This is negligible compared to the React component tree allocation.

All resources are automatically cleaned up on unmount:
- Reanimated `SharedValue` objects — cleanup via `useEffect`
- Skia canvas resources (GPU textures, `SkPath` objects) — released by Skia GC
- RNGH gesture handlers — unregistered from native gesture system
- Animation loops (`withRepeat`) — cancelled via Reanimated's `cancelAnimation`

---

## 6. Consumer Profiling Guide

### How to profile your app

1. **Reanimated FPS Monitor** — Enable in dev menu → "Show Perf Monitor". Watch for JS thread time > 16 ms during animations.

2. **Flipper Performance Plugin** — Attach Flipper to a debug build. Use the React DevTools profiler to identify unnecessary re-renders in components wrapping NeoPop.

3. **Reassure** — Use [Reassure](https://github.com/callstack/reassure) for component render performance regression tests in your CI.

4. **Flashlight** — Use [Flashlight](https://flashlight.dev/) for real-device frame rate profiling on production builds.

5. **React Native Performance Monitor** — Built into the dev menu. Check JS thread utilization during interactive flows.

### Optimization tips

1. **Always use `NeoPopProvider`** — it memoizes theme values, preventing re-renders in child components.
2. **Use uncontrolled mode** where possible — avoids parent re-renders on every state change.
3. **Set `enableHaptics={false}`** when haptics aren't needed — removes the async call overhead.
4. **Lazy-load heavy components** — `NeoPopBottomSheet`, `NeoPopCarousel`, `NeoPopDatePicker` can be wrapped in `React.lazy()`.
5. **Avoid re-mounting animated components** — use `opacity: 0` instead of conditional rendering where feasible.

---

## 7. Known Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| **Skia WASM on web** | ~3 MB initial download for Skia components on web | `SkiaLoadingGuard` defers Skia rendering until WASM is ready; non-Skia UI renders immediately. Apps not using Skia components can omit the peer dependency entirely. |
| **Reanimated Babel plugin** | Increases build time slightly | Required for all RN apps using Reanimated; must be last plugin in `babel.config.js` |
| **Gesture Handler native module** | Adds native dependency | Required for all gesture-driven components; standard in RN ecosystem |

---

## CI Performance Regression Tests

Performance regression tests run as part of the Jest test suite (`__tests__/perf/performance.test.ts`). These verify that critical utility functions maintain expected performance:

| Utility | Assertion |
|---------|-----------|
| `mergeDeep` (100× 5-level deep object) | < 5 ms |
| `hexToRGBA` (1000×) | < 10 ms |
| `generateTextStyle` (all FontType × FontWeight combos) | < 10 ms total |
| `deriveEdgeColor` (1000×) | < 50 ms |
| `getLuminance` (1000×) | < 10 ms |

Bundle size regression is tracked separately via the `perf/bundle-size.js` CI job.

---

## Further Reading

- [`perf/BENCHMARKS.md`](../perf/BENCHMARKS.md) — Full raw benchmark data (animation coverage table, per-component memory profile, Skia optimization patterns)
- [`docs/ACCESSIBILITY.md`](./ACCESSIBILITY.md) — WCAG 2.1 AA compliance audit
- [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) — System architecture and component design patterns
