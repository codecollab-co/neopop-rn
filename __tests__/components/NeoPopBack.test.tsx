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
        transform: jest.fn(),
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

import { NeoPopBack } from '../../src/components/NeoPopBack/NeoPopBack';

describe('NeoPopBack', () => {
  it('renders without crashing with minimal props', () => {
    const { toJSON } = render(<NeoPopBack onPress={jest.fn()} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders heading text when provided', () => {
    const { getByText } = render(
      <NeoPopBack onPress={jest.fn()} heading="Go Back" />,
    );
    expect(getByText('Go Back')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<NeoPopBack onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders rightElement slot', () => {
    const { getByText } = render(
      <NeoPopBack onPress={jest.fn()} rightElement={<Text>Right</Text>} />,
    );
    expect(getByText('Right')).toBeTruthy();
  });

  it('has accessibilityRole="button"', () => {
    const { getByRole } = render(<NeoPopBack onPress={jest.fn()} />);
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopBack onPress={jest.fn()} colorMode="light" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopBack onPress={jest.fn()} colorMode="dark" />,
    );
    expect(toJSON()).toBeTruthy();
  });
});
