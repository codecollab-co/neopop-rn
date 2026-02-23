/**
 * NeoPopButton — 3D affirmative button component.
 *
 * Renders a five-surface extruded button with press-down animation,
 * shimmer support, 9-position placement, and adjacent button edge sharing.
 *
 * TODO: Replace View-based stub with full Skia + Reanimated implementation.
 */

import React, { useCallback } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import type { NeoPopButtonProps } from './NeoPopButton.types';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import { triggerHaptic } from '../../utils/haptics';
import { BUTTON_SIZE, BUTTON_PRESS_DURATION_MS, BUTTON_RELEASE_DAMPING, BUTTON_RELEASE_STIFFNESS } from '../../primitives/buttons';
import { deriveEdgeColor } from '../../utils/colorUtils';

const AnimatedView = Animated.createAnimatedComponent(View);

export function NeoPopButton({
  children,
  variant = 'elevated',
  size = 'medium',
  depth = 3,
  fullWidth = false,
  disabled = false,
  enableHaptics = false,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  colorConfig,
  colorMode,
  shimmerConfig,
  animationDuration = BUTTON_PRESS_DURATION_MS,
  springConfig,
  accessibilityLabel,
  accessibilityHint,
  style,
  adjacentRight,
  adjacentLeft,
  adjacentTop,
  adjacentBottom,
  position = 'bottomRight',
}: NeoPopButtonProps) {
  const theme = useNeoPopTheme();
  const isPressed = useSharedValue(0);

  const faceColor = colorConfig?.color ?? theme.button?.color ?? '#ffffff';
  const { right: derivedRight, bottom: derivedBottom } = deriveEdgeColor(faceColor);
  const rightEdge  = colorConfig?.edgeColors?.right  ?? theme.button?.edgeColors?.right  ?? derivedRight;
  const bottomEdge = colorConfig?.edgeColors?.bottom ?? theme.button?.edgeColors?.bottom ?? derivedBottom;

  const sizeToken = BUTTON_SIZE[size];
  const showRightEdge  = variant === 'elevated' && !adjacentRight;
  const showBottomEdge = variant === 'elevated' && !adjacentBottom;

  const animatedFaceStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: isPressed.value * (showRightEdge  ? depth : 0) },
      { translateY: isPressed.value * (showBottomEdge ? depth : 0) },
    ],
    opacity: disabled ? 0.4 : 1,
  }));

  const handlePressIn = useCallback(() => {
    if (disabled) return;
    if (enableHaptics) void triggerHaptic('impactLight');
    isPressed.value = withTiming(1, { duration: animationDuration, easing: Easing.out(Easing.quad) });
    onPressIn?.();
  }, [disabled, enableHaptics, animationDuration, isPressed, onPressIn]);

  const handlePressOut = useCallback(() => {
    isPressed.value = withSpring(0, springConfig ?? { damping: BUTTON_RELEASE_DAMPING, stiffness: BUTTON_RELEASE_STIFFNESS });
    onPressOut?.();
  }, [isPressed, springConfig, onPressOut]);

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onLongPress={disabled ? undefined : onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      style={[fullWidth && styles.fullWidth, style]}
    >
      {/* Bottom edge surface */}
      {showBottomEdge && (
        <View
          style={[
            styles.bottomEdge,
            {
              height: depth,
              width: sizeToken.paddingHorizontal * 2 + (fullWidth ? undefined : 120),
              backgroundColor: bottomEdge,
              top: sizeToken.height,
            },
          ]}
        />
      )}
      {/* Right edge surface */}
      {showRightEdge && (
        <View
          style={[
            styles.rightEdge,
            {
              width: depth,
              height: sizeToken.height,
              backgroundColor: rightEdge,
            },
          ]}
        />
      )}
      {/* Face */}
      <AnimatedView
        style={[
          styles.face,
          animatedFaceStyle,
          {
            height: sizeToken.height,
            paddingHorizontal: sizeToken.paddingHorizontal,
            backgroundColor: variant === 'stroke' ? 'transparent' : faceColor,
            borderWidth: variant === 'stroke' ? 1 : 0,
            borderColor: colorConfig?.borderColor ?? theme.button?.borderColor,
          },
          fullWidth && styles.fullWidth,
        ]}
      >
        {children}
      </AnimatedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fullWidth: { width: '100%' },
  face: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bottomEdge: {
    position: 'absolute',
    left: 0,
  },
  rightEdge: {
    position: 'absolute',
    right: -3,
    top: 0,
  },
});
