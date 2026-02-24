/**
 * NeoPopFloatingButton — a levitating 3D button with optional shimmer.
 *
 * Features:
 *  - Shape variants: 'rectangle' | 'pill' | 'circle'
 *  - Continuous levitation loop: button bobs up and down via translateY
 *  - Press sink: face translates down+right by `depth` on press-in
 *  - Shimmer overlay via NeoPopShimmer (start/stop imperatively via ref)
 *  - Imperative ref API: enable / disable / disableOnNextClick / startShimmer / stopShimmer
 *  - 3D shadow: bottom + right edge Views
 *  - Full colorMode / colorConfig theming
 */
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import type {
  NeoPopFloatingButtonProps,
  NeoPopFloatingButtonRef,
} from './NeoPopFloatingButton.types';
import { NeoPopShimmer } from '../NeoPopShimmer/NeoPopShimmer';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import { triggerHaptic } from '../../utils/haptics';
import { deriveEdgeColor } from '../../utils/colorUtils';
import {
  BUTTON_PRESS_DURATION_MS,
  BUTTON_RELEASE_DAMPING,
  BUTTON_RELEASE_STIFFNESS,
  TILTED_BUTTON_FLOATING_MS,
} from '../../primitives/buttons';

/** Default levitation travel distance in logical pixels. */
const LEVITATION_HEIGHT = 4;
/** Default 3D edge depth. */
const DEFAULT_DEPTH = 3;

/**
 * Returns the borderRadius for each shape variant.
 * 'circle' requires a fixed size to produce a true circle.
 */
function resolveRadius(
  shape: NeoPopFloatingButtonProps['shape'],
  size: number,
): number {
  if (shape === 'circle') return size / 2;
  if (shape === 'pill')   return size / 2;
  return 0;
}

export const NeoPopFloatingButton = forwardRef<
  NeoPopFloatingButtonRef,
  NeoPopFloatingButtonProps
