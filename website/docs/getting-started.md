---
id: getting-started
title: Getting Started
sidebar_position: 1
---

# Getting Started

## Installation

```bash
npm install @codecollab.co/neopop-rn
```

## Peer dependencies

Install the required peer dependencies:

```bash
npm install \
  @shopify/react-native-skia@^1.3 \
  react-native-reanimated@^3.6 \
  react-native-gesture-handler@^2.14
```

`expo-haptics` is optional but recommended for haptic feedback on interactive components:

```bash
npm install expo-haptics@^13
```

## Setup

### 1. Wrap your app with NeoPopProvider

```tsx
import { NeoPopProvider } from '@codecollab.co/neopop-rn';

export default function App() {
  return (
    <NeoPopProvider colorMode="dark">
      <YourApp />
    </NeoPopProvider>
  );
}
```

### 2. Configure Reanimated

Add the Reanimated Babel plugin to your `babel.config.js`:

```js
module.exports = {
  plugins: ['react-native-reanimated/plugin'],
};
```

### 3. Configure Gesture Handler

Wrap your app root with `GestureHandlerRootView`:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NeoPopProvider colorMode="dark">
        <YourApp />
      </NeoPopProvider>
    </GestureHandlerRootView>
  );
}
```

## Quick example

```tsx
import { NeoPopButton, NeoPopCard, NeoPopTypography } from '@codecollab.co/neopop-rn';

export function Example() {
  return (
    <NeoPopCard>
      <NeoPopTypography fontType="heading" style={{ color: '#fff' }}>
        Hello NeoPop
      </NeoPopTypography>
      <NeoPopButton
        buttonColor="#EDD514"
        textColor="#000000"
        onPress={() => console.log('pressed')}
      >
        Press me
      </NeoPopButton>
    </NeoPopCard>
  );
}
```

## TypeScript

The library ships full TypeScript declarations. No `@types` package needed.

## Platform support

| Platform | Support |
|----------|---------|
| iOS | ✅ Full |
| Android | ✅ Full |
| Web (React Native Web) | ✅ Full (Skia via WebGL) |
| Expo Go | ⚠️ Limited (Skia requires dev client) |
| Expo dev client | ✅ Full |
