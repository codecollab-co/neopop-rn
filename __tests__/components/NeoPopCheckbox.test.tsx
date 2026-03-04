import React from 'react';
import { Pressable } from 'react-native';
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

import { NeoPopCheckbox } from '../../src/components/NeoPopCheckbox/NeoPopCheckbox';

describe('NeoPopCheckbox', () => {
  it('renders without crashing', () => {
    const { getByRole } = render(
      <NeoPopCheckbox isChecked={false} onValueChange={jest.fn()} />,
    );
    expect(getByRole('checkbox')).toBeTruthy();
  });

  it('calls onValueChange when the Pressable is pressed', () => {
    const onValueChange = jest.fn();
    const { UNSAFE_getAllByType } = render(
      <NeoPopCheckbox isChecked={false} onValueChange={onValueChange} />,
    );
    // The root element is a Pressable that wraps the checkbox View.
    const pressables = UNSAFE_getAllByType(Pressable);
    fireEvent.press(pressables[0]);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('does NOT call onValueChange when disabled=true', () => {
    const onValueChange = jest.fn();
    const { UNSAFE_getAllByType } = render(
      <NeoPopCheckbox isChecked={false} onValueChange={onValueChange} disabled />,
    );
    const pressables = UNSAFE_getAllByType(Pressable);
    fireEvent.press(pressables[0]);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('has accessibilityRole="checkbox"', () => {
    const { getByRole } = render(
      <NeoPopCheckbox isChecked={false} onValueChange={jest.fn()} />,
    );
    expect(getByRole('checkbox')).toBeTruthy();
  });

  it('accessibilityState.checked matches isChecked=false', () => {
    const { getByRole } = render(
      <NeoPopCheckbox isChecked={false} onValueChange={jest.fn()} />,
    );
    expect(getByRole('checkbox').props.accessibilityState?.checked).toBe(false);
  });

  it('accessibilityState.checked matches isChecked=true', () => {
    const { getByRole } = render(
      <NeoPopCheckbox isChecked={true} onValueChange={jest.fn()} />,
    );
    expect(getByRole('checkbox').props.accessibilityState?.checked).toBe(true);
  });

  it('accessibilityState.disabled matches disabled=false', () => {
    const { getByRole } = render(
      <NeoPopCheckbox isChecked={false} onValueChange={jest.fn()} disabled={false} />,
    );
    expect(getByRole('checkbox').props.accessibilityState?.disabled).toBe(false);
  });

  it('accessibilityState.disabled matches disabled=true', () => {
    const { getByRole } = render(
      <NeoPopCheckbox isChecked={false} onValueChange={jest.fn()} disabled />,
    );
    expect(getByRole('checkbox').props.accessibilityState?.disabled).toBe(true);
  });
});
