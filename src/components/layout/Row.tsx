import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { RowProps } from './layout.types';

/**
 * A horizontal flex container.
 *
 * @param align - Cross-axis alignment (default: 'center')
 * @param justify - Main-axis justification (default: 'flex-start')
 * @param gap - Gap between children in logical pixels
 * @param wrap - Whether children should wrap to the next line (default: false)
 * @param flex - Flex grow value passed to the View
 * @param style - Additional style overrides
 */
export function Row({
  children,
  align = 'center',
  justify = 'flex-start',
  gap,
  wrap = false,
  flex,
  style,
}: RowProps) {
  return (
    <View
      style={[
        styles.row,
        {
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          gap,
          flex,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
