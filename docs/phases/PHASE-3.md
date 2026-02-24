# Phase 3 — Hardening, Stories & Batch 1 New Components 🔲

> **Version:** v0.3.0
> **Status:** 🔲 Planned (Target: March 2026)
> **Theme:** Fix live stubs · Storybook stories for all components · 3 new components

---

## Goal

Harden the existing 20-component library (fix the `NeoPopToast` visual stub and migrate icons to Skia), write Storybook stories for every component, and add three new components from Batch 1. This phase activates all three parallel workstreams (A: Core, B: Quality/DX, C: Developer Experience).

---

## Workstreams Active This Phase

| Workstream | Focus |
|---|---|
| A — Core library | Fix stubs, migrate icons, implement Batch 1 components |
| B — Quality | ESLint rule additions, TypeScript strictness checks |
| C — Developer experience | Storybook stories, README updates |

---

## Deliverables

### MS-08 · Fix live stubs & Skia icon migration 🔲

- [ ] **`NeoPopToast.tsx`** — implement the full visual toast component:
  - [ ] Animated slide-in from bottom (or top) via `withSpring`
  - [ ] Swipe-to-dismiss via `Gesture.Pan()` (drag past threshold → hide)
  - [ ] `colorConfig` theming: background, text color, border color per toast type
  - [ ] `accessibilityLiveRegion="polite"` for screen reader announcements
  - [ ] Auto-dismiss timer (driven by `duration` prop)
  - [ ] Integration with existing `ToastProvider` + `useToast` hook (no API change)

- [ ] **`Chevron.tsx`** — replace View-based chevron with Skia `Path` rendering:
  - [ ] `Skia.Path.Make()` with `lineTo` calls for the < or > shape
  - [ ] Same props as current: `direction`, `size`, `color`, `strokeWidth`
  - [ ] No consumer API change

- [ ] **`Cross.tsx`** — replace View-based cross with Skia `Path` rendering:
  - [ ] Two diagonal lines as a single Skia `Path`
  - [ ] Same props: `size`, `color`, `strokeWidth`

- [ ] **`Pointer.tsx`** — replace View-based pointer with Skia `Path` rendering:
  - [ ] Arrow/pointer shape as Skia `Path`
  - [ ] Same props: `direction`, `size`, `color`

- [ ] **Validate `useSharedValueEffect` Skia bridge** across Skia ≥1.0 versions:
  - [ ] Test `NeoPopScoreMeter` animation on `@shopify/react-native-skia` 1.x
  - [ ] Document findings in `docs/DISCUSSION.md` (OQ-02)
  - [ ] If API is removed: implement alternative via `useDerivedValue` + JS-thread state

---

### MS-09 · Storybook stories for all 20 components 🔲

All stories live in `example/src/stories/`. Each story file must include:
- A `Default` story showing the simplest usage
- Variant stories covering the main prop combinations
- A `colorMode` decorator toggling dark/light themes via the Storybook toolbar

- [ ] `NeoPopButton.stories.tsx` — expand existing:
  - [ ] `Elevated` (default), `Flat`, `Stroke` variants
  - [ ] `WithShimmer` story
  - [ ] `Adjacent` edges (left/right/top/bottom adjacency)
  - [ ] All 3 sizes (small/medium/large)
  - [ ] `Disabled` state
  - [ ] Dark + Light themes
- [ ] `NeoPopCard.stories.tsx`
- [ ] `NeoPopShimmer.stories.tsx`
- [ ] `NeoPopTypography.stories.tsx` — all `FontType` × `FontWeight` combinations
- [ ] `NeoPopToast.stories.tsx` — trigger via `useToast` in story; show all types
- [ ] `NeoPopBack.stories.tsx`
- [ ] `NeoPopHeader.stories.tsx`
- [ ] `NeoPopTags.stories.tsx` — all semantic types + `noContainer`
- [ ] `NeoPopCheckbox.stories.tsx` — checked/unchecked, disabled, with label
- [ ] `NeoPopRadio.stories.tsx` — checked/unchecked, disabled, with label
- [ ] `NeoPopToggle.stories.tsx` — on/off, disabled, with custom drawables
- [ ] `NeoPopInputField.stories.tsx` — default, focused, error state, char count, multiline
- [ ] `NeoPopDropdown.stories.tsx` — open/closed, disabled
- [ ] `NeoPopBottomSheet.stories.tsx` — with imperative ref trigger button
- [ ] `NeoPopSlider.stories.tsx` — default, with steps, min/max labels
- [ ] `NeoPopFloatingButton.stories.tsx` — levitation, shimmer, all shapes
- [ ] `NeoPopTiltedButton.stories.tsx` — floating bob, all directions
- [ ] `NeoPopScoreMeter.stories.tsx` — animated score change demo
- [ ] Layout helpers stories: `Row`, `Column`, `PageContainer`
- [ ] Icons stories: `Chevron` (all directions), `Cross`, `Pointer`
- [ ] Storybook toolbar dark/light `colorMode` toggle decorator active in all stories
- [ ] `README.md` update: verify `yarn example ios`, `yarn example android`, `yarn example web` instructions

