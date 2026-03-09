import React from 'react';
import { Text } from 'react-native';
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
        onUpdate: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
        onBegin: jest.fn().mockReturnThis(),
        onFinalize: jest.fn().mockReturnThis(),
        activeOffsetX: jest.fn().mockReturnThis(),
        failOffsetY: jest.fn().mockReturnThis(),
        minDistance: jest.fn().mockReturnThis(),
        enabled: jest.fn().mockReturnThis(),
      }),
    },
    GestureHandlerRootView: View,
  };
});

import { NeoPopSwipeRow } from '../../src/components/NeoPopSwipeRow/NeoPopSwipeRow';

describe('NeoPopSwipeRow', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <NeoPopSwipeRow>
        <Text>Row Content</Text>
      </NeoPopSwipeRow>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <NeoPopSwipeRow>
        <Text>Row Item</Text>
      </NeoPopSwipeRow>,
    );
    expect(getByText('Row Item')).toBeTruthy();
  });

  it('renders leftActions when provided', () => {
    const { getByText } = render(
      <NeoPopSwipeRow leftActions={<Text>Delete</Text>}>
        <Text>Row Item</Text>
      </NeoPopSwipeRow>,
    );
    expect(getByText('Delete')).toBeTruthy();
  });

  it('renders rightActions when provided', () => {
    const { getByText } = render(
      <NeoPopSwipeRow rightActions={<Text>Archive</Text>}>
        <Text>Row Item</Text>
      </NeoPopSwipeRow>,
    );
    expect(getByText('Archive')).toBeTruthy();
  });

  it('renders with custom rowHeight', () => {
    const { toJSON } = render(
      <NeoPopSwipeRow rowHeight={80}>
        <Text>Tall Row</Text>
      </NeoPopSwipeRow>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopSwipeRow colorMode="light">
        <Text>Light</Text>
      </NeoPopSwipeRow>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopSwipeRow colorMode="dark">
        <Text>Dark</Text>
      </NeoPopSwipeRow>,
    );
    expect(toJSON()).toBeTruthy();
  });
});
