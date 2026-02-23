import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import type { CrossProps } from './icons.types';

/** View-based Cross (X) icon. TODO: Replace with Skia path rendering. */
export function Cross({
  size = 24,
  color = '#000000',
  strokeWidth = 2,
  onPress,
  hitSlop,
  style,
}: CrossProps) {
  const icon = (
    <View style={[{ width: size, height: size }, style]}>
      {/* Diagonal from top-left to bottom-right */}
      <View
        style={[
          styles.line,
          {
            width: strokeWidth,
            height: Math.sqrt(2) * size,
            backgroundColor: color,
            top: 0,
            left: (size - strokeWidth) / 2,
            transform: [{ rotate: '45deg' }],
          },
        ]}
      />
      {/* Diagonal from top-right to bottom-left */}
      <View
        style={[
          styles.line,
          {
            width: strokeWidth,
            height: Math.sqrt(2) * size,
            backgroundColor: color,
            top: 0,
            left: (size - strokeWidth) / 2,
            transform: [{ rotate: '-45deg' }],
          },
        ]}
      />
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} hitSlop={hitSlop}>
        {icon}
      </Pressable>
    );
  }

  return icon;
}

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    borderRadius: 2,
  },
});
