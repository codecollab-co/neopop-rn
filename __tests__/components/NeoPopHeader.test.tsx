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

import { NeoPopHeader } from '../../src/components/NeoPopHeader/NeoPopHeader';

describe('NeoPopHeader', () => {
  it('renders without crashing with minimal props', () => {
    const { toJSON } = render(<NeoPopHeader heading="Title" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders heading text', () => {
    const { getByText } = render(<NeoPopHeader heading="Page Title" />);
    expect(getByText('Page Title')).toBeTruthy();
  });

  it('renders description text when provided', () => {
    const { getByText } = render(
      <NeoPopHeader heading="Title" description="Subtitle text" />,
    );
    expect(getByText('Subtitle text')).toBeTruthy();
  });

  it('renders back button when onBackPress is provided', () => {
    const { getByRole } = render(
      <NeoPopHeader heading="Title" onBackPress={jest.fn()} />,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('calls onBackPress when back button pressed', () => {
    const onBackPress = jest.fn();
    const { getByRole } = render(
      <NeoPopHeader heading="Title" onBackPress={onBackPress} />,
    );
    fireEvent.press(getByRole('button'));
    expect(onBackPress).toHaveBeenCalledTimes(1);
  });

  it('renders rightElement slot', () => {
    const { getByText } = render(
      <NeoPopHeader heading="Title" rightElement={<Text>Action</Text>} />,
    );
    expect(getByText('Action')).toBeTruthy();
  });

  it('renders without back button when onBackPress is not provided', () => {
    const { queryByRole } = render(<NeoPopHeader heading="Title" />);
    expect(queryByRole('button')).toBeNull();
  });

  it('renders with colorMode="light"', () => {
    const { getByText } = render(
      <NeoPopHeader heading="Light Header" colorMode="light" />,
    );
    expect(getByText('Light Header')).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { getByText } = render(
      <NeoPopHeader heading="Dark Header" colorMode="dark" />,
    );
    expect(getByText('Dark Header')).toBeTruthy();
  });
});
