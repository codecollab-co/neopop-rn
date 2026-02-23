import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export interface NeoPopDropdownColorConfig {
  borderColor?: string;
  backgroundColor?: string;
  labelColor?: string;
  valueColor?: string;
  placeholderColor?: string;
  iconColor?: string;
}

export interface NeoPopDropdownProps {
  label: string;
  value?: string;
  placeholder?: string;
  isOpen?: boolean;
  onPress: () => void;
  colorConfig?: NeoPopDropdownColorConfig;
  colorMode?: ColorMode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
}
