/**
 * NeoPopButton — 3D affirmative button component.
 *
 * Renders a five-surface extruded button with:
 *  - Reanimated press-sink animation (face translates by depth on press)
 *  - Optional shimmer overlay via NeoPopShimmer
 *  - Light/dark colorMode awareness (picks from theme defaults)
 *  - Adjacent-button edge sharing (no duplicate edge between touching buttons)
 *  - 9-position placement prop (topLeft … bottomRight)
 *  - Accessible role + state
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
import {
  BUTTON_SIZE,
  BUTTON_PRESS_DURATION_MS,
  BUTTON_RELEASE_DAMPING,
  BUTTON_RELEASE_STIFFNESS,
} from '../../primitives/buttons';
import { deriveEdgeColor } from '../../utils/colorUtils';
import { NeoPopShimmer } from '../NeoPopShimmer/NeoPopShimmer';

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
  adjacentLeft: _adjacentLeft,
  adjacentTop: _adjacentTop,
  adjacentBottom,
  position = 'bottomRight',
}: NeoPopButtonProps) {
  const theme = useNeoPopTheme();
  const isPressed = useSharedValue(0);

  // ── Color resolution ─────────────────────────────────────────────────────
  // colorMode allows overriding the theme's color context per-component.
  // If colorMode is provided, we pick the matching base color from the theme;
  // otherwise fall back to the theme's current colorMode defaults.
  const themeColor = colorMode === 'light'
    ? '#0d0d0d'   // light mode default button face
    : theme.button?.color ?? '#ffffff';

  const faceColor     = colorConfig?.color     ?? themeColor;
  const resolvedBorder = colorConfig?.borderColor ?? theme.button?.borderColor;

  const { right: derivedRight, bottom: derivedBottom } = deriveEdgeColor(faceColor);
  const rightEdge  = colorConfig?.edgeColors?.right  ?? theme.button?.edgeColors?.right  ?? derivedRight;
  const bottomEdge = colorConfig?.edgeColors?.bottom ?? theme.button?.edgeColors?.bottom ?? derivedBottom;

  // ── Edge visibility ───────────────────────────────────────────────────────
  const showRightEdge  = variant === 'elevated' && !adjacentRight;
  const showBottomEdge = variant === 'elevated' && !adjacentBottom;

  // Position-based edge suppression (9-grid button placement)
  // topLeft: no top/left edges; topEdge: no top; etc.
  const positionEdges = resolvePositionEdges(position ?? 'bottomRight');

  const renderRight  = showRightEdge  && positionEdges.right;
  const renderBottom = showBottomEdge && positionEdges.bottom;

  // Translation direction depends on which edges exist
  const pressTranslateX = renderRight  ? depth : 0;
  const pressTranslateY = renderBottom ? depth : 0;

  const sizeToken = BUTTON_SIZE[size];

  // ── Animation ─────────────────────────────────────────────────────────────
  const animatedFaceStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: isPressed.value * pressTranslateX },
      { translateY: isPressed.value * pressTranslateY },
    ],
    opacity: disabled ? 0.4 : 1,
  }));

  const handlePressIn = useCallback(() => {
    if (disabled) return;
    if (enableHaptics) void triggerHaptic('impactLight');
    isPressed.value = withTiming(1, {
      duration: animationDuration,
      easing: Easing.out(Easing.quad),
    });
    onPressIn?.();
  }, [disabled, enableHaptics, animationDuration, isPressed, onPressIn]);

  const handlePressOut = useCallback(() => {
    isPressed.value = withSpring(0, springConfig ?? {
      damping: BUTTON_RELEASE_DAMPING,
      stiffness: BUTTON_RELEASE_STIFFNESS,
    });
    onPressOut?.();
  }, [isPressed, springConfig, onPressOut]);

  // ── Shimmer config ────────────────────────────────────────────────────────
  const shimmerEnabled = shimmerConfig?.enabled ?? false;

  const buttonContent = (
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
      {renderBottom && (
        <View
          style={[
            styles.bottomEdge,
            {
              height: depth,
              backgroundColor: bottomEdge,
              top: sizeToken.height,
              left: 0,
              right: 0,
            },
          ]}
        />
      )}
      {/* Right edge surface */}
      {renderRight && (
        <View
          style={[
            styles.rightEdge,
            {
              width: depth,
              height: sizeToken.height,
              backgroundColor: rightEdge,
              right: -depth,
              top: 0,
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
            borderColor: resolvedBorder,
          },
          fullWidth && styles.fullWidth,
        ]}
      >
        {children}
      </AnimatedView>
    </Pressable>
  );

  if (shimmerEnabled) {
    return (
      <NeoPopShimmer
        enabled={shimmerEnabled}
        config={{
          color:       shimmerConfig?.color,
          width:       shimmerConfig?.width,
          gap:         shimmerConfig?.gap,
          duration:    shimmerConfig?.duration,
          delay:       shimmerConfig?.delay,
          repeatDelay: shimmerConfig?.repeatDelay,
        }}
        style={fullWidth ? styles.fullWidth : undefined}
      >
        {buttonContent}
      </NeoPopShimmer>
    );
  }

  return buttonContent;
}

// ── 9-position edge resolution ──────────────────────────────────────────────
// Each position in the 3×3 grid shares edges with its neighbours,
// so the "outer" edges remain, while shared edges are suppressed.
function resolvePositionEdges(position: string) {
  switch (position) {
    case 'topLeft':     return { right: true,  bottom: true,  top: false, left: false };
    case 'topEdge':     return { right: true,  bottom: true,  top: false, left: true  };
    case 'topRight':    return { right: false, bottom: true,  top: false, left: true  };
    case 'leftEdge':    return { right: true,  bottom: true,  top: true,  left: false };
    case 'center':      return { right: true,  bottom: true,  top: true,  left: true  };
    case 'rightEdge':   return { right: false, bottom: true,  top: true,  left: true  };
    case 'bottomLeft':  return { right: true,  bottom: false, top: true,  left: false };
    case 'bottomEdge':  return { right: true,  bottom: false, top: true,  left: true  };
    case 'bottomRight':
    default:            return { right: true,  bottom: true,  top: true,  left: true  };
  }
}

const styles = StyleSheet.create({
  fullWidth: { width: '100%' as const },
  face: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bottomEdge: {
    position: 'absolute',
  },
  rightEdge: {
    position: 'absolute',
  },
});
