import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('@shopify/react-native-skia', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => children,
  Path: () => null,
  Circle: () => null,
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
  useValue: (v: number) => ({ current: v }),
  useComputedValue: (_fn: () => unknown, _deps: unknown[]) => ({ current: 0 }),
  useDerivedValue: (_fn: () => unknown, _deps: unknown[]) => ({ current: 0 }),
  useSharedValueEffect: jest.fn(),
}));

jest.mock('expo-haptics', () => ({}), { virtual: true });

import { NeoPopScoreMeter } from '../../src/components/NeoPopScoreMeter/NeoPopScoreMeter';

describe('NeoPopScoreMeter', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <NeoPopScoreMeter reading={75} oldReading={0} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders the reading score in the UI', () => {
    const { getByText } = render(
      <NeoPopScoreMeter reading={75} oldReading={0} />,
    );
    // The score value is rendered as a Text element
    expect(getByText('75')).toBeTruthy();
  });

  it('renders the correct reading value', () => {
    const { getByText } = render(
      <NeoPopScoreMeter reading={60} oldReading={0} />,
    );
    expect(getByText('60')).toBeTruthy();
  });

  it('renders with type="excellent"', () => {
    const { toJSON } = render(
      <NeoPopScoreMeter reading={90} oldReading={0} type="excellent" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with type="average"', () => {
    const { toJSON } = render(
      <NeoPopScoreMeter reading={50} oldReading={0} type="average" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with type="poor"', () => {
    const { toJSON } = render(
      <NeoPopScoreMeter reading={20} oldReading={0} type="poor" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders scoreDesc when provided', () => {
    const { getByText } = render(
      <NeoPopScoreMeter reading={75} oldReading={0} scoreDesc="Good Score" />,
    );
    expect(getByText('Good Score')).toBeTruthy();
  });

  it('renders with showLegends=true', () => {
    const { toJSON } = render(
      <NeoPopScoreMeter reading={75} oldReading={0} showLegends />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopScoreMeter reading={75} oldReading={0} colorMode="light" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopScoreMeter reading={75} oldReading={0} colorMode="dark" />,
    );
    expect(toJSON()).toBeTruthy();
  });
});
