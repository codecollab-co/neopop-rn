import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export interface NeoPopBottomSheetColorConfig {
  sheetBackgroundColor?: string;
  overlayColor?: string;
  notchColor?: string;
  borderColor?: string;
}

export interface NeoPopBottomSheetProps {
  children: React.ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;
  onBeforeClose?: () => void;
  onCloseEnd?: () => void;
  onOpenEnd?: () => void;
  maxHeight?: number;
  shouldShowNotch?: boolean;
  shouldShowOverlay?: boolean;
  blocking?: boolean;
  sheetPlunkColor?: string;
  overlayColor?: string;
  colorConfig?: NeoPopBottomSheetColorConfig;
  colorMode?: ColorMode;
  style?: StyleProp<ViewStyle>;
}

export interface NeoPopBottomSheetRef {
  open: () => void;
  close: () => void;
}
