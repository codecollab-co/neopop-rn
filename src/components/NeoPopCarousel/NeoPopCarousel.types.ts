import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export interface NeoPopCarouselColorConfig {
  dotColor?: string;
  activeDotColor?: string;
}

export interface NeoPopCarouselRef {
  scrollToIndex: (index: number, animated?: boolean) => void;
  goNext: () => void;
  goPrev: () => void;
}

export interface NeoPopCarouselProps {
  data: ReactNode[];
  itemWidth?: number;
  itemSpacing?: number;
  showDots?: boolean;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  colorConfig?: NeoPopCarouselColorConfig;
  colorMode?: ColorMode;
  style?: StyleProp<ViewStyle>;
}
