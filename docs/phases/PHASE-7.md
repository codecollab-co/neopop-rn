# Phase 7 — React Native New Architecture & Performance Benchmarking 🔲

> **Version:** v2.0.0
> **Status:** 🔲 Planned (Target: Q4 2026)
> **Theme:** Fabric + Turbo Modules · No interop layer · Performance benchmarking suite

---

## Goal

Migrate `neopop-rn` to full React Native New Architecture (Fabric renderer + Turbo Modules), remove the bridge-compatibility interop layer, raise the platform floor to RN 0.76+, and ship a performance benchmarking suite. This is a **major version** — v2.0.0 — with documented breaking changes.

---

## Workstreams Active This Phase

| Workstream | Focus |
|---|---|
| A — Core library | Fabric/Turbo Module audit, breaking changes, peer dep floor raise |
| B — Quality | Performance regression tests, concurrency safety, updated CI matrix |
| D — Documentation | v2.0 migration guide, updated architecture docs |

---

## Background

React Native's New Architecture was introduced as opt-in in RN 0.68 and became the default in RN 0.76. It replaces:

| Old Architecture | New Architecture |
|---|---|
| Bridge (async JS ↔ native) | JSI (synchronous JS ↔ native) |
| Paper renderer | Fabric renderer |
| Native Modules (bridge-based) | Turbo Modules (JSI-based) |
| `findNodeHandle` | Direct Fabric node refs |

The key dependencies of `neopop-rn` — `react-native-reanimated`, `react-native-gesture-handler`, and `@shopify/react-native-skia` — all support both architectures via an interop layer in their current versions. In v2.0 of neopop-rn, we remove reliance on the interop layer and require full New Architecture support in peer dependencies.

---

## Deliverables

### MS-19 · React Native New Architecture ✦ (v2.0) 🔲

#### Peer dependency floor raise

- [ ] Update `peerDependencies` in `package.json`:
  - [ ] `react-native: ">=0.76.0"` (New Architecture stable)
  - [ ] `react: ">=18.3.0"` (Concurrent Mode stable)
  - [ ] `react-native-reanimated: ">=4.0.0"` (full Turbo Module, no bridge)
  - [ ] `react-native-gesture-handler: ">=3.0.0"` (full Fabric support)
  - [ ] `@shopify/react-native-skia: ">=2.0.0"` (Fabric Skia renderer)
  - [ ] `expo-haptics: ">=14.0.0"` (or latest with Turbo Module support)

#### Fabric renderer audit (all components)

- [ ] Audit all 27+ components for Fabric compatibility:
  - [ ] No `findNodeHandle` calls (deprecated, removed in New Architecture)
  - [ ] No `UIManager.measure` bridge calls
  - [ ] No deprecated `refs` that require bridge serialization
  - [ ] `useClientHeight` hook — replace `measureLayout` with Fabric-compatible measurement API if needed
  - [ ] `useScrollIntoView` hook — validate `ScrollView` `scrollTo` works on Fabric
- [ ] Verify `NeoPop3DSurface` Skia Canvas renders correctly under Fabric (host component bridge changes)
- [ ] Verify `NeoPopTiltedButton` and `NeoPopScoreMeter` Skia components work under Fabric

#### Turbo Module compatibility

- [ ] Verify `expo-haptics` Turbo Module works in RN 0.76+
- [ ] Verify `react-native-reanimated` worklets run correctly under JSI (no bridge fallback)
- [ ] Verify `react-native-gesture-handler` gestures work under Fabric event system

#### Reanimated v4 worklet changes

- [ ] Audit all `useSharedValue`, `useAnimatedStyle`, `useAnimatedGestureHandler` usage for v4 API changes
- [ ] Update any changed APIs (e.g., worklet directive changes, new hooks)
- [ ] Verify `withSpring`, `withTiming`, `withRepeat`, `withSequence` APIs are unchanged in v4
- [ ] Validate `useSharedValueEffect` bridge in `NeoPopScoreMeter` under Reanimated v4 + Skia v2

#### Concurrent Mode safety

- [ ] Audit all components for `unstable_` React API usage — remove any found
- [ ] Verify no tearing in Concurrent Mode (shared values read/written in render phase)
- [ ] Validate `NeoPopProvider` context works correctly with React 18 Concurrent Mode transitions

#### `interopLayerEnabled` removal

- [ ] Remove any `enableLayoutAnimations(true)` or interop-layer-required configuration
- [ ] Update `example/` app to run with `newArchEnabled: true` in `app.json`/`gradle.properties`/`Podfile`
- [ ] Verify CI matrix tests with New Architecture enabled

#### Breaking changes in v2.0

All breaking changes must be documented in `docs/MIGRATION.md` (v1.x → v2.0 section):