---

### MS-10 · New components batch 1 🔲

#### `NeoPopOTPInput`

- [ ] Multi-box OTP/PIN entry (4–8 configurable digit slots)
- [ ] Auto-advance focus to next box on digit entry
- [ ] Auto-backfill: deleting from a box focuses previous
- [ ] `mask={true}` mode — renders `•` instead of digit
- [ ] Animated border highlight on focused box (`interpolateColor` with `withTiming`)
- [ ] `keyboardType="number-pad"` + `textContentType="oneTimeCode"` for autofill
- [ ] `onComplete(code: string)` callback when all boxes filled
- [ ] `colorConfig` theming (border, background, text, focused border, error border)
- [ ] `colorMode` + theme fallback
- [ ] `accessibilityLabel` on each input box

#### `NeoPopProgressBar`

- [ ] **Horizontal variant:**
  - [ ] Track with filled portion driven by `progress` (0–1)
  - [ ] `withTiming` animation on progress change
  - [ ] Optional label showing percentage
  - [ ] NeoPop 3D edge depth on track container
- [ ] **Circular variant** (same component, `variant="circular"`):
  - [ ] Skia `Canvas` with `addArc()` arc fill
  - [ ] Animated sweep from 0 → progress × 360°
  - [ ] Optional center text (percentage or custom)
- [ ] `colorConfig` theming (track, fill, label)
- [ ] `colorMode` + theme fallback
- [ ] `accessibilityRole="progressbar"` + `accessibilityValue={{ min: 0, max: 100, now: progress * 100 }}`

#### `NeoPopAccordion`

- [ ] Collapsible section with header row + animated body
- [ ] Spring expand/collapse animation on `isExpanded`
- [ ] `Chevron` rotates 180° on expand (`withTiming`)
- [ ] Optional NeoPop 3D edge styling on header
- [ ] `onToggle` callback
- [ ] Multiple accordion instances compose without library managing open state (controlled component)
- [ ] `colorConfig` + `colorMode` + theme fallback
- [ ] `accessibilityRole="button"` + `accessibilityState={{ expanded: isExpanded }}`

---

## Commit Plan

| Commit | Content |
|---|---|
| `fix: implement NeoPopToast visual component` | Full toast UI, slide-in, swipe-dismiss |
| `feat: migrate Chevron, Cross, Pointer to Skia Path rendering` | Icon migration |
| `docs(stories): add Storybook stories for all 20 components` | MS-09 |
| `feat: implement NeoPopOTPInput` | Batch 1 component 1 |
| `feat: implement NeoPopProgressBar (horizontal + circular)` | Batch 1 component 2 |
| `feat: implement NeoPopAccordion` | Batch 1 component 3 |
| `chore(release): 0.3.0` | Version bump + CHANGELOG + tag |

---

## Definition of Done

- [ ] `NeoPopToast` visual component fully implemented, no stub
- [ ] All 3 icon components use Skia `Path` rendering
- [ ] `useSharedValueEffect` validation documented
- [ ] Storybook stories exist for all 20 existing + 3 new components (23 total)
- [ ] Storybook toolbar dark/light toggle works in all stories
- [ ] `NeoPopOTPInput`, `NeoPopProgressBar`, `NeoPopAccordion` implemented and exported from `src/index.ts`
- [ ] `yarn typecheck` passes with zero errors
- [ ] `yarn lint` passes with zero warnings
- [ ] `yarn test` passes
- [ ] `v0.3.0` tagged, pushed, released to npm
- [ ] `CHANGELOG.md` updated
- [ ] `docs/MILESTONES.md` MS-08, MS-09, MS-10 checked
- [ ] Open TODO stubs: 0 (none remaining)
