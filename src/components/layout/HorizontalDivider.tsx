import React from 'react';
import { View } from 'react-native';
import type { HorizontalDividerProps } from './layout.types';

/**
 * A full-width horizontal rule / divider line.
 *
 * @param color - Line color (default: '#e0e0e0')
 * @param thickness - Line height in pixels (default: 1)
 * @param marginVertical - Vertical margin around the divider (default: 0)
 * @param style - Additional style overrides
 */
export function HorizontalDivider({
  color = '#e0e0e0',
  thickness = 1,
  marginVertical = 0,
  style,
}: HorizontalDividerProps) {
  return (
    <View
      style={[
        {
          height: thickness,
          backgroundColor: color,
          marginVertical,
          width: '100%',
        },
        style,
      ]}
    />
  );
}
