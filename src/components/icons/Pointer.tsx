import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { PointerProps } from './icons.types';

/**
 * Pointer — a right-pointing arrow icon built from Views.
 * A horizontal shaft with an angled arrowhead (two arms meeting at a point).
 */
export function Pointer({
  size = 24,
  color = '#ffffff',
  strokeWidth = 2,
  style,
}: PointerProps) {
  const armLength = size * 0.4;
  const shaftWidth = size * 0.55;

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* Horizontal shaft */}
      <View
        style={[
          styles.shaft,
          {
            width: shaftWidth,
            height: strokeWidth,
            backgroundColor: color,
            top: size / 2 - strokeWidth / 2,
            left: 0,
          },
        ]}
      />
      {/* Upper arm of arrowhead */}
      <View
        style={[
          styles.arm,
          {
            width: strokeWidth,
            height: armLength,
            backgroundColor: color,
            transform: [{ rotate: '45deg' }],
            top: size / 2 - armLength * 0.85,
            right: size * 0.08,
          },
        ]}
      />
      {/* Lower arm of arrowhead */}
      <View
        style={[
          styles.arm,
          {
            width: strokeWidth,
            height: armLength,
            backgroundColor: color,
            transform: [{ rotate: '-45deg' }],
            top: size / 2 + armLength * 0.15,
            right: size * 0.08,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  shaft: {
    position: 'absolute',
    borderRadius: 1,
  },
  arm: {
    position: 'absolute',
    borderRadius: 1,
  },
});
