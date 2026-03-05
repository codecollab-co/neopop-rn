# NeoPop RN — Design Tokens

This directory contains pre-built design token output files generated from
`src/primitives/` via Style Dictionary (`token-build/build.js`).

These files are committed so that consumers can use them without running the
build step themselves. When the primitive source files change, regenerate them
by running:

```bash
cd token-build && npm install && npm run build
```

or from the root:

```bash
npm run tokens
```

---

## Token Formats

### `css/variables.css`

CSS custom properties for use in web projects and design tools that accept CSS.

**Usage:**

```html
<link rel="stylesheet" href="path/to/tokens/css/variables.css" />
```

```css
.my-button {
  background-color: var(--neopop-color-poli-purple-4);
  height: var(--neopop-button-size-medium-height);
  padding: 0 var(--neopop-button-size-medium-padding-horizontal);
  opacity: var(--neopop-opacity-disabled);
}
```

All properties are prefixed with `--neopop-` to avoid collisions.

---

### `figma/tokens.json`

Figma Tokens plugin–compatible JSON (Style Dictionary `json/nested` format).

**Usage:**

1. Install the [Figma Tokens plugin](https://www.figma.com/community/plugin/843461159747178978/Tokens-Studio-for-Figma).
2. Open the plugin and switch to the **JSON** view.
3. Paste the contents of `figma/tokens.json`, or point the plugin at a
   sync source (GitHub / URL) that serves this file.

The token tree matches the structure in `token-build/tokens.json` and supports
all token types recognized by the plugin: `color`, `dimension`, `fontFamily`,
`fontWeight`, and `other`.

---

### `android/colors.xml`

Android resource file containing all color tokens as `<color>` entries.

**Usage:**

Copy `colors.xml` into your Android project's `res/values/` directory.

```xml
<!-- in a layout or styles file -->
<TextView
    android:textColor="@color/neopop_color_semantic_error_4"
    ... />
```

In Kotlin/Java:

```kotlin
val errorColor = ContextCompat.getColor(context, R.color.neopop_color_semantic_error_4)
```

---

### `android/dimens.xml`

Android resource file containing all dimension tokens (spacing and button
sizes) as `<dimen>` entries in `dp`.

**Usage:**

Copy `dimens.xml` into your Android project's `res/values/` directory.

```xml
<Button
    android:layout_height="@dimen/neopop_button_size_medium_height"
    android:paddingHorizontal="@dimen/neopop_button_size_medium_padding_horizontal"
    ... />
```

In Kotlin/Java:

```kotlin
val spacing = resources.getDimension(R.dimen.neopop_spacing_md)
```

---

### `ios/NeoPopTokens.swift`

Swift class with all color and dimension tokens as `static` constants.

**Usage:**

Add `NeoPopTokens.swift` to your iOS/macOS Xcode project.

```swift
import UIKit

// Colors
let brandPurple = NeoPopTokens.colorPoliPurple4
let errorDefault = NeoPopTokens.colorSemanticError4
let successDefault = NeoPopTokens.colorSemanticSuccess4

// Spacing
let mediumPadding: CGFloat = NeoPopTokens.spacingMd   // 16
let buttonHeight: CGFloat  = NeoPopTokens.buttonSizeMediumHeight // 40

// Apply
myView.backgroundColor = brandPurple
myButton.frame.size.height = buttonHeight
```

---

## Token Naming Conventions

| Format  | Convention                              | Example                                   |
|---------|-----------------------------------------|-------------------------------------------|
| CSS     | `--neopop-{category}-{name}`            | `--neopop-color-poli-purple-4`            |
| Figma   | Nested JSON path                        | `color > poliPurple > 4`                  |
| Android | `neopop_{category}_{name}` (snake_case) | `neopop_color_poli_purple_4`              |
| iOS     | `{category}{Name}` (camelCase)          | `NeoPopTokens.colorPoliPurple4`           |

## Token Categories

| Category    | Description                                        |
|-------------|----------------------------------------------------|
| `color`     | All color palettes, semantic colors, base colors   |
| `spacing`   | 4-pt grid spacing scale and semantic aliases       |
| `opacity`   | Opacity scale (0–1) and semantic aliases           |
| `typography`| Font families, weights, line-height multipliers    |
| `button`    | Button size tokens (height, padding, font size)    |

## Regenerating Tokens

The source of truth is `src/primitives/*.ts`. To regenerate after changes:

```bash
# Install Style Dictionary (one-time)
cd token-build && npm install

# Regenerate all output formats
npm run tokens   # from repo root
# or
cd token-build && npm run build
```
