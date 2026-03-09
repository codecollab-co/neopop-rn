import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('@shopify/react-native-skia', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => children,
  Path: () => null,
  Skia: {
    Path: { Make: () => ({ moveTo: jest.fn(), lineTo: jest.fn(), close: jest.fn() }) },
    Paint: () => ({ setColor: jest.fn(), setStyle: jest.fn(), setAntiAlias: jest.fn() }),
    Color: (c: string) => c,
    Matrix: () => ({ identity: jest.fn(), translate: jest.fn(), rotate: jest.fn() }),
  },
}));

jest.mock('expo-haptics', () => ({}), { virtual: true });

import { NeoPopShimmer } from '../../src/components/NeoPopShimmer/NeoPopShimmer';

describe('NeoPopShimmer', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <NeoPopShimmer>
        <Text>Content</Text>
      </NeoPopShimmer>,
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <NeoPopShimmer>
        <Text>Shimmer Child</Text>
      </NeoPopShimmer>,
    );
    expect(getByText('Shimmer Child')).toBeTruthy();
  });

  it('renders when enabled=true (default)', () => {
    const { getByText } = render(
      <NeoPopShimmer enabled>
        <Text>Enabled</Text>
      </NeoPopShimmer>,
    );
    expect(getByText('Enabled')).toBeTruthy();
  });

  it('renders when enabled=false', () => {
    const { getByText } = render(
      <NeoPopShimmer enabled={false}>
        <Text>Disabled Shimmer</Text>
      </NeoPopShimmer>,
    );
    expect(getByText('Disabled Shimmer')).toBeTruthy();
  });

  it('renders with custom shimmer config', () => {
    const { getByText } = render(
      <NeoPopShimmer
        config={{ shimmerColor: '#ffffff', shimmerWidth: 60, duration: 1000 }}
      >
        <Text>Custom Config</Text>
      </NeoPopShimmer>,
    );
    expect(getByText('Custom Config')).toBeTruthy();
  });

  it('renders multiple children', () => {
    const { getByText } = render(
      <NeoPopShimmer>
        <Text>First</Text>
        <Text>Second</Text>
      </NeoPopShimmer>,
    );
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
  });
});
