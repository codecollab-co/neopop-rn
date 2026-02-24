# Architecture — neopop-rn

> Last updated: 2026-02-24 · Version: 0.2.0

---

## 1. Project Overview

`neopop-rn` is a public, open-source React Native design-system library that ports CRED's
NeoPop visual language — originally published as four separate platform SDKs (iOS, Android, Web,
Flutter) — into a single, unified, Expo-compatible TypeScript package.

**Core promise:** Every NeoPop component, animation, and design token available from one
`import { … } from 'neopop-rn'` statement, working identically on iOS, Android, and Expo Web.

---

## 2. Technology Stack

| Layer | Technology | Why |
|---|---|---|
| Language | TypeScript 5.x (strict) | Full type safety, exported interfaces |
| Runtime | React Native ≥ 0.73 + Expo SDK ≥ 50 | Cross-platform target |
| Animation | `react-native-reanimated` ≥ 3 | UI-thread animations, zero JS jank |
| Gestures | `react-native-gesture-handler` ≥ 2 | Gesture.Pan, Gesture.Tap on UI thread |
| 2D / 3D rendering | `@shopify/react-native-skia` ≥ 1 | Parallelogram surfaces, arcs, paths |
| Haptics | `expo-haptics` ≥ 13 (optional peer) | Tactile feedback on interactive components |
| Build | `react-native-builder-bob` | CJS + ESM + TypeScript declaration outputs |
| Bundler (example) | Metro | Storybook on-device runner |
| Test | Jest (jest-expo preset) + @testing-library/react-native | Unit + integration |
| CI/CD | GitHub Actions | Typecheck + lint + test on PR; npm publish on tag |

---

## 3. Repository Layout

```
neopop-rn/
├── src/                        ← Library source (the only thing that ships to npm)
│   ├── index.ts                ← Single public barrel — everything exported here
│   ├── primitives/             ← Design tokens (no React, no RN deps)
│   ├── theme/                  ← NeoPopProvider context + dark/light presets
│   ├── utils/                  ← Color math, helpers, haptics
│   ├── hooks/                  ← Custom React hooks
│   ├── skia/                   ← Skia Canvas primitives (NeoPop3DSurface, TiltGeometry…)
│   └── components/             ← All UI components
│       ├── <ComponentName>/
│       │   ├── <ComponentName>.tsx        ← Implementation
│       │   ├── <ComponentName>.types.ts   ← Props interface
│       │   ├── <ComponentName>.stories.tsx (Phase 3+)
│       │   └── index.ts                   ← Re-export
│       ├── layout/             ← Row, Column, PageContainer, Divider, Spacers
│       └── icons/              ← Chevron, Cross, Pointer
│
├── __tests__/                  ← Jest test files (Phase 3+)
├── example/                    ← Expo + Storybook on-device runner
│   └── src/stories/            ← .stories.tsx files
├── docs/                       ← All planning, architecture, and milestone docs
│   ├── ARCHITECTURE.md         ← This file
│   ├── PLAN.md                 ← Master plan
│   ├── MILESTONES.md           ← All milestones with completion status
│   ├── DISCUSSION.md           ← Design decisions, trade-offs, open questions
│   └── phases/                 ← Per-phase detailed plans
│       ├── PHASE-0.md          ← Scaffold (✅ complete)
│       ├── PHASE-1.md          ← Core components (✅ complete)
│       ├── PHASE-2.md          ← All stubs (✅ complete)
│       ├── PHASE-3.md          ← Hardening + stories + new components
│       ├── PHASE-4.md          ← Batch 2 components + tests + a11y
│       ├── PHASE-5.md          ← Docs site + token export + API freeze
│       ├── PHASE-6.md          ← v1.0 GA
│       └── PHASE-7.md          ← v2.0 New Architecture
│
├── .github/workflows/
│   ├── ci.yml                  ← PR validation
│   └── release.yml             ← npm publish on v* tag
├── package.json                ← v0.2.0; builder-bob config; release-it config
├── tsconfig.json               ← strict, ES2020, path alias neopop-rn → src/index
├── CHANGELOG.md
└── README.md
```

