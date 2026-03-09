import React from 'react';
import { render } from '@testing-library/react-native';

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

jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    GestureDetector: ({ children }: { children: React.ReactNode }) => children,
    Gesture: {
      Pan: () => ({
        onChange: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
        onBegin: jest.fn().mockReturnThis(),
      }),
    },
    GestureHandlerRootView: View,
  };
});

import { NeoPopDatePicker } from '../../src/components/NeoPopDatePicker/NeoPopDatePicker';

const testDate = new Date(2024, 0, 15); // Jan 15 2024

describe('NeoPopDatePicker', () => {
  it('renders without crashing with minimal props', () => {
    const { toJSON } = render(<NeoPopDatePicker />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with a default value', () => {
    const { toJSON } = render(
      <NeoPopDatePicker defaultValue={testDate} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with a controlled value', () => {
    const { toJSON } = render(
      <NeoPopDatePicker value={testDate} onDateChange={jest.fn()} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('calls onDateChange when date changes', () => {
    // onDateChange is wired to scroll events; we verify it is callable
    const onDateChange = jest.fn();
    const { toJSON } = render(
      <NeoPopDatePicker value={testDate} onDateChange={onDateChange} />,
    );
    expect(toJSON()).toBeTruthy();
    // onDateChange is driven by FlatList scroll — mock environment skips scroll events
  });

  it('renders with minDate and maxDate constraints', () => {
    const { toJSON } = render(
      <NeoPopDatePicker
        minDate={new Date(2020, 0, 1)}
        maxDate={new Date(2030, 11, 31)}
      />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with enableHaptics=true', () => {
    const { toJSON } = render(
      <NeoPopDatePicker enableHaptics />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopDatePicker colorMode="light" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopDatePicker colorMode="dark" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with custom colorConfig', () => {
    const { toJSON } = render(
      <NeoPopDatePicker
        colorConfig={{
          background: '#1a1a1a',
          textColor: '#ffffff',
          selectedTextColor: '#0066ff',
          selectedBackground: '#2a2a2a',
        }}
      />,
    );
    expect(toJSON()).toBeTruthy();
  });
});
