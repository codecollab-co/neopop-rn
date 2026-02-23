import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { PageContainerProps } from './layout.types';

export function PageContainer({
  children,
  backgroundColor = 'transparent',
  paddingHorizontal = 16,
  paddingVertical = 0,
  style,
}: PageContainerProps) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingHorizontal,
          paddingVertical,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