- [ ] Peer dependency minimums raised (listed above)
- [ ] Any removed props from the Phase 5 deprecation list
- [ ] Any Reanimated v4 worklet API changes that affect consumer-facing animation callbacks
- [ ] Any `findNodeHandle`/bridge API removal affecting component ref APIs

---

### MS-20 · Performance benchmarking 🔲

#### FPS profiling (animated components)

- [ ] `NeoPopButton` press animation — target: consistent 60 FPS, no frame drops
- [ ] `NeoPopToggle` state transition — target: 60 FPS
- [ ] `NeoPopSlider` pan gesture — target: 60 FPS during active drag
- [ ] `NeoPopBottomSheet` drag-to-dismiss — target: 60 FPS
- [ ] `NeoPopFloatingButton` levitation loop — target: 60 FPS
- [ ] `NeoPopCarousel` momentum scroll — target: 60 FPS

All FPS measurements use **Reanimated Profiler** (`setUpTests` in jest environment or on-device profiler).

#### Skia render time

- [ ] `NeoPop3DSurface` — frame render time per canvas size (100×100, 300×100, 300×300)
- [ ] `NeoPopTiltedButton` — frame render time during floating bob animation
- [ ] `NeoPopScoreMeter` — frame render time during arc sweep animation
- [ ] Target: < 2ms Skia render time per frame on mid-range device (Pixel 6 / iPhone 12)

#### JS thread budget

- [ ] Measure JS thread time during 10 simultaneous component animations
- [ ] Target: < 1ms JS thread cost per frame (all animation on UI thread)
- [ ] Document results in `docs/PERFORMANCE.md`

#### Bundle size analysis

- [ ] Run `react-native-bundle-visualizer` on the example app with all components imported
- [ ] Identify top contributors to bundle size
- [ ] Verify tree-shaking: import only `NeoPopButton` → bundle does not include `NeoPopScoreMeter`, `NeoPopDatePicker`, etc.
- [ ] Document bundle size per component group in `docs/PERFORMANCE.md`

#### Performance regression tests in CI

- [ ] Add `jest-performance` or custom timing assertions for critical utility functions
- [ ] `mergeDeep` with 5-level deep object: < 1ms
- [ ] `hexToRGBA`: < 0.1ms
- [ ] `generateTextStyle` for all FontType × FontWeight combinations: < 5ms total
- [ ] Add performance benchmark suite to `ci.yml` — fail if any benchmark regresses > 20%

---

## Commit Plan

| Commit | Content |
|---|---|
| `chore: raise peer dep floors to RN 0.76, React 18.3, Reanimated v4` | Peer dep update |
| `fix: remove findNodeHandle and bridge API usage across all components` | Bridge removal |
| `fix: update Reanimated v4 worklet API usage` | v4 compatibility |
| `fix: validate Fabric renderer for Skia components` | Fabric audit |
| `test: add performance benchmark suite` | MS-20 benchmarks |
| `docs: PERFORMANCE.md — benchmark results` | Performance docs |
| `docs: update MIGRATION.md with v1.x → v2.0 breaking changes` | Migration guide |
| `docs: update ARCHITECTURE.md for New Architecture` | Architecture update |
| `chore(release): 2.0.0` | v2.0.0 release |

---

## Definition of Done

- [ ] All components pass Fabric renderer compatibility audit
- [ ] All `findNodeHandle` / bridge calls removed
- [ ] `example/` app runs with `newArchEnabled: true` without errors
- [ ] CI matrix tests both Old Architecture (RN 0.73–0.75) and New Architecture (RN 0.76+)
- [ ] Reanimated v4 API changes applied; all animations work
- [ ] FPS profiling: all animated components hit 60 FPS on target device
- [ ] Skia render time < 2ms per frame for all Skia components
- [ ] Bundle size documented; tree-shaking validated
- [ ] Performance regression tests in CI
- [ ] `docs/PERFORMANCE.md` published with benchmark results
- [ ] `docs/MIGRATION.md` v1.x → v2.0 section complete
- [ ] `package.json` version is `2.0.0`
- [ ] npm package published with `latest` tag
- [ ] `CHANGELOG.md` updated with v2.0.0 section
- [ ] GitHub release created: `v2.0.0` with migration guide link
- [ ] `docs/MILESTONES.md` MS-19 and MS-20 checked

---

## Notes

- v2.0.0 is a **major version** — consumers must update peer dependencies and review the migration guide.
- Old Architecture support (RN 0.73–0.75) is dropped in v2.0. For projects that cannot upgrade, v1.x remains the supported branch.
- v2.0.0 will require testing on physical devices (iOS + Android) with New Architecture enabled — simulator testing is insufficient for Skia + Reanimated + Gesture Handler.
- If `react-native-reanimated` v4 introduces significant worklet API changes before Q4 2026, this phase may need to be re-scoped. Monitor the Reanimated changelog and `software-mansion/react-native-reanimated#6185` (v4 milestone).
