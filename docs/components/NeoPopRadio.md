# NeoPopRadio

A NeoPop-styled radio button with an optional label, configurable colors, and haptic feedback.

## Usage

```tsx
// dark mode example
import { NeoPopRadio } from 'neopop-rn';
import { useState } from 'react';

function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <NeoPopRadio
      isChecked={selected}
      onValueChange={setSelected}
      label="Option A"
      mode="dark"
      colorMode="dark"
      value="option_a"
      name="payment_method"
    />
  );
}
```

```tsx
// light mode example
import { NeoPopRadio } from 'neopop-rn';
import { useState } from 'react';

function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <NeoPopRadio
      isChecked={selected}
      onValueChange={setSelected}
      label="Option B"
      mode="light"
      colorMode="light"
      colorConfig={{
        checkedBorderColor: '#0d0d0d',
        checkedFillColor: '#ffffff',
        uncheckedBorderColor: '#cccccc',
        uncheckedFillColor: '#ffffff',
        dotColor: '#0d0d0d',
      }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isChecked` | `boolean` | — | Required. Whether this radio option is selected. |
| `onValueChange` | `(value: boolean) => void` | — | Required. Called when the radio is tapped. |
| `id` | `string` | — | HTML-like identifier for the radio input (accessibility). |
| `name` | `string` | — | Group name for the radio set (accessibility). |
| `value` | `string` | — | Value string associated with this option. |
| `mode` | `'dark' \| 'light' \| 'custom'` | — | Selects a built-in color preset; `'custom'` defers entirely to `colorConfig`. |
| `colorConfig` | `NeoPopRadioColorConfig` | — | Per-token color overrides (see colorConfig table). |
| `label` | `string` | — | Optional text label displayed beside the radio button. |
| `size` | `number` | — | Diameter of the radio circle in logical pixels. |
| `disabled` | `boolean` | — | Disables interaction. |
| `enableHaptics` | `boolean` | — | Fires a haptic on selection. |
| `colorMode` | `'dark' \| 'light'` | — | Theme mode used for global defaults. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the outer row container. |
| `labelStyle` | `StyleProp<TextStyle>` | — | Additional style applied to the label text. |

## colorConfig

| Key | Description |
|-----|-------------|
| `checkedBorderColor` | Border color of the radio circle when selected. |
| `checkedFillColor` | Background fill of the circle when selected. |
| `uncheckedBorderColor` | Border color when unselected. |
| `uncheckedFillColor` | Background fill when unselected. |
| `dotColor` | Color of the inner dot shown in the selected state. |

## Notes

- Managing radio group state (mutually exclusive selection) is the responsibility of the consumer; `NeoPopRadio` is a single controlled input.
- In `'custom'` mode all colors must be supplied via `colorConfig`; no built-in defaults are applied.
- `size` sets both width and height, keeping the circle uniform.
