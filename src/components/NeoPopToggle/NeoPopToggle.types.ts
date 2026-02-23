import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export interface NeoPopToggleColorConfig {
  trackCheckedColor?: string;
  trackUncheckedColor?: string;
  thumbCheckedColor?: string;
  thumbUncheckedColor?: string;
  borderColor?: string;
}

export interface NeoPopToggleProps {
  isChecked: boolean;
  onValueChange: (value: boolean) => void;
  colorMode?: ColorMode;
  colorConfig?: NeoPopToggleColorConfig;
  trackDrawable?: React.ReactNode;
  thumbDrawable?: React.ReactNode;
  disabled?: boolean;
  enableHaptics?: boolean;
  style?: StyleProp<ViewStyle>;
}
