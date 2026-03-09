import type { StyleProp, ViewStyle } from 'react-native';

export type ChevronDirection = 'north' | 'south' | 'east' | 'west';

export interface ChevronProps {
  direction?: ChevronDirection;
  size?: number;
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export interface PointerProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export interface CrossProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  onPress?: () => void;
  hitSlop?: { top?: number; bottom?: number; left?: number; right?: number };
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}
