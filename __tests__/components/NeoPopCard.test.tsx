import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('@shopify/react-native-skia', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => children,
  Path: () => null,
  Rect: () => null,
  useValue: () => ({ current: 0 }),
  useComputedValue: (_fn: () => unknown) => ({ current: 0 }),
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

jest.mock('expo-haptics', () => ({}), { virtual: true });

import { NeoPopCard } from '../../src/components/NeoPopCard/NeoPopCard';

describe('NeoPopCard', () => {
  it('renders without crashing with minimal props', () => {
    const { getByText } = render(
      <NeoPopCard>
        <Text>Card Content</Text>
      </NeoPopCard>,
    );
    expect(getByText('Card Content')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <NeoPopCard>
        <Text>Hello Card</Text>
      </NeoPopCard>,
    );
    expect(getByText('Hello Card')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <NeoPopCard onPress={onPress}>
        <Text>Pressable Card</Text>
      </NeoPopCard>,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled=true', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <NeoPopCard onPress={onPress} disabled>
        <Text>Disabled Card</Text>
      </NeoPopCard>,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('has accessibilityRole="button" when onPress is provided', () => {
    const { getByRole } = render(
      <NeoPopCard onPress={jest.fn()}>
        <Text>Pressable</Text>
      </NeoPopCard>,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders with custom depth prop', () => {
    const { getByText } = render(
      <NeoPopCard depth={8}>
        <Text>Deep Card</Text>
      </NeoPopCard>,
    );
    expect(getByText('Deep Card')).toBeTruthy();
  });

  it('renders with colorMode="light"', () => {
    const { getByText } = render(
      <NeoPopCard colorMode="light">
        <Text>Light Card</Text>
      </NeoPopCard>,
    );
    expect(getByText('Light Card')).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { getByText } = render(
      <NeoPopCard colorMode="dark">
        <Text>Dark Card</Text>
      </NeoPopCard>,
    );
    expect(getByText('Dark Card')).toBeTruthy();
  });
});
