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

import { NeoPopInputField } from '../../src/components/NeoPopInputField/NeoPopInputField';

describe('NeoPopInputField', () => {
  it('renders without crashing with minimal props', () => {
    const { toJSON } = render(
      <NeoPopInputField value="" onChange={jest.fn()} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders placeholder text', () => {
    const { getByPlaceholderText } = render(
      <NeoPopInputField
        value=""
        onChange={jest.fn()}
        placeholder="Enter text"
      />,
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('calls onChange when text is entered', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <NeoPopInputField
        value=""
        onChange={onChange}
        placeholder="Type here"
      />,
    );
    fireEvent.changeText(getByPlaceholderText('Type here'), 'hello');
    expect(onChange).toHaveBeenCalledWith('hello');
  });

  it('renders error message when hasError=true and errorMessage is provided', () => {
    const { getByText } = render(
      <NeoPopInputField
        value=""
        onChange={jest.fn()}
        hasError
        errorMessage="Required field"
      />,
    );
    expect(getByText('Required field')).toBeTruthy();
  });

  it('does not render error message when hasError=false', () => {
    const { queryByText } = render(
      <NeoPopInputField
        value=""
        onChange={jest.fn()}
        hasError={false}
        errorMessage="Required field"
      />,
    );
    expect(queryByText('Required field')).toBeNull();
  });

  it('renders character count when maxLength and showCharacterCount are provided', () => {
    const { getByText } = render(
      <NeoPopInputField
        value="Hello"
        onChange={jest.fn()}
        maxLength={20}
        showCharacterCount
      />,
    );
    expect(getByText('5/20')).toBeTruthy();
  });

  it('is not editable when isDisabled=true', () => {
    const { getByPlaceholderText } = render(
      <NeoPopInputField
        value=""
        onChange={jest.fn()}
        placeholder="Disabled"
        isDisabled
      />,
    );
    expect(getByPlaceholderText('Disabled').props.editable).toBe(false);
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopInputField value="" onChange={jest.fn()} colorMode="light" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopInputField value="" onChange={jest.fn()} colorMode="dark" />,
    );
    expect(toJSON()).toBeTruthy();
  });
});
