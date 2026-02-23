import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ColumnProps } from './layout.types';

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
