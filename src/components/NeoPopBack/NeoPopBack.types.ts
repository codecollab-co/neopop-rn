import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export interface NeoPopBackProps {
  heading?: string;
  color?: string;
  onPress: () => void;
  rightElement?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  colorMode?: ColorMode;
  style?: StyleProp<ViewStyle>;
}
