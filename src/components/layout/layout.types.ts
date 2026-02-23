import type { StyleProp, ViewStyle } from 'react-native';

export interface RowProps {
  children?: React.ReactNode;
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: number;
  wrap?: boolean;
  flex?: number;
  style?: StyleProp<ViewStyle>;
}

export interface ColumnProps {
  children?: React.ReactNode;
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: number;
  flex?: number;
  style?: StyleProp<ViewStyle>;
}

export interface PageContainerProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  safeArea?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface HorizontalDividerProps {
  color?: string;
  thickness?: number;
  marginVertical?: number;
  style?: StyleProp<ViewStyle>;
}

export interface HorizontalSpacerProps {
  width: number;
}

export interface VerticalSpacerProps {
  height: number;
}
