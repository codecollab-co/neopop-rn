import type { StyleProp, ViewStyle } from 'react-native';

export interface NeoPopShimmerConfig {
  color?: string;
  width?: number;
  gap?: number;
  duration?: number;
  delay?: number;
  repeatDelay?: number;
  angle?: number;
}

export interface NeoPopShimmerProps {
  children: React.ReactNode;
  enabled?: boolean;
  config?: NeoPopShimmerConfig;
  style?: StyleProp<ViewStyle>;
}
