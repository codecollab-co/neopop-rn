import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorMode, NeoPopButtonColorConfig } from '../../theme/types';

export type EdgeDirection = 'top' | 'bottom' | 'left' | 'right';

export interface NeoPopCardEdgeColors {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export interface NeoPopCardProps {
  children?: React.ReactNode;
  color?: string;
  depth?: number;
  edges?: EdgeDirection[];
  borderColor?: string;
  edgeColors?: NeoPopCardEdgeColors;
  size?: { width?: number; height?: number };
  onPress?: () => void;
  disabled?: boolean;
  enableHaptics?: boolean;
  colorConfig?: NeoPopButtonColorConfig;
  colorMode?: ColorMode;
  style?: StyleProp<ViewStyle>;
}
