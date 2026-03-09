import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('@shopify/react-native-skia', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => children,
  Path: () => null,
  Skia: {
    Path: {
      Make: () => ({
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        close: jest.fn(),
        addCircle: jest.fn(),
        addArc: jest.fn(),
        transform: jest.fn(),
        copy: jest.fn(),
      }),
    },
    Paint: () => ({
      setColor: jest.fn(),
      setStrokeWidth: jest.fn(),
      setStyle: jest.fn(),
      setStrokeCap: jest.fn(),
      setStrokeJoin: jest.fn(),
      setAntiAlias: jest.fn(),
    }),
    Color: (c: string) => c,
    Matrix: () => ({ identity: jest.fn(), translate: jest.fn(), rotate: jest.fn() }),
  },
}));

jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    GestureDetector: ({ children }: { children: React.ReactNode }) => children,
    Gesture: {
      Tap: () => ({
        onBegin: jest.fn().mockReturnThis(),
        onFinalize: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
        enabled: jest.fn().mockReturnThis(),
      }),
    },
    GestureHandlerRootView: View,
  };
});

jest.mock('expo-haptics', () => ({}), { virtual: true });

import { NeoPopTiltedButton } from '../../src/components/NeoPopTiltedButton/NeoPopTiltedButton';

describe('NeoPopTiltedButton', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<NeoPopTiltedButton />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <NeoPopTiltedButton>
        <Text>Tilted</Text>
      </NeoPopTiltedButton>,
    );
    expect(getByText('Tilted')).toBeTruthy();
  });

  it('renders with tiltDirection="left"', () => {
    const { toJSON } = render(
      <NeoPopTiltedButton tiltDirection="left">
        <Text>Left</Text>
      </NeoPopTiltedButton>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with tiltDirection="right"', () => {
    const { toJSON } = render(
      <NeoPopTiltedButton tiltDirection="right">
        <Text>Right</Text>
      </NeoPopTiltedButton>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with isFloating=true', () => {
    const { toJSON } = render(
      <NeoPopTiltedButton isFloating>
        <Text>Floating</Text>
      </NeoPopTiltedButton>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with enabled=false', () => {
    const { toJSON } = render(
      <NeoPopTiltedButton enabled={false}>
        <Text>Disabled</Text>
      </NeoPopTiltedButton>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopTiltedButton colorMode="light" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopTiltedButton colorMode="dark" />,
    );
    expect(toJSON()).toBeTruthy();
  });
});
