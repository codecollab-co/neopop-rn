import React, { useState, useCallback, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import type { NeoPopStepperProps } from './NeoPopStepper.types';
import { triggerHaptic } from '../../utils/haptics';

/** Spring config for the label pop animation. */
const SCALE_SPRING = { damping: 10, stiffness: 300 };

/**
 * A stepper control with minus / plus buttons and an animated value label.
 *
 * Supports controlled (`value` + `onValueChange`) and uncontrolled
 * (`defaultValue`) modes. The center label pops with a spring scale animation
 * on every value change. Minus and plus buttons dim when the value is at its
 * respective limit.
 *
 * @param value - Controlled value (if provided, component is controlled)
 * @param defaultValue - Initial value for uncontrolled mode (default: min)
 * @param min - Minimum value (default: 0)
 * @param max - Maximum value (default: 10)
 * @param step - Increment per press (default: 1)
 * @param onValueChange - Called with the new value on every step
 * @param disabled - Disables all interaction when true
 * @param enableHaptics - Fires a selection haptic on each step (default: false)
 * @param colorConfig - Color overrides for the component
 * @param colorMode - 'dark' | 'light' for theme-based defaults
 * @param style - Additional style for the outer container
 */
export function NeoPopStepper({
  value: controlledValue,
  defaultValue,
  min = 0,
  max = 10,
  step = 1,
  onValueChange,
  disabled = false,
  enableHaptics = false,
  colorConfig,
  colorMode: _colorMode,
  style,
}: NeoPopStepperProps) {
  // ── Color defaults ──────────────────────────────────────────────────────────
  const bgColor = colorConfig?.background ?? 'transparent';
  const btnColor = colorConfig?.buttonColor ?? '#ffffff';
  const edgeColor = colorConfig?.buttonEdgeColor ?? '#3D3D3D';
  const txtColor = colorConfig?.textColor ?? '#ffffff';

  // ── Internal state ──────────────────────────────────────────────────────────
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<number>(() => {
    const init = controlledValue ?? defaultValue ?? min;
    return Math.max(min, Math.min(max, init));
  });

  const currentValue = isControlled
    ? Math.max(min, Math.min(max, controlledValue ?? min))
    : internalValue;

  // Sync internal state when controlled value changes
  useEffect(() => {
    if (isControlled && controlledValue !== undefined) {
      setInternalValue(Math.max(min, Math.min(max, controlledValue)));
    }
  }, [isControlled, controlledValue, min, max]);

  // ── Animation ───────────────────────────────────────────────────────────────
  const scale = useSharedValue(1);

  const labelAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const popLabel = useCallback(() => {
    scale.value = withSpring(1.25, SCALE_SPRING, () => {
      scale.value = withSpring(1, SCALE_SPRING);
    });
  }, [scale]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleStep = useCallback(
    (direction: 1 | -1) => {
      if (disabled) return;
      const next = Math.max(min, Math.min(max, currentValue + direction * step));
      if (next === currentValue) return;

      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
      popLabel();
      if (enableHaptics) triggerHaptic('selection');
    },
    [disabled, min, max, currentValue, step, isControlled, onValueChange, popLabel, enableHaptics],
  );

  const handleDecrement = useCallback(() => handleStep(-1), [handleStep]);
  const handleIncrement = useCallback(() => handleStep(1), [handleStep]);

  const atMin = currentValue <= min;
  const atMax = currentValue >= max;

  return (
    <View
      style={[styles.container, { backgroundColor: bgColor }, style]}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: currentValue }}
    >
      {/* Minus button */}
      <Pressable
        onPress={handleDecrement}
        disabled={disabled || atMin}
        accessibilityLabel="Decrement"
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || atMin }}
        style={[
          styles.button,
          { backgroundColor: btnColor, borderColor: edgeColor },
          (disabled || atMin) && styles.dimmed,
        ]}
      >
        <Animated.Text style={[styles.buttonText, { color: txtColor }]}>
          {'\u2212'}
        </Animated.Text>
      </Pressable>

      {/* Animated value label */}
      <Animated.View style={[styles.labelContainer, labelAnimStyle]}>
        <Animated.Text style={[styles.labelText, { color: txtColor }]}>
          {currentValue}
        </Animated.Text>
      </Animated.View>

      {/* Plus button */}
      <Pressable
        onPress={handleIncrement}
        disabled={disabled || atMax}
        accessibilityLabel="Increment"
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || atMax }}
        style={[
          styles.button,
          { backgroundColor: btnColor, borderColor: edgeColor },
          (disabled || atMax) && styles.dimmed,
        ]}
      >
        <Animated.Text style={[styles.buttonText, { color: txtColor }]}>
          {'+'}
        </Animated.Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },
  dimmed: {
    opacity: 0.3,
  },
  labelContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
