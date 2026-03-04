# NeoPopCheckbox

A NeoPop-styled checkbox with optional label, configurable checked/unchecked colors, and haptic feedback.

## Usage

```tsx
// dark mode example
import { NeoPopCheckbox } from 'neopop-rn';
import { useState } from 'react';

function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <NeoPopCheckbox
      isChecked={checked}
      onValueChange={setChecked}
      label="I agree to the terms"
      labelPosition="right"
      mode="dark"
      colorMode="dark"
      enableHaptics
    />
  );
}
```

```tsx
// light mode example
import { NeoPopCheckbox } from 'neopop-rn';
import { useState } from 'react';

function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <NeoPopCheckbox
      isChecked={checked}
      onValueChange={setChecked}
      label="Subscribe to newsletter"
      labelPosition="right"
      mode="light"
      colorMode="light"
      colorConfig={{
        checkedBorderColor: '#06C270',
        checkedFillColor: '#06C270',
        uncheckedBorderColor: '#cccccc',
        uncheckedFillColor: '#ffffff',
        checkmarkColor: '#ffffff',
      }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isChecked` | `boolean` | — | Required. Current checked state. |
| `onValueChange` | `(value: boolean) => void` | — | Required. Called with the new boolean value when toggled. |
| `mode` | `'dark' \| 'light' \| 'custom'` | — | Selects a built-in color preset; `'custom'` defers entirely to `colorConfig`. |
| `colorConfig` | `NeoPopCheckboxColorConfig` | — | Per-token color overrides (see colorConfig table). |
| `label` | `string` | — | Optional text label displayed beside the checkbox. |
| `labelPosition` | `'left' \| 'right'` | — | Side on which the label is rendered relative to the box. |
| `size` | `number` | — | Width and height of the checkbox in logical pixels. |
| `disabled` | `boolean` | — | Disables interaction. |
| `enableHaptics` | `boolean` | — | Fires a haptic on toggle. |
| `colorMode` | `'dark' \| 'light'` | — | Theme mode used for global defaults. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the outer row container. |
| `labelStyle` | `StyleProp<TextStyle>` | — | Additional style applied to the label text. |

## colorConfig

| Key | Description |
|-----|-------------|
| `checkedBorderColor` | Border color when the checkbox is checked. |
| `checkedFillColor` | Background fill color when checked. |
| `uncheckedBorderColor` | Border color when unchecked. |
| `uncheckedFillColor` | Background fill color when unchecked. |
| `checkmarkColor` | Color of the checkmark tick drawn inside the box. |

## Notes

- In `'custom'` mode all colors must be supplied via `colorConfig`; the component does not apply built-in theme defaults.
- `size` controls both width and height of the box, keeping it square.
- When `disabled` is `true`, the component ignores press events but does not automatically reduce opacity; apply visual dimming via `style` or `colorConfig` as needed.
