# Chevron

A directional chevron (angle-bracket arrow) icon with optional Reanimated rotation animation.

## Usage

```tsx
// dark mode example
import { Chevron } from 'neopop-rn';

<Chevron
  direction="south"
  size={16}
  color="#ffffff"
  strokeWidth={2}
  animated={false}
/>
```

```tsx
// light mode example
import { Chevron } from 'neopop-rn';

<Chevron
  direction="east"
  size={20}
  color="#0d0d0d"
  strokeWidth={1.5}
  animated
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'north' \| 'south' \| 'east' \| 'west'` | — | Direction the chevron points. |
| `size` | `number` | — | Width and height of the icon bounding box in logical pixels. |
| `color` | `string` | — | Stroke color of the chevron lines. |
| `strokeWidth` | `number` | — | Thickness of the chevron stroke. |
| `animated` | `boolean` | — | When `true`, the chevron uses a Reanimated animated `View` so its rotation can be driven by a shared value from the parent. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the icon wrapper. |

## colorConfig

Chevron is an icon primitive and does not accept a `colorConfig` prop. Use the `color` prop for stroke color.

## Notes

- The four directions map to rotations of the same underlying SVG path; `north` and `south` point up and down, `east` and `west` point right and left.
- When `animated` is `true`, the wrapper is an `Animated.View` — attach a `useAnimatedStyle` with a `rotate` transform from the parent to animate the direction transition (e.g., accordion open/close).
- `size` sets both width and height uniformly; use `style` if you need asymmetric dimensions.
