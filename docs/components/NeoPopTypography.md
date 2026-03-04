# NeoPopTypography

A text component that applies NeoPop typographic tokens — font type, weight, letter spacing, line-height multiplier, and text transform — consistently across the design system.

## Usage

```tsx
// dark mode example
import { NeoPopTypography } from 'neopop-rn';
import { FontType, FontWeight } from 'neopop-rn/primitives/typography';

<NeoPopTypography
  fontType={FontType.HEADING}
  fontWeight={FontWeight.BOLD}
  fontSize={24}
  color="#ffffff"
>
  Dark Heading
</NeoPopTypography>
```

```tsx
// light mode example
import { NeoPopTypography } from 'neopop-rn';
import { FontType, FontWeight } from 'neopop-rn/primitives/typography';

<NeoPopTypography
  fontType={FontType.BODY}
  fontWeight={FontWeight.REGULAR}
  fontSize={14}
  color="#0d0d0d"
>
  Body copy for a light screen.
</NeoPopTypography>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Required. Text content. |
| `fontType` | `FontType` | — | Selects the typographic role, which controls letter spacing, line-height multiplier, text transform, and default font family (see FontType table). |
| `fontWeight` | `FontWeight` | — | Numeric weight string applied directly to `fontWeight` (see FontWeight table). |
| `fontSize` | `number` | — | Font size in logical pixels. |
| `color` | `string` | — | Text color. |
| `fontFamily` | `string` | — | Overrides the default font family for the selected `fontType`. |
| `lineHeight` | `number` | — | Explicit line height; if omitted, computed as `fontSize × LINE_HEIGHT_MULTIPLIER[fontType]`. |
| `overflow` | `TextOverflow` | — | `'ellipsis'` or `'clip'`. Maps to React Native's `ellipsizeMode`. |
| `lineClamp` | `number` | — | Maximum number of lines before truncation (maps to `numberOfLines`). |
| `style` | `StyleProp<TextStyle>` | — | Additional text styles applied last (can override any token). |

## FontType × FontWeight Table

| FontType | enum value | Default family | Letter spacing | Line-height multiplier | Text transform |
|----------|-----------|---------------|---------------|----------------------|----------------|
| `HEADING` | `'heading'` | `System` | `-0.5` | `1.2` | `none` |
| `CAPS` | `'caps'` | `System` | `1.5` | `1.3` | `uppercase` |
| `BODY` | `'body'` | `System` | `0` | `1.5` | `none` |
| `SERIF_HEADING` | `'serif-heading'` | `Georgia` | `-0.3` | `1.15` | `none` |

| FontWeight | enum value (string) |
|------------|---------------------|
| `EXTRA_BOLD` | `'800'` |
| `BOLD` | `'700'` |
| `SEMI_BOLD` | `'600'` |
| `MEDIUM` | `'500'` |
| `REGULAR` | `'400'` |
| `THIN` | `'300'` |

## colorConfig

NeoPopTypography does not accept a `colorConfig` prop. Use the `color` prop or `style` to override text color.

## Notes

- `CAPS` applies `textTransform: 'uppercase'` automatically; you do not need to set it via `style`.
- `SERIF_HEADING` defaults to `Georgia`; on Android, ensure the font is bundled or it will fall back to the system serif.
- When both `lineHeight` and `fontType` are provided, the explicit `lineHeight` takes precedence over the multiplier.
- `overflow` and `lineClamp` must be set together for truncation to work correctly on Android.
