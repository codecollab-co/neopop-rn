import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export type ToastType = 'success' | 'error' | 'warning' | 'custom';

export interface ToastConfig {
  id?: string;
  type?: ToastType;
  message: string;
  description?: string;
  duration?: number;
  colorMode?: ColorMode;
  icon?: React.ReactNode;
  onPress?: () => void;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export interface UseToastReturn {
  showToast: (config: ToastConfig) => string;
  hideToast: (id: string) => void;
  hideAll: () => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  defaultDuration?: number;
  position?: 'top' | 'bottom';
  offset?: number;
}

export interface NeoPopToastProps extends ToastConfig {
  visible: boolean;
  onHide?: () => void;
}
