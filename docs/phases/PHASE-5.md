# Phase 5 — API Stability Freeze & Markdown Documentation 🔲

> **Version:** v0.5.0
> **Status:** 🔲 Planned (Target: May 2026)
> **Theme:** Lock the public API · Write comprehensive per-component markdown docs

---

## Goal

Audit and lock the public API surface before the v1.0 stability guarantee. Write full markdown documentation for every component and create the theming, token, and contribution guides. After this phase, consumers can build on `neopop-rn` knowing props will not change in v1.0.

---

## Workstreams Active This Phase

| Workstream | Focus |
|---|---|
| A — Core library | API audit, deprecation notices, `src/index.ts` cleanup |
| B — Quality | TypeScript `export type` audit, `@internal` JSDoc tags |
| D — Documentation | Per-component docs, theming guide, token reference, CONTRIBUTING.md |

---

## Deliverables

### MS-14 · API stability freeze 🔲

#### Full prop-interface audit

- [ ] Review every exported component's props for:
  - [ ] No ambiguous prop names (e.g., `onPress` is consistent everywhere, not mixed with `onTap`)
  - [ ] No redundant props that duplicate each other's function
  - [ ] No undocumented props without JSDoc
  - [ ] No props accepting `any` — replace with specific types
- [ ] Resolve open question OQ-04: `NeoPopFloatingButton.delayTouchEvents` — implement or remove
- [ ] Resolve open question OQ-03: icon components `style` prop decision
- [ ] Resolve open question OQ-01: `NeoPopToast` queue vs. replace behavior

#### Deprecation notices

- [ ] Add `@deprecated` JSDoc tags to any props being renamed or removed in v1.0
- [ ] Each deprecated prop: keep working, emit `console.warn` in dev mode with migration note
- [ ] List all deprecations in `docs/MIGRATION.md`

#### `src/index.ts` audit

- [ ] Verify every export is intentional and part of the public API
- [ ] Remove any accidentally exported internal types or utility functions
- [ ] Add `@internal` JSDoc tag on all helpers that are exported for internal cross-component use but should not be consumed externally

#### TypeScript export type audit

- [ ] All type-only re-exports use `export type { ... }` (TypeScript 3.8+)
- [ ] Run `tsc --isolatedModules` compatibility check
- [ ] Verify no value exports are accidentally treated as type-only

#### Final typecheck

- [ ] `yarn typecheck` passes with zero errors in strict mode + `--noUnusedLocals` + `--noUnusedParameters`
- [ ] All 27+ component `.types.ts` files have full JSDoc on every prop

---

### MS-15 · Markdown docs coverage 🔲

#### Per-component docs (`docs/components/`)

One markdown file per component. Each file must contain:

- [ ] `NeoPopButton.md`
  - [ ] Component description + use case
  - [ ] Prop table (all props, types, defaults, description)
  - [ ] Usage code example — dark mode
  - [ ] Usage code example — light mode
  - [ ] Theming / `colorConfig` section with all available color keys
  - [ ] Known limitations / gotchas
- [ ] `NeoPopCard.md`
- [ ] `NeoPopShimmer.md`
- [ ] `NeoPopTypography.md` — includes FontType × FontWeight reference table
- [ ] `NeoPopToast.md` — includes `ToastProvider` setup + `useToast` API
- [ ] `NeoPopBack.md`
- [ ] `NeoPopHeader.md`
- [ ] `NeoPopTags.md` — includes semantic type color reference
- [ ] `NeoPopCheckbox.md`
- [ ] `NeoPopRadio.md`
- [ ] `NeoPopToggle.md`
- [ ] `NeoPopInputField.md` — includes `InputMode` reference table
- [ ] `NeoPopDropdown.md`
- [ ] `NeoPopBottomSheet.md` — includes imperative ref API
- [ ] `NeoPopSlider.md`
- [ ] `NeoPopFloatingButton.md` — includes imperative ref API
- [ ] `NeoPopTiltedButton.md` — includes geometry / `tiltDirection` explanation
- [ ] `NeoPopScoreMeter.md` — includes animation bridge explanation
- [ ] `NeoPopOTPInput.md`
- [ ] `NeoPopProgressBar.md` — horizontal + circular variants
- [ ] `NeoPopAccordion.md`
- [ ] `NeoPopDatePicker.md`
- [ ] `NeoPopCarousel.md` — includes imperative ref API
- [ ] `NeoPopStepper.md`
- [ ] `NeoPopSwipeRow.md`
- [ ] Layout helpers: `Row.md`, `Column.md`, `PageContainer.md`
- [ ] Icons: `Chevron.md`, `Cross.md`, `Pointer.md`

