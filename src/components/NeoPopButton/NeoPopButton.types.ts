import type { StyleProp, ViewStyle } from 'react-native';
import type { WithSpringConfig } from 'react-native-reanimated';
import type { ColorMode, NeoPopButtonColorConfig } from '../../theme/types';

export type ButtonVariant = 'elevated' | 'flat' | 'stroke';
export type ButtonSize    = 'big' | 'medium' | 'small';
export type ButtonPosition =
  | 'topLeft' | 'topEdge' | 'topRight'
  | 'leftEdge' | 'center' | 'rightEdge'
  | 'bottomLeft' | 'bottomEdge' | 'bottomRight';

export interface NeoPopButtonShimmerConfig {
  enabled: boolean;
  color?: string;
  width?: number;
  gap?: number;
  duration?: number;
  delay?: number;
  repeatDelay?: number;
}

export interface NeoPopButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  depth?: number;
  fullWidth?: boolean;
  position?: ButtonPosition;
  adjacentRight?: boolean;
  adjacentLeft?: boolean;
  adjacentTop?: boolean;
  adjacentBottom?: boolean;
  colorConfig?: NeoPopButtonColorConfig;
  colorMode?: ColorMode;
  shimmerConfig?: NeoPopButtonShimmerConfig;
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  disabled?: boolean;
  enableHaptics?: boolean;
  animationDuration?: number;
  springConfig?: WithSpringConfig;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
}
