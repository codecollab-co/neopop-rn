# Pointer

A downward-pointing pointer/caret icon used to indicate a selected or active position (e.g., above a dropdown or tooltip).

## Usage

```tsx
// dark mode example
import { Pointer } from 'neopop-rn';

<Pointer
  size={12}
  color="#ffffff"
  strokeWidth={1.5}
/>
```

```tsx
// light mode example
import { Pointer } from 'neopop-rn';

<Pointer
  size={14}
  color="#0d0d0d"
  strokeWidth={2}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | — | Width and height of the icon bounding box in logical pixels. |
| `color` | `string` | — | Stroke and/or fill color of the pointer shape. |
| `strokeWidth` | `number` | — | Thickness of the pointer stroke. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the icon wrapper. |

## colorConfig

Pointer is an icon primitive and does not accept a `colorConfig` prop. Use the `color` prop for color control.

## Notes

- `Pointer` is a non-interactive icon; it does not accept an `onPress` prop. To make it tappable, wrap it in a `Pressable` or `TouchableOpacity`.
- Unlike `Chevron`, `Pointer` has a fixed orientation and no `direction` prop; rotate it via the `style` `transform` prop if needed.
- `size` sets both width and height; the aspect ratio of the pointer shape is preserved by the underlying SVG.
