import type { StyleProp, ViewStyle, TextStyle, ScrollView, ReturnKeyTypeOptions } from 'react-native';
import type { ColorMode } from '../../theme/types';

export type InputMode =
  | 'text'
  | 'search'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal'
  | 'password'
  | 'none';

export interface NeoPopInputFieldColorConfig {
  containerBorderColor?: string;
  focusedBorderColor?: string;
  errorBorderColor?: string;
  labelColor?: string;
  inputTextColor?: string;
  placeholderColor?: string;
  backgroundColor?: string;
  disabledBackgroundColor?: string;
}

export interface NeoPopInputFieldProps {
  name?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  showCharacterCount?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  inputMode?: InputMode;
  autoComplete?: string;
  autoFocus?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onSubmitEditing?: () => void;
  scrollIntoView?: boolean;
  scrollRef?: React.RefObject<ScrollView>;
  colorConfig?: NeoPopInputFieldColorConfig;
  colorMode?: ColorMode;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
}
