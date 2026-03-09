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

import { NeoPopCarousel } from '../../src/components/NeoPopCarousel/NeoPopCarousel';
import type { NeoPopCarouselRef } from '../../src/components/NeoPopCarousel/NeoPopCarousel.types';

const items = [
  <Text key="1">Slide 1</Text>,
  <Text key="2">Slide 2</Text>,
  <Text key="3">Slide 3</Text>,
];

describe('NeoPopCarousel', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<NeoPopCarousel data={items} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders all items', () => {
    const { getByText } = render(<NeoPopCarousel data={items} />);
    expect(getByText('Slide 1')).toBeTruthy();
    expect(getByText('Slide 2')).toBeTruthy();
    expect(getByText('Slide 3')).toBeTruthy();
  });

  it('renders pagination dots when showDots=true', () => {
    const { toJSON } = render(
      <NeoPopCarousel data={items} showDots />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with initialIndex', () => {
    const { toJSON } = render(
      <NeoPopCarousel data={items} initialIndex={1} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders empty data without crashing', () => {
    const { toJSON } = render(<NeoPopCarousel data={[]} />);
    expect(toJSON()).toBeTruthy();
  });

  it('exposes imperative ref methods', () => {
    const ref = React.createRef<NeoPopCarouselRef>();
    render(<NeoPopCarousel data={items} ref={ref} />);
    expect(typeof ref.current?.scrollToIndex).toBe('function');
    expect(typeof ref.current?.goNext).toBe('function');
    expect(typeof ref.current?.goPrev).toBe('function');
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopCarousel data={items} colorMode="light" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopCarousel data={items} colorMode="dark" />,
    );
    expect(toJSON()).toBeTruthy();
  });
});
