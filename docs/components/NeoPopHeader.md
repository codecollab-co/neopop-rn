# NeoPopHeader

A screen header with an optional back chevron, heading text, description line, and a right-side slot.

## Usage

```tsx
// dark mode example
import { NeoPopHeader } from 'neopop-rn';

<NeoPopHeader
  heading="Checkout"
  description="Complete your purchase"
  colorMode="dark"
  onBackPress={() => navigation.goBack()}
/>
```

```tsx
// light mode example
import { NeoPopHeader } from 'neopop-rn';
import { TouchableOpacity, Text } from 'react-native';

<NeoPopHeader
  heading="Profile"
  color="#0d0d0d"
  colorMode="light"
  rightElement={
    <TouchableOpacity onPress={() => {}}>
      <Text style={{ color: '#0d0d0d' }}>Edit</Text>
    </TouchableOpacity>
  }
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | — | Primary heading text. |
| `description` | `string` | — | Secondary line rendered below the heading. |
| `onBackPress` | `() => void` | — | When provided, a back chevron is rendered on the leading side; calling it navigates back. |
| `rightElement` | `React.ReactNode` | — | Arbitrary element rendered at the trailing end of the header row. |
| `color` | `string` | — | Color applied to the heading text and back chevron. |
| `textStyle` | `StyleProp<TextStyle>` | — | Additional style applied to the heading text. |
| `colorMode` | `'dark' \| 'light'` | — | Theme mode used when `color` is not provided. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the outer container. |

## colorConfig

NeoPopHeader does not accept a `colorConfig` prop. Use the `color` prop to control heading and chevron colors.

## Notes

- The back chevron is only rendered when `onBackPress` is provided.
- `description` is displayed in a smaller, secondary text style below the heading.
- `rightElement` is positioned at the trailing edge; use it for actions like "Done", "Edit", or icon buttons.
