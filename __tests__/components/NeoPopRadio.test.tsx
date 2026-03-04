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

import { NeoPopRadio } from '../../src/components/NeoPopRadio/NeoPopRadio';

describe('NeoPopRadio', () => {
  it('renders without crashing', () => {
    const { getByRole } = render(
      <NeoPopRadio isChecked={false} onValueChange={jest.fn()} />,
    );
    expect(getByRole('radio')).toBeTruthy();
  });

  it('calls onValueChange when pressed', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <NeoPopRadio isChecked={false} onValueChange={onValueChange} />,
    );
    fireEvent.press(getByRole('radio'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('calls onValueChange with false when isChecked=true and pressed', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <NeoPopRadio isChecked={true} onValueChange={onValueChange} />,
    );
    fireEvent.press(getByRole('radio'));
    expect(onValueChange).toHaveBeenCalledWith(false);
  });

  it('has accessibilityRole="radio"', () => {
    const { getByRole } = render(
      <NeoPopRadio isChecked={false} onValueChange={jest.fn()} />,
    );
    expect(getByRole('radio')).toBeTruthy();
  });

  it('accessibilityState.checked matches isChecked=false', () => {
    const { getByRole } = render(
      <NeoPopRadio isChecked={false} onValueChange={jest.fn()} />,
    );
    expect(getByRole('radio').props.accessibilityState?.checked).toBe(false);
  });

  it('accessibilityState.checked matches isChecked=true', () => {
    const { getByRole } = render(
      <NeoPopRadio isChecked={true} onValueChange={jest.fn()} />,
    );
    expect(getByRole('radio').props.accessibilityState?.checked).toBe(true);
  });

  it('does NOT call onValueChange when disabled=true', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <NeoPopRadio isChecked={false} onValueChange={onValueChange} disabled />,
    );
    fireEvent.press(getByRole('radio'));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
