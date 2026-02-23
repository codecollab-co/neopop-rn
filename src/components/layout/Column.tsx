import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ColumnProps } from './layout.types';

/**
 * A vertical flex container.
 *
 * @param align - Cross-axis alignment (default: 'flex-start')
 * @param justify - Main-axis justification (default: 'flex-start')
 * @param gap - Gap between children in logical pixels
 * @param flex - Flex grow value passed to the View
 * @param style - Additional style overrides
 */
export function Column({
  children,
  align = 'flex-start',
  justify = 'flex-start',
  gap,
  flex,
  style,
}: ColumnProps) {
  return (
    <View
      style={[
        styles.column,
        {
          alignItems: align,
          justifyContent: justify,
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
  column: {
    flexDirection: 'column',
  },
});