---

## 4. Layer Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Consumer App                              │
│   import { NeoPopButton, NeoPopProvider, COLOR_BLACK } from …   │
└────────────────────────┬────────────────────────────────────────┘
                         │  single public barrel
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      src/index.ts                                │
│          (re-exports primitives, theme, utils, hooks,            │
│           skia primitives, and all components)                   │
└──────┬──────────┬──────────┬──────────┬──────────┬─────────────┘
       │          │          │          │          │
       ▼          ▼          ▼          ▼          ▼
  primitives   theme/     utils/     hooks/     skia/
  (tokens)   (Provider)  (color,   (focus,    (NeoPop3DSurface,
              context)   helpers,  height,    TiltGeometry,
                         haptics)  scroll)    EdgeDeriver)
                                                    │
                                        ┌───────────┘
                                        ▼
                              components/ (20 components)
                              Each component may import:
                              - primitives (tokens)
                              - theme (useNeoPopTheme)
                              - utils (deriveEdgeColor, triggerHaptic)
                              - hooks (useAutoFocus, useClientHeight)
                              - skia (NeoPop3DSurface)
                              - other components (NeoPopShimmer, NeoPopTypography,
                                                  icons, layout helpers)
```

### Dependency rules (enforced by ESLint + code review)

| Layer | May import from | May NOT import from |
|---|---|---|
| `primitives` | Nothing | Everything else |
| `theme` | `primitives`, `utils/helpers` | `components`, `hooks`, `skia` |
| `utils` | `primitives` | `theme`, `components`, `hooks`, `skia` |
| `hooks` | `primitives`, `utils` | `theme`, `components`, `skia` |
| `skia` | `primitives`, `utils` | `theme`, `components`, `hooks` |
| `components` | All layers above | Other components only via documented cross-deps |

---

## 5. Component Architecture

Every component follows the same structure:

### File anatomy

```
NeoPopButton/
├── NeoPopButton.tsx          ← Component implementation
├── NeoPopButton.types.ts     ← Exported prop interfaces only
├── NeoPopButton.stories.tsx  ← Storybook stories (Phase 3+)
│   __tests__/
│   └── NeoPopButton.test.tsx ← Unit + integration tests (Phase 3+)
└── index.ts                  ← Re-exports component + types
```

### Component contract

Every component **must**:

1. **Color resolution chain:** `colorConfig prop` → `colorMode-derived` → `theme[component]` → hardcoded fallback
2. **`disabled` state:** opacity dim (0.4) + interaction blocked
3. **`colorMode` prop:** accepts `'dark' | 'light'`, overrides global provider for that instance
4. **`style` prop:** StyleProp\<ViewStyle\> passed to the outermost View
5. **`accessibilityRole` + `accessibilityState`:** set on the interactive element
6. **JSDoc on component function + all props**
7. **No inline `console.log` / `console.warn`** (ESLint enforced)

### Animation contract

- **All shared values** are created with `useSharedValue` — never mutated on the JS thread in render
- **Animated styles** via `useAnimatedStyle` — no direct style object mutations
- **Press-in:** `withTiming` (fast, ~80 ms)
- **Press-out / spring:** `withSpring` with `BUTTON_RELEASE_DAMPING` + `BUTTON_RELEASE_STIFFNESS`
- **Loops:** `withRepeat(withSequence(…))` — always cancelled in `useEffect` cleanup

---

## 6. Theme System

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

**`ThemeConfig`** contains one key per component:
`colors`, `button`, `card`, `shimmer`, `checkbox`, `radio`, `toggle`,
`inputField`, `dropdown`, `tags`, `bottomSheet`, `floatingButton`,
`tiltedButton`, `scoreMeter`

**Override priority (per component):**
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

---

## 7. Skia Rendering Model

### NeoPop3DSurface

The core Skia primitive. Paints a 5-surface 3D box on a Skia `<Canvas>`:

```
┌─────────────────────┬───┐
│                     │ R │  ← right edge: parallelogram path
│     face (Rect)     │ i │
│                     │ g │
├─────────────────────┤ h │
│    bottom edge      └───┘
└─────────────────────────┘
```

- Face = `<Rect>` with optional `<Rect style="stroke">` border
- Each edge = `<Path>` (4-point polygon/parallelogram)
- Canvas total size = `(width + leftDepth + rightDepth) × (height + topDepth + bottomDepth)`
- Children rendered via absolute `<View>` overlay with `pointerEvents="box-none"`

### NeoPopTiltedButton geometry

`computeTiltGeometry(config)` → pure math, returns:
- `facePoints[4]` — skewed parallelogram corners
- `plunkPoints[4]` — shadow/plunk polygon (offset below-right)
- `canvasWidth`, `canvasHeight`

These points are fed directly to `Skia.Path.Make()` polygons.

### NeoPopScoreMeter arc

Built with `Skia.Path.addArc()` — semi-circular stroke arc.
Animation bridges Reanimated → Skia via `useSharedValueEffect` + `useValue`.

---

## 8. Build System

`react-native-builder-bob` produces three output targets from `src/`:

| Target | Output path | Used by |
|---|---|---|
| CommonJS | `lib/commonjs/` | Node.js / Jest |
| ES Module | `lib/module/` | Bundlers (Webpack, Metro) |
| TypeScript declarations | `lib/typescript/` | IDEs, type checking |

**Package entry points** in `package.json`:
```json
"main":         "lib/commonjs/index",
"module":       "lib/module/index",
"types":        "lib/typescript/index.d.ts",
"react-native": "src/index",
"source":       "src/index"
```

Metro and Expo always resolve `"react-native"` / `"source"` directly from `src/`,
so no build step is needed during development.

---

## 9. CI/CD Pipeline

### `ci.yml` — runs on every PR + push to `main`

```
checkout → node 20 → yarn install
    → yarn typecheck (tsc --noEmit)
    → yarn lint (eslint --max-warnings 0)
    → yarn test --coverage
    → upload coverage to Codecov
