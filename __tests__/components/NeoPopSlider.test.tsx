import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('@shopify/react-native-skia', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => children,
  Path: () => null,
  Skia: {
    Path: { Make: () => ({ moveTo: jest.fn(), lineTo: jest.fn() }) },
    Paint: () => ({ setColor: jest.fn(), setStyle: jest.fn() }),
    Color: (c: string) => c,
    Matrix: () => ({ identity: jest.fn(), translate: jest.fn(), rotate: jest.fn() }),
  },
}));

jest.mock('expo-haptics', () => ({}), { virtual: true });

jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    GestureDetector: ({ children }: { children: React.ReactNode }) => children,
    Gesture: {
      Pan: () => ({
        onChange: jest.fn().mockReturnThis(),
        onUpdate: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
        onBegin: jest.fn().mockReturnThis(),
        onFinalize: jest.fn().mockReturnThis(),
        activeOffsetX: jest.fn().mockReturnThis(),
        failOffsetY: jest.fn().mockReturnThis(),
        minDistance: jest.fn().mockReturnThis(),
        enabled: jest.fn().mockReturnThis(),
      }),
    },
    GestureHandlerRootView: View,
  };
});

import { NeoPopSlider } from '../../src/components/NeoPopSlider/NeoPopSlider';

describe('NeoPopSlider', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <NeoPopSlider min={0} max={100} step={1} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with defaultValue', () => {
    const { toJSON } = render(
      <NeoPopSlider min={0} max={100} step={1} defaultValue={50} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with controlled value', () => {
    const { toJSON } = render(
      <NeoPopSlider min={0} max={100} step={1} value={30} onValueChange={jest.fn()} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('has accessibilityRole="adjustable"', () => {
    const { UNSAFE_getByProps } = render(
      <NeoPopSlider min={0} max={100} step={1} />,
    );
    expect(UNSAFE_getByProps({ accessibilityRole: 'adjustable' })).toBeTruthy();
  });

  it('has correct accessibilityValue', () => {
    const { UNSAFE_getByProps } = render(
      <NeoPopSlider min={0} max={100} step={1} value={40} onValueChange={jest.fn()} />,
    );
    const el = UNSAFE_getByProps({ accessibilityRole: 'adjustable' });
    expect(el.props.accessibilityValue?.min).toBe(0);
    expect(el.props.accessibilityValue?.max).toBe(100);
  });

  it('renders with disabled=true', () => {
    const { toJSON } = render(
      <NeoPopSlider min={0} max={100} step={1} disabled />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with custom thumbConfig', () => {
    const { toJSON } = render(
      <NeoPopSlider
        min={0}
        max={100}
        step={5}
        thumbConfig={{ size: 20, color: '#ff0000' }}
      />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopSlider min={0} max={100} step={1} colorMode="light" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopSlider min={0} max={100} step={1} colorMode="dark" />,
    );
    expect(toJSON()).toBeTruthy();
  });
});
