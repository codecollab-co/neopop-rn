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

import { NeoPopAccordion } from '../../src/components/NeoPopAccordion/NeoPopAccordion';

describe('NeoPopAccordion', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <NeoPopAccordion title="Section">
        <Text>Body</Text>
      </NeoPopAccordion>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders the title', () => {
    const { getByText } = render(
      <NeoPopAccordion title="My Section">
        <Text>Content</Text>
      </NeoPopAccordion>,
    );
    expect(getByText('My Section')).toBeTruthy();
  });

  it('header has accessibilityRole="button"', () => {
    const { getByRole } = render(
      <NeoPopAccordion title="Section">
        <Text>Content</Text>
      </NeoPopAccordion>,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('is collapsed by default (accessibilityState.expanded=false)', () => {
    const { getByRole } = render(
      <NeoPopAccordion title="Section">
        <Text>Content</Text>
      </NeoPopAccordion>,
    );
    expect(getByRole('button').props.accessibilityState?.expanded).toBe(false);
  });

  it('is expanded when defaultExpanded=true', () => {
    const { getByRole } = render(
      <NeoPopAccordion title="Section" defaultExpanded>
        <Text>Content</Text>
      </NeoPopAccordion>,
    );
    expect(getByRole('button').props.accessibilityState?.expanded).toBe(true);
  });

  it('toggles expanded state on header press (uncontrolled)', () => {
    const { getByRole } = render(
      <NeoPopAccordion title="Section">
        <Text>Content</Text>
      </NeoPopAccordion>,
    );
    const header = getByRole('button');
    expect(header.props.accessibilityState?.expanded).toBe(false);
    fireEvent.press(header);
    expect(header.props.accessibilityState?.expanded).toBe(true);
  });

  it('calls onToggle when header is pressed', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(
      <NeoPopAccordion title="Section" onToggle={onToggle}>
        <Text>Content</Text>
      </NeoPopAccordion>,
    );
    fireEvent.press(getByRole('button'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('renders rightElement in the header', () => {
    const { getByText } = render(
      <NeoPopAccordion title="Section" rightElement={<Text>Extra</Text>}>
        <Text>Content</Text>
      </NeoPopAccordion>,
    );
    expect(getByText('Extra')).toBeTruthy();
  });

  it('renders with colorMode="light"', () => {
    const { toJSON } = render(
      <NeoPopAccordion title="Section" colorMode="light">
        <Text>Content</Text>
      </NeoPopAccordion>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with colorMode="dark"', () => {
    const { toJSON } = render(
      <NeoPopAccordion title="Section" colorMode="dark">
        <Text>Content</Text>
      </NeoPopAccordion>,
    );
    expect(toJSON()).toBeTruthy();
  });
});
