# NeoPopSwipeRow

A gesture-driven swipeable list row that reveals configurable left and/or right action areas on drag, with threshold-based callbacks.

## Usage

```tsx
// dark mode example
import { NeoPopSwipeRow } from 'neopop-rn';
import { View, Text, TouchableOpacity } from 'react-native';

<NeoPopSwipeRow
  colorMode="dark"
  rowHeight={64}
  leftThreshold={80}
  rightThreshold={80}
  leftActions={
    <TouchableOpacity style={{ width: 80, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff' }}>Archive</Text>
    </TouchableOpacity>
  }
  rightActions={
    <TouchableOpacity style={{ width: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EE4D37' }}>
      <Text style={{ color: '#fff' }}>Delete</Text>
    </TouchableOpacity>
  }
  onSwipeRight={() => console.log('archived')}
  onSwipeLeft={() => console.log('deleted')}
>
  <View style={{ flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', paddingHorizontal: 16 }}>
    <Text style={{ color: '#fff' }}>Row content</Text>
  </View>
</NeoPopSwipeRow>
```

```tsx
// light mode example
import { NeoPopSwipeRow } from 'neopop-rn';
import { View, Text } from 'react-native';

<NeoPopSwipeRow
  colorMode="light"
  rowHeight={56}
  rightThreshold={60}
  rightActions={
    <View style={{ width: 60, backgroundColor: '#EE4D37', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff' }}>Del</Text>
    </View>
  }
  colorConfig={{ background: '#ffffff', rightActionBackground: '#EE4D37' }}
  onSwipeLeft={() => console.log('delete triggered')}
>
  <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 16 }}>
    <Text>List item</Text>
  </View>
</NeoPopSwipeRow>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Required. The main row content displayed in the foreground. |
| `leftActions` | `ReactNode` | — | Content revealed when swiping right (left action area). |
| `rightActions` | `ReactNode` | — | Content revealed when swiping left (right action area). |
| `leftThreshold` | `number` | — | Drag distance in logical pixels to trigger `onSwipeRight`. |
| `rightThreshold` | `number` | — | Drag distance in logical pixels to trigger `onSwipeLeft`. |
| `onSwipeLeft` | `() => void` | — | Called when the row is dragged left past `rightThreshold`. |
| `onSwipeRight` | `() => void` | — | Called when the row is dragged right past `leftThreshold`. |
| `colorConfig` | `NeoPopSwipeRowColorConfig` | — | Per-token color overrides (see colorConfig table). |
| `colorMode` | `'dark' \| 'light'` | — | Theme mode for default colors. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the outer row container. |
| `rowHeight` | `number` | — | Explicit height of the row in logical pixels. |

## colorConfig

| Key | Description |
|-----|-------------|
| `background` | Background color of the main row surface. |
| `leftActionBackground` | Background color of the left action area (revealed on swipe right). |
| `rightActionBackground` | Background color of the right action area (revealed on swipe left). |

## Notes

- Action areas (`leftActions` / `rightActions`) are rendered behind the main row content and exposed by the pan gesture; they do not intercept touches until swiped into view.
- Threshold callbacks (`onSwipeLeft`, `onSwipeRight`) fire once when the threshold is crossed; the row does not automatically snap back — implement snap-back logic in the callback if needed.
- `rowHeight` should match the natural height of `children`; if omitted, the container grows to fit the tallest of the children and action areas.
- Requires `react-native-gesture-handler` for the pan gesture.
