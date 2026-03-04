import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export interface NeoPopSwipeRowColorConfig {
  background?: string;
  leftActionBackground?: string;
  rightActionBackground?: string;
}

export interface NeoPopSwipeRowProps {
  children: ReactNode;
  leftActions?: ReactNode;
  rightActions?: ReactNode;
  leftThreshold?: number;
  rightThreshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  colorConfig?: NeoPopSwipeRowColorConfig;
  colorMode?: ColorMode;
  style?: StyleProp<ViewStyle>;
  rowHeight?: number;
}
