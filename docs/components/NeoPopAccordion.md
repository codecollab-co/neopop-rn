# NeoPopAccordion

A collapsible accordion with a NeoPop 3D header, animated chevron, height-animated body, and support for both controlled and uncontrolled modes.

## Usage

```tsx
// dark mode example
import { NeoPopAccordion } from 'neopop-rn';
import { Text } from 'react-native';

<NeoPopAccordion
  title="Payment Details"
  defaultExpanded={false}
  colorMode="dark"
  colorConfig={{
    headerBackground: '#1a1a1a',
    headerTextColor: '#ffffff',
    chevronColor: '#ffffff',
    bodyBackground: '#0d0d0d',
    edgeColor: '#3D3D3D',
  }}
>
  <Text style={{ color: '#ffffff' }}>Card ending in 4242</Text>
</NeoPopAccordion>
```

```tsx
// light mode example — controlled mode
import { NeoPopAccordion } from 'neopop-rn';
import { useState } from 'react';
import { Text } from 'react-native';

function Example() {
  const [expanded, setExpanded] = useState(false);

  return (
    <NeoPopAccordion
      title="Frequently Asked Questions"
      isExpanded={expanded}
      onToggle={setExpanded}
      colorMode="light"
      rightElement={<Text style={{ fontSize: 12 }}>Details</Text>}
    >
      <Text>Answer to the FAQ goes here.</Text>
    </NeoPopAccordion>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Required. Text displayed in the header row. |
| `children` | `ReactNode` | — | Required. Body content shown when expanded. |
| `isExpanded` | `boolean` | — | Controlled expansion state. When provided, `defaultExpanded` is ignored. |
| `onToggle` | `(next: boolean) => void` | — | Called with the new boolean state when the header is pressed. |
| `defaultExpanded` | `boolean` | — | Initial expansion state for uncontrolled usage. |
| `colorConfig` | `NeoPopAccordionColorConfig` | — | Per-token color overrides (see colorConfig table). |
| `colorMode` | `'dark' \| 'light'` | — | Theme mode for default colors. |
| `style` | `StyleProp<ViewStyle>` | — | Additional style applied to the outer container. |
| `headerStyle` | `StyleProp<ViewStyle>` | — | Additional style applied to the header row. |
| `titleStyle` | `StyleProp<TextStyle>` | — | Additional style applied to the header title text. |
| `bodyStyle` | `StyleProp<ViewStyle>` | — | Additional style applied to the body container. |
| `rightElement` | `ReactNode` | — | Optional element rendered to the right of the title in the header. |

## colorConfig

| Key | Description |
|-----|-------------|
| `headerBackground` | Background color of the header row. |
| `headerTextColor` | Color of the `title` text. |
| `chevronColor` | Color of the expand/collapse chevron icon. |
| `bodyBackground` | Background color of the body container. |
| `edgeColor` | Color of the 3D border/edge on the header. |

## Notes

- When `isExpanded` is supplied, the component is in controlled mode; you must update the prop via `onToggle` for the accordion to open/close.
- When neither `isExpanded` nor `defaultExpanded` is provided, the accordion starts collapsed.
- The body height is animated using `react-native-reanimated`; avoid placing children with dynamic heights that change after mount, as the initial measurement determines the animated range.
- The chevron rotates 180° when expanded (pointing up) and returns to 0° when collapsed (pointing down).
