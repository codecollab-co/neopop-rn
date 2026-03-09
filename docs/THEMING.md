# Theming Guide

neopop-rn ships a fully typed, context-driven theming system that lets you apply
a consistent visual language across every component without touching individual
component props.

---

## Table of Contents

1. [NeoPopProvider](#neopopprovider)
2. [The mergeDeep override system](#the-mergedeep-override-system)
3. [Dark vs light default themes](#dark-vs-light-default-themes)
4. [Per-component colorConfig keys](#per-component-colorconfig-keys)
5. [Custom theme example](#custom-theme-example)

---

## NeoPopProvider

Wrap your application (or any subtree) with `NeoPopProvider` to establish the
active color mode and supply theme defaults to every neopop-rn component
rendered beneath it.

```tsx
import { NeoPopProvider } from '@codecollab.co/neopop-rn';

export default function App() {
  return (
    <NeoPopProvider colorMode="dark">
      <YourApp />
    </NeoPopProvider>
  );
}
```

### Props

| Prop        | Type                    | Default  | Description                                                        |
|-------------|-------------------------|----------|--------------------------------------------------------------------|
| `colorMode` | `'dark' \| 'light'`    | `'dark'` | Selects the base theme. All components inherit this value.         |
| `theme`     | `Partial<ThemeConfig>`  | —        | Partial overrides deep-merged on top of the selected base theme.   |
| `children`  | `React.ReactNode`       | —        | Required. The subtree that receives the theme.                     |

### How it works internally

1. `colorMode` selects either `defaultDarkTheme` or `defaultLightTheme` as the
   base.
2. If a `theme` prop is provided it is recursively deep-merged into the base
   using `mergeDeep`, so you only need to supply the keys you want to change.
3. The resolved theme object is stored in a React context
   (`NeoPopContext`) and consumed by `useNeoPopTheme()` inside each component.

```ts
// Simplified implementation (src/theme/NeoPopProvider.tsx)
const base = colorMode === 'dark' ? defaultDarkTheme : defaultLightTheme;
const resolved = useMemo(() => mergeDeep({ ...base }, theme ?? {}), [colorMode, theme]);
```

### Reading the theme in your own components

```tsx
import { useNeoPopTheme } from '@codecollab.co/neopop-rn';

function MyWidget() {
  const theme = useNeoPopTheme();
  return (
    <View style={{ backgroundColor: theme.colors?.background as string }}>
      {/* ... */}
    </View>
  );
}
```

### Per-component colorMode override

Individual components accept a `colorMode` prop that overrides the provider
value for that component only. This is useful when a light-mode card needs to
live inside a dark-mode screen.

```tsx
<NeoPopProvider colorMode="dark">
  <NeoPopButton colorMode="light" />   {/* renders in light mode */}
  <NeoPopCard />                        {/* inherits dark mode */}
</NeoPopProvider>
```

---

## The mergeDeep override system

`mergeDeep` performs a recursive deep merge. Plain objects are merged key by key;
all other values (primitives, arrays) are replaced.

```ts
// src/utils/helpers.ts
export function mergeDeep<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T
```

### Merge behaviour

| Scenario                              | Result                                 |
|---------------------------------------|----------------------------------------|
| Key exists in base only               | Key is kept from base                  |
| Key exists in override only           | Key is added from override             |
| Both values are plain objects         | Objects are recursively merged         |
| Override value is a primitive/array   | Override value replaces the base value |
| Override value is `undefined`         | Key is kept from base (no-op)          |

### Examples

**Override a single token**

```tsx
<NeoPopProvider
  colorMode="dark"
  theme={{ button: { color: '#7C5CFC' } }}
>
  <App />
</NeoPopProvider>
```

The rest of `button` (edgeColors, borderColor, disabledColor, disabledEdgeColor)
stays unchanged from the dark default.

**Override global surface colors**

```tsx
<NeoPopProvider
  colorMode="light"
  theme={{
    colors: {
      background: '#F5F0FF',
      text:       '#20104D',
    },
  }}
>
  <App />
</NeoPopProvider>
```

**Override nested toggle colors**

```tsx
<NeoPopProvider
  colorMode="dark"
  theme={{
    toggle: {
      on: { switchBackground: '#7C5CFC', switchBorder: '#7C5CFC' },
    },
  }}
>
  <App />
</NeoPopProvider>
```

Because `mergeDeep` recurses into `toggle.on`, the remaining keys
(`buttonBackground`, `buttonBorder`, `buttonMarkBackground`) keep their dark
defaults. The `toggle.off` sub-object is untouched.

---

## Dark vs light default themes

The table below compares every key in `defaultDarkTheme` and `defaultLightTheme`
side by side.

### Global surface colors (`colors`)

| Key          | Dark                    | Light                   |
|--------------|-------------------------|-------------------------|
| `background` | `#0d0d0d` (COLOR_BLACK) | `#ffffff` (COLOR_WHITE) |
| `surface`    | `#161616` (POP_BLACK[300]) | `#EFEFEF` (POP_WHITE[300]) |
| `text`       | `#ffffff` (COLOR_WHITE) | `#0d0d0d` (COLOR_BLACK) |
| `subtext`    | `#8A8A8A` (POP_BLACK[100]) | `#8A8A8A` (POP_BLACK[100]) |
| `border`     | `#3D3D3D` (POP_BLACK[200]) | `#D2D2D2` (POP_WHITE[100]) |

### NeoPopButton (`button`)

| Key                | Dark                        | Light                       |
|--------------------|-----------------------------|-----------------------------|
| `color`            | `#ffffff`                   | `#0d0d0d`                   |
| `edgeColors.bottom`| `#8A8A8A` (POP_BLACK[100])  | `#8A8A8A` (POP_BLACK[100])  |
| `edgeColors.right` | `#8A8A8A` (POP_BLACK[100])  | `#8A8A8A` (POP_BLACK[100])  |
| `borderColor`      | `#ffffff`                   | `#0d0d0d`                   |
| `disabledColor`    | `#8A8A8A` (POP_BLACK[100])  | `#D2D2D2` (POP_WHITE[100])  |
| `disabledEdgeColor`| `#3D3D3D` (POP_BLACK[200])  | `#E0E0E0` (POP_WHITE[200])  |

### NeoPopCard (`card`)

| Key                | Dark                        | Light                       |
|--------------------|-----------------------------|-----------------------------|
| `color`            | `#161616` (POP_BLACK[300])  | `#ffffff`                   |
| `edgeColors.bottom`| `#3D3D3D` (POP_BLACK[200])  | `#D2D2D2` (POP_WHITE[100])  |
| `edgeColors.right` | `#3D3D3D` (POP_BLACK[200])  | `#D2D2D2` (POP_WHITE[100])  |
| `borderColor`      | `#3D3D3D` (POP_BLACK[200])  | `#D2D2D2` (POP_WHITE[100])  |

### NeoPopShimmer (`shimmer`)

| Key     | Dark                          | Light                     |
|---------|-------------------------------|---------------------------|
| `color` | `rgba(255,248,229,0.49)`      | `rgba(255,255,255,0.6)`   |

### NeoPopCheckbox (`checkbox`)

| Key                  | Dark                       | Light                      |
|----------------------|----------------------------|----------------------------|
| `background`         | `#ffffff`                  | `#0d0d0d`                  |
| `border`             | `#ffffff`                  | `#0d0d0d`                  |
| `checkmarkColor`     | `#0d0d0d`                  | `#ffffff`                  |
| `leftPlunk`          | `#8A8A8A` (POP_BLACK[100]) | `#3D3D3D` (POP_BLACK[200]) |
| `topPlunk`           | `#8A8A8A` (POP_BLACK[100]) | `#3D3D3D` (POP_BLACK[200]) |
| `disabledBackground` | `#8A8A8A` (POP_BLACK[100]) | `#D2D2D2` (POP_WHITE[100]) |

### NeoPopRadio (`radio`)

| Key             | Dark                       | Light                      |
|-----------------|----------------------------|----------------------------|
| `background`    | `#0d0d0d`                  | `#ffffff`                  |
| `border`        | `#ffffff`                  | `#0d0d0d`                  |
| `plunk`         | `#8A8A8A` (POP_BLACK[100]) | `#D2D2D2` (POP_WHITE[100]) |
| `dotBackground` | `#ffffff`                  | `#0d0d0d`                  |

### NeoPopToggle — on state (`toggle.on`)

| Key                   | Dark         | Light        |
|-----------------------|--------------|--------------|
| `switchBackground`    | `#06C270`    | `#06C270`    |
| `switchBorder`        | `#06C270`    | `#06C270`    |
| `buttonBackground`    | `#ffffff`    | `#ffffff`    |
| `buttonBorder`        | `#ffffff`    | `#ffffff`    |
| `buttonMarkBackground`| `#06C270`    | `#06C270`    |

### NeoPopToggle — off state (`toggle.off`)

| Key                   | Dark                        | Light                       |
|-----------------------|-----------------------------|------------------------------|
| `switchBackground`    | `#3D3D3D` (POP_BLACK[200])  | `#E0E0E0` (POP_WHITE[200])   |
| `switchBorder`        | `#8A8A8A` (POP_BLACK[100])  | `#D2D2D2` (POP_WHITE[100])   |
| `buttonBackground`    | `#E0E0E0` (POP_WHITE[200])  | `#8A8A8A` (POP_BLACK[100])   |
| `buttonBorder`        | `#E0E0E0` (POP_WHITE[200])  | `#8A8A8A` (POP_BLACK[100])   |
| `buttonMarkBackground`| `#8A8A8A` (POP_BLACK[100])  | `#D2D2D2` (POP_WHITE[100])   |

### NeoPopInputField (`inputField`)

| Key                  | Dark                       | Light                      |
|----------------------|----------------------------|----------------------------|
| `textColor`          | `#ffffff`                  | `#0d0d0d`                  |
| `labelColor`         | `#8A8A8A` (POP_BLACK[100]) | `#8A8A8A` (POP_BLACK[100]) |
| `caretColor`         | `#ffffff`                  | `#0d0d0d`                  |
| `errorColor`         | `#EE4D37` (SEMANTIC_ERROR[4]) | `#EE4D37` (SEMANTIC_ERROR[4]) |
| `placeholderColor`   | `#8A8A8A` (POP_BLACK[100]) | `#8A8A8A` (POP_BLACK[100]) |
| `borderColor`        | `#3D3D3D` (POP_BLACK[200]) | `#D2D2D2` (POP_WHITE[100]) |
| `activeBorderColor`  | `#ffffff`                  | `#0d0d0d`                  |
| `backgroundColor`    | `#0d0d0d`                  | `#ffffff`                  |

### NeoPopDropdown (`dropdown`)

| Key          | Dark                       | Light                      |
|--------------|----------------------------|----------------------------|
| `border`     | `#3D3D3D` (POP_BLACK[200]) | `#D2D2D2` (POP_WHITE[100]) |
| `text`       | `#ffffff`                  | `#0d0d0d`                  |
| `chevron`    | `#ffffff`                  | `#0d0d0d`                  |
| `background` | `#0d0d0d`                  | `#ffffff`                  |

### NeoPopTags (`tags`)

| Key          | Dark                        | Light                       |
|--------------|-----------------------------|-----------------------------|
| `background` | `#161616` (POP_BLACK[300])  | `#EFEFEF` (POP_WHITE[300])  |
| `color`      | `#ffffff`                   | `#0d0d0d`                   |

### NeoPopBottomSheet (`bottomSheet`)

| Key            | Dark                        | Light                       |
|----------------|-----------------------------|-----------------------------|
| `background`   | `#161616` (POP_BLACK[300])  | `#ffffff`                   |
| `notchColor`   | `#3D3D3D` (POP_BLACK[200])  | `#D2D2D2` (POP_WHITE[100])  |
| `overlayColor` | `rgba(0,0,0,0.7)`           | `rgba(0,0,0,0.4)`           |
| `plunkColor`   | `#8A8A8A` (POP_BLACK[100])  | `#D2D2D2` (POP_WHITE[100])  |

### NeoPopFloatingButton (`floatingButton`)

| Key            | Dark                       | Light                      |
|----------------|----------------------------|----------------------------|
| `color`        | `#ffffff`                  | `#0d0d0d`                  |
| `borderColor`  | `#ffffff`                  | `#0d0d0d`                  |
| `edgeColor`    | `#8A8A8A` (POP_BLACK[100]) | `#D2D2D2` (POP_WHITE[100]) |
| `shadowColor`  | `#3D3D3D` (POP_BLACK[200]) | `#E0E0E0` (POP_WHITE[200]) |
| `disabledColor`| `#8A8A8A` (POP_BLACK[100]) | `#D2D2D2` (POP_WHITE[100]) |

### NeoPopTiltedButton (`tiltedButton`)

| Key           | Dark                       | Light                      |
|---------------|----------------------------|----------------------------|
| `color`       | `#ffffff`                  | `#0d0d0d`                  |
| `plunkColor`  | `#8A8A8A` (POP_BLACK[100]) | `#D2D2D2` (POP_WHITE[100]) |
| `shadowColor` | `#3D3D3D` (POP_BLACK[200]) | `#E0E0E0` (POP_WHITE[200]) |
| `borderColor` | `#ffffff`                  | `#0d0d0d`                  |

### NeoPopScoreMeter (`scoreMeter`)

| Key                        | Dark                           | Light                          |
|----------------------------|--------------------------------|--------------------------------|
| `meterStrokeColor.excellent`| `#06C270` (SEMANTIC_SUCCESS[4])| `#06C270` (SEMANTIC_SUCCESS[4])|
| `meterStrokeColor.average` | `#F5A623`                      | `#F5A623`                      |
| `meterStrokeColor.poor`    | `#EE4D37` (SEMANTIC_ERROR[4])  | `#EE4D37` (SEMANTIC_ERROR[4])  |
| `meterStrokeBackground`    | `#3D3D3D` (POP_BLACK[200])     | `#D2D2D2` (POP_WHITE[100])     |
| `dotColor`                 | `#ffffff`                      | `#0d0d0d`                      |
| `scoreColor`               | `#ffffff`                      | `#0d0d0d`                      |
| `scoreContainerBackground` | `#0d0d0d`                      | `#ffffff`                      |
| `scoreContainerBorder`     | `#3D3D3D` (POP_BLACK[200])     | `#D2D2D2` (POP_WHITE[100])     |

---

## Per-component colorConfig keys

Every entry in `ThemeConfig` maps directly to a typed interface exported from
`src/theme/types.ts`. The table below lists every interface and its fields.

### Theme integration levels

Components fall into two categories based on how they consume color configuration:

**Theme-aware components** — these call `useNeoPopTheme()` internally and read
default colors from the theme provider. Passing a `colorConfig` prop overrides
the theme values:

`NeoPopButton`, `NeoPopCard`, `NeoPopCheckbox`, `NeoPopRadio`, `NeoPopToggle`,
`NeoPopInputField`, `NeoPopDropdown`, `NeoPopTags`, `NeoPopBottomSheet`,
`NeoPopFloatingButton`, `NeoPopTiltedButton`, `NeoPopScoreMeter`

**colorConfig-only components** — these accept a `colorConfig` prop but do
**not** read from `NeoPopProvider`. They use built-in defaults when
`colorConfig` is omitted. The `ThemeConfig` interface defines keys for these
components for forward-compatibility, but they are not currently consumed
via the provider:

`NeoPopOTPInput`, `NeoPopProgressBar`, `NeoPopAccordion`, `NeoPopStepper`,
`NeoPopCarousel`, `NeoPopDatePicker`, `NeoPopSwipeRow`, `NeoPopShimmer`,
`NeoPopToast`

### `ThemeConfig` top-level keys

| Key              | Interface                          | Required | Theme-aware |
|------------------|------------------------------------|----------|-------------|
| `colorMode`      | `'dark' \| 'light'`               | Yes      | —           |
| `colors`         | global surface object (see below)  | No       | Yes         |
| `button`         | `NeoPopButtonColorConfig`          | No       | Yes         |
| `card`           | `NeoPopCardColorConfig`            | No       | Yes         |
| `shimmer`        | `NeoPopShimmerColorConfig`         | No       | No          |
| `checkbox`       | `NeoPopCheckboxColorConfig`        | No       | Yes         |
| `radio`          | `NeoPopRadioColorConfig`           | No       | Yes         |
| `toggle`         | `NeoPopToggleColorConfig`          | No       | Yes         |
| `inputField`     | `NeoPopInputFieldColorConfig`      | No       | Yes         |
| `dropdown`       | `NeoPopDropdownColorConfig`        | No       | Yes         |
| `tags`           | `NeoPopTagsColorConfig`            | No       | Yes         |
| `bottomSheet`    | `NeoPopBottomSheetColorConfig`     | No       | Yes         |
| `floatingButton` | `NeoPopFloatingButtonColorConfig`  | No       | Yes         |
| `tiltedButton`   | `NeoPopTiltedButtonColorConfig`    | No       | Yes         |
| `scoreMeter`     | `NeoPopScoreMeterColorConfig`      | No       | Yes         |
| `otpInput`       | `NeoPopOTPInputColorConfig`        | No       | No          |
| `progressBar`    | `NeoPopProgressBarColorConfig`     | No       | No          |
| `accordion`      | `NeoPopAccordionColorConfig`       | No       | No          |
| `stepper`        | `NeoPopStepperColorConfig`         | No       | No          |
| `carousel`       | `NeoPopCarouselColorConfig`        | No       | No          |
| `datePicker`     | `NeoPopDatePickerColorConfig`      | No       | No          |
| `swipeRow`       | `NeoPopSwipeRowColorConfig`        | No       | No          |

### `colors` (global surface)

| Field        | Type         |
|--------------|--------------|
| `background` | `ColorValue` |
| `surface`    | `ColorValue` |
| `text`       | `ColorValue` |
| `subtext`    | `ColorValue` |
| `border`     | `ColorValue` |

### `EdgeColors`

Shared by button and card `edgeColors`.

| Field    | Type     |
|----------|----------|
| `top`    | `string` |
| `right`  | `string` |
| `bottom` | `string` |
| `left`   | `string` |

### `NeoPopButtonColorConfig`

| Field              | Type        |
|--------------------|-------------|
| `color`            | `string`    |
| `edgeColors`       | `EdgeColors`|
| `borderColor`      | `string`    |
| `disabledColor`    | `string`    |
| `disabledEdgeColor`| `string`    |

### `NeoPopCardColorConfig`

| Field        | Type        |
|--------------|-------------|
| `color`      | `string`    |
| `edgeColors` | `EdgeColors`|
| `borderColor`| `string`    |

### `NeoPopShimmerColorConfig`

| Field   | Type     |
|---------|----------|
| `color` | `string` |

### `NeoPopCheckboxColorConfig`

| Field                | Type     |
|----------------------|----------|
| `background`         | `string` |
| `border`             | `string` |
| `checkmarkColor`     | `string` |
| `leftPlunk`          | `string` |
| `topPlunk`           | `string` |
| `disabledBackground` | `string` |

### `NeoPopRadioColorConfig`

| Field                            | Type     |
|----------------------------------|----------|
| `background`                     | `string` |
| `border`                         | `string` |
| `plunk`                          | `string` |
| `dotBackground`                  | `string` |
| `containerConfig.borderColor`    | `string` |
| `containerConfig.backgroundColor`| `string` |
| `containerConfig.activeBackgroundColor` | `string` |
| `containerConfig.activeBorderColor` | `string` |
| `containerConfig.color`          | `string` |

### `NeoPopToggleColorConfig`

Contains two sub-objects, each of type `NeoPopToggleOnOffColors`.

**`NeoPopToggleOnOffColors`** (applies to both `on` and `off`):

| Field                 | Type     |
|-----------------------|----------|
| `switchBackground`    | `string` |
| `switchBorder`        | `string` |
| `buttonBackground`    | `string` |
| `buttonBorder`        | `string` |
| `buttonMarkBackground`| `string` |

### `NeoPopInputFieldColorConfig`

| Field               | Type     |
|---------------------|----------|
| `textColor`         | `string` |
| `labelColor`        | `string` |
| `caretColor`        | `string` |
| `errorColor`        | `string` |
| `placeholderColor`  | `string` |
| `borderColor`       | `string` |
| `activeBorderColor` | `string` |
| `backgroundColor`   | `string` |

### `NeoPopDropdownColorConfig`

| Field        | Type     |
|--------------|----------|
| `border`     | `string` |
| `text`       | `string` |
| `chevron`    | `string` |
| `background` | `string` |

### `NeoPopTagsColorConfig`

| Field        | Type     |
|--------------|----------|
| `background` | `string` |
| `color`      | `string` |

### `NeoPopToastColorConfig`

> **Note:** NeoPopToast does not read from the theme provider. Pass `colorConfig` directly as a prop. No default theme values are applied via `NeoPopProvider`.

| Field        | Type     |
|--------------|----------|
| `background` | `string` |
| `color`      | `string` |

### `NeoPopBottomSheetColorConfig`

| Field          | Type     |
|----------------|----------|
| `background`   | `string` |
| `notchColor`   | `string` |
| `overlayColor` | `string` |
| `plunkColor`   | `string` |

### `NeoPopFloatingButtonColorConfig`

| Field           | Type     |
|-----------------|----------|
| `color`         | `string` |
| `borderColor`   | `string` |
| `edgeColor`     | `string` |
| `shadowColor`   | `string` |
| `disabledColor` | `string` |

### `NeoPopTiltedButtonColorConfig`

| Field         | Type     |
|---------------|----------|
| `color`       | `string` |
| `plunkColor`  | `string` |
| `shadowColor` | `string` |
| `borderColor` | `string` |

### `NeoPopOTPInputColorConfig`

| Field               | Type     |
|---------------------|----------|
| `borderColor`       | `string` |
| `activeBorderColor` | `string` |
| `errorBorderColor`  | `string` |
| `backgroundColor`   | `string` |
| `textColor`         | `string` |

### `NeoPopProgressBarColorConfig`

| Field        | Type     |
|--------------|----------|
| `trackColor` | `string` |
| `fillColor`  | `string` |
| `labelColor` | `string` |

### `NeoPopAccordionColorConfig`

| Field              | Type     |
|--------------------|----------|
| `headerBackground` | `string` |
| `headerTextColor`  | `string` |
| `chevronColor`     | `string` |
| `bodyBackground`   | `string` |
| `edgeColor`        | `string` |

### `NeoPopStepperColorConfig`

| Field            | Type     |
|------------------|----------|
| `background`     | `string` |
| `buttonColor`    | `string` |
| `buttonEdgeColor`| `string` |
| `textColor`      | `string` |
| `disabledColor`  | `string` |

### `NeoPopCarouselColorConfig`

| Field           | Type     |
|-----------------|----------|
| `dotColor`      | `string` |
| `activeDotColor`| `string` |

### `NeoPopDatePickerColorConfig`

| Field                | Type     |
|----------------------|----------|
| `background`         | `string` |
| `textColor`          | `string` |
| `selectedTextColor`  | `string` |
| `selectedBackground` | `string` |
| `separatorColor`     | `string` |

### `NeoPopSwipeRowColorConfig`

| Field                   | Type     |
|-------------------------|----------|
| `background`            | `string` |
| `leftActionBackground`  | `string` |
| `rightActionBackground` | `string` |

### `NeoPopScoreMeterColorConfig`

| Field                           | Type     |
|---------------------------------|----------|
| `meterStrokeColor.excellent`    | `string` |
| `meterStrokeColor.average`      | `string` |
| `meterStrokeColor.poor`         | `string` |
| `meterStrokeBackground`         | `string` |
| `meterBorderColor`              | `string` |
| `dotColor`                      | `string` |
| `indicatorColors.neutral`       | `string` |
| `indicatorColors.increment`     | `string` |
| `indicatorColors.decrement`     | `string` |
| `scoreContainerBackground`      | `string` |
| `scoreContainerBorder`          | `string` |
| `scoreColor`                    | `string` |

---

## Custom theme example

The example below shows a complete brand-specific theme (the fictional
"Polaris" brand uses deep purple as its primary color).

```tsx
import {
  NeoPopProvider,
  defaultDarkTheme,
  type ThemeConfig,
} from '@codecollab.co/neopop-rn';

// 1. Define your brand palette constants.
const BRAND_PRIMARY   = '#7C5CFC';   // Polaris purple
const BRAND_SECONDARY = '#5B35D5';
const BRAND_BG        = '#0E0A1F';
const BRAND_SURFACE   = '#1A133A';
const BRAND_BORDER    = '#2D1F6E';
const BRAND_TEXT      = '#F5F0FF';
const BRAND_SUBTEXT   = '#9B8FCC';
const SUCCESS         = '#06C270';
const ERROR           = '#EE4D37';
const WARNING         = '#F5A623';

// 2. Compose the partial override.
//    You only need to supply the keys that differ from the dark defaults.
const polarisTheme: Partial<ThemeConfig> = {
  colors: {
    background: BRAND_BG,
    surface:    BRAND_SURFACE,
    text:       BRAND_TEXT,
    subtext:    BRAND_SUBTEXT,
    border:     BRAND_BORDER,
  },

  button: {
    color:               BRAND_PRIMARY,
    edgeColors:          { bottom: BRAND_SECONDARY, right: BRAND_SECONDARY },
    borderColor:         BRAND_PRIMARY,
    disabledColor:       BRAND_BORDER,
    disabledEdgeColor:   BRAND_SURFACE,
  },

  card: {
    color:       BRAND_SURFACE,
    edgeColors:  { bottom: BRAND_BORDER, right: BRAND_BORDER },
    borderColor: BRAND_BORDER,
  },

  shimmer: { color: 'rgba(124,92,252,0.3)' },

  checkbox: {
    background:         BRAND_PRIMARY,
    border:             BRAND_PRIMARY,
    checkmarkColor:     BRAND_TEXT,
    leftPlunk:          BRAND_SECONDARY,
    topPlunk:           BRAND_SECONDARY,
    disabledBackground: BRAND_BORDER,
  },

  radio: {
    background:    BRAND_BG,
    border:        BRAND_PRIMARY,
    plunk:         BRAND_SECONDARY,
    dotBackground: BRAND_PRIMARY,
  },

  toggle: {
    on: {
      switchBackground:      BRAND_PRIMARY,
      switchBorder:          BRAND_PRIMARY,
      buttonBackground:      BRAND_TEXT,
      buttonBorder:          BRAND_TEXT,
      buttonMarkBackground:  BRAND_PRIMARY,
    },
    off: {
      switchBackground:      BRAND_SURFACE,
      switchBorder:          BRAND_BORDER,
      buttonBackground:      BRAND_BORDER,
      buttonBorder:          BRAND_BORDER,
      buttonMarkBackground:  BRAND_SURFACE,
    },
  },

  inputField: {
    textColor:         BRAND_TEXT,
    labelColor:        BRAND_SUBTEXT,
    caretColor:        BRAND_PRIMARY,
    errorColor:        ERROR,
    placeholderColor:  BRAND_SUBTEXT,
    borderColor:       BRAND_BORDER,
    activeBorderColor: BRAND_PRIMARY,
    backgroundColor:   BRAND_BG,
  },

  dropdown: {
    border:     BRAND_BORDER,
    text:       BRAND_TEXT,
    chevron:    BRAND_PRIMARY,
    background: BRAND_BG,
  },

  tags: {
    background: BRAND_SURFACE,
    color:      BRAND_TEXT,
  },

  bottomSheet: {
    background:   BRAND_SURFACE,
    notchColor:   BRAND_BORDER,
    overlayColor: 'rgba(14,10,31,0.85)',
    plunkColor:   BRAND_BORDER,
  },

  floatingButton: {
    color:         BRAND_PRIMARY,
    borderColor:   BRAND_PRIMARY,
    edgeColor:     BRAND_SECONDARY,
    shadowColor:   BRAND_BORDER,
    disabledColor: BRAND_BORDER,
  },

  tiltedButton: {
    color:       BRAND_PRIMARY,
    plunkColor:  BRAND_SECONDARY,
    shadowColor: BRAND_BORDER,
    borderColor: BRAND_PRIMARY,
  },

  scoreMeter: {
    meterStrokeColor: {
      excellent: SUCCESS,
      average:   WARNING,
      poor:      ERROR,
    },
    meterStrokeBackground:      BRAND_BORDER,
    dotColor:                   BRAND_TEXT,
    scoreColor:                 BRAND_TEXT,
    scoreContainerBackground:   BRAND_BG,
    scoreContainerBorder:       BRAND_BORDER,
  },

  otpInput: {
    borderColor:       BRAND_BORDER,
    activeBorderColor: BRAND_PRIMARY,
    errorBorderColor:  ERROR,
    backgroundColor:   BRAND_BG,
    textColor:         BRAND_TEXT,
  },

  progressBar: {
    trackColor: BRAND_BORDER,
    fillColor:  BRAND_PRIMARY,
    labelColor: BRAND_TEXT,
  },

  accordion: {
    headerBackground: BRAND_SURFACE,
    headerTextColor:  BRAND_TEXT,
    chevronColor:     BRAND_PRIMARY,
    bodyBackground:   BRAND_BG,
    edgeColor:        BRAND_BORDER,
  },

  stepper: {
    background:      BRAND_SURFACE,
    buttonColor:     BRAND_PRIMARY,
    buttonEdgeColor: BRAND_SECONDARY,
    textColor:       BRAND_TEXT,
    disabledColor:   BRAND_BORDER,
  },

  carousel: {
    dotColor:       BRAND_BORDER,
    activeDotColor: BRAND_PRIMARY,
  },

  datePicker: {
    background:         BRAND_BG,
    textColor:          BRAND_TEXT,
    selectedTextColor:  BRAND_TEXT,
    selectedBackground: BRAND_PRIMARY,
    separatorColor:     BRAND_BORDER,
  },

  swipeRow: {
    background:             BRAND_SURFACE,
    leftActionBackground:   SUCCESS,
    rightActionBackground:  ERROR,
  },
};

// 3. Apply it.
export default function App() {
  return (
    <NeoPopProvider colorMode="dark" theme={polarisTheme}>
      <RootNavigator />
    </NeoPopProvider>
  );
}
```

Any key you omit continues to use the dark default. You can also start from
`defaultLightTheme` by setting `colorMode="light"` and supplying the same
partial override.
