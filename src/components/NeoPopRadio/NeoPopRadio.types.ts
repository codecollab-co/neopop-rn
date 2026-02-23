import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export type RadioMode = 'dark' | 'light' | 'custom';

export interface NeoPopRadioColorConfig {
  checkedBorderColor?: string;
  checkedFillColor?: string;
  uncheckedBorderColor?: string;
  uncheckedFillColor?: string;
  dotColor?: string;
}

export interface NeoPopRadioProps {
  isChecked: boolean;
  onValueChange: (value: boolean) => void;
  id?: string;
  name?: string;
  value?: string;
  mode?: RadioMode;
  colorConfig?: NeoPopRadioColorConfig;
  label?: string;
  size?: number;
  disabled?: boolean;
  enableHaptics?: boolean;
  colorMode?: ColorMode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}