#### Supporting guides

- [ ] `docs/THEMING.md` — comprehensive theming guide:
  - [ ] How `NeoPopProvider` works
  - [ ] `mergeDeep` override system with examples
  - [ ] Dark vs. light default themes side-by-side comparison
  - [ ] Per-component `colorConfig` deep-dive with all keys
  - [ ] Custom theme example (brand-specific override)
- [ ] `docs/TOKENS.md` — full design token reference:
  - [ ] All color tokens with hex values and visual swatches (ASCII or image)
  - [ ] Spacing tokens table
  - [ ] Typography tokens table (FontType × FontWeight)
  - [ ] Opacity scale
  - [ ] Button size tokens
- [ ] `docs/CONTRIBUTING.md` — contributor guide:
  - [ ] Setting up the development environment
  - [ ] Running the example app
  - [ ] Running tests and coverage
  - [ ] Commit message conventions (Conventional Commits)
  - [ ] PR checklist (typecheck, lint, test, story, docs)
  - [ ] How to add a new component (file structure, architectural contract)
  - [ ] Code of conduct reference
- [ ] `docs/MIGRATION.md` — v0.x → v1.0 migration guide:
  - [ ] All deprecated props and their replacements
  - [ ] Any removed exports
  - [ ] Peer dependency version bumps required

#### README update

- [ ] `README.md` updated to link to all docs pages
- [ ] Installation section updated with all peer deps + exact version ranges
- [ ] Quick start example updated to reflect full API as of v0.5.0

---

## Commit Plan

| Commit | Content |
|---|---|
| `refactor: API audit — resolve ambiguous/redundant props` | MS-14 prop audit |
| `refactor: audit src/index.ts — add @internal tags, fix export types` | MS-14 barrel audit |
| `deprecate: add @deprecated JSDoc + console.warn for renamed props` | MS-14 deprecations |
| `docs: per-component markdown documentation` | MS-15 component docs |
| `docs: THEMING.md, TOKENS.md, CONTRIBUTING.md` | MS-15 supporting guides |
| `docs: MIGRATION.md — v0.x → v1.0 guide` | MS-15 migration guide |
| `docs: update README with links to all docs` | README refresh |
| `chore(release): 0.5.0` | Version bump + CHANGELOG + tag |

---

## Definition of Done

- [ ] All prop ambiguities resolved; no `any` types in exported APIs
- [ ] All deprecated props documented with `@deprecated` + `console.warn`
- [ ] `src/index.ts` exports only intentional public API
- [ ] All type-only re-exports use `export type`
- [ ] `MIGRATION.md` documents all v0.x → v1.0 breaking changes
- [ ] Per-component markdown docs exist for all 27+ components + layout + icons
- [ ] `docs/THEMING.md`, `docs/TOKENS.md`, `docs/CONTRIBUTING.md` complete
- [ ] `README.md` links updated
- [ ] `yarn typecheck` passes with zero errors
- [ ] `yarn lint` passes with zero warnings
- [ ] `yarn test --coverage` passes ≥90%
- [ ] `v0.5.0` tagged, pushed, released to npm
- [ ] `CHANGELOG.md` updated
- [ ] `docs/MILESTONES.md` MS-14 and MS-15 checked
