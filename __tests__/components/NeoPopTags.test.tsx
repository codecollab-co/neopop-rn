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

import { NeoPopTags } from '../../src/components/NeoPopTags/NeoPopTags';

// NeoPopTags uses `children` (not `label`) and `colorConfig` is required
const defaultColorConfig = {};

describe('NeoPopTags', () => {
  it('renders without crashing with minimal props', () => {
    const { toJSON } = render(
      <NeoPopTags colorConfig={defaultColorConfig}>
        <Text>Tag</Text>
      </NeoPopTags>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders children text', () => {
    const { getByText } = render(
      <NeoPopTags colorConfig={defaultColorConfig}>
        <Text>Success Label</Text>
      </NeoPopTags>,
    );
    expect(getByText('Success Label')).toBeTruthy();
  });

  it('renders with type="success"', () => {
    const { toJSON } = render(
      <NeoPopTags colorConfig={defaultColorConfig} type="success">
        <Text>Success</Text>
      </NeoPopTags>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with type="error"', () => {
    const { toJSON } = render(
      <NeoPopTags colorConfig={defaultColorConfig} type="error">
        <Text>Error</Text>
      </NeoPopTags>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with type="warning"', () => {
    const { toJSON } = render(
      <NeoPopTags colorConfig={defaultColorConfig} type="warning">
        <Text>Warning</Text>
      </NeoPopTags>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with type="info"', () => {
    const { toJSON } = render(
      <NeoPopTags colorConfig={defaultColorConfig} type="info">
        <Text>Info</Text>
      </NeoPopTags>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with type="custom"', () => {
    const { toJSON } = render(
      <NeoPopTags colorConfig={defaultColorConfig} type="custom">
        <Text>Custom</Text>
      </NeoPopTags>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders icon element when provided', () => {
    const { getByText } = render(
      <NeoPopTags colorConfig={defaultColorConfig} icon={<Text>★</Text>}>
        <Text>With Icon</Text>
      </NeoPopTags>,
    );
    expect(getByText('★')).toBeTruthy();
    expect(getByText('With Icon')).toBeTruthy();
  });

  it('renders with noContainer=true (children bare)', () => {
    const { getByText } = render(
      <NeoPopTags colorConfig={defaultColorConfig} noContainer>
        <Text>No Container</Text>
      </NeoPopTags>,
    );
    expect(getByText('No Container')).toBeTruthy();
  });

  it('renders with custom colorConfig', () => {
    const { toJSON } = render(
      <NeoPopTags colorConfig={{ background: '#ff0000', color: '#ffffff' }}>
        <Text>Custom Colors</Text>
      </NeoPopTags>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopTags colorConfig={defaultColorConfig} colorMode="light">
        <Text>Light</Text>
      </NeoPopTags>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopTags colorConfig={defaultColorConfig} colorMode="dark">
        <Text>Dark</Text>
      </NeoPopTags>,
    );
    expect(toJSON()).toBeTruthy();
  });
});
