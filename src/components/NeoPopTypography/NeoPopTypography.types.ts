import type React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import type { FontType, FontWeight, TextOverflow } from '../../primitives/typography';

export type { FontType, FontWeight, TextOverflow };

export interface NeoPopTypographyProps {
  fontType?: FontType;
  fontWeight?: FontWeight;
  fontSize?: number;
  children: React.ReactNode;
  color?: string;
  fontFamily?: string;
  lineHeight?: number;
  overflow?: TextOverflow;
  lineClamp?: number;
  style?: StyleProp<TextStyle>;
}
