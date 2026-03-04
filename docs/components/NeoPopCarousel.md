# NeoPopCarousel

A gesture-driven horizontal carousel with velocity-aware snap, optional pagination dots, and an imperative ref API for programmatic navigation.

## Usage

```tsx
// dark mode example
import { NeoPopCarousel, NeoPopCarouselRef } from 'neopop-rn';
import { useRef } from 'react';
import { View, Text, Button } from 'react-native';

function Example() {
  const carouselRef = useRef<NeoPopCarouselRef>(null);

  const slides = [
    <View key="1" style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <Text style={{ color: '#fff' }}>Slide 1</Text>
    </View>,
    <View key="2" style={{ flex: 1, backgroundColor: '#2a2a2a' }}>
      <Text style={{ color: '#fff' }}>Slide 2</Text>
    </View>,
    <View key="3" style={{ flex: 1, backgroundColor: '#3a3a3a' }}>
      <Text style={{ color: '#fff' }}>Slide 3</Text>
    </View>,
  ];

  return (
    <>
      <NeoPopCarousel
        ref={carouselRef}
        data={slides}
        itemWidth={280}
        itemSpacing={16}
        showDots
        initialIndex={0}
        colorMode="dark"
        colorConfig={{ dotColor: '#555555', activeDotColor: '#ffffff' }}
        onIndexChange={(i) => console.log('active:', i)}
      />
      <Button title="Next" onPress={() => carouselRef.current?.goNext()} />
    </>
  );
}
```

```tsx
// light mode example
import { NeoPopCarousel } from 'neopop-rn';
import { Image } from 'react-native';

<NeoPopCarousel
  data={[
    <Image key="a" source={{ uri: 'https://example.com/1.jpg' }} style={{ width: 320, height: 200 }} />,
    <Image key="b" source={{ uri: 'https://example.com/2.jpg' }} style={{ width: 320, height: 200 }} />,
  ]}
  itemWidth={320}
  itemSpacing={12}
  colorMode="light"
  colorConfig={{ dotColor: '#cccccc', activeDotColor: '#0d0d0d' }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ReactNode[]` | — | Required. Array of items to display; each element is rendered in its own clipped slot. |
| `itemWidth` | `number` | `280` | Width of each carousel item in logical pixels. |
| `itemSpacing` | `number` | `16` | Gap between adjacent items in logical pixels. |
| `showDots` | `boolean` | `true` | Renders pagination dot indicators below the carousel. Dots are hidden when there is only one item. |
| `initialIndex` | `number` | `0` | Index of the item shown on first render. |
| `onIndexChange` | `(index: number) => void` | — | Called when the active index changes after a swipe or programmatic navigation. |
| `colorConfig` | `NeoPopCarouselColorConfig` | — | Per-token color overrides (see colorConfig table). |
| `colorMode` | `'dark' \| 'light'` | — | Theme mode for default dot colors. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the outer container. |

## Imperative Ref API

```ts
import { NeoPopCarouselRef } from 'neopop-rn';

const carouselRef = useRef<NeoPopCarouselRef>(null);
```

| Method | Signature | Description |
|--------|-----------|-------------|
| `scrollToIndex` | `(index: number, animated?: boolean) => void` | Scrolls to the given index. Pass `animated: false` for an instant jump. |
| `goNext` | `() => void` | Advances to the next item (clamped at the last item). |
| `goPrev` | `() => void` | Goes back to the previous item (clamped at the first item). |

## colorConfig

| Key | Description |
|-----|-------------|
| `dotColor` | Color of inactive pagination dots (default: `'#555555'`). |
| `activeDotColor` | Color of the active pagination dot (default: `'#ffffff'`). |

## Notes

- Only `itemWidth` pixels of the carousel strip are visible at a time; items beyond the viewport are clipped.
- Active dots expand to 20 pt wide while inactive dots are 8 pt; height is fixed at 8 pt with a `borderRadius` of 4.
- Velocity-aware snapping biases the landing index in the swipe direction; slow swipes snap to the nearest item.
- Requires `react-native-gesture-handler` and `react-native-reanimated`.
- `data` items are rendered without memoisation; wrap each item in `React.memo` or `useMemo` to avoid re-renders on index change.
