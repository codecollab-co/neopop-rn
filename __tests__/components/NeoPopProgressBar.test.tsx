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
        addArc: jest.fn(),
        addCircle: jest.fn(),
        close: jest.fn(),
        transform: jest.fn(),
      }),
    },
    Paint: () => ({
      setColor: jest.fn(),
      setStrokeWidth: jest.fn(),
      setStyle: jest.fn(),
      setStrokeCap: jest.fn(),
      setAntiAlias: jest.fn(),
    }),
    Color: (c: string) => c,
    Matrix: () => ({ identity: jest.fn(), translate: jest.fn(), rotate: jest.fn() }),
  },
}));

jest.mock('expo-haptics', () => ({}), { virtual: true });

import { NeoPopProgressBar } from '../../src/components/NeoPopProgressBar/NeoPopProgressBar';

describe('NeoPopProgressBar', () => {
  // Note: progress is a 0.0–1.0 value (not 0–100)

  it('renders without crashing — horizontal variant (default)', () => {
    const { toJSON } = render(<NeoPopProgressBar progress={0.5} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with variant="horizontal"', () => {
    const { toJSON } = render(
      <NeoPopProgressBar progress={0.5} variant="horizontal" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with variant="circular"', () => {
    const { toJSON } = render(
      <NeoPopProgressBar progress={0.5} variant="circular" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('has accessibilityRole="progressbar"', () => {
    const { UNSAFE_getByProps } = render(<NeoPopProgressBar progress={0.4} />);
    expect(UNSAFE_getByProps({ accessibilityRole: 'progressbar' })).toBeTruthy();
  });

  it('has correct accessibilityValue', () => {
    const { UNSAFE_getByProps } = render(<NeoPopProgressBar progress={0.7} />);
    const el = UNSAFE_getByProps({ accessibilityRole: 'progressbar' });
    // pct = Math.round(0.7 * 100) = 70
    expect(el.props.accessibilityValue?.now).toBe(70);
    expect(el.props.accessibilityValue?.min).toBe(0);
    expect(el.props.accessibilityValue?.max).toBe(100);
  });

  it('renders percentage label when showLabel=true', () => {
    const { toJSON } = render(
      <NeoPopProgressBar progress={0.65} showLabel />,
    );
    expect(JSON.stringify(toJSON())).toContain('65%');
  });

  it('renders custom label text when label prop is provided', () => {
    const { toJSON } = render(
      <NeoPopProgressBar progress={0.65} showLabel label="Loading..." />,
    );
    expect(JSON.stringify(toJSON())).toContain('Loading...');
  });

  it('renders with progress=0', () => {
    const { toJSON } = render(<NeoPopProgressBar progress={0} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with progress=1 (100%)', () => {
    const { toJSON } = render(<NeoPopProgressBar progress={1} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopProgressBar progress={0.5} colorMode="light" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopProgressBar progress={0.5} colorMode="dark" />,
    );
    expect(toJSON()).toBeTruthy();
  });
});
