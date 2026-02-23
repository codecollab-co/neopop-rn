import React, { useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import type { NeoPopSliderProps } from './NeoPopSlider.types';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import { triggerHaptic } from '../../utils/haptics';
import {
  BUTTON_RELEASE_DAMPING,
  BUTTON_RELEASE_STIFFNESS,
} from '../../primitives/buttons';

/** Default track and thumb dimensions. */
const TRACK_HEIGHT  = 4;
const THUMB_SIZE    = 20;
const DEFAULT_COLOR = '#06C270';
const INACTIVE_COLOR = '#3D3D3D';

/**
 * Snaps a raw value to the nearest step increment within [min, max].
 */
function snapToStep(value: number, min: number, max: number, step: number): number {
  const clamped = Math.max(min, Math.min(max, value));
  const steps = Math.round((clamped - min) / step);
  return Math.min(max, min + steps * step);
}

/**
 * A gesture-driven slider with configurable thumb and track.
 *
 * The thumb's horizontal position is controlled by a pan gesture. On each
 * pan update the raw position is converted to a value in [min, max] snapped
 * to `step`. On release the thumb springs to the exact snapped position.
 *
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @param step - Granularity of snapping
 * @param value - Controlled value (overrides internal state when provided)
 * @param defaultValue - Initial value for uncontrolled usage (default: min)
 * @param thumbConfig - Shape/color overrides for the thumb circle
 * @param trackConfig - Shape/color overrides for the track bar
 * @param onValueChange - Called on every snapped value change during drag
 * @param onSlidingStart - Called when the pan gesture begins
 * @param onSlidingComplete - Called when the pan gesture ends
 * @param disabled - Disables interaction
 * @param enableHaptics - Fires a selection haptic on each step change (default: false)
 * @param colorMode - 'dark' | 'light' for theme-based defaults
 * @param style - Additional style for the outer container
 */
export function NeoPopSlider({
  min,
  max,
  step,
  value: controlledValue,
  defaultValue,
  thumbConfig,
  trackConfig,
  onValueChange,
  onSlidingStart,
  onSlidingComplete,
  disabled = false,
  enableHaptics = false,
  colorMode: _colorMode,
  style,
}: NeoPopSliderProps) {
  const theme = useNeoPopTheme();
  void theme; // reserved for theme-based color resolution

  // ── Config defaults ────────────────────────────────────────────────────────
  const thumbSize       = thumbConfig?.size        ?? THUMB_SIZE;
  const thumbColor      = thumbConfig?.color       ?? DEFAULT_COLOR;
  const thumbBorderColor = thumbConfig?.borderColor ?? DEFAULT_COLOR;
  const thumbBorderWidth = thumbConfig?.borderWidth ?? 0;

  const trackHeight    = trackConfig?.height      ?? TRACK_HEIGHT;
  const activeColor    = trackConfig?.activeColor  ?? DEFAULT_COLOR;
  const inactiveColor  = trackConfig?.inactiveColor ?? INACTIVE_COLOR;
  const trackRadius    = trackConfig?.borderRadius ?? trackHeight / 2;

  // ── Internal state ─────────────────────────────────────────────────────────
  // trackWidth is measured on layout; 0 until layout fires
  const trackWidth = useRef(0);

  // The current logical value (used for snapping, callback dedup)
  const lastValue = useRef(
    snapToStep(controlledValue ?? defaultValue ?? min, min, max, step),
  );

  // translateX: thumb offset from left edge, clamped to [0, trackWidth - thumbSize]
  const translateX = useSharedValue(0);

  // Active track width (from 0 to thumb center)
  const activeWidth = useSharedValue(0);

  // ── Value → position helper (called from JS thread) ───────────────────────
  const valueToX = useCallback((val: number, tw: number): number => {
    const range = max - min;
    if (range === 0) return 0;
    const maxX = tw - thumbSize;
    return ((val - min) / range) * maxX;
  }, [max, min, thumbSize]);

  // ── Layout handler — initialise position from controlled/default value ────
  const onTrackLayout = useCallback(
    (e: { nativeEvent: { layout: { width: number } } }) => {
      const tw = e.nativeEvent.layout.width;
      trackWidth.current = tw;

      const initVal = snapToStep(
        controlledValue ?? defaultValue ?? min,
        min,
        max,
        step,
      );
      const initX = valueToX(initVal, tw);
      translateX.value = initX;
      activeWidth.value = initX + thumbSize / 2;
    },
    [controlledValue, defaultValue, min, max, step, valueToX, translateX, activeWidth, thumbSize],
  );

  // ── JS-thread callback wrappers ───────────────────────────────────────────
  const emitValueChange = useCallback(
    (val: number) => {
      if (val !== lastValue.current) {
        if (enableHaptics) triggerHaptic('selection');
        lastValue.current = val;
        onValueChange?.(val);
      }
    },
    [onValueChange, enableHaptics],
  );

  const emitSlidingStart = useCallback(
    (val: number) => {
      onSlidingStart?.(val);
    },
    [onSlidingStart],
  );

  const emitSlidingComplete = useCallback(
    (val: number) => {
      onSlidingComplete?.(val);
    },
    [onSlidingComplete],
  );

  // ── Pan gesture ───────────────────────────────────────────────────────────
  const startX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .onBegin(() => {
      startX.value = translateX.value;
      const tw = trackWidth.current;
      const range = max - min;
      const currentVal = range === 0 ? min : min + (translateX.value / Math.max(1, tw - thumbSize)) * range;
      runOnJS(emitSlidingStart)(snapToStep(currentVal, min, max, step));
    })
    .onUpdate((e) => {
      const tw = trackWidth.current;
      if (tw === 0) return;

      const maxX = tw - thumbSize;
      const rawX = Math.max(0, Math.min(maxX, startX.value + e.translationX));

      // Convert position to logical value
      const range = max - min;
      const rawVal = range === 0 ? min : min + (rawX / maxX) * range;
      const snapped = snapToStep(rawVal, min, max, step);

      // Snap to the exact pixel for the snapped value
      const snappedX = range === 0 ? 0 : ((snapped - min) / range) * maxX;

      translateX.value = snappedX;
      activeWidth.value = snappedX + thumbSize / 2;

      runOnJS(emitValueChange)(snapped);
    })
    .onEnd(() => {
      const tw = trackWidth.current;
      const range = max - min;
      const maxX = Math.max(1, tw - thumbSize);
      const rawVal = range === 0 ? min : min + (translateX.value / maxX) * range;
      const snapped = snapToStep(rawVal, min, max, step);
      const snappedX = range === 0 ? 0 : ((snapped - min) / range) * maxX;

      // Spring to the exact snapped position
      translateX.value = withSpring(snappedX, {
        damping: BUTTON_RELEASE_DAMPING,
        stiffness: BUTTON_RELEASE_STIFFNESS,
      });
      activeWidth.value = snappedX + thumbSize / 2;

      runOnJS(emitSlidingComplete)(snapped);
    });

  // ── Animated styles ───────────────────────────────────────────────────────
  const thumbAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const activeTrackAnimStyle = useAnimatedStyle(() => ({
    width: activeWidth.value,
  }));

  return (
    <GestureHandlerRootView style={[styles.container, style]}>
      <View
        style={[styles.trackContainer, disabled && styles.disabled]}
        onLayout={onTrackLayout}
      >
        {/* Inactive (full-width) track */}
        <View
          style={[
            styles.track,
            {
              height: trackHeight,
              backgroundColor: inactiveColor,
              borderRadius: trackRadius,
            },
          ]}
        >
          {/* Active portion of the track */}
          <Animated.View
            style={[
              styles.activeTrack,
              {
                height: trackHeight,
                backgroundColor: activeColor,
                borderRadius: trackRadius,
              },
              activeTrackAnimStyle,
            ]}
          />
        </View>

        {/* Thumb */}
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.thumb,
              {
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
                backgroundColor: thumbColor,
                borderColor: thumbBorderColor,
                borderWidth: thumbBorderWidth,
                top: -(thumbSize / 2 - trackHeight / 2),
              },
              thumbAnimStyle,
            ]}
            accessibilityRole="adjustable"
          />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 8,
  },
  trackContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  activeTrack: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  thumb: {
    position: 'absolute',
    left: 0,
  },
  disabled: {
    opacity: 0.4,
  },
});