>(function NeoPopFloatingButton(
  {
    children,
    shape = 'rectangle',
    colorConfig,
    depth = DEFAULT_DEPTH,
    levitationHeight = LEVITATION_HEIGHT,
    levitationDuration = TILTED_BUTTON_FLOATING_MS,
    onPress,
    onLongPress,
    enableHaptics = false,
    colorMode: _colorMode,
    disabled: disabledProp = false,
    style,
  }: NeoPopFloatingButtonProps,
  ref,
) {
  const theme = useNeoPopTheme();

  // ── State ──────────────────────────────────────────────────────────────────
  const [isDisabled, setIsDisabled]           = useState(disabledProp);
  const [shimmerEnabled, setShimmerEnabled]   = useState(false);
  const disableOnNextClickRef                 = useRef(false);

  // Sync external disabled prop
  useEffect(() => { setIsDisabled(disabledProp); }, [disabledProp]);

  // ── Color resolution ───────────────────────────────────────────────────────
  const faceColor =
    (isDisabled
      ? (colorConfig?.disabledColor ?? theme.floatingButton?.disabledColor)
      : (colorConfig?.color         ?? theme.floatingButton?.color)) ??
    '#ffffff';

  const { right: derivedRight, bottom: derivedBottom } = deriveEdgeColor(faceColor);

  const edgeColor =
    colorConfig?.edgeColor ?? theme.floatingButton?.edgeColor ?? derivedRight;

  const shadowColor =
    colorConfig?.shadowColor ?? theme.floatingButton?.shadowColor ?? derivedBottom;

  const borderColor =
    colorConfig?.borderColor ?? theme.floatingButton?.borderColor;

  // ── Shared animation values ────────────────────────────────────────────────
  const levitate  = useSharedValue(0);   // 0 = resting, -levitationHeight = elevated
  const pressDown = useSharedValue(0);   // 0 = rest,    1 = pressed

  // ── Levitation loop ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isDisabled) {
      cancelAnimation(levitate);
      levitate.value = withTiming(0, { duration: 150 });
      return;
    }

    levitate.value = withRepeat(
      withSequence(
        withTiming(-levitationHeight, {
          duration: levitationDuration / 2,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0, {
          duration: levitationDuration / 2,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,  // infinite
      false,
    );

    return () => cancelAnimation(levitate);
  }, [isDisabled, levitate, levitationHeight, levitationDuration]);

  // ── Press animation ────────────────────────────────────────────────────────
  const handlePressIn = useCallback(() => {
    if (isDisabled) return;
    if (enableHaptics) void triggerHaptic('impactLight');
    // Cancel levitation temporarily on press
    cancelAnimation(levitate);
    levitate.value = withTiming(0, { duration: 60 });
    pressDown.value = withTiming(1, {
      duration: BUTTON_PRESS_DURATION_MS,
      easing: Easing.out(Easing.quad),
    });
  }, [isDisabled, enableHaptics, levitate, pressDown]);

  const handlePressOut = useCallback(() => {
    pressDown.value = withSpring(0, {
      damping: BUTTON_RELEASE_DAMPING,
      stiffness: BUTTON_RELEASE_STIFFNESS,
    });
    // Resume levitation after press
    if (!isDisabled) {
      levitate.value = withRepeat(
        withSequence(
          withTiming(-levitationHeight, {
            duration: levitationDuration / 2,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0, {
            duration: levitationDuration / 2,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        false,
      );
    }
  }, [pressDown, isDisabled, levitate, levitationHeight, levitationDuration]);

  const handlePress = useCallback(() => {
    if (isDisabled) return;
    if (disableOnNextClickRef.current) {
      disableOnNextClickRef.current = false;
      setIsDisabled(true);
    }
    onPress?.();
  }, [isDisabled, onPress]);

  // ── Animated styles ────────────────────────────────────────────────────────
  // The entire button bobs up/down; the face sinks on press
  const outerAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: levitate.value }],
    opacity: isDisabled ? 0.45 : 1,
  }));

  const faceAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: pressDown.value * depth },
      { translateY: pressDown.value * depth },
    ],
  }));

  // ── Imperative API ─────────────────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    enable:  () => setIsDisabled(false),
    disable: () => setIsDisabled(true),
    disableOnNextClick: () => { disableOnNextClickRef.current = true; },
    startShimmer: () => setShimmerEnabled(true),
    stopShimmer:  () => setShimmerEnabled(false),
  }), []);

  // ── Size token ─────────────────────────────────────────────────────────────
  const buttonHeight = 48;
  const buttonRadius = resolveRadius(shape, buttonHeight);

  // ── Render ─────────────────────────────────────────────────────────────────
  const content = (
    <Pressable
      onPress={handlePress}
      onLongPress={!isDisabled ? onLongPress : undefined}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      style={style}
    >
      <Animated.View style={outerAnimStyle}>
        {/* Shadow / plunk edge (bottom) */}
        <View
          style={[
            styles.shadowEdge,
            {
              height: depth,
              backgroundColor: shadowColor,
              top: buttonHeight,
              borderRadius: buttonRadius,
            },
          ]}
        />
        {/* Right edge */}
        <View
          style={[
            styles.rightEdge,
            {
              width: depth,
              height: buttonHeight,
              backgroundColor: edgeColor,
              right: -depth,
              borderRadius: buttonRadius,
            },
          ]}
        />
        {/* Face */}
        <Animated.View
          style={[
            styles.face,
            {
              height: buttonHeight,
              backgroundColor: faceColor,
              borderRadius: buttonRadius,
              ...(borderColor ? { borderWidth: 1.5, borderColor } : {}),
            },
            faceAnimStyle,
          ]}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );

  if (shimmerEnabled) {
    return (
      <NeoPopShimmer enabled={shimmerEnabled}>
        {content}
      </NeoPopShimmer>
    );
  }

  return content;
});

const styles = StyleSheet.create({
  face: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    overflow: 'hidden',
  },
  shadowEdge: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  rightEdge: {
    position: 'absolute',
    top: 0,
  },
});
