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

import { NeoPopTypography } from '../../src/components/NeoPopTypography/NeoPopTypography';
import { FontType, FontWeight } from '../../src/primitives/typography';

describe('NeoPopTypography', () => {
  it('renders text without crashing', () => {
    const { getByText } = render(<NeoPopTypography>Hello</NeoPopTypography>);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('renders string children', () => {
    const { getByText } = render(
      <NeoPopTypography>Typography Text</NeoPopTypography>,
    );
    expect(getByText('Typography Text')).toBeTruthy();
  });

  it('renders with fontType prop', () => {
    const { getByText } = render(
      <NeoPopTypography fontType={FontType.HEADING_LARGE}>
        Large Heading
      </NeoPopTypography>,
    );
    expect(getByText('Large Heading')).toBeTruthy();
  });

  it('renders with fontWeight prop', () => {
    const { getByText } = render(
      <NeoPopTypography fontWeight={FontWeight.BOLD}>Bold Text</NeoPopTypography>,
    );
    expect(getByText('Bold Text')).toBeTruthy();
  });

  it('renders with color prop', () => {
    const { getByText } = render(
      <NeoPopTypography color="#ff0000">Red Text</NeoPopTypography>,
    );
    expect(getByText('Red Text')).toBeTruthy();
  });

  it('renders with colorMode="light"', () => {
    const { getByText } = render(
      <NeoPopTypography colorMode="light">Light Mode</NeoPopTypography>,
    );
    expect(getByText('Light Mode')).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { getByText } = render(
      <NeoPopTypography colorMode="dark">Dark Mode</NeoPopTypography>,
    );
    expect(getByText('Dark Mode')).toBeTruthy();
  });

  it('disables font scaling (allowFontScaling=false)', () => {
    const { getByText } = render(
      <NeoPopTypography>No Scale</NeoPopTypography>,
    );
    expect(getByText('No Scale').props.allowFontScaling).toBe(false);
  });

  it('renders with lineClamp prop', () => {
    const { getByText } = render(
      <NeoPopTypography lineClamp={2}>Clamped Text</NeoPopTypography>,
    );
    expect(getByText('Clamped Text').props.numberOfLines).toBe(2);
  });
});
