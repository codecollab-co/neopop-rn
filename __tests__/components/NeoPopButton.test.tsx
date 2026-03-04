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

jest.mock('expo-haptics', () => ({}), { virtual: true });

import { NeoPopButton } from '../../src/components/NeoPopButton/NeoPopButton';

describe('NeoPopButton', () => {
  it('renders without crashing with minimal props', () => {
    const { getByRole } = render(
      <NeoPopButton onPress={jest.fn()}>
        <Text>Click Me</Text>
      </NeoPopButton>,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <NeoPopButton onPress={jest.fn()}>
        <Text>Press Here</Text>
      </NeoPopButton>,
    );
    expect(getByText('Press Here')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <NeoPopButton onPress={onPress}>
        <Text>Button</Text>
      </NeoPopButton>,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled=true', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <NeoPopButton onPress={onPress} disabled>
        <Text>Button</Text>
      </NeoPopButton>,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('has accessibilityRole="button"', () => {
    const { getByRole } = render(
      <NeoPopButton onPress={jest.fn()}>
        <Text>Button</Text>
      </NeoPopButton>,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('accessibilityState.disabled is false when not disabled', () => {
    const { getByRole } = render(
      <NeoPopButton onPress={jest.fn()} disabled={false}>
        <Text>Button</Text>
      </NeoPopButton>,
    );
    const el = getByRole('button');
    expect(el.props.accessibilityState?.disabled).toBe(false);
  });

  it('accessibilityState.disabled is true when disabled=true', () => {
    const { getByRole } = render(
      <NeoPopButton onPress={jest.fn()} disabled>
        <Text>Button</Text>
      </NeoPopButton>,
    );
    const el = getByRole('button');
    expect(el.props.accessibilityState?.disabled).toBe(true);
  });
});
