import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export type ScoreMeterType = 'excellent' | 'average' | 'poor';

export interface NeoPopScoreMeterColorConfig {
  excellentColor?: string;
  averageColor?: string;
  poorColor?: string;
  trackColor?: string;
  indicatorColor?: string;
  legendTextColor?: string;
  scoreTextColor?: string;
  descTextColor?: string;
}

export interface NeoPopScoreMeterProps {
  reading: number;
  oldReading: number;
  type?: ScoreMeterType;
  scoreDesc?: string;
  showIndicators?: boolean;
  showLegends?: boolean;
  lowerLimit?: number;
  upperLimit?: number;
  colorMode?: ColorMode;
  colorConfig?: NeoPopScoreMeterColorConfig;
  size?: number;
  strokeWidth?: number;
  onAnimationComplete?: () => void;
  style?: StyleProp<ViewStyle>;
}
