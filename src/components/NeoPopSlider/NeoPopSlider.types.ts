import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export interface NeoPopThumbConfig {
  size?: number;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  activeColor?: string;
}

export interface NeoPopTrackConfig {
  height?: number;
  activeColor?: string;
  inactiveColor?: string;
  borderRadius?: number;
}

export interface NeoPopSliderProps {
  min: number;
  max: number;
  step: number;
  value?: number;
  defaultValue?: number;
  thumbConfig?: NeoPopThumbConfig;
  trackConfig?: NeoPopTrackConfig;
  onValueChange?: (value: number) => void;
  onSlidingStart?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  disabled?: boolean;
  enableHaptics?: boolean;
  colorMode?: ColorMode;
  style?: StyleProp<ViewStyle>;
}
