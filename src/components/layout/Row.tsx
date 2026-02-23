import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { RowProps } from './layout.types';

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
