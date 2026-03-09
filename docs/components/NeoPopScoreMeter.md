# NeoPopScoreMeter

A semi-circular arc gauge drawn on a Skia Canvas, used to display score values with animated sweep transitions. The arc spans 180 degrees and animates from `oldReading` to `reading`.

## Usage

```tsx
// dark mode example
import { NeoPopScoreMeter } from 'neopop-rn';

<NeoPopScoreMeter
  reading={750}
  oldReading={600}
  type="excellent"
  scoreDesc="Credit Score"
  showLegends
  showIndicators
  lowerLimit={300}
  upperLimit={900}
  colorMode="dark"
/>
```

```tsx
// light mode example
import { NeoPopScoreMeter } from 'neopop-rn';

<NeoPopScoreMeter
  reading={450}
  oldReading={400}
  type="average"
  scoreDesc="Credit Score"
  showLegends
  lowerLimit={300}
  upperLimit={900}
  colorMode="light"
  colorConfig={{
    excellentColor: '#06C270',
    averageColor: '#F5A623',
    poorColor: '#EE4D37',
    trackColor: '#D2D2D2',
    scoreTextColor: '#0d0d0d',
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `reading` | `number` | — | Required. Current score value to display (clamped to `[lowerLimit, upperLimit]`). |
| `oldReading` | `number` | — | Required. Previous score value — the arc animates from this value to `reading`. |
| `type` | `'excellent' \| 'average' \| 'poor'` | — | Score category that determines the stroke color. |
| `scoreDesc` | `string` | — | Description text displayed below the score number inside the arc. |
| `showIndicators` | `boolean` | — | Show increment/decrement indicator arrows next to the score. |
| `showLegends` | `boolean` | — | Show legend labels (poor / average / excellent) below the arc. |
| `lowerLimit` | `number` | `300` | Minimum value of the score range. |
| `upperLimit` | `number` | `900` | Maximum value of the score range. |
| `colorMode` | `'dark' \| 'light'` | — | Theme mode. Falls back to `NeoPopProvider`'s `colorMode`. |
| `colorConfig` | `NeoPopScoreMeterColorConfig` | — | Per-token color overrides (see colorConfig table). |
| `size` | `number` | — | Diameter of the canvas in pixels. |
| `strokeWidth` | `number` | — | Width of the arc stroke in pixels. |
| `onAnimationComplete` | `() => void` | — | Callback fired when the arc sweep animation finishes. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the outer container. |

## colorConfig

| Key | Description |
|-----|-------------|
| `excellentColor` | Stroke color when `type` is `'excellent'`. |
| `averageColor` | Stroke color when `type` is `'average'`. |
| `poorColor` | Stroke color when `type` is `'poor'`. |
| `trackColor` | Color of the unfilled (background) arc. |
| `indicatorColor` | Color of the increment/decrement indicator arrows. |
| `legendTextColor` | Color of the legend labels below the arc. |
| `scoreTextColor` | Color of the main score number text. |
| `descTextColor` | Color of the `scoreDesc` description text. |

## Notes

- The arc sweeps from `oldReading` to `reading` using `react-native-reanimated` `withTiming` + `useDerivedValue` to produce a `SharedValue<SkPath>` passed directly to Skia as an `AnimatedProp`.
- Requires `@shopify/react-native-skia` as a peer dependency.
- The component reads default colors from `NeoPopProvider`'s `scoreMeter` theme key when `colorConfig` is not provided.
- `accessibilityRole="progressbar"` and `accessibilityValue={{ min: lowerLimit, max: upperLimit, now: reading }}` are set automatically.
