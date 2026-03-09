import React from 'react';
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

import { NeoPopDropdown } from '../../src/components/NeoPopDropdown/NeoPopDropdown';

describe('NeoPopDropdown', () => {
  it('renders without crashing with minimal props', () => {
    const { toJSON } = render(
      <NeoPopDropdown label="Select" onPress={jest.fn()} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders label text', () => {
    const { getByText } = render(
      <NeoPopDropdown label="Country" onPress={jest.fn()} />,
    );
    expect(getByText('Country')).toBeTruthy();
  });

  it('renders selected value when provided', () => {
    const { getByText } = render(
      <NeoPopDropdown label="Country" value="India" onPress={jest.fn()} />,
    );
    expect(getByText('India')).toBeTruthy();
  });

  it('renders placeholder when no value is set', () => {
    const { getByText } = render(
      <NeoPopDropdown
        label="Country"
        placeholder="Select country"
        onPress={jest.fn()}
      />,
    );
    expect(getByText('Select country')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <NeoPopDropdown label="Select" onPress={onPress} />,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled=true', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <NeoPopDropdown label="Select" onPress={onPress} disabled />,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('has accessibilityRole="button"', () => {
    const { getByRole } = render(
      <NeoPopDropdown label="Select" onPress={jest.fn()} />,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('reflects isOpen state in accessibilityState.expanded', () => {
    const { getByRole } = render(
      <NeoPopDropdown label="Select" onPress={jest.fn()} isOpen />,
    );
    expect(getByRole('button').props.accessibilityState?.expanded).toBe(true);
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopDropdown label="Select" onPress={jest.fn()} colorMode="light" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopDropdown label="Select" onPress={jest.fn()} colorMode="dark" />,
    );
    expect(toJSON()).toBeTruthy();
  });
});
