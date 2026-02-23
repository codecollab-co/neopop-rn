import React from 'react';
import { View } from 'react-native';
import type { HorizontalDividerProps } from './layout.types';

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
