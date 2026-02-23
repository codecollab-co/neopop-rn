import React, { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import type { NeoPopCardProps } from './NeoPopCard.types';
import { NeoPop3DSurface } from '../../skia/NeoPop3DSurface';
import { SkiaLoadingGuard } from '../../skia/SkiaLoadingGuard';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import { triggerHaptic } from '../../utils/haptics';
import { CARD_DEPTH } from '../../primitives/spacing';
import { BUTTON_PRESS_DURATION_MS, BUTTON_RELEASE_DAMPING, BUTTON_RELEASE_STIFFNESS } from '../../primitives/buttons';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * NeoPopCard — a pressable 3D card built on NeoPop3DSurface.
 *
 * Supports the same press-sink animation as NeoPopButton but wraps
 * arbitrary content in a configurable 3D extrusion.
 */
export function NeoPopCard({
  children,
  color,
  depth = CARD_DEPTH,
  edges = ['right', 'bottom'],
  borderColor,
  edgeColors,
  size,
  onPress,
  disabled = false,
  enableHaptics = false,
  colorConfig,
  colorMode: _colorMode,
  style,
}: NeoPopCardProps) {
  const theme = useNeoPopTheme();
  const isPressed = useSharedValue(0);

  const faceColor = colorConfig?.color ?? color ?? theme.button?.color ?? '#1a1a1a';
  const resolvedBorderColor = colorConfig?.borderColor ?? borderColor;

  const edgesMap = {
    top:    edges.includes('top'),
    right:  edges.includes('right'),
    bottom: edges.includes('bottom'),
    left:   edges.includes('left'),
  };

  const edgeColorsMap = (edgeColors || colorConfig?.edgeColors)
    ? {
        top:    edgeColors?.top    ?? colorConfig?.edgeColors?.top,
        right:  edgeColors?.right  ?? colorConfig?.edgeColors?.right,
        bottom: edgeColors?.bottom ?? colorConfig?.edgeColors?.bottom,
        left:   edgeColors?.left   ?? colorConfig?.edgeColors?.left,
      }
    : undefined;

  const translateX = edgesMap.right ? depth : 0;
  const translateY = edgesMap.bottom ? depth : 0;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: isPressed.value * translateX },
      { translateY: isPressed.value * translateY },
    ],
    opacity: disabled ? 0.4 : 1,
  }));

  const handlePressIn = useCallback(() => {
    if (disabled) return;
    if (enableHaptics) void triggerHaptic('impactLight');
    isPressed.value = withTiming(1, {
      duration: BUTTON_PRESS_DURATION_MS,
      easing: Easing.out(Easing.quad),
    });
  }, [disabled, enableHaptics, isPressed]);

  const handlePressOut = useCallback(() => {
    isPressed.value = withSpring(0, {
      damping: BUTTON_RELEASE_DAMPING,
      stiffness: BUTTON_RELEASE_STIFFNESS,
    });
  }, [isPressed]);

  const cardWidth  = size?.width;
  const cardHeight = size?.height;

  return (
    <AnimatedPressable
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={[styles.container, animatedStyle, style]}
      disabled={!onPress}
    >
      <SkiaLoadingGuard>
        <NeoPop3DSurface
          width={cardWidth ?? 300}
          height={cardHeight ?? 180}
          depth={depth}
          faceColor={faceColor}
          edgeColors={edgeColorsMap}
          edges={edgesMap}
          borderColor={resolvedBorderColor}
        >
          {children}
        </NeoPop3DSurface>
      </SkiaLoadingGuard>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
});
