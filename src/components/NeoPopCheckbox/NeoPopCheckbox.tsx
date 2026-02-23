import React, { useEffect } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type { NeoPopCheckboxProps } from './NeoPopCheckbox.types';
import { NeoPopTypography } from '../NeoPopTypography/NeoPopTypography';
import { Row } from '../layout/Row';
import { HorizontalSpacer } from '../layout/HorizontalSpacer';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import { triggerHaptic } from '../../utils/haptics';
import {
  BUTTON_RELEASE_DAMPING,
  BUTTON_RELEASE_STIFFNESS,
} from '../../primitives/buttons';

/** Size of the checkbox box face in logical pixels. */
const BOX_SIZE = 20;
/** Depth of the 3D plunk edges in logical pixels. */
const PLUNK_DEPTH = 3;

/**
 * A 3D NeoPop-style checkbox with a spring-animated checkmark.
 *
 * The outer box is rendered as a View-based 3D block (left + top plunk edges),
 * and the checkmark scales in/out with a spring animation on state change.
 *
 * @param isChecked - Controlled checked state
 * @param onValueChange - Called with the new boolean when the user taps
 * @param mode - 'dark' | 'light' | 'custom' — shortcuts to built-in presets
 * @param colorConfig - Per-token color overrides (takes precedence over mode)
 * @param label - Optional label text rendered beside the checkbox
 * @param labelPosition - 'left' or 'right' (default: 'right')
 * @param size - Box side length in logical pixels (default: 20)
 * @param disabled - Disables interaction and dims the checkbox
 * @param enableHaptics - Fires a selection haptic on toggle (default: false)
 * @param colorMode - Global color mode context ('dark' | 'light')
 * @param style - Additional style for the root container
 * @param labelStyle - Additional style for the label Text
 */
export function NeoPopCheckbox({
  isChecked,
  onValueChange,
  mode: _mode,
  colorConfig,
  label,
  labelPosition = 'right',
  size = BOX_SIZE,
  disabled = false,
  enableHaptics = false,
  colorMode: _colorMode,
  style,
  labelStyle,
}: NeoPopCheckboxProps) {
  const theme = useNeoPopTheme();

  // ── Color resolution ──────────────────────────────────────────────────────
  const checkedBorder =
    colorConfig?.checkedBorderColor ??
    (theme.checkbox?.border as string | undefined) ??
    '#ffffff';

  const checkedFill =
    colorConfig?.checkedFillColor ??
    (theme.checkbox?.background as string | undefined) ??
    '#ffffff';

  const uncheckedBorder =
    colorConfig?.uncheckedBorderColor ?? checkedBorder;

  const uncheckedFill =
    colorConfig?.uncheckedFillColor ??
    (theme.checkbox?.disabledBackground as string | undefined) ??
    'transparent';

  const checkmarkColor =
    colorConfig?.checkmarkColor ??
    (theme.checkbox?.checkmarkColor as string | undefined) ??
    '#0d0d0d';

  const leftPlunkColor =
    (theme.checkbox?.leftPlunk as string | undefined) ?? '#8A8A8A';

  const topPlunkColor =
    (theme.checkbox?.topPlunk as string | undefined) ?? '#8A8A8A';

  // ── Animation shared values ───────────────────────────────────────────────
  // checkScale: 0 → hidden, 1 → fully visible checkmark
  const checkScale = useSharedValue(isChecked ? 1 : 0);
  // checkOpacity mirrors scale for a combined pop-in effect
  const checkOpacity = useSharedValue(isChecked ? 1 : 0);

  useEffect(() => {
    const target = isChecked ? 1 : 0;
    checkScale.value = withSpring(target, {
      damping: BUTTON_RELEASE_DAMPING,
      stiffness: BUTTON_RELEASE_STIFFNESS,
    });
    checkOpacity.value = withTiming(target, { duration: 100 });
  }, [isChecked, checkScale, checkOpacity]);

  const checkmarkAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
    opacity: checkOpacity.value,
  }));

  // ── Interaction ───────────────────────────────────────────────────────────
  const handlePress = () => {
    if (disabled) return;
    if (enableHaptics) triggerHaptic('selection');
    onValueChange(!isChecked);
  };

  // ── Derived sizes ─────────────────────────────────────────────────────────
  const boxSize = size;
  const plunk = PLUNK_DEPTH;
  const borderColor = isChecked ? checkedBorder : uncheckedBorder;
  const fillColor = isChecked ? checkedFill : uncheckedFill;

  // ── Render ────────────────────────────────────────────────────────────────
  const checkboxNode = (
    <View
      style={[
        styles.outerWrapper,
        { width: boxSize + plunk, height: boxSize + plunk },
        disabled && styles.disabled,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled }}
    >
      {/* Face */}
      <View
        style={[
          styles.face,
          {
            width: boxSize,
            height: boxSize,
            backgroundColor: fillColor,
            borderColor,
            borderWidth: 1.5,
          },
        ]}
      >
        {/* Animated checkmark — two lines forming an L-shape ✓ */}
        <Animated.View style={[styles.checkmarkContainer, checkmarkAnimStyle]}>
          {/* Short arm of the checkmark */}
          <View
            style={[
              styles.checkArm,
              styles.checkArmShort,
              { backgroundColor: checkmarkColor },
            ]}
          />
          {/* Long arm of the checkmark */}
          <View
            style={[
              styles.checkArm,
              styles.checkArmLong,
              { backgroundColor: checkmarkColor },
            ]}
          />
        </Animated.View>
      </View>

      {/* Left plunk edge */}
      <View
        style={[
          styles.plunkLeft,
          {
            width: plunk,
            height: boxSize,
            backgroundColor: leftPlunkColor,
          },
        ]}
      />

      {/* Top plunk edge */}
      <View
        style={[
          styles.plunkTop,
          {
            width: boxSize,
            height: plunk,
            backgroundColor: topPlunkColor,
          },
        ]}
      />
    </View>
  );

  if (!label) {
    return (
      <Pressable onPress={handlePress} style={style} hitSlop={8}>
        {checkboxNode}
      </Pressable>
    );
  }

  const labelNode = (
    <NeoPopTypography
      fontSize={14}
      color={(theme.colors?.text as string | undefined) ?? '#ffffff'}
      style={labelStyle}
    >
      {label}
    </NeoPopTypography>
  );

  return (
    <Pressable onPress={handlePress} hitSlop={8}>
      <Row align="center" gap={8} style={style}>
        {labelPosition === 'left' && labelNode}
        {checkboxNode}
        {labelPosition === 'right' && labelNode}
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    position: 'relative',
  },
  face: {
    position: 'absolute',
    top: 0,
    left: 3, // offset by plunk depth so plunk appears on the left
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  checkmarkContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkArm: {
    position: 'absolute',
    borderRadius: 1,
  },
  // Short arm: bottom-left diagonal
  checkArmShort: {
    width: 2,
    height: 6,
    bottom: 3,
    left: '30%',
    transform: [{ rotate: '45deg' }],
  },
  // Long arm: upper-right diagonal
  checkArmLong: {
    width: 2,
    height: 10,
    bottom: 4,
    right: '20%',
    transform: [{ rotate: '-45deg' }],
  },
  plunkLeft: {
    position: 'absolute',
    left: 0,
    top: 3, // plunk sits below the top edge
  },
  plunkTop: {
    position: 'absolute',
    top: 0,
    left: 3, // plunk starts after the left-plunk corner
  },
  disabled: {
    opacity: 0.4,
  },
});
