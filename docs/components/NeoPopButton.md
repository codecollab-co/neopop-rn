# NeoPopButton

A 3D extruded pressable button with press-sink animation, shimmer support, and 9-position grid placement.

## Usage

```tsx
// dark mode example
import { NeoPopButton } from 'neopop-rn';
import { Text } from 'react-native';

<NeoPopButton
  variant="elevated"
  size="medium"
  colorMode="dark"
  onPress={() => console.log('pressed')}
>
  <Text style={{ color: '#ffffff' }}>Pay Now</Text>
</NeoPopButton>
```

```tsx
// light mode example
import { NeoPopButton } from 'neopop-rn';
import { Text } from 'react-native';

<NeoPopButton
  variant="elevated"
  size="medium"
  colorMode="light"
  colorConfig={{ color: '#0d0d0d', edgeColors: { right: '#555555', bottom: '#555555' } }}
  onPress={() => console.log('pressed')}
>
  <Text style={{ color: '#ffffff' }}>Pay Now</Text>
</NeoPopButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Content rendered inside the button face. |
| `variant` | `'elevated' \| 'flat' \| 'stroke'` | `'elevated'` | Visual variant. `elevated` shows 3D edges, `flat` hides edges, `stroke` renders a transparent face with a border. |
| `size` | `'big' \| 'medium' \| 'small'` | `'medium'` | Predefined height and horizontal padding token. |
| `depth` | `number` | `3` | Pixel depth of the 3D right and bottom edge surfaces. |
| `fullWidth` | `boolean` | `false` | Stretches the button to fill its parent's width. |
| `position` | `ButtonPosition` | `'bottomRight'` | Position in a 3×3 grid; suppresses edges shared with neighbours. |
| `adjacentRight` | `boolean` | `false` | Suppress the right edge (button is flush against a right neighbour). |
| `adjacentLeft` | `boolean` | `false` | Suppress the left edge. |
| `adjacentTop` | `boolean` | `false` | Suppress the top edge. |
| `adjacentBottom` | `boolean` | `false` | Suppress the bottom edge. |
| `colorConfig` | `NeoPopButtonColorConfig` | — | Per-token color overrides (see colorConfig table below). |
| `colorMode` | `'dark' \| 'light'` | — | Picks theme-mode defaults when `colorConfig` is not provided. |
| `shimmerConfig` | `NeoPopButtonShimmerConfig` | — | Enables and configures the shimmer overlay. |
| `onPress` | `() => void` | — | Called when the button is tapped. |
| `onLongPress` | `() => void` | — | Called on long-press. |
| `onPressIn` | `() => void` | — | Called when the finger touches down. |
| `onPressOut` | `() => void` | — | Called when the finger lifts. |
| `disabled` | `boolean` | `false` | Disables interaction and applies 40% opacity. |
| `enableHaptics` | `boolean` | `false` | Fires a light impact haptic on press-in. |
| `animationDuration` | `number` | `BUTTON_PRESS_DURATION_MS` | Duration of the press-down timing animation in ms. |
| `springConfig` | `WithSpringConfig` | — | Custom spring config for the press-release animation. |
| `accessibilityLabel` | `string` | — | Accessibility label for screen readers. |
| `accessibilityHint` | `string` | — | Accessibility hint for screen readers. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the `Pressable` wrapper. |

### NeoPopButtonShimmerConfig

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | `boolean` | — | Required. Turns the shimmer overlay on or off. |
| `color` | `string` | `'rgba(255,255,255,0.35)'` | Shimmer strip color. |
| `width` | `number` | `SHIMMER_WIDTH` | Width of the primary shimmer strip. |
| `gap` | `number` | `SHIMMER_GAP_WIDTH` | Gap between the two shimmer strips. |
| `duration` | `number` | `SHIMMER_DURATION_MS` | Time in ms for one sweep. |
| `delay` | `number` | `SHIMMER_DELAY_MS` | Initial delay before first sweep. |
| `repeatDelay` | `number` | `SHIMMER_DELAY_MS` | Pause between repeated sweeps. |

### ButtonPosition values

`'topLeft'` | `'topEdge'` | `'topRight'` | `'leftEdge'` | `'center'` | `'rightEdge'` | `'bottomLeft'` | `'bottomEdge'` | `'bottomRight'`

## colorConfig

| Key | Description |
|-----|-------------|
| `color` | Face background color. |
| `edgeColors.top` | Color of the top edge surface. |
| `edgeColors.right` | Color of the right edge surface. |
| `edgeColors.bottom` | Color of the bottom edge surface. |
| `edgeColors.left` | Color of the left edge surface. |
| `borderColor` | Border color used in `stroke` variant. |
| `disabledColor` | Face color when `disabled` is true. |
| `disabledEdgeColor` | Edge color when `disabled` is true. |

## Notes

- The component requires `react-native-reanimated` (v3+) for its press animation.
- Shimmer wraps the button in `NeoPopShimmer`, which uses `overflow: 'hidden'` on the container; avoid applying border-radius via `style` when shimmer is enabled — apply it inside the button face content instead.
- `position` suppresses edges automatically; it is distinct from `adjacentRight/Left/Top/Bottom`, which are for explicit neighbour-sharing.
- In the `stroke` variant, `edgeColors` are ignored and edges are never rendered.
