import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import type { ChevronProps } from './icons.types';

const DIRECTION_ROTATION: Record<string, string> = {
  north: '0deg',
  east:  '90deg',
  south: '180deg',
  west:  '270deg',
};

/** TODO: Replace View-based chevron with Skia path rendering */
export function Chevron({
  direction = 'south',
  size = 24,
  color = '#000000',
  strokeWidth = 2,
  animated = false,
  style,
  onPress,
}: ChevronProps & { onPress?: () => void }) {
  const rotation = DIRECTION_ROTATION[direction] ?? '180deg';

  const icon = (
    <View
      style={[
        styles.container,
        { width: size, height: size, transform: [{ rotate: rotation }] },
        style,
      ]}
    >
      {/* Left arm */}
      <View
        style={[
          styles.arm,
          {
            width: strokeWidth,
            height: size * 0.45,
            backgroundColor: color,
            transform: [{ rotate: '-45deg' }, { translateX: size * 0.18 }],
            top: size * 0.25,
            left: size * 0.18,
          },
        ]}
      />
      {/* Right arm */}
      <View
        style={[
          styles.arm,
          {
            width: strokeWidth,
            height: size * 0.45,
            backgroundColor: color,
            transform: [{ rotate: '45deg' }, { translateX: -size * 0.18 }],
            top: size * 0.25,
            right: size * 0.18,
          },
        ]}
      />
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{icon}</Pressable>;
  }

  return icon;
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  arm: {
    position: 'absolute',
    borderRadius: 2,
  },
});
