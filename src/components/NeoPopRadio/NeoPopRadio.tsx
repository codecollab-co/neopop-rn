import React, { useEffect } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import type { NeoPopRadioProps } from './NeoPopRadio.types';
import { NeoPopTypography } from '../NeoPopTypography/NeoPopTypography';
import { Row } from '../layout/Row';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import { triggerHaptic } from '../../utils/haptics';
import {
  BUTTON_RELEASE_DAMPING,
  BUTTON_RELEASE_STIFFNESS,
} from '../../primitives/buttons';

/** Default outer ring diameter. */
const RADIO_SIZE = 20;
/** Inner dot is 50% of the outer ring. */
const DOT_RATIO = 0.5;

/**
 * A circular radio button with a spring-animated inner dot.
 *
 * @param isChecked - Controlled checked state
 * @param onValueChange - Called with the new boolean when the user taps
 * @param mode - 'dark' | 'light' | 'custom' — shortcuts to built-in presets
 * @param colorConfig - Per-token color overrides
 * @param label - Optional label text rendered beside the radio
 * @param size - Outer ring diameter in logical pixels (default: 20)
 * @param disabled - Disables interaction and dims the radio
 * @param enableHaptics - Fires a selection haptic on toggle (default: false)
 * @param colorMode - Global color mode context
 * @param style - Additional style for the root container
 * @param labelStyle - Additional style for the label Text
 */
export function NeoPopRadio({
  isChecked,
  onValueChange,
  mode: _mode,
  colorConfig,
  label,
  size = RADIO_SIZE,
  disabled = false,
  enableHaptics = false,
  colorMode: _colorMode,
  style,
  labelStyle,
}: NeoPopRadioProps) {
  const theme = useNeoPopTheme();

  // ── Color resolution ──────────────────────────────────────────────────────
  const borderColor =
    colorConfig?.checkedBorderColor ??
    colorConfig?.uncheckedBorderColor ??
    (theme.radio?.border as string | undefined) ??
    '#ffffff';

  const fillColor =
    colorConfig?.checkedFillColor ??
    colorConfig?.uncheckedFillColor ??
    (theme.radio?.background as string | undefined) ??
    'transparent';

  const dotColor =
    colorConfig?.dotColor ??
    (theme.radio?.dotBackground as string | undefined) ??
    '#ffffff';

  // ── Animation shared values ───────────────────────────────────────────────
  const dotScale = useSharedValue(isChecked ? 1 : 0);

  useEffect(() => {
    dotScale.value = withSpring(isChecked ? 1 : 0, {
      damping: BUTTON_RELEASE_DAMPING,
      stiffness: BUTTON_RELEASE_STIFFNESS,
    });
  }, [isChecked, dotScale]);

  const dotAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dotScale.value }],
  }));

  // ── Interaction ───────────────────────────────────────────────────────────
  const handlePress = () => {
    if (disabled) return;
    if (enableHaptics) triggerHaptic('selection');
    onValueChange(!isChecked);
  };

  const dotSize = size * DOT_RATIO;
  const radius = size / 2;

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={[disabled && styles.disabled, style]}
      accessibilityRole="radio"
      accessibilityState={{ checked: isChecked, disabled }}
    >
      <Row align="center" gap={8}>
        {/* Outer ring */}
        <View
          style={[
            styles.ring,
            {
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: fillColor,
              borderColor,
              borderWidth: 1.5,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          {/* Animated inner dot */}
          <Animated.View
            style={[
              {
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: dotColor,
              },
              dotAnimStyle,
            ]}
          />
        </View>

        {label != null && (
          <NeoPopTypography
            fontSize={14}
            color={(theme.colors?.text as string | undefined) ?? '#ffffff'}
            style={labelStyle}
          >
            {label}
          </NeoPopTypography>
        )}
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ring: {
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.4,
  },
});
