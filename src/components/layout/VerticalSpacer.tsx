import React from 'react';
import { View } from 'react-native';
import type { VerticalSpacerProps } from './layout.types';

export function VerticalSpacer({ height }: VerticalSpacerProps) {
  return <View style={{ height }} />;
}
