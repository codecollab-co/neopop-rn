# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install --legacy-peer-deps          # Install (legacy flag required for peer deps)
npm run typecheck                       # TypeScript strict check (noEmit)
npm run lint                            # ESLint, zero warnings enforced
npm run lint:fix                        # Auto-fix lint issues
npm run format                          # Prettier (100 char width, single quotes, trailing commas)
npm test                                # Jest — 36 suites, 389 tests
npm run test:watch                      # Jest watch mode
npm run test:coverage                   # Coverage report
npx jest __tests__/components/NeoPopButton.test.tsx  # Run a single test file
npm run prepare                         # Build via react-native-builder-bob (CommonJS + ESM + types)
npm run tokens                          # Regenerate design tokens (CSS, Figma, Android XML, iOS Swift)
```

Pre-commit gate: `npm run typecheck && npm run lint && npm test`

## Architecture

**Package:** `@codecollab.co/neopop-rn` — React Native NeoPop design system (27 components). Expo-compatible, WCAG 2.1 AA.

### Threading Model

- **Animations:** Reanimated 3 worklets on UI thread — zero JS bridge during animations (18 components)
- **3D/Canvas rendering:** `@shopify/react-native-skia` for NeoPop3DSurface, TiltedButton, ScoreMeter, circular ProgressBar, and 3 icons (Chevron/Cross/Pointer)
- **Gestures:** react-native-gesture-handler native driver (BottomSheet, Slider, Carousel, SwipeRow)

### Theme System

Three-level color resolution cascade used in every themed component:

```
colorConfig prop → theme context (useNeoPopTheme()) → hardcoded fallback
```

- `NeoPopProvider` wraps app with `colorMode` ('dark'|'light') and optional `theme` partial
- `mergeDeep()` handles nested partial overrides
- 12 components read from theme context; remaining components accept `colorConfig` prop only
- Theme types: `src/theme/types.ts`, defaults: `src/theme/defaultDarkTheme.ts` / `defaultLightTheme.ts`

### Component Pattern

Every component follows a 3-file structure:

```
src/components/NeoPopX/
├── NeoPopX.tsx           # Implementation
├── NeoPopX.types.ts      # Props interface + ColorConfig interface
└── index.ts              # Barrel re-export
```

All public exports go through `src/index.ts` (single barrel). Internal utils/hooks/Skia internals are exported but marked `@internal` — deprecated for v3.0 removal.

### Skia Components

Skia canvas elements are invisible to screen readers. Accessibility is provided by wrapping the canvas in a View/Pressable with correct `accessibilityRole`, `accessibilityLabel`, and `accessibilityState`.

## Testing

- **Location:** `__tests__/` directory (not co-located with source)
- **Framework:** Jest + `@testing-library/react-native`
- **Mocks required:** Every test must mock `react-native-reanimated`, `@shopify/react-native-skia`, and `expo-haptics`
- **Coverage thresholds:** global 75/70/65/78%, utils 85/75/80/90%, hooks 90/80/85/90%, NeoPopProvider 95/75/95/95%
- **Perf tests:** `__tests__/perf/performance.test.ts` — timing assertions for utility functions

## Key Conventions

- Commit style: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- TypeScript strict mode with `noUnusedLocals`/`noUnusedParams`
- Unused vars must be prefixed with `_`
- `@typescript-eslint/no-explicit-any`: error
- No `console.log` (only `console.warn`/`console.error`)
- `react-native-reanimated/plugin` must be **last** in `babel.config.js`
- `sideEffects: false` in package.json — tree-shakeable
- Haptics use `expo-haptics` with graceful fallback if not installed

## Release Process

Push a `v*` tag to trigger `.github/workflows/release.yml` which runs typecheck → lint → test → build → npm publish (via `NPM_TOKEN` secret) → GitHub release with tarball.

## Key Files

- `src/index.ts` — public API barrel (all 27 components + types + primitives + theme)
- `src/utils/colorUtils.ts` — `hexToRGBA`, `deriveEdgeColor`, `getLuminance` (hex parsing uses bitwise ops intentionally)
- `src/utils/helpers.ts` — `mergeDeep` (recursive deep merge for theme overrides)
- `src/skia/NeoPop3DSurface.tsx` — core 3D extruded surface used by Button and Card
- `perf/bundle-size.js` — CI bundle size tracker
- `docs/ACCESSIBILITY.md` — WCAG 2.1 AA audit per component
- `docs/PERFORMANCE.md` — benchmark summary (FPS, Skia, bundle size)
