import React from 'react';
import { View } from 'react-native';
import type { VerticalSpacerProps } from './layout.types';

/**
 * An invisible vertical spacer View with a fixed height.
 * Useful for adding vertical gaps between sibling elements in a Column.
 *
 * @param height - Height of the spacer in logical pixels
 */
export function VerticalSpacer({ height }: VerticalSpacerProps) {
  return <View style={{ height }} />;
}
