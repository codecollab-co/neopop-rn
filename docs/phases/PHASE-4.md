# Phase 4 — Batch 2 Components, Full Test Suite & Accessibility Audit 🔲

> **Version:** v0.4.0
> **Status:** 🔲 Planned (Target: April 2026)
> **Theme:** 4 new components · >90% test coverage enforced in CI · Formal WCAG 2.1 AA audit

---

## Goal

Expand the component set with four more complex components (DatePicker, Carousel, Stepper, SwipeRow), establish a comprehensive test suite that covers utilities, hooks, theme, and all 23+ components, and conduct a formal accessibility audit across the entire library.

---

## Workstreams Active This Phase

| Workstream | Focus |
|---|---|
| A — Core library | Batch 2 new components |
| B — Quality | Full test suite (>90% CI gate), ESLint additions |
| E — Accessibility | Formal WCAG 2.1 AA audit sprint |

---

## Deliverables

### MS-11 · New components batch 2 🔲

#### `NeoPopDatePicker`

- [ ] Swipeable wheel date picker with NeoPop styling
- [ ] Three columns: Day / Month / Year (or configurable locale format)
- [ ] `FlatList`-based infinite scroll wheel with haptic feedback per scroll step
- [ ] Selected item highlighted with NeoPop 3D depth effect
- [ ] `minDate` / `maxDate` constraints with clamping
- [ ] `onDateChange(date: Date)` callback
- [ ] `colorConfig` + `colorMode` + theme fallback
- [ ] `accessibilityRole` appropriate per column (picker role on native)

#### `NeoPopCarousel`

- [ ] Horizontal gesture-driven item carousel
- [ ] `Gesture.Pan()` with momentum + snap-to-item via `withSpring`
- [ ] Configurable `itemWidth`, `itemSpacing`, `centerMode` (active item centered)
- [ ] Dots/indicator pagination
- [ ] `onIndexChange(index: number)` callback
- [ ] Imperative ref API: `scrollToIndex(index, animated)` and `goNext()` / `goPrev()`
- [ ] `colorConfig` + `colorMode` + theme fallback

#### `NeoPopStepper`

- [ ] +/− quantity stepper with animated value transitions
- [ ] Value label animates with `withSpring` on change
- [ ] `min` / `max` constraints: buttons dim at limits (`disabled` state)
- [ ] `step` prop (default 1)
- [ ] `onValueChange(value: number)` callback
- [ ] Haptic feedback per step
- [ ] NeoPop 3D depth on the +/− buttons (reuses `NeoPopButton` or custom styling)
- [ ] `colorConfig` + `colorMode` + theme fallback
- [ ] `accessibilityRole="adjustable"` on the container

#### `NeoPopSwipeRow`

- [ ] Swipe-to-reveal action row
- [ ] Left and/or right hidden action panels
- [ ] `Gesture.Pan()` with threshold-based action trigger or partial reveal
- [ ] `withSpring` bounce-back on release below threshold
- [ ] Action buttons in revealed panel: customizable via `leftActions` / `rightActions` render prop
- [ ] `onSwipeLeft` / `onSwipeRight` callbacks
- [ ] `colorConfig` + `colorMode` + theme fallback

---

### MS-12 · Full test suite (>90% coverage) 🔲

#### Utility tests

- [ ] `src/utils/colorUtils.ts`
  - [ ] `hexToRGBA` — valid hex, 3-digit hex, with alpha
  - [ ] `getLuminance` — WCAG formula spot-check values
  - [ ] `isColorDark` — dark/light threshold boundary cases
  - [ ] `getContrastColor` — returns black for light, white for dark backgrounds
  - [ ] `adjustLightness` — positive/negative amount
  - [ ] `getHorizontalShadow` / `getVerticalShadow` — returns correct style object shape
  - [ ] `deriveEdgeColor` / `deriveHighlightEdgeColor` — darker/lighter than input
