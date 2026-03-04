import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export interface NeoPopStepperColorConfig {
  background?: string;
  buttonColor?: string;
  buttonEdgeColor?: string;
  textColor?: string;
  disabledColor?: string;
}

export interface NeoPopStepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  enableHaptics?: boolean;
  colorConfig?: NeoPopStepperColorConfig;
  colorMode?: ColorMode;
  style?: StyleProp<ViewStyle>;
}
