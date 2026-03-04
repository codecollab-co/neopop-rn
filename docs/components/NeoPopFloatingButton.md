# NeoPopFloatingButton

A levitating 3D button that continuously bobs up and down, sinks on press, and exposes an imperative ref API for enabling, disabling, and toggling shimmer.

## Usage

```tsx
// dark mode example
import { NeoPopFloatingButton, NeoPopFloatingButtonRef } from 'neopop-rn';
import { useRef } from 'react';
import { Text } from 'react-native';

function Example() {
  const buttonRef = useRef<NeoPopFloatingButtonRef>(null);

  return (
    <NeoPopFloatingButton
      ref={buttonRef}
      shape="pill"
      depth={3}
      levitationHeight={4}
      colorMode="dark"
      colorConfig={{ color: '#06C270', edgeColor: '#03A05A', shadowColor: '#025c33' }}
      onPress={() => console.log('pressed')}
    >
      <Text style={{ color: '#ffffff', fontWeight: '700' }}>Pay Now</Text>
    </NeoPopFloatingButton>
  );
}
```

```tsx
// light mode example
import { NeoPopFloatingButton, NeoPopFloatingButtonRef } from 'neopop-rn';
import { useRef } from 'react';
import { Text } from 'react-native';

function Example() {
  const buttonRef = useRef<NeoPopFloatingButtonRef>(null);

  const handlePress = () => {
    buttonRef.current?.disableOnNextClick(); // disable after this press
  };

  return (
    <NeoPopFloatingButton
      ref={buttonRef}
      shape="rectangle"
      colorMode="light"
      colorConfig={{ color: '#0d0d0d', edgeColor: '#555555', shadowColor: '#888888' }}
      onPress={handlePress}
    >
      <Text style={{ color: '#ffffff' }}>Confirm</Text>
    </NeoPopFloatingButton>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Content rendered inside the button face. |
| `shape` | `'rectangle' \| 'pill' \| 'circle'` | `'rectangle'` | Controls the `borderRadius` of the face and edge surfaces. |
| `colorConfig` | `NeoPopFloatingButtonColorConfig` | — | Per-token color overrides (see colorConfig table). |
| `depth` | `number` | `3` | Pixel depth of the bottom shadow and right edge. |
| `levitationHeight` | `number` | `4` | Max vertical travel distance (in logical pixels) of the levitation bob. |
| `levitationDuration` | `number` | `TILTED_BUTTON_FLOATING_MS` | Duration of one complete up-down levitation cycle in ms. |
| `onPress` | `() => void` | — | Called when the button is tapped (after optional `disableOnNextClick` logic). |
| `onLongPress` | `() => void` | — | Called on long-press. |
| `delayTouchEvents` | `boolean` | — | Delays touch event processing (reserved for future use). |
| `enableHaptics` | `boolean` | `false` | Fires a light impact haptic on press-in. |
| `colorMode` | `'dark' \| 'light'` | — | Theme mode for default color selection. |
| `disabled` | `boolean` | `false` | Disables interaction and pauses the levitation animation. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the `Pressable` wrapper. |

## Imperative Ref API

Attach a `ref` typed as `NeoPopFloatingButtonRef`.

```ts
import { NeoPopFloatingButtonRef } from 'neopop-rn';

const buttonRef = useRef<NeoPopFloatingButtonRef>(null);
```

| Method | Description |
|--------|-------------|
| `enable()` | Re-enables the button (resumes levitation). |
| `disable()` | Disables the button (pauses levitation, ignores presses). |
| `disableOnNextClick()` | Marks the button to auto-disable after the next successful press. |
| `startShimmer()` | Wraps the button in `NeoPopShimmer` and starts the shimmer animation. |
| `stopShimmer()` | Stops and removes the shimmer overlay. |

## colorConfig

| Key | Description |
|-----|-------------|
| `color` | Face background color (default: `'#ffffff'`). |
| `borderColor` | Optional border drawn around the face. |
| `edgeColor` | Color of the right 3D edge surface (derived from `color` if omitted). |
| `shadowColor` | Color of the bottom shadow surface (derived from `color` if omitted). |
| `disabledColor` | Face color when the button is disabled. |

## Notes

- The button height is fixed at 48 logical pixels; use `style` or `children` layout to control width.
- `shape: 'circle'` computes `borderRadius` as `height / 2 = 24`; set a square size via `style` for a true circle.
- `disableOnNextClick` is a one-shot flag — it resets after the next press automatically.
- `startShimmer` / `stopShimmer` toggle the `NeoPopShimmer` wrapper dynamically; the shimmer uses default config (no custom color via ref).
- Requires `react-native-reanimated` for levitation and press animations.
