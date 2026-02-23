import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export interface NeoPopHeaderProps {
  heading?: string;
  description?: string;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  color?: string;
  textStyle?: StyleProp<TextStyle>;
  colorMode?: ColorMode;
  style?: StyleProp<ViewStyle>;
}
