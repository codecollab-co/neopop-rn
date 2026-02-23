import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export type CheckboxMode = 'dark' | 'light' | 'custom';
export type LabelPosition = 'left' | 'right';

export interface NeoPopCheckboxColorConfig {
  checkedBorderColor?: string;
  checkedFillColor?: string;
  uncheckedBorderColor?: string;
  uncheckedFillColor?: string;
  checkmarkColor?: string;
}

export interface NeoPopCheckboxProps {
  isChecked: boolean;
  onValueChange: (value: boolean) => void;
  mode?: CheckboxMode;
  colorConfig?: NeoPopCheckboxColorConfig;
  label?: string;
  labelPosition?: LabelPosition;
  size?: number;
  disabled?: boolean;
  enableHaptics?: boolean;
  colorMode?: ColorMode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}
