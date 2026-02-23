import React from 'react';
import { View } from 'react-native';
import type { HorizontalSpacerProps } from './layout.types';

/**
 * An invisible horizontal spacer View with a fixed width.
 * Useful for adding horizontal gaps between sibling elements in a Row.
 *
 * @param width - Width of the spacer in logical pixels
 */
export function HorizontalSpacer({ width }: HorizontalSpacerProps) {
  return <View style={{ width }} />;
}
