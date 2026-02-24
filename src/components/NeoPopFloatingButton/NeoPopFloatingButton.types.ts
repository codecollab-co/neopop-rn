import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorMode, NeoPopFloatingButtonColorConfig } from '../../theme/types';

export type FloatingButtonShape = 'rectangle' | 'pill' | 'circle';

export type { NeoPopFloatingButtonColorConfig };

export interface NeoPopFloatingButtonProps {
  children?: React.ReactNode;
  shape?: FloatingButtonShape;
  colorConfig?: NeoPopFloatingButtonColorConfig;
  depth?: number;
  levitationHeight?: number;
  levitationDuration?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  delayTouchEvents?: boolean;
  enableHaptics?: boolean;
  colorMode?: ColorMode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface NeoPopFloatingButtonRef {
  enable: () => void;
  disable: () => void;
  disableOnNextClick: () => void;
  startShimmer: () => void;
  stopShimmer: () => void;
}
