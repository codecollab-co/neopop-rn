import type { StyleProp, TextStyle } from 'react-native';

export type FontType =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'label'
  | 'overline';

export type FontWeight =
  | '100' | '200' | '300' | '400' | '500'
  | '600' | '700' | '800' | '900'
  | 'normal' | 'bold';

export type TextOverflow = 'clip' | 'ellipsis' | 'visible';

export interface NeoPopTypographyProps {
  fontType: FontType;
  fontWeight: FontWeight;
  fontSize: number;
  children: React.ReactNode;
  color?: string;
  fontFamily?: string;
  lineHeight?: number;
  overflow?: TextOverflow;
  lineClamp?: number;
  as?: 'text' | 'inline';
  style?: StyleProp<TextStyle>;
}
