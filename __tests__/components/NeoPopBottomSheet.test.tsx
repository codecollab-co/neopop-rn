import React from 'react';
import { Text } from 'react-native';
import { render, act } from '@testing-library/react-native';

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

import { NeoPopBottomSheet } from '../../src/components/NeoPopBottomSheet/NeoPopBottomSheet';
import type { NeoPopBottomSheetRef } from '../../src/components/NeoPopBottomSheet/NeoPopBottomSheet.types';

describe('NeoPopBottomSheet', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <NeoPopBottomSheet>
        <Text>Sheet Content</Text>
      </NeoPopBottomSheet>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with isOpen=true without crashing', () => {
    const { toJSON } = render(
      <NeoPopBottomSheet isOpen>
        <Text>Sheet Body</Text>
      </NeoPopBottomSheet>,
    );
    // In test env, Reanimated mock keeps isVisible at 0, so sheet may be display:none
    // We verify the component renders without throwing
    expect(toJSON()).toBeTruthy();
  });

  it('renders with shouldShowNotch=true', () => {
    const { toJSON } = render(
      <NeoPopBottomSheet shouldShowNotch>
        <Text>With Notch</Text>
      </NeoPopBottomSheet>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with shouldShowOverlay=true', () => {
    const { toJSON } = render(
      <NeoPopBottomSheet shouldShowOverlay>
        <Text>With Overlay</Text>
      </NeoPopBottomSheet>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with blocking=false and onClose callback', () => {
    const onClose = jest.fn();
    const { toJSON } = render(
      <NeoPopBottomSheet shouldShowOverlay blocking={false} onClose={onClose}>
        <Text>Content</Text>
      </NeoPopBottomSheet>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('exposes open and close via imperative ref', () => {
    const ref = React.createRef<NeoPopBottomSheetRef>();
    render(
      <NeoPopBottomSheet ref={ref}>
        <Text>Imperative</Text>
      </NeoPopBottomSheet>,
    );
    expect(typeof ref.current?.open).toBe('function');
    expect(typeof ref.current?.close).toBe('function');
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopBottomSheet isOpen colorMode="light">
        <Text>Light</Text>
      </NeoPopBottomSheet>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopBottomSheet isOpen colorMode="dark">
        <Text>Dark</Text>
      </NeoPopBottomSheet>,
    );
    expect(toJSON()).toBeTruthy();
  });
});
