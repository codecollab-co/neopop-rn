import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import type { NeoPopToggleProps } from './NeoPopToggle.types';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import { triggerHaptic } from '../../utils/haptics';
import {
  BUTTON_RELEASE_DAMPING,
  BUTTON_RELEASE_STIFFNESS,
  BUTTON_PRESS_DURATION_MS,
} from '../../primitives/buttons';

/** Track dimensions. */
const TRACK_WIDTH  = 48;
const TRACK_HEIGHT = 26;
/** Thumb is slightly smaller than track height to leave a margin. */
const THUMB_SIZE   = TRACK_HEIGHT - 6;
/** Maximum translation for the thumb (left edge → right edge minus thumb size). */
const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - 4;

/**
 * A smooth animated toggle switch.
 *
 * The track background interpolates between on/off colors via `withTiming`,
 * and the thumb translates left ↔ right with `withSpring`. Optionally renders
 * custom content inside the thumb via `thumbDrawable` or behind the thumb via
 * `trackDrawable`.
 *
 * @param isChecked - Controlled on/off state
 * @param onValueChange - Called with the new boolean when the user taps
 * @param colorMode - 'dark' | 'light' for theme-based defaults
 * @param colorConfig - Per-token color overrides
 * @param trackDrawable - Custom content rendered inside the track (behind thumb)
 * @param thumbDrawable - Custom content rendered inside the thumb circle
 * @param disabled - Disables interaction and dims the toggle
 * @param enableHaptics - Fires a selection haptic on toggle (default: false)
 * @param style - Additional style for the outer Pressable
 */
export function NeoPopToggle({
  isChecked,
  onValueChange,
  colorMode: _colorMode,
  colorConfig,
  trackDrawable,
  thumbDrawable,
  disabled = false,
  enableHaptics = false,
  style,
}: NeoPopToggleProps) {
  const theme = useNeoPopTheme();

  // ── Color resolution ──────────────────────────────────────────────────────
  const trackOnColor =
    colorConfig?.trackCheckedColor ??
    (theme.toggle?.on?.switchBackground as string | undefined) ??
    '#06C270';

  const trackOffColor =
    colorConfig?.trackUncheckedColor ??
    (theme.toggle?.off?.switchBackground as string | undefined) ??
    '#3D3D3D';

  const thumbOnColor =
    colorConfig?.thumbCheckedColor ??
    (theme.toggle?.on?.buttonBackground as string | undefined) ??
    '#ffffff';

  const thumbOffColor =
    colorConfig?.thumbUncheckedColor ??
    (theme.toggle?.off?.buttonBackground as string | undefined) ??
    '#E0E0E0';

  const borderColor =
    colorConfig?.borderColor ??
    (isChecked
      ? (theme.toggle?.on?.switchBorder as string | undefined)
      : (theme.toggle?.off?.switchBorder as string | undefined)) ??
    'transparent';

  // ── Animation shared values ───────────────────────────────────────────────
  // progress: 0 = off, 1 = on — drives both thumb position and track color
  const progress = useSharedValue(isChecked ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isChecked ? 1 : 0, {
      duration: BUTTON_PRESS_DURATION_MS * 2,
    });
  }, [isChecked, progress]);

  const trackAnimStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [trackOffColor, trackOnColor],
    ),
  }));

  const thumbAnimStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(progress.value * THUMB_TRAVEL, {
          damping: BUTTON_RELEASE_DAMPING,
          stiffness: BUTTON_RELEASE_STIFFNESS,
        }),
      },
    ],
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [thumbOffColor, thumbOnColor],
    ),
  }));

  // ── Interaction ───────────────────────────────────────────────────────────
  const handlePress = () => {
    if (disabled) return;
    if (enableHaptics) triggerHaptic('selection');
    onValueChange(!isChecked);
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={[disabled && styles.disabled, style]}
      accessibilityRole="switch"
      accessibilityState={{ checked: isChecked, disabled }}
    >
      {/* Track */}
      <Animated.View
        style={[
          styles.track,
          {
            borderColor,
            borderWidth: borderColor !== 'transparent' ? 1 : 0,
          },
          trackAnimStyle,
        ]}
      >
        {/* Optional custom track content (rendered behind the thumb) */}
        {trackDrawable}

        {/* Thumb */}
        <Animated.View style={[styles.thumb, thumbAnimStyle]}>
          {thumbDrawable}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    justifyContent: 'center',
    paddingLeft: 2,
    overflow: 'hidden',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
});
