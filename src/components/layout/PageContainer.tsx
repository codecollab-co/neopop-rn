import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { PageContainerProps } from './layout.types';

/**
 * A full-screen flex container for page-level layout.
 *
 * @param backgroundColor - Background fill color (default: 'transparent')
 * @param paddingHorizontal - Left and right inner padding (default: 16)
 * @param paddingVertical - Top and bottom inner padding (default: 0)
 * @param style - Additional style overrides
 */
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
