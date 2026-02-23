import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export type TagType = 'warning' | 'error' | 'success' | 'info' | 'custom';

export interface NeoPopTagsColorConfig {
  background?: string;
  color?: string;
  borderColor?: string;
}

export interface NeoPopTagsProps {
  children: React.ReactNode;
  type?: TagType;
  colorMode?: ColorMode;
  colorConfig: NeoPopTagsColorConfig;
  icon?: React.ReactNode;
  noContainer?: boolean;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}
