# PageContainer

A full-screen page wrapper that handles background color, horizontal/vertical padding, and optional safe area insets.

## Usage

```tsx
// dark mode example
import { PageContainer } from 'neopop-rn';
import { Text } from 'react-native';

<PageContainer
  backgroundColor="#0d0d0d"
  paddingHorizontal={16}
  paddingVertical={24}
  safeArea
>
  <Text style={{ color: '#ffffff' }}>Page content</Text>
</PageContainer>
```

```tsx
// light mode example
import { PageContainer } from 'neopop-rn';
import { Text } from 'react-native';

<PageContainer
  backgroundColor="#ffffff"
  paddingHorizontal={20}
>
  <Text style={{ color: '#0d0d0d' }}>Light mode page</Text>
</PageContainer>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Page content. |
| `backgroundColor` | `string` | — | Background color of the page. |
| `paddingHorizontal` | `number` | — | Left and right padding in logical pixels. |
| `paddingVertical` | `number` | — | Top and bottom padding in logical pixels. |
| `safeArea` | `boolean` | — | When `true`, wraps children in a `SafeAreaView` to respect device safe areas (notch, home indicator). |
| `style` | `StyleProp<ViewStyle>` | — | Additional style overrides applied to the container. |

## colorConfig

PageContainer does not accept a `colorConfig` prop. Use `backgroundColor` and `style` for color control.

## Notes

- `PageContainer` expands to fill its parent using `flex: 1`; ensure the navigation container or root view also uses `flex: 1`.
- `safeArea: true` uses `SafeAreaView` from `react-native`; install `react-native-safe-area-context` and use its `SafeAreaProvider` for more reliable cross-platform safe area handling.
- `paddingHorizontal` and `paddingVertical` are applied as inline style shorthand; override or extend them via the `style` prop.

## Related Layout Primitives

Also exported from the layout module (see `layout.types.ts`):

- **`HorizontalDivider`** — a thin horizontal line with configurable `color`, `thickness`, and `marginVertical`.
- **`HorizontalSpacer`** — a fixed-width transparent spacer (`width: number`, required).
- **`VerticalSpacer`** — a fixed-height transparent spacer (`height: number`, required).
