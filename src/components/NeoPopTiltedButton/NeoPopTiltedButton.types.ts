import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export type TiltDirection = 'left' | 'right';

export interface NeoPopTiltedButtonDecoration {
  color?: string;
  plunkColor?: string;
  shadowColor?: string;
  border?: boolean;
  showShimmer?: boolean;
}

export interface NeoPopTiltedButtonProps {
  children?: React.ReactNode;
  isFloating?: boolean;
  floatingDuration?: number;
  floatingDelay?: number;
  tapDuration?: number;
  tiltDirection?: TiltDirection;
  tiltAngle?: number;
  color?: string;
  decoration?: NeoPopTiltedButtonDecoration;
  buttonDepth?: number;
  shadowDistance?: number;
  yPosFactor?: number;
  enabled?: boolean;
  onTapUp?: () => void;
  onTapDown?: () => void;
  onPress?: () => void;
  enableHaptics?: boolean;
  colorMode?: ColorMode;
  style?: StyleProp<ViewStyle>;
}
