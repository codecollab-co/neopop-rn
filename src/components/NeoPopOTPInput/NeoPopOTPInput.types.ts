import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { ColorMode } from '../../theme/types';

export interface NeoPopOTPInputColorConfig {
  /** Box border color (inactive) */
  borderColor?: string;
  /** Box border color when focused */
  activeBorderColor?: string;
  /** Box border color in error state */
  errorBorderColor?: string;
  /** Box background color */
  backgroundColor?: string;
  /** Digit text color */
  textColor?: string;
}

export interface NeoPopOTPInputProps {
  /** Number of OTP digit boxes (default: 6) */
  length?: number;
  /** Current value string; length <= `length` */
  value?: string;
  /** Called on every keystroke with the updated string */
  onChange?: (value: string) => void;
  /** Called when all boxes are filled */
  onComplete?: (value: string) => void;
  /** Replace digits with • */
  mask?: boolean;
  /** Show error styling on all boxes */
  hasError?: boolean;
  /** Disable interaction */
  disabled?: boolean;
  /** Color overrides */
  colorConfig?: NeoPopOTPInputColorConfig;
  /** Theme mode */
  colorMode?: ColorMode;
  /** Style applied to the outer row container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Style applied to each individual box */
  boxStyle?: StyleProp<ViewStyle>;
  /** Style applied to each digit text */
  textStyle?: StyleProp<TextStyle>;
}
