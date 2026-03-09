import React from 'react';
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

import { NeoPopStepper } from '../../src/components/NeoPopStepper/NeoPopStepper';

describe('NeoPopStepper', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<NeoPopStepper />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders default value (0)', () => {
    const { getByText } = render(<NeoPopStepper />);
    expect(getByText('0')).toBeTruthy();
  });

  it('renders with defaultValue', () => {
    const { getByText } = render(<NeoPopStepper defaultValue={5} />);
    expect(getByText('5')).toBeTruthy();
  });

  it('renders controlled value', () => {
    const { getByText } = render(
      <NeoPopStepper value={10} onValueChange={jest.fn()} />,
    );
    expect(getByText('10')).toBeTruthy();
  });

  it('increments value on plus button press', () => {
    const onValueChange = jest.fn();
    const { getByText, getAllByRole } = render(
      <NeoPopStepper defaultValue={3} onValueChange={onValueChange} />,
    );
    const buttons = getAllByRole('button');
    // Plus button is the last button
    fireEvent.press(buttons[buttons.length - 1]);
    expect(onValueChange).toHaveBeenCalledWith(4);
  });

  it('decrements value on minus button press', () => {
    const onValueChange = jest.fn();
    const { getAllByRole } = render(
      <NeoPopStepper defaultValue={3} onValueChange={onValueChange} />,
    );
    const buttons = getAllByRole('button');
    // Minus button is the first button
    fireEvent.press(buttons[0]);
    expect(onValueChange).toHaveBeenCalledWith(2);
  });

  it('does not go below min', () => {
    const onValueChange = jest.fn();
    const { getAllByRole } = render(
      <NeoPopStepper defaultValue={0} min={0} onValueChange={onValueChange} />,
    );
    const buttons = getAllByRole('button');
    fireEvent.press(buttons[0]);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('does not go above max', () => {
    const onValueChange = jest.fn();
    const { getAllByRole } = render(
      <NeoPopStepper defaultValue={10} max={10} onValueChange={onValueChange} />,
    );
    const buttons = getAllByRole('button');
    fireEvent.press(buttons[buttons.length - 1]);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('has accessibilityRole="adjustable"', () => {
    const { UNSAFE_getByProps } = render(
      <NeoPopStepper value={5} onValueChange={jest.fn()} />,
    );
    expect(UNSAFE_getByProps({ accessibilityRole: 'adjustable' })).toBeTruthy();
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(<NeoPopStepper colorMode="light" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(<NeoPopStepper colorMode="dark" />);
    expect(toJSON()).toBeTruthy();
  });
});
