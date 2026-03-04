# NeoPopBottomSheet

A gesture-driven bottom sheet with drag-to-dismiss, an optional backdrop overlay, and an imperative ref API for programmatic open/close.

## Usage

```tsx
// dark mode example — imperative ref
import { NeoPopBottomSheet, NeoPopBottomSheetRef } from 'neopop-rn';
import { useRef } from 'react';
import { Button, Text } from 'react-native';

function Example() {
  const sheetRef = useRef<NeoPopBottomSheetRef>(null);

  return (
    <>
      <Button title="Open sheet" onPress={() => sheetRef.current?.open()} />
      <NeoPopBottomSheet
        ref={sheetRef}
        maxHeight={400}
        shouldShowNotch
        shouldShowOverlay
        colorMode="dark"
        onClose={() => console.log('closing')}
      >
        <Text style={{ color: '#ffffff' }}>Bottom sheet content</Text>
      </NeoPopBottomSheet>
    </>
  );
}
```

```tsx
// light mode example — controlled via isOpen prop
import { NeoPopBottomSheet } from 'neopop-rn';
import { useState } from 'react';
import { Button, Text } from 'react-native';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button title="Toggle" onPress={() => setOpen((v) => !v)} />
      <NeoPopBottomSheet
        isOpen={open}
        maxHeight={300}
        colorMode="light"
        colorConfig={{
          sheetBackgroundColor: '#ffffff',
          overlayColor: 'rgba(0,0,0,0.4)',
          notchColor: '#cccccc',
          borderColor: '#eeeeee',
        }}
        onClose={() => setOpen(false)}
      >
        <Text>Content here</Text>
      </NeoPopBottomSheet>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Required. Content rendered inside the sheet. |
| `isOpen` | `boolean` | — | Controlled open state. Drives open/close when provided. |
| `defaultOpen` | `boolean` | `false` | Whether the sheet starts in the open position (uncontrolled). |
| `onClose` | `() => void` | — | Called when the sheet begins closing (before animation completes). |
| `onBeforeClose` | `() => void` | — | Called just before the close animation starts. |
| `onCloseEnd` | `() => void` | — | Called when the close animation finishes. |
| `onOpenEnd` | `() => void` | — | Called when the open animation finishes. |
| `maxHeight` | `number` | `400` | Maximum sheet height in logical pixels. |
| `shouldShowNotch` | `boolean` | `true` | Renders a 36×4 pt drag-handle notch at the top of the sheet. |
| `shouldShowOverlay` | `boolean` | `true` | Renders a semi-transparent backdrop behind the sheet. |
| `blocking` | `boolean` | `false` | When `false`, tapping the overlay closes the sheet. When `true`, overlay taps are ignored. |
| `sheetPlunkColor` | `string` | — | Override for the sheet's plunk / shadow color. |
| `overlayColor` | `string` | `'rgba(0,0,0,0.6)'` | Backdrop color (takes precedence over `colorConfig.overlayColor`). |
| `colorConfig` | `NeoPopBottomSheetColorConfig` | — | Per-token color overrides (see colorConfig table). |
| `colorMode` | `'dark' \| 'light'` | — | Theme mode for default colors. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the sheet content `View`. |

## Imperative Ref API

Attach a `ref` typed as `NeoPopBottomSheetRef` to control the sheet programmatically.

```ts
import { NeoPopBottomSheetRef } from 'neopop-rn';

const sheetRef = useRef<NeoPopBottomSheetRef>(null);
sheetRef.current?.open();
sheetRef.current?.close();
```

| Method | Description |
|--------|-------------|
| `open()` | Springs the sheet into the open (visible) position. |
| `close()` | Animates the sheet off-screen downward. |

## colorConfig

| Key | Description |
|-----|-------------|
| `sheetBackgroundColor` | Sheet panel background (default: `'#161616'`). |
| `overlayColor` | Backdrop color (overridden by the `overlayColor` prop). |
| `notchColor` | Drag-handle notch color (default: `'#3D3D3D'`). |
| `borderColor` | Border drawn around the sheet panel. |

## Notes

- The sheet uses `position: absolute` filling the screen (`StyleSheet.absoluteFill`); place `NeoPopBottomSheet` at the root level of your screen (or inside a `Modal`) so it can appear over all content.
- Drag-to-dismiss fires when the user drags more than 40% of the sheet height downward.
- `isOpen` (controlled) and the ref API can be used together; the ref API calls the same internal `openSheet`/`closeSheet` functions.
- Requires `react-native-gesture-handler` and `react-native-reanimated`.
- `GestureHandlerRootView` is rendered internally around the sheet surface, but your app root also needs one for the backdrop press gesture.
