# @codecollab.co/neopop-rn

> NeoPop design system for React Native — every feature from CRED's iOS, Android, Web, and Flutter libraries unified into one Expo-compatible TypeScript package.

[![npm version](https://img.shields.io/npm/v/@codecollab.co/neopop-rn.svg)](https://www.npmjs.com/package/@codecollab.co/neopop-rn)
[![license](https://img.shields.io/npm/l/@codecollab.co/neopop-rn.svg)](./LICENSE)
[![CI](https://github.com/codecollab-co/neopop-rn/actions/workflows/ci.yml/badge.svg)](https://github.com/codecollab-co/neopop-rn/actions)

---

## What is NeoPop?

NeoPop is CRED's "next generation of beautiful, affirmative design" — a 3D visual language built around multi-surface rendering, depth effects, shimmer animations, and tactile interactions. This library brings the complete NeoPop system to React Native and Expo, covering every component from all four original CRED repos.

---

## Features

- **20 components** — buttons, form controls, navigation, feedback, display
- **3D surfaces** — five-face model (top, left, right, bottom, center) via Skia
- **Fluid animations** — Reanimated 3 on the UI thread, zero JS-thread jank
- **Shimmer effects** — standalone wrapper or built into any button
- **Full dark / light mode** — global provider + per-component override
- **Complete token system** — exported color palettes, spacing, typography scale
- **Web support** — same codebase works on iOS, Android, and web via Expo
- **Haptics** — opt-in per component via `expo-haptics`
- **Strict TypeScript** — every prop interface exported

---

## Installation

```bash
# With npm
npm install @codecollab.co/neopop-rn

# With yarn
yarn add @codecollab.co/neopop-rn

# With Expo
npx expo install @codecollab.co/neopop-rn
```

### Peer Dependencies

```bash
npx expo install \
  react-native-reanimated \
  react-native-gesture-handler \
  @shopify/react-native-skia \
  expo-haptics
```

| Peer Dependency | Version | Required |
|---|---|---|
| `react-native-reanimated` | `>=3.0.0` | Yes |
| `react-native-gesture-handler` | `>=2.0.0` | Yes |
| `@shopify/react-native-skia` | `>=1.0.0` | Yes |
| `expo-haptics` | `>=13.0.0` | Optional |

### Babel Plugin (Required)

Add the Reanimated plugin to your `babel.config.js` — it must be last:

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ... other plugins
      'react-native-reanimated/plugin', // must be last
    ],
  };
};
```

---

## Setup

Wrap your app with `NeoPopProvider` and `GestureHandlerRootView`:

```tsx
// App.tsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NeoPopProvider } from '@codecollab.co/neopop-rn';
import { RootNavigator } from './navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NeoPopProvider colorMode="dark">
        <RootNavigator />
      </NeoPopProvider>
    </GestureHandlerRootView>
  );
}
```

---

## Components

### NeoPopButton

The centrepiece of NeoPop. A 3D extruded button with press-down animation, shimmer, and adjacency support.

```tsx
import { NeoPopButton, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

// Elevated (default)
<NeoPopButton
  variant="elevated"
  size="big"
  fullWidth
  colorConfig={{ color: '#ffffff' }}
  onPress={() => console.log('pressed')}
  enableHaptics
>
  <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.BOLD} fontSize={14} color="#0d0d0d">
    PAY NOW
  </NeoPopTypography>
</NeoPopButton>

// Flat
<NeoPopButton variant="flat" colorConfig={{ color: '#0d0d0d' }} onPress={onPress}>
  ...
</NeoPopButton>

// Stroke
<NeoPopButton variant="stroke" colorConfig={{ borderColor: '#ffffff' }} onPress={onPress}>
  ...
</NeoPopButton>

// With shimmer
<NeoPopButton
  variant="elevated"
  colorConfig={{ color: '#06C270' }}
  shimmerConfig={{ enabled: true, color: 'rgba(255,255,255,0.4)', duration: 1500 }}
  onPress={onPress}
>
  ...
</NeoPopButton>

// Adjacent buttons (shared edge)
<View style={{ flexDirection: 'row' }}>
  <NeoPopButton variant="elevated" adjacentRight style={{ flex: 1 }}>...</NeoPopButton>
  <NeoPopButton variant="elevated" adjacentLeft  style={{ flex: 1 }}>...</NeoPopButton>
</View>
```

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'elevated' \| 'flat' \| 'stroke'` | `'elevated'` | Button style |
| `size` | `'big' \| 'medium' \| 'small'` | `'medium'` | `big`=50px, `medium`=40px, `small`=30px height |
| `depth` | `number` | `3` | 3D extrusion depth in px |
| `fullWidth` | `boolean` | `false` | Stretch to container width |
| `position` | `ButtonPosition` | `'bottomRight'` | 9-point placement for edge sharing |
| `adjacentRight/Left/Top/Bottom` | `boolean` | `false` | Hide shared edge with sibling button |
| `colorConfig` | `NeoPopButtonColorConfig` | theme default | Per-instance color overrides |
| `shimmerConfig` | `NeoPopButtonShimmerConfig` | — | Enable shimmer overlay |
| `disabled` | `boolean` | `false` | Disable interaction + reduce opacity |
| `enableHaptics` | `boolean` | `false` | Trigger haptic on press |
| `onPress` | `() => void` | — | Press callback |
| `onLongPress` | `() => void` | — | Long press callback |

---

### NeoPopTiltedButton

Skewed 3D button with optional continuous floating animation.

```tsx
import { NeoPopTiltedButton } from '@codecollab.co/neopop-rn';

// Static tilt
<NeoPopTiltedButton
  color="#ffffff"
  onTapUp={() => console.log('tapped')}
>
  <Text>TILTED</Text>
</NeoPopTiltedButton>

// Floating animation
<NeoPopTiltedButton
  isFloating
  floatingDuration={1500}
  decoration={{ color: '#06C270', showShimmer: true }}
  onTapDown={onPress}
>
  <Text>FLOATING</Text>
</NeoPopTiltedButton>
```

---

### NeoPopFloatingButton

Dedicated floating button with continuous levitation loop and imperative API.

```tsx
import { NeoPopFloatingButton, type NeoPopFloatingButtonRef } from '@codecollab.co/neopop-rn';

const ref = useRef<NeoPopFloatingButtonRef>(null);

<NeoPopFloatingButton
  ref={ref}
  colorConfig={{ color: '#ffffff', shadowColor: '#8A8A8A' }}
  onPress={() => ref.current?.disableOnNextClick()}
  enableHaptics
>
  <Text>FLOATING</Text>
</NeoPopFloatingButton>

// Imperative control
ref.current?.startShimmer({ repeatCount: 3 });
ref.current?.disable({ alpha: 0.4 });
ref.current?.enable();
```

---

### NeoPopCard

Standalone 3D surface container. Use as a card, panel, or any elevated content block.

```tsx
import { NeoPopCard } from '@codecollab.co/neopop-rn';

<NeoPopCard
  color="#161616"
  depth={3}
  edges={['bottom', 'right']}
  onPress={() => console.log('card pressed')}
>
  <Text>Card content</Text>
</NeoPopCard>
```

---

### NeoPopShimmer

Wrap any component with a shimmer sweep — loading states, highlights, CTAs.

```tsx
import { NeoPopShimmer } from '@codecollab.co/neopop-rn';

<NeoPopShimmer
  enabled={isLoading}
  config={{ color: 'rgba(255,248,229,0.5)', duration: 1500, repeatDelay: 1000 }}
>
  <View style={{ width: 200, height: 60, backgroundColor: '#222' }} />
</NeoPopShimmer>
```

---

### Form Controls

#### NeoPopCheckbox

```tsx
import { NeoPopCheckbox } from '@codecollab.co/neopop-rn';

const [checked, setChecked] = useState(false);

<NeoPopCheckbox
  isChecked={checked}
  onValueChange={setChecked}
  mode="dark"
  label={<Text>Accept terms</Text>}
  enableHaptics
/>
```

#### NeoPopRadio

```tsx
import { NeoPopRadio } from '@codecollab.co/neopop-rn';

<NeoPopRadio
  isChecked={selected === 'option1'}
  onValueChange={() => setSelected('option1')}
  label={<Text>Option 1</Text>}
  mode="dark"
/>
```

#### NeoPopToggle

```tsx
import { NeoPopToggle } from '@codecollab.co/neopop-rn';

const [on, setOn] = useState(false);

<NeoPopToggle
  isChecked={on}
  onValueChange={setOn}
  colorMode="dark"
  enableHaptics
/>
```

#### NeoPopInputField

```tsx
import { NeoPopInputField } from '@codecollab.co/neopop-rn';

<NeoPopInputField
  label="Email"
  placeholder="you@example.com"
  value={email}
  onChange={setEmail}
  inputMode="email"
  hasError={!!error}
  errorMessage={error}
  autoFocus
  scrollIntoView
/>
```

#### NeoPopDropdown

```tsx
import { NeoPopDropdown } from '@codecollab.co/neopop-rn';

<NeoPopDropdown
  label="Select City"
  value={selectedCity}
  onPress={() => setShowPicker(true)}
  colorMode="dark"
/>
```

#### NeoPopSlider

```tsx
import { NeoPopSlider } from '@codecollab.co/neopop-rn';

<NeoPopSlider
  min={0}
  max={100}
  step={1}
  defaultValue={50}
  onValueChange={(val) => console.log(val)}
  enableHaptics
  trackConfig={{ activeColor: '#06C270', inactiveColor: '#3D3D3D' }}
  thumbConfig={{ backgroundColor: '#ffffff', borderRadius: 8 }}
/>
```

---

### Navigation

#### NeoPopBottomSheet

```tsx
import { NeoPopBottomSheet, type NeoPopBottomSheetRef } from '@codecollab.co/neopop-rn';

const sheetRef = useRef<NeoPopBottomSheetRef>(null);

<NeoPopBottomSheet
  ref={sheetRef}
  maxHeight="80%"
  onCloseEnd={() => console.log('closed')}
  shouldShowNotch
  shouldShowOverlay
>
  <View style={{ padding: 24 }}>
    <Text>Sheet content</Text>
  </View>
</NeoPopBottomSheet>

// Open / close imperatively
sheetRef.current?.open();
sheetRef.current?.close();
```

#### NeoPopHeader

```tsx
import { NeoPopHeader } from '@codecollab.co/neopop-rn';

<NeoPopHeader
  heading="Payment"
  description="Complete your transaction"
  onBackPress={() => navigation.goBack()}
/>
```

#### NeoPopBack

```tsx
import { NeoPopBack } from '@codecollab.co/neopop-rn';

<NeoPopBack
  heading="Go Back"
  onPress={() => navigation.goBack()}
  rightElement={<SomeIcon />}
/>
```

---

### Feedback & Display

#### NeoPopTags

```tsx
import { NeoPopTags } from '@codecollab.co/neopop-rn';

<NeoPopTags type="success" colorConfig={{ background: '#E6F9F1', color: '#06C270' }}>
  Verified
</NeoPopTags>

<NeoPopTags type="error" colorConfig={{ background: '#FCE2DD', color: '#EE4D37' }}>
  Failed
</NeoPopTags>
```

#### NeoPopToast

```tsx
import { ToastProvider, useToast } from '@codecollab.co/neopop-rn';

// In App.tsx — wrap your app
<ToastProvider position="bottom" maxToasts={3}>
  <App />
</ToastProvider>

// In any component
const { addToast } = useToast();

addToast({
  content: 'Payment successful',
  type: 'success',
  colorConfig: { background: '#06C270', color: '#ffffff' },
  autoCloseTime: 3000,
  dismissOnClick: true,
});
```

#### NeoPopScoreMeter

```tsx
import { NeoPopScoreMeter } from '@codecollab.co/neopop-rn';

<NeoPopScoreMeter
  reading={750}
  oldReading={600}
  type="excellent"
  scoreDesc="Credit Score"
  showIndicators
  showLegends
/>
```

---

### Typography

```tsx
import { NeoPopTypography, FontType, FontWeight, TextOverflow } from '@codecollab.co/neopop-rn';

<NeoPopTypography
  fontType={FontType.HEADING}
  fontWeight={FontWeight.BOLD}
  fontSize={24}
  color="#ffffff"
>
  NeoPop Heading
</NeoPopTypography>

<NeoPopTypography
  fontType={FontType.CAPS}
  fontWeight={FontWeight.SEMI_BOLD}
  fontSize={12}
  color="#8A8A8A"
  overflow={TextOverflow.ELLIPSIS}
  lineClamp={2}
>
  UPPERCASE LABEL WITH CLAMP
</NeoPopTypography>
```

| Font Type | Style | Use case |
|---|---|---|
| `HEADING` | -0.5 letter spacing, 1.2× line height | Page titles, hero text |
| `CAPS` | +1.5 letter spacing, uppercase, 1.3× | Labels, buttons, tags |
| `BODY` | 0 letter spacing, 1.5× line height | Paragraphs, descriptions |
| `SERIF_HEADING` | -0.3 letter spacing, serif font, 1.15× | Editorial, premium headings |

---

### Layout Helpers

```tsx
import { Row, Column, PageContainer, HorizontalDivider, HorizontalSpacer, VerticalSpacer } from '@codecollab.co/neopop-rn';

<PageContainer>
  <Column gap={16}>
    <Row align="center" justify="space-between">
      <NeoPopTypography fontType={FontType.BODY} fontWeight={FontWeight.MEDIUM} fontSize={14} color="#fff">
        Total Amount
      </NeoPopTypography>
      <HorizontalSpacer width={8} />
      <NeoPopTypography fontType={FontType.HEADING} fontWeight={FontWeight.BOLD} fontSize={18} color="#fff">
        ₹1,299
      </NeoPopTypography>
    </Row>
    <HorizontalDivider color="#3D3D3D" />
    <VerticalSpacer height={8} />
    <NeoPopButton variant="elevated" size="big" fullWidth colorConfig={{ color: '#ffffff' }} onPress={onPay}>
      <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.BOLD} fontSize={14} color="#0d0d0d">
        PAY NOW
      </NeoPopTypography>
    </NeoPopButton>
  </Column>
</PageContainer>
```

---

### Icon Helpers

```tsx
import { Chevron, Cross, Pointer } from '@codecollab.co/neopop-rn';

<Chevron direction="south" size={16} color="#ffffff" animated />
<Chevron direction="north" size={12} color="#8A8A8A" />

<Cross size={20} color="#ffffff" onPress={() => dismiss()} hitSlop={8} />

<Pointer direction="right" size={16} color="#06C270" />
```

---

## Theming

### Global Provider

```tsx
<NeoPopProvider
  colorMode="dark"
  theme={{
    button: {
      color: '#06C270',
      edgeColors: { bottom: '#04A05C', right: '#059E5A' },
    },
  }}
>
  <App />
</NeoPopProvider>
```

### Access Theme in Components

```tsx
import { useNeoPopTheme } from '@codecollab.co/neopop-rn';

function MyComponent() {
  const theme = useNeoPopTheme();
  return (
    <View style={{ backgroundColor: theme.colors?.background as string }}>
      ...
    </View>
  );
}
```

### Per-Component Override

Every component accepts a `colorConfig` prop that deep-merges with the theme default:

```tsx
// This button uses green instead of the theme's default white
<NeoPopButton
  colorConfig={{
    color: '#06C270',
    edgeColors: { bottom: '#059E5A' },
  }}
  onPress={onPress}
>
  ...
</NeoPopButton>
```

---

## Design Token System

All primitives are exported for use in your own components:

```tsx
import {
  COLOR_BLACK, COLOR_WHITE, COLOR_GREEN,
  POP_BLACK, POP_WHITE,
  SEMANTIC_SUCCESS, SEMANTIC_ERROR,
  POLI_PURPLE, ORANGE_SUNSHINE,
  SPACING, SPACING_MD,
  BUTTON_DEPTH,
  FontType, FontWeight,
  OPACITY, DISABLED_OPACITY,
} from '@codecollab.co/neopop-rn';
```

### Color Palettes

| Token | Range | Description |
|---|---|---|
| `POP_BLACK` | 100–500 | Dark scale from #8A8A8A to #0d0d0d |
| `POP_WHITE` | 100–500 | Light scale from #D2D2D2 to #ffffff |
| `POLI_PURPLE` | [0]–[7] | 8-step purple palette |
| `ORANGE_SUNSHINE` | [0]–[7] | 8-step warm orange |
| `PARK_GREEN` | [0]–[7] | 8-step green |
| `PINK_PONG` | [0]–[7] | 8-step pink |
| `MANNNA` | [0]–[7] | 8-step gold |
| `NEO_PACCHA` | [0]–[7] | 8-step lime |
| `YOYO` | [0]–[7] | 8-step purple-pink |
| `SEMANTIC_ERROR` | [0]–[4] | Error red scale |
| `SEMANTIC_WARNING` | [0]–[4] | Warning orange scale |
| `SEMANTIC_INFO` | [0]–[4] | Info blue scale |
| `SEMANTIC_SUCCESS` | [0]–[4] | Success green scale |

---

## Utility Functions

```tsx
import {
  hexToRGBA,
  getHorizontalShadow,
  getVerticalShadow,
  deriveEdgeColor,
  getLuminance,
  isColorDark,
  getContrastColor,
  adjustLightness,
  isEmpty,
  mergeDeep,
  currencyFormatter,
  generateTextStyle,
} from '@codecollab.co/neopop-rn';

// Auto-derive 3D edge colors from any face color
const { right, bottom } = deriveEdgeColor('#06C270');

// Convert hex to rgba
const overlay = hexToRGBA('#0d0d0d', 0.7); // 'rgba(13,13,13,0.7)'

// Format currency
const price = currencyFormatter(1299);       // '₹1,299'
const usd   = currencyFormatter(49.99, '', 2, 'usd'); // '$49.99'

// Generate RN TextStyle from tokens
const style = generateTextStyle(FontType.CAPS, 14, FontWeight.BOLD, '#ffffff');
```

---

## Custom Hooks

```tsx
import { useAutoFocus, useClientHeight, useDelayMount, useScrollIntoView } from '@codecollab.co/neopop-rn';

// Auto-focus a TextInput after 100ms
const inputRef = useAutoFocus();
<TextInput ref={inputRef} />

// Measure component height
const [height, onLayout] = useClientHeight();
<View onLayout={onLayout}>...</View>

// Delay mount for animation
const ready = useDelayMount(300);
if (!ready) return null;

// Scroll into view on focus
const { scrollViewRef, targetRef, scrollIntoView } = useScrollIntoView();
<ScrollView ref={scrollViewRef}>
  <View ref={targetRef}>
    <TextInput onFocus={scrollIntoView} />
  </View>
</ScrollView>
```

---

## Storybook

Run the interactive component explorer:

```bash
# Run on iOS simulator
npm run example ios

# Run on Android emulator
npm run example android

# Run on web
npm run example web
```

---

## Platform Support

| Platform | Support | Notes |
|---|---|---|
| iOS | Full | All 20 components |
| Android | Full | All 20 components |
| Web (Expo) | Full | Skia via WASM, same codebase |

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Follow [Conventional Commits](https://www.conventionalcommits.org/)
4. Run `npm run typecheck && npm run lint && npm test` before pushing
5. Open a pull request

### Commit Format

```
feat(button): add adjacentBottom prop
fix(shimmer): correct sweep direction on web
perf(skia): move edge path computation to UI thread
docs(readme): add slider usage example
```

---

## License

[Apache 2.0](./LICENSE)

---

## Acknowledgements

Built on top of CRED's original NeoPop design system:
- [neopop-ios](https://github.com/CRED-CLUB/neopop-ios)
- [neopop-android](https://github.com/CRED-CLUB/neopop-android)
- [neopop-web](https://github.com/CRED-CLUB/neopop-web)
- [neopop-flutter](https://github.com/CRED-CLUB/neopop-flutter)
