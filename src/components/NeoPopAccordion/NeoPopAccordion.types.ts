import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export interface NeoPopAccordionColorConfig {
  /** Header background color */
  headerBackground?: string;
  /** Header text color */
  headerTextColor?: string;
  /** Chevron color */
  chevronColor?: string;
  /** Body background color */
  bodyBackground?: string;
  /** Border / edge color for the 3D header */
  edgeColor?: string;
}

export interface NeoPopAccordionProps {
  /** Header title text */
  title: string;
  /** Body content, mounted/unmounted or height-animated */
  children: ReactNode;
  /** Whether the accordion is expanded (controlled) */
  isExpanded?: boolean;
  /** Called when the header is pressed */
  onToggle?: (next: boolean) => void;
  /** If true, the component manages its own open/close state (uncontrolled) */
  defaultExpanded?: boolean;
  /** Color overrides */
  colorConfig?: NeoPopAccordionColorConfig;
  /** Theme mode */
  colorMode?: ColorMode;
  /** Style applied to the outer container */
  style?: StyleProp<ViewStyle>;
  /** Style applied to the header row */
  headerStyle?: StyleProp<ViewStyle>;
  /** Style applied to the header title text */
  titleStyle?: StyleProp<TextStyle>;
  /** Style applied to the body container */
  bodyStyle?: StyleProp<ViewStyle>;
  /** Optional element rendered to the right of the title */
  rightElement?: ReactNode;
}
