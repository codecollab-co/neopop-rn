# OpenMemory — neopop-rn

> Project context and session history for AI assistants.

---

## Project Overview

**Package:** `@codecollab.co/neopop-rn`
**Current version:** 2.3.0
**License:** MIT
**Registry:** [npmjs.com](https://www.npmjs.com/package/@codecollab.co/neopop-rn)
**Repository:** [github.com/codecollab-co/neopop-rn](https://github.com/codecollab-co/neopop-rn)

A React Native implementation of the NeoPop design language (CRED's characteristic 3D, tactile, animated UI). Expo-compatible, strictly typed, fully tested, with first-class docs and Storybook stories.

---

## Architecture

- **27 components** — buttons, cards, form controls, overlays, navigation, layout, icons
- **Reanimated 3** — all 18 animated components run on the UI thread (zero JS bridge during animations)
- **Skia canvas** — 3D surfaces, tilted buttons, score meter, circular progress bar, and 3 icon components use `@shopify/react-native-skia`
- **Theme system** — `NeoPopProvider` + `useNeoPopTheme()` + `mergeDeep()` for deep partial overrides
  - 12 components are theme-aware (read from provider)
  - 9 components accept `colorConfig` prop only
- **Design tokens** — exported as CSS, Figma, Android XML, iOS Swift
- **Tree-shakeable** — `sideEffects: false`, ESM via `react-native-builder-bob`
- **Bundle size** — ~45 KB gzip (full library), ~2.2 KB avg per component

### Peer Dependencies

| Package | Min Version |
|---------|-------------|
| react | >=18.3.0 |
| react-native | >=0.76.0 |
| @shopify/react-native-skia | >=1.3.0 |
| react-native-reanimated | >=3.6.0 |
| react-native-gesture-handler | >=2.14.0 |
| expo-haptics | >=14.0.0 |

---

## Key Conventions

- **TypeScript strict** — `--noUnusedLocals`, `--noUnusedParams`
- **Tests** — `__tests__/` directory (not co-located), `@testing-library/react-native`, Jest preset `react-native`
- **Coverage thresholds** — global 75/70/65/78% (statements/branches/functions/lines)
- **Lint** — ESLint with zero warnings enforced
- **Commit style** — conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- **Barrel export** — single `src/index.ts` public API
- **@internal exports** — utils, hooks, Skia internals are deprecated, targeted for removal in v3.0

### File Structure

```
src/
  components/       # 27 component directories
  hooks/            # useClientHeight, useDelayMount, useAutoFocus, useScrollIntoView
  primitives/       # Typography, Layout (Row/Column/Spacer)
  theme/            # NeoPopProvider, defaultDark/LightTheme, types
  utils/            # helpers (mergeDeep), colorUtils, haptics
  index.ts          # public barrel export
__tests__/
  components/       # 23 test files (all components + icons + layout)
  hooks/            # 4 hook test files
  utils/            # 2 utility test files
  perf/             # performance regression tests
docs/
  components/       # 27 per-component markdown docs + NeoPopScoreMeter.md
  phases/           # PHASE-1.md through PHASE-9.md
  ACCESSIBILITY.md  # WCAG 2.1 AA audit
  ARCHITECTURE.md   # System design
  PERFORMANCE.md    # Benchmarks summary
  PLAN.md           # Master plan and decision log
  MILESTONES.md     # MS-01 through MS-24
perf/
  BENCHMARKS.md     # Raw benchmark data
  bundle-size.js    # CI bundle size tracker
storybook/          # Web Storybook (30 stories)
example/            # On-device Storybook (23 stories)
```

---

## CI/CD Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | push/PR to main | typecheck, lint, test, coverage (Codecov), bundle-size |
| `release.yml` | push `v*` tag | typecheck, lint, test, build, npm publish, GitHub release |
| `docs.yml` | push to main | deploy Docusaurus site to GitHub Pages |
| `storybook.yml` | push to main | deploy web Storybook to GitHub Pages |
| `new-arch.yml` | push/PR to main | New Architecture (Fabric) compatibility check |

---

## Session Changelog

### 2026-03-09 — Phase 9 delivery + v2.3.0 release

**MS-21 (Tests):**
- Created 23 new test files covering all 27 components + icons + layout
- Performance regression tests for `mergeDeep`, `hexToRGBA`, `generateTextStyle`, `deriveEdgeColor`, `getLuminance`
- Final: 36 suites, 389 tests, ~79% coverage
- Added Codecov badge to README.md

**MS-22 (Accessibility):**
- WCAG 2.1 AA audit across all 27 components
- Added `accessibilityRole`, `accessibilityState`, `accessibilityValue` to components missing them
- Components fixed: NeoPopInputField, NeoPopScoreMeter, NeoPopSwipeRow, NeoPopCarousel, NeoPopDatePicker, NeoPopShimmer, Chevron, Cross, Pointer
- Created `docs/ACCESSIBILITY.md`

**MS-23 (Performance):**
- Created `docs/PERFORMANCE.md` summarizing FPS, Skia render time, JS thread budget, bundle size
- Created `__tests__/perf/performance.test.ts` with CI-friendly timing assertions
- All 18 animated components verified at 60 FPS on UI thread

**MS-24 (Doc Sync):**
- Full audit of all docs against codebase (9 parallel agents)
- Fixed: CONTRIBUTING.md (thresholds, peer deps, test paths), THEMING.md (integration levels), MIGRATION.md (deprecated vs removed), ARCHITECTURE.md (workflow, counts), ACCESSIBILITY.md (#0066FF clarification), DISCUSSION.md + PLAN.md (counts)
- Created missing `docs/components/NeoPopScoreMeter.md`
- Updated `src/index.ts` @internal comments to reference v3.0

**Release:**
- Version bumped 2.2.0 -> 2.3.0
- CHANGELOG.md updated
- Committed (50 files, +4196 lines), pushed to main
- Tagged `v2.3.0`, release workflow completed successfully
- Published to npm as `@codecollab.co/neopop-rn@2.3.0`
- GitHub release created with tarball
