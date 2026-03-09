import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

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

import { NeoPopFloatingButton } from '../../src/components/NeoPopFloatingButton/NeoPopFloatingButton';
import type { NeoPopFloatingButtonRef } from '../../src/components/NeoPopFloatingButton/NeoPopFloatingButton.types';

describe('NeoPopFloatingButton', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<NeoPopFloatingButton />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <NeoPopFloatingButton>
        <Text>Float</Text>
      </NeoPopFloatingButton>,
    );
    expect(getByText('Float')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <NeoPopFloatingButton onPress={onPress}>
        <Text>Press</Text>
      </NeoPopFloatingButton>,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled=true', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <NeoPopFloatingButton onPress={onPress} disabled>
        <Text>Press</Text>
      </NeoPopFloatingButton>,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders with shape="pill"', () => {
    const { toJSON } = render(
      <NeoPopFloatingButton shape="pill">
        <Text>Pill</Text>
      </NeoPopFloatingButton>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with shape="circle"', () => {
    const { toJSON } = render(
      <NeoPopFloatingButton shape="circle">
        <Text>Circle</Text>
      </NeoPopFloatingButton>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('exposes imperative ref methods', () => {
    const ref = React.createRef<NeoPopFloatingButtonRef>();
    render(<NeoPopFloatingButton ref={ref} />);
    expect(typeof ref.current?.enable).toBe('function');
    expect(typeof ref.current?.disable).toBe('function');
    expect(typeof ref.current?.startShimmer).toBe('function');
    expect(typeof ref.current?.stopShimmer).toBe('function');
    expect(typeof ref.current?.disableOnNextClick).toBe('function');
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopFloatingButton colorMode="light" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopFloatingButton colorMode="dark" />,
    );
    expect(toJSON()).toBeTruthy();
  });
});
