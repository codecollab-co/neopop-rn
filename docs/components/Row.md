# Row

A lightweight `flexDirection: 'row'` layout primitive with alignment, justification, gap, and wrap controls.

## Usage

```tsx
// dark mode example
import { Row } from 'neopop-rn';
import { Text } from 'react-native';

<Row align="center" justify="space-between" gap={12}>
  <Text style={{ color: '#ffffff' }}>Left</Text>
  <Text style={{ color: '#ffffff' }}>Right</Text>
</Row>
```

```tsx
// light mode example
import { Row } from 'neopop-rn';
import { View } from 'react-native';

<Row align="flex-start" justify="flex-start" gap={8} wrap flex={1}>
  <View style={{ width: 80, height: 80, backgroundColor: '#cccccc' }} />
  <View style={{ width: 80, height: 80, backgroundColor: '#aaaaaa' }} />
  <View style={{ width: 80, height: 80, backgroundColor: '#888888' }} />
</Row>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Content arranged in a horizontal row. |
| `align` | `'flex-start' \| 'flex-end' \| 'center' \| 'stretch' \| 'baseline'` | — | `alignItems` value for cross-axis alignment. |
| `justify` | `'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'` | — | `justifyContent` value for main-axis distribution. |
| `gap` | `number` | — | Gap between children in logical pixels (maps to the React Native `gap` style). |
| `wrap` | `boolean` | — | When `true`, sets `flexWrap: 'wrap'` so children flow to the next line. |
| `flex` | `number` | — | `flex` value applied to the container. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style overrides applied last. |

## colorConfig

Row is a layout primitive and does not accept a `colorConfig` prop. Apply background colors via `style`.

## Notes

- `Row` sets `flexDirection: 'row'` and is otherwise a plain `View`; it does not add any padding or margin by default.
- `gap` requires React Native 0.71+ or the `react-native-gap-polyfill` package on older versions.
- `wrap: true` enables multi-line wrapping, which can interact unexpectedly with `justify: 'space-between'` when items partially fill a line.