- [ ] `src/utils/helpers.ts`
  - [ ] `isEmpty` — null, undefined, empty string, empty array, non-empty cases
  - [ ] `isObject` — object, array, null, primitive cases
  - [ ] `mergeDeep` — shallow, 1-level deep, 3-level deep, array values
  - [ ] `getRandomInt` — in range, min=max edge case
  - [ ] `currencyFormatter` — USD, EUR, INR formatting
  - [ ] `generateTextStyle` — all FontType × FontWeight combinations return valid TextStyle
- [ ] `src/utils/haptics.ts`
  - [ ] `triggerHaptic` — calls `expo-haptics` when available
  - [ ] `triggerHaptic` — no-ops gracefully when `expo-haptics` not installed

#### Hook tests

- [ ] `useAutoFocus` — `TextInput` ref focused after delay
- [ ] `useClientHeight` — returns height after `onLayout` event fires
- [ ] `useDelayMount` — returns false before delay, true after
- [ ] `useScrollIntoView` — calls `scrollTo` on the `ScrollView` ref

#### Theme system tests

- [ ] `NeoPopProvider` — provides correct default dark theme value
- [ ] `NeoPopProvider` — provides correct default light theme value
- [ ] `NeoPopProvider` — `mergeDeep` partial override applies only to overridden keys
- [ ] `useNeoPopTheme` — returns context value; throws if used outside Provider
- [ ] `defaultDarkTheme` — all required component keys present
- [ ] `defaultLightTheme` — all required component keys present

#### Component render tests (all 23+ components)

- [ ] Renders without crashing with required props
- [ ] Snapshot test for default props
- [ ] `disabled` prop: opacity changes, press does not fire
- [ ] `colorMode` prop: component uses dark vs. light color set
- [ ] `style` prop: passed to outermost `View`
- [ ] All `accessibilityRole` values correct

#### Interaction tests (RNTL `fireEvent`)

- [ ] `NeoPopButton` — `fireEvent.press` calls `onPress`
- [ ] `NeoPopCheckbox` — press toggles `isChecked` via callback
- [ ] `NeoPopRadio` — press calls `onSelect`
- [ ] `NeoPopToggle` — press calls `onToggle`
- [ ] `NeoPopSlider` — `fireEvent` pan gesture changes value
- [ ] `NeoPopBottomSheet` — ref `.open()` shows sheet, `.close()` hides

#### Animation tests (Reanimated mock)

- [ ] `NeoPopButton` press-in: `translateX`/`translateY` reach target values
- [ ] `NeoPopCheckbox` check animation: `checkScale` reaches 1 when checked
- [ ] `NeoPopToggle` track color interpolates on state change
- [ ] `NeoPopFloatingButton` levitation starts on mount

#### CI coverage gate

- [ ] Jest coverage threshold set to 90% (branches, lines, statements, functions)
- [ ] `ci.yml` updated: fail build if any coverage metric < 90%
- [ ] Codecov badge added to `README.md`
- [ ] Coverage report uploaded on every CI run

---

### MS-13 · Accessibility (a11y) audit 🔲

#### Role audit (all components)

- [ ] `NeoPopButton` — `accessibilityRole="button"`
- [ ] `NeoPopCard` — `accessibilityRole="button"` (when `onPress` present)
- [ ] `NeoPopBack` — `accessibilityRole="button"`
- [ ] `NeoPopCheckbox` — `accessibilityRole="checkbox"`
- [ ] `NeoPopRadio` — `accessibilityRole="radio"`
- [ ] `NeoPopToggle` — `accessibilityRole="switch"`
- [ ] `NeoPopSlider` — `accessibilityRole="adjustable"`
- [ ] `NeoPopBottomSheet` — `accessibilityViewIsModal={true}` when open
- [ ] `NeoPopDropdown` — `accessibilityRole="button"` + `accessibilityState={{ expanded }}`
- [ ] `NeoPopOTPInput` — `accessibilityLabel` on each box
- [ ] `NeoPopProgressBar` — `accessibilityRole="progressbar"` + `accessibilityValue`
- [ ] `NeoPopAccordion` — `accessibilityState={{ expanded }}`
- [ ] `NeoPopStepper` — `accessibilityRole="adjustable"`
- [ ] `NeoPopToast` — `accessibilityLiveRegion="polite"`
- [ ] All icon-only buttons have `accessibilityLabel`

