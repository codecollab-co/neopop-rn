import React from 'react';
import { View } from 'react-native';
import type { HorizontalSpacerProps } from './layout.types';

export function HorizontalSpacer({ width }: HorizontalSpacerProps) {
  return <View style={{ width }} />;
}
