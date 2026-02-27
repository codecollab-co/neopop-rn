import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export type ProgressBarVariant = 'horizontal' | 'circular';

export interface NeoPopProgressBarColorConfig {
  /** Track (unfilled) color */
  trackColor?: string;
  /** Fill (progress) color */
  fillColor?: string;
  /** Label text color */
  labelColor?: string;
}

export interface NeoPopProgressBarProps {
  /** Progress value between 0 and 1 */
  progress: number;
  /** Horizontal bar or circular arc (default: 'horizontal') */
  variant?: ProgressBarVariant;
  /** Show percentage label (default: false) */
  showLabel?: boolean;
  /** Custom label string; overrides the default percentage */
  label?: string;
  /** Bar height for horizontal variant, diameter for circular (default: 8 / 80) */
  size?: number;
  /** Stroke width for circular arc (default: 8) */
  strokeWidth?: number;
  /** Color overrides */
  colorConfig?: NeoPopProgressBarColorConfig;
  /** Theme mode */
  colorMode?: ColorMode;
  /** Style applied to the outer container */
  style?: StyleProp<ViewStyle>;
  /** Style applied to the label text */
  labelStyle?: StyleProp<TextStyle>;
}
