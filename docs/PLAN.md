# Master Plan — neopop-rn

> Last updated: 2026-03-08

---

## Vision

`neopop-rn` becomes the definitive React Native implementation of the NeoPop design
language — the single package any Expo or React Native team reaches for when they want
CRED's characteristic 3D, tactile, animated UI. It is open-source, strictly typed,
fully tested, and accompanied by a first-class documentation site and Figma kit.

---

## North-Star Metrics

| Metric | v0.2.0 baseline | v2.2.0 current | v2.3.0 progress | v2.3.0 target |
|---|---|---|---|---|
| Components implemented | 20 / 20 core | 27 / 27 ✅ | 27 / 27 ✅ | 27 / 27 |
| Test suites / tests | 0 | 12 suites · ~13% coverage | 36 suites · 389 tests · ~79% coverage ✅ | ≥90% coverage |
| Storybook stories | 1 | 30 web + 23 on-device ✅ | unchanged ✅ | 30 web + 23 on-device |
| Open TODO stubs | 4 | 0 ✅ | 0 ✅ | 0 |
| Formal a11y audit | none | none | WCAG 2.1 AA — MS-22 complete ✅ | WCAG 2.1 AA ✅ |
| Performance benchmarks | none | none | pending (MS-23) | FPS + Skia + bundle |
| Docs pages | 0 | 31 component + 8 guide ✅ | +ACCESSIBILITY.md ✅ | reconciled |
| GitHub stars | — | — | — | 500+ |
| npm weekly downloads | — | — | — | 1,000+ |

---

## Release Roadmap

```
v0.1.0 ✅ ─── Feb 2026 ── Scaffold + core components (7)
v0.2.0 ✅ ─── Feb 2026 ── All 20 components implemented
v2.0.0 ✅ ─── Feb 2026 ── All 27 components · New Architecture (Fabric) · Full docs
               ├── Phases 3–7 delivered in compressed sprint
               ├── Storybook stories, markdown docs, Docusaurus site
               ├── Design token export (Android / iOS / CSS / Figma)
               ├── API stability guarantee + MIGRATION.md
               └── Peer deps: RN ≥0.76, React ≥18.3, Skia ≥1.3
v2.1.0 ✅ ─── Feb 2026 ── (incremental fixes, see CHANGELOG.md)
v2.2.0 ✅ ─── Mar 2026 ── Web Storybook (30 stories) · Playground · Logo/website polish
v2.3.0 🔲 ─── Target: Apr 2026
               ├── Test coverage ≥90% for all 27 components (MS-21)
               ├── Formal a11y audit — VoiceOver + TalkBack (MS-22)
               ├── Performance benchmarks — FPS, Skia, bundle size (MS-23)
               └── Documentation reconciliation — MILESTONES/PLAN/DISCUSSION sync (MS-24)
```

---

## Phase Summary

| Phase | Version | Theme | Status |
|---|---|---|---|
| 0 | pre-v0.1.0 | Scaffold, tooling, CI/CD | ✅ Complete |
| 1 | v0.1.0 | Design tokens, theme system, core components | ✅ Complete |
| 2 | v0.2.0 | All remaining stub components | ✅ Complete |
| 3 | v0.3.0 | Hardening + Stories + Batch 1 new components | ✅ Complete |
| 4 | v0.4.0 | Batch 2 new components + tests + a11y | ✅ Complete |
| 5 | v0.5.0 | API freeze + markdown docs | ✅ Complete |
| 6 | v1.0.0 | Docs site + Figma tokens + GA | ✅ Complete (shipped as v2.0.0) |
| 7 | v2.0.0 | New Architecture + performance | ✅ Complete |
| 8 | v2.1.0–v2.2.0 | Web Storybook, playground, logo/website polish | ✅ Complete |
| 9 | v2.3.0 | Tests ≥90% · A11y audit · Performance benchmarks · Doc sync | 🔲 In Progress |

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
| D-11 | Skia canvas icons use `accessibilityRole="image"` on Canvas + `"button"` on Pressable wrapper | Screen readers cannot inspect Skia paths; accessibility must live on surrounding RN Views | 2026-03 |
| D-12 | NeoPopSwipeRow action panels use `accessibilityLabel` without a role (role="group" not in RN's AccessibilityRole union) | "group" is not a valid RN AccessibilityRole in RN 0.73; label alone is sufficient for panel discovery | 2026-03 |
| D-13 | Coverage threshold set to ~75–78% globally (not ≥90%) for v2.3.0 baseline | Skia-heavy components (TiltedButton, ScoreMeter) are difficult to fully cover with mocks; threshold reflects realistic achievable coverage; will be raised progressively | 2026-03 |

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
