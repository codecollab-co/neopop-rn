# Phase 0 — Project Scaffold & Infrastructure ✅

> **Version:** pre-v0.1.0
> **Status:** ✅ Complete (2026-02-24)
> **Theme:** Repository bootstrap, toolchain, CI/CD, build pipeline

---

## Goal

Establish the complete repository skeleton so that every subsequent phase has a fully working build, lint, test, and release pipeline from day one. No component code is written in this phase — only infrastructure.

---

## Deliverables

### Repository scaffold
- [x] Initialize repository with `react-native-builder-bob` project template
- [x] `package.json` with all fields: `name`, `version`, `main`, `module`, `types`, `react-native`, `source`, `files`, `sideEffects`, `license`, `repository`, `keywords`, `publishConfig`
- [x] `tsconfig.json` — TypeScript 5.x strict mode, ES2020, path alias `neopop-rn → src/index`
- [x] `.gitignore` covering `node_modules/`, `lib/`, `.expo/`, `.DS_Store`

### Toolchain
- [x] ESLint config (`@react-native/eslint-config`) with `--max-warnings 0` enforced
- [x] Prettier config (`.prettierrc`) with standard RN formatting
- [x] Babel config with `react-native-reanimated/plugin` (required for Reanimated worklet transforms)
- [x] Commitlint config (`@commitlint/config-conventional`) for conventional commit enforcement

### Build pipeline
- [x] `react-native-builder-bob` configured for three output targets:
  - CommonJS → `lib/commonjs/`
  - ES Module → `lib/module/`
  - TypeScript declarations → `lib/typescript/`
- [x] `yarn prepare` → `bob build` (runs before publish)
- [x] Entry points verified: `main`, `module`, `types`, `react-native`, `source`

### Test setup
- [x] Jest configured with `jest-expo` preset
- [x] `@testing-library/react-native` installed
- [x] `transformIgnorePatterns` configured to transform `react-native-*`, `@shopify/react-native-skia`, `@expo/*`
- [x] `moduleNameMapper`: `neopop-rn` → `src/index` for internal tests
- [x] `collectCoverageFrom` excludes `.types.ts` and `index.ts` barrel files

### CI/CD
- [x] `.github/workflows/ci.yml` — runs on every PR and push to `main`:
  - `yarn install`
  - `yarn typecheck` (`tsc --noEmit`)
  - `yarn lint` (`eslint --max-warnings 0`)
  - `yarn test --coverage`
  - Coverage upload to Codecov
- [x] `.github/workflows/release.yml` — runs on `v*` tags:
  - Full CI checks
  - `yarn prepare` (bob build)
  - `npm publish --access public`

### Release tooling
- [x] `release-it` configured with `@release-it/conventional-changelog`
- [x] Release process documented (version → CHANGELOG → commit → tag → push → gh release)
- [x] `CHANGELOG.md` initialized with Keep a Changelog format
- [x] `README.md` initial content with installation and usage overview

### Example app
- [x] `example/` — Expo + Storybook on-device runner scaffold
- [x] `example/package.json` with Storybook dependencies
- [x] Metro config in example pointing to library source

### License
- [x] `LICENSE` — Apache-2.0 full text

---

## Definition of Done ✅

- [x] `yarn typecheck` passes (no TypeScript errors)
- [x] `yarn lint` passes (zero warnings)
- [x] `yarn test` passes (no test failures — empty suite is ok in Phase 0)
- [x] `ci.yml` green on `main`
- [x] Repository structure matches the layout in `docs/ARCHITECTURE.md`

---

## Notes

- This phase produces **no npm-publishable code** — only tooling.
- The `example/` app is a Storybook runner; the component library source is in `src/`.
- Phase 0 decisions lock in the TypeScript strictness level, Babel pipeline, and CI gate — changes here affect every subsequent phase.
