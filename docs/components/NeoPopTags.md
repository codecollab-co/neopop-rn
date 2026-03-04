# NeoPopTags

A compact inline label/tag with a semantic type, optional icon, and fully overridable color configuration.

## Usage

```tsx
// dark mode example
import { NeoPopTags } from 'neopop-rn';
import { Text } from 'react-native';

<NeoPopTags
  type="success"
  colorMode="dark"
  colorConfig={{ background: '#06C270', color: '#ffffff' }}
>
  <Text>Verified</Text>
</NeoPopTags>
```

```tsx
// light mode example
import { NeoPopTags } from 'neopop-rn';
import { Text } from 'react-native';

<NeoPopTags
  type="warning"
  colorMode="light"
  colorConfig={{ background: '#FFF3CD', color: '#856404', borderColor: '#FFEEBA' }}
>
  <Text>Pending</Text>
</NeoPopTags>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Required. Tag label content. |
| `colorConfig` | `NeoPopTagsColorConfig` | — | Required. Color overrides for the tag (see colorConfig table). |
| `type` | `'warning' \| 'error' \| 'success' \| 'info' \| 'custom'` | — | Semantic type hint; the component may use this to select built-in defaults when `colorConfig` values are absent. |
| `colorMode` | `'dark' \| 'light'` | — | Theme mode. |
| `icon` | `React.ReactNode` | — | Optional icon rendered to the left of the children. |
| `noContainer` | `boolean` | — | When `true`, renders children without the background container (icon + text only). |
| `textStyle` | `StyleProp<TextStyle>` | — | Additional style applied to the text content. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the tag container. |

## colorConfig

| Key | Description |
|-----|-------------|
| `background` | Tag background fill color. |
| `color` | Tag text / icon foreground color. |
| `borderColor` | Tag border color. |

## Notes

- `colorConfig` is required (the type does not mark it optional); always pass at least an empty object `{}` to avoid type errors, though the component may fall back to `type`-based defaults.
- `noContainer` removes the background `View` entirely, which is useful when embedding the tag inline inside other text.
- The `icon` is rendered inside the container alongside `children`; size it appropriately for the tag height.
