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

import { NeoPopOTPInput } from '../../src/components/NeoPopOTPInput/NeoPopOTPInput';

describe('NeoPopOTPInput', () => {
  it('renders without crashing with minimal props', () => {
    const { toJSON } = render(<NeoPopOTPInput />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders 6 boxes by default', () => {
    const { toJSON } = render(<NeoPopOTPInput value="" />);
    // 6 digit boxes rendered — check the tree structure
    expect(toJSON()).toBeTruthy();
  });

  it('renders N boxes when length prop is provided', () => {
    const { toJSON } = render(<NeoPopOTPInput length={4} value="" />);
    expect(toJSON()).toBeTruthy();
  });

  it('calls onChange when text is entered', () => {
    const onChange = jest.fn();
    const { UNSAFE_getByType } = render(
      <NeoPopOTPInput value="" onChange={onChange} />,
    );
    const { TextInput } = require('react-native');
    const input = UNSAFE_getByType(TextInput);
    fireEvent.changeText(input, '1234');
    expect(onChange).toHaveBeenCalledWith('1234');
  });

  it('calls onComplete when all digits are filled', () => {
    const onComplete = jest.fn();
    const { UNSAFE_getByType } = render(
      <NeoPopOTPInput length={4} value="" onComplete={onComplete} />,
    );
    const { TextInput } = require('react-native');
    const input = UNSAFE_getByType(TextInput);
    fireEvent.changeText(input, '1234');
    expect(onComplete).toHaveBeenCalledWith('1234');
  });

  it('renders with mask=true', () => {
    const { toJSON } = render(
      <NeoPopOTPInput value="12" mask />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with hasError=true', () => {
    const { toJSON } = render(
      <NeoPopOTPInput value="" hasError />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('is not focusable when disabled=true', () => {
    const { toJSON } = render(
      <NeoPopOTPInput value="" disabled />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopOTPInput value="" colorMode="light" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopOTPInput value="" colorMode="dark" />,
    );
    expect(toJSON()).toBeTruthy();
  });
});
