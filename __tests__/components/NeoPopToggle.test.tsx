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

import { NeoPopToggle } from '../../src/components/NeoPopToggle/NeoPopToggle';

describe('NeoPopToggle', () => {
  it('renders without crashing', () => {
    const { getByRole } = render(
      <NeoPopToggle isChecked={false} onValueChange={jest.fn()} />,
    );
    expect(getByRole('switch')).toBeTruthy();
  });

  it('calls onValueChange with the toggled value when pressed', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <NeoPopToggle isChecked={false} onValueChange={onValueChange} />,
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('calls onValueChange with false when isChecked=true and pressed', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <NeoPopToggle isChecked={true} onValueChange={onValueChange} />,
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledWith(false);
  });

  it('has accessibilityRole="switch"', () => {
    const { getByRole } = render(
      <NeoPopToggle isChecked={false} onValueChange={jest.fn()} />,
    );
    expect(getByRole('switch')).toBeTruthy();
  });

  it('accessibilityState.checked matches isChecked=false', () => {
    const { getByRole } = render(
      <NeoPopToggle isChecked={false} onValueChange={jest.fn()} />,
    );
    expect(getByRole('switch').props.accessibilityState?.checked).toBe(false);
  });

  it('accessibilityState.checked matches isChecked=true', () => {
    const { getByRole } = render(
      <NeoPopToggle isChecked={true} onValueChange={jest.fn()} />,
    );
    expect(getByRole('switch').props.accessibilityState?.checked).toBe(true);
  });

  it('does NOT call onValueChange when disabled=true', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <NeoPopToggle isChecked={false} onValueChange={onValueChange} disabled />,
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
