# Master Plan — neopop-rn

> Last updated: 2026-02-24

---

## Vision

`neopop-rn` becomes the definitive React Native implementation of the NeoPop design
language — the single package any Expo or React Native team reaches for when they want
CRED's characteristic 3D, tactile, animated UI. It is open-source, strictly typed,
fully tested, and accompanied by a first-class documentation site and Figma kit.

---

## North-Star Metrics

| Metric | Current | v0.3.0 target | v1.0.0 target |
|---|---|---|---|
| Components implemented | 20 / 20 core | 23 (+ batch 1) | 28+ |
| Test coverage | 0% | 60% | >90% |
| Storybook stories | 1 | 20+ | 28+ |
| Open TODO stubs | 4 | 0 | 0 |
| GitHub stars | — | — | 500+ |
| npm weekly downloads | — | — | 1,000+ |
| Docs pages | 0 | 5 | 40+ |

---

## Release Roadmap

```
v0.1.0 ✅ ─── Feb 2026 ── Scaffold + core components (7)
v0.2.0 ✅ ─── Feb 2026 ── All 20 components implemented
v0.3.0 🔲 ─── Target: Mar 2026
               ├── Fix 4 live stubs (Toast visual, Skia icons)
               ├── Storybook stories for all 20 components
               └── New components: OTPInput, ProgressBar, Accordion
v0.4.0 🔲 ─── Target: Apr 2026
               ├── New components: DatePicker, Carousel, Stepper, SwipeRow
               ├── Full test suite (target >90% coverage)
               └── Formal a11y audit (WCAG 2.1 AA)
v0.5.0 🔲 ─── Target: May 2026
               ├── API stability freeze (prop interface audit)
               ├── Markdown docs coverage (per-component pages)
               └── MIGRATION.md for v1.0 preparation
v1.0.0 🔲 ─── Target: Jun 2026
               ├── Docusaurus docs site (live at URL)
               ├── Design token export (Figma / Style Dictionary)
               ├── Stable API guarantee
               └── GA release announcement
v2.0.0 🔲 ─── Target: Q4 2026
               ├── React Native New Architecture (Fabric + Turbo Modules)
               ├── Breaking changes with migration guide
               └── Performance benchmarking suite
```

---

## Phase Summary

| Phase | Version | Theme | Status |
|---|---|---|---|
| 0 | pre-v0.1.0 | Scaffold, tooling, CI/CD | ✅ Complete |
| 1 | v0.1.0 | Design tokens, theme system, core components | ✅ Complete |
| 2 | v0.2.0 | All remaining stub components | ✅ Complete |
| 3 | v0.3.0 | Hardening + Stories + Batch 1 new components | 🔲 Planned |
| 4 | v0.4.0 | Batch 2 new components + tests + a11y | 🔲 Planned |
| 5 | v0.5.0 | API freeze + markdown docs | 🔲 Planned |
| 6 | v1.0.0 | Docs site + Figma tokens + GA | 🔲 Planned |
| 7 | v2.0.0 | New Architecture + performance | 🔲 Planned |

---

## Workstream Overview

### Workstream A — Core library (always active)
Components, primitives, theme, utils, hooks, Skia layer.
This is the primary workstream and drives every release.

### Workstream B — Quality (starts Phase 3)
Tests, CI coverage gates, ESLint rules, TypeScript strictness.
Runs in parallel with Workstream A from Phase 3 onward.

### Workstream C — Developer experience (starts Phase 3)
Storybook stories, README improvements, inline examples.
Runs in parallel from Phase 3 onward.

### Workstream D — Documentation (starts Phase 5, accelerates at Phase 6)
Markdown docs, Docusaurus site, Figma tokens, API reference.
Light work in Phase 3–4, major push in Phase 5–6.

### Workstream E — Accessibility (Phase 4 formal audit)
A11y roles, labels, contrast, screen reader testing.
A dedicated sprint in Phase 4, then maintained in every subsequent phase.

---

## Decision Log

| # | Decision | Rationale | Date |
|---|---|---|---|
| D-01 | Target Expo SDK ≥ 50 (not bare RN only) | Broadest Expo compatibility; SkiaLoadingGuard handles WASM | 2026-02 |
| D-02 | Reanimated UI-thread only (no JS-thread animations) | Zero jank guarantee | 2026-02 |
| D-03 | Skia for parallelogram surfaces (not View-based transforms) | Pixel-accurate 3D geometry impossible with View transforms | 2026-02 |
| D-04 | Single public barrel (`src/index.ts`) | Simpler consumer imports; one place to audit exports | 2026-02 |
| D-05 | Strict TypeScript + `--noUnusedLocals/Params` | Catch dead code at compile time | 2026-02 |
| D-06 | `mergeDeep` for theme overrides (not shallow merge) | Partial nested overrides (e.g. only `button.edgeColors.bottom`) | 2026-02 |
| D-07 | Markdown docs now → Docusaurus at v1.0 | Ship docs fast now; invest in the site when API is stable | 2026-02 |
| D-08 | >90% test coverage enforced in CI | Library-grade quality; regressions caught automatically | 2026-02 |
| D-09 | Formal a11y audit phase before v1.0 (not per-component) | Ensures systematic coverage; not patchy component-by-component | 2026-02 |
| D-10 | v2.0 for New Architecture (not v1.0) | New Architecture still maturing in RN 0.75–0.76; v1.0 targets stable RN ≥ 0.73 | 2026-02 |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Skia API changes between ≥1.0 versions break `useSharedValueEffect` | Medium | High | Pin `@shopify/react-native-skia` peer dep floor; add CI matrix for Skia 1.x and 2.x |
| Reanimated v4 (RC) introduces breaking worklet changes | Medium | High | Monitor Reanimated changelog; test on 3.x + 4.x in parallel CI matrix |
| NeoPopToast visual stub shipped in v0.1.0/v0.2.0 confuses early adopters | High | Medium | Fix in Phase 3 (MS-08) as top priority; add `console.warn` in stub until fixed |
| test suite is 0% — regressions may already exist | High | High | Phase 3 makes testing first-class work; start with critical path tests first |
| `NeoPopScoreMeter` `useSharedValueEffect` is Skia-internal API | Medium | Medium | Alternative: drive arc via JS-thread state + re-render (simpler, less jank) |
| No external consumers yet → API design feedback gap | Low | Medium | Publish to npm early (done at v0.1.0); solicit feedback on GitHub Discussions |

---

## Definition of Done — per phase

Every phase is considered **done** when:

1. All checklist items in `docs/phases/PHASE-N.md` are checked
2. `yarn typecheck` passes with zero errors
3. `yarn lint` passes with zero warnings
4. `yarn test --coverage` passes (coverage gate per-phase)
5. GitHub release tagged and published to npm
6. `CHANGELOG.md` updated
7. `docs/MILESTONES.md` updated (completed items checked)