#### State audit (interactive components)

- [ ] All interactive components expose `accessibilityState={{ disabled }}` when `disabled=true`
- [ ] `NeoPopCheckbox` — `accessibilityState={{ checked }}`
- [ ] `NeoPopRadio` — `accessibilityState={{ checked }}`
- [ ] `NeoPopToggle` — `accessibilityState={{ checked }}`
- [ ] `NeoPopDropdown` — `accessibilityState={{ expanded }}`
- [ ] `NeoPopAccordion` — `accessibilityState={{ expanded }}`

#### Contrast ratio audit

- [ ] All text/background pairs in `defaultDarkTheme` meet WCAG 2.1 AA ≥ 4.5:1
- [ ] All text/background pairs in `defaultLightTheme` meet WCAG 2.1 AA ≥ 4.5:1
- [ ] All UI component (button, border, icon) color pairs meet ≥ 3:1
- [ ] Contrast check script or manual measurement documented

#### Screen reader testing

- [ ] iOS VoiceOver smoke test: all 23+ components
- [ ] Android TalkBack smoke test: all 23+ components
- [ ] Document findings in `docs/DISCUSSION.md`

#### Focus management

- [ ] `NeoPopBottomSheet` — traps focus when open (focus cannot move outside sheet)
- [ ] `NeoPopBottomSheet` — restores focus to trigger element on close

#### A11y documentation

- [ ] `accessibilityRole` and `accessibilityState` listed in JSDoc for each component
- [ ] `docs/` section on a11y patterns added (in `DISCUSSION.md` or separate `ACCESSIBILITY.md`)
- [ ] A11y test helpers added to `__tests__/` where feasible (e.g., test that `accessibilityRole` is set)

---

## Commit Plan

| Commit | Content |
|---|---|
| `feat: implement NeoPopDatePicker` | Batch 2 component 1 |
| `feat: implement NeoPopCarousel` | Batch 2 component 2 |
| `feat: implement NeoPopStepper` | Batch 2 component 3 |
| `feat: implement NeoPopSwipeRow` | Batch 2 component 4 |
| `test: add unit tests for utilities and hooks` | MS-12 utility + hook tests |
| `test: add unit tests for theme system` | MS-12 theme tests |
| `test: add component render and interaction tests` | MS-12 component tests |
| `test: add animation tests with Reanimated mock` | MS-12 animation tests |
| `ci: enforce >90% coverage gate in ci.yml` | Coverage gate |
| `fix(a11y): apply accessibility audit fixes across all components` | MS-13 |
| `chore(release): 0.4.0` | Version bump + CHANGELOG + tag |

---

## Definition of Done

- [ ] `NeoPopDatePicker`, `NeoPopCarousel`, `NeoPopStepper`, `NeoPopSwipeRow` implemented and exported
- [ ] `yarn test --coverage` passes with ≥90% on all metrics
- [ ] CI coverage gate active — build fails below 90%
- [ ] All 23+ components have correct `accessibilityRole` and `accessibilityState`
- [ ] WCAG 2.1 AA contrast ratios met in both default themes
- [ ] Screen reader smoke tests completed and findings documented
- [ ] `yarn typecheck` passes with zero errors
- [ ] `yarn lint` passes with zero warnings
- [ ] `v0.4.0` tagged, pushed, released to npm
- [ ] `CHANGELOG.md` updated
- [ ] `docs/MILESTONES.md` MS-11, MS-12, MS-13 checked