```

### `release.yml` — runs on `v*` tags

```
checkout → node 20 → yarn install
    → yarn typecheck
    → yarn lint
    → yarn test
    → yarn prepare (bob build)
    → npm publish --access public
```

**Release flow:**
1. Update `package.json` version
2. Update `CHANGELOG.md`
3. `git commit -m "chore(release): X.Y.Z"`
4. `git tag vX.Y.Z && git push && git push --tags`
5. `gh release create vX.Y.Z --notes-file …`
6. Tag triggers `release.yml` → npm publish

---

## 10. Known Technical Debt

| Item | Location | Priority |
|---|---|---|
| `NeoPopToast.tsx` is a stub — `ToastProvider` + `useToast` exist but the visual component is unimplemented | `src/components/NeoPopToast/NeoPopToast.tsx` | High |
| `Chevron`, `Cross`, `Pointer` are View-based — TODO comments note they should use Skia paths | `src/components/icons/` | Medium |
| `useSharedValueEffect` Skia bridge in `NeoPopScoreMeter` — API stability across Skia versions needs validation | `src/components/NeoPopScoreMeter/` | Medium |
| Zero test files | `__tests__/` (empty) | High |
| Only 1 Storybook story (NeoPopButton) | `example/src/stories/` | Medium |
| `delayTouchEvents` prop on NeoPopFloatingButton is declared in types but not implemented | `NeoPopFloatingButton.types.ts` | Low |

---

## 11. Versioning Policy

`neopop-rn` follows [Semantic Versioning](https://semver.org):

| Version range | Guarantee |
|---|---|
| `0.x.y` | No stability guarantee. Props may change between minor versions. |
| `1.0.0` | Stable public API. Breaking changes only in major versions. |
| `2.0.0+` | Major = breaking changes (prop renames, removed components, RN peer dep bumps). |

**Stable API freeze** happens at v1.0.0 — after that, any prop rename or removal requires
a deprecation notice for one minor version before removal.
