import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('@shopify/react-native-skia', () => {
  const { View } = require('react-native');
  const { createElement } = require('react');
  return {
    // Render a real View so toJSON() returns a non-null tree
    Canvas: (props: { children?: unknown; style?: unknown }) =>
      createElement(View, { style: props.style, testID: 'skia-canvas' }),
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
  };
});

jest.mock('expo-haptics', () => ({}), { virtual: true });

import { Chevron } from '../../src/components/icons/Chevron';
import { Cross } from '../../src/components/icons/Cross';
import { Pointer } from '../../src/components/icons/Pointer';

describe('Chevron', () => {
  it('renders without crashing with default props', () => {
    const { toJSON } = render(<Chevron />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with direction="north"', () => {
    const { toJSON } = render(<Chevron direction="north" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with direction="east"', () => {
    const { toJSON } = render(<Chevron direction="east" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with direction="south"', () => {
    const { toJSON } = render(<Chevron direction="south" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with direction="west"', () => {
    const { toJSON } = render(<Chevron direction="west" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with custom size and color', () => {
    const { toJSON } = render(<Chevron size={32} color="#ff0000" />);
    expect(toJSON()).toBeTruthy();
  });

  it('wraps in Pressable and calls onPress', () => {
    const onPress = jest.fn();
    const { UNSAFE_getByProps } = render(<Chevron onPress={onPress} />);
    fireEvent.press(UNSAFE_getByProps({ accessible: true }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('Cross', () => {
  it('renders without crashing with default props', () => {
    const { toJSON } = render(<Cross />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with custom size and color', () => {
    const { toJSON } = render(<Cross size={20} color="#0000ff" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with custom strokeWidth', () => {
    const { toJSON } = render(<Cross strokeWidth={3} />);
    expect(toJSON()).toBeTruthy();
  });

  it('wraps in Pressable and calls onPress', () => {
    const onPress = jest.fn();
    const { UNSAFE_getByProps } = render(<Cross onPress={onPress} />);
    fireEvent.press(UNSAFE_getByProps({ accessible: true }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('Pointer', () => {
  it('renders without crashing with default props', () => {
    const { toJSON } = render(<Pointer />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with custom size', () => {
    const { toJSON } = render(<Pointer size={32} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with custom color', () => {
    const { toJSON } = render(<Pointer color="#00ff00" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with custom strokeWidth', () => {
    const { toJSON } = render(<Pointer strokeWidth={3} />);
    expect(toJSON()).toBeTruthy();
  });
});
