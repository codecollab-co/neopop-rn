import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export interface NeoPopDatePickerColorConfig {
  background?: string;
  textColor?: string;
  selectedTextColor?: string;
  selectedBackground?: string;
  separatorColor?: string;
}

export interface NeoPopDatePickerProps {
  value?: Date;
  defaultValue?: Date;
  minDate?: Date;
  maxDate?: Date;
  onDateChange?: (date: Date) => void;
  enableHaptics?: boolean;
  colorConfig?: NeoPopDatePickerColorConfig;
  colorMode?: ColorMode;
  style?: StyleProp<ViewStyle>;
}
