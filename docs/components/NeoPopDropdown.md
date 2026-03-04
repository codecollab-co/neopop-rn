# NeoPopDropdown

A NeoPop-styled dropdown trigger row that shows a label, the current value or placeholder, and an animated chevron; it does not manage an option list internally.

## Usage

```tsx
// dark mode example
import { NeoPopDropdown } from 'neopop-rn';
import { useState } from 'react';

function Example() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>();

  return (
    <>
      <NeoPopDropdown
        label="State"
        value={value}
        placeholder="Select a state"
        isOpen={open}
        colorMode="dark"
        onPress={() => setOpen((v) => !v)}
      />
      {/* render your option list here when open */}
    </>
  );
}
```

```tsx
// light mode example
import { NeoPopDropdown } from 'neopop-rn';
import { useState } from 'react';

function Example() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>();

  return (
    <NeoPopDropdown
      label="City"
      value={value}
      placeholder="Choose your city"
      isOpen={open}
      colorMode="light"
      colorConfig={{
        borderColor: '#cccccc',
        backgroundColor: '#ffffff',
        labelColor: '#555555',
        valueColor: '#0d0d0d',
        placeholderColor: '#999999',
        iconColor: '#0d0d0d',
      }}
      onPress={() => setOpen((v) => !v)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Required. The field label displayed above or beside the value. |
| `onPress` | `() => void` | — | Required. Called when the dropdown row is tapped. |
| `value` | `string` | — | The currently selected option string. |
| `placeholder` | `string` | — | Text shown when `value` is not set. |
| `isOpen` | `boolean` | — | Controls the direction of the chevron icon (up when open, down when closed). |
| `colorConfig` | `NeoPopDropdownColorConfig` | — | Per-token color overrides (see colorConfig table). |
| `colorMode` | `'dark' \| 'light'` | — | Theme mode for default colors. |
| `disabled` | `boolean` | — | Disables interaction and dims the component. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the outer container. |
| `labelStyle` | `StyleProp<TextStyle>` | — | Additional style applied to the label text. |
| `valueStyle` | `StyleProp<TextStyle>` | — | Additional style applied to the value / placeholder text. |

## colorConfig

| Key | Description |
|-----|-------------|
| `borderColor` | Border color of the dropdown row container. |
| `backgroundColor` | Background color of the dropdown row. |
| `labelColor` | Color of the `label` text. |
| `valueColor` | Color of the selected `value` text. |
| `placeholderColor` | Color of the `placeholder` text (when no value is selected). |
| `iconColor` | Color of the chevron icon. |

## Notes

- `NeoPopDropdown` is a presentational trigger only; it does not render an option list. Connect it to a `NeoPopBottomSheet`, modal, or any custom list component to handle option display and selection.
- The chevron animates between pointing up (`isOpen: true`) and pointing down (`isOpen: false`).
- Pass the selected option's display string to `value` to update the displayed text after selection.
