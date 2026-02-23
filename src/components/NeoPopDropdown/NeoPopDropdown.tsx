import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import type { NeoPopDropdownProps } from './NeoPopDropdown.types';
import { Chevron } from '../icons/Chevron';
import { NeoPopTypography } from '../NeoPopTypography/NeoPopTypography';
import { Row } from '../layout/Row';
import { Column } from '../layout/Column';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import { BUTTON_PRESS_DURATION_MS } from '../../primitives/buttons';

/**
 * A pressable dropdown trigger that shows a label, an optional selected value
 * or placeholder, and a Chevron that rotates when `isOpen=true`.
 *
 * This component only renders the trigger row — the actual option list is
 * managed by the parent (e.g. a Modal or absolute-positioned list).
 *
 * @param label - Required label shown above the value/placeholder
 * @param value - Currently selected value text
 * @param placeholder - Shown when no value is selected
 * @param isOpen - Controls the Chevron rotation (true = open = rotated 180°)
 * @param onPress - Called when the trigger is pressed
 * @param colorConfig - Per-token color overrides
 * @param colorMode - 'dark' | 'light' for theme-based defaults
 * @param disabled - Disables the pressable and dims the component
 * @param style - Additional style for the outer Pressable
 * @param labelStyle - Additional style for the label Text
 * @param valueStyle - Additional style for the value / placeholder Text
 */
export function NeoPopDropdown({
  label,
  value,
  placeholder = 'Select…',
  isOpen = false,
  onPress,
  colorConfig,
  colorMode: _colorMode,
  disabled = false,
  style,
  labelStyle,
  valueStyle,
}: NeoPopDropdownProps) {
  const theme = useNeoPopTheme();

  // ── Color resolution ──────────────────────────────────────────────────────
  const borderColor =
    colorConfig?.borderColor ??
    (theme.dropdown?.border as string | undefined) ??
    '#3D3D3D';

  const bgColor =
    colorConfig?.backgroundColor ??
    (theme.dropdown?.background as string | undefined) ??
    '#0d0d0d';

  const labelColor =
    colorConfig?.labelColor ??
    (theme.dropdown?.text as string | undefined) ??
    '#8A8A8A';

  const valueColor =
    colorConfig?.valueColor ??
    (theme.dropdown?.text as string | undefined) ??
    '#ffffff';

  const placeholderColor =
    colorConfig?.placeholderColor ??
    (theme.inputField?.placeholderColor as string | undefined) ??
    '#8A8A8A';

  const chevronColor =
    colorConfig?.iconColor ??
    (theme.dropdown?.chevron as string | undefined) ??
    '#ffffff';

  // ── Chevron rotation animation ────────────────────────────────────────────
  // Animates the chevron: 0° (closed) → 180° (open)
  const chevronAnimStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${withTiming(isOpen ? 180 : 0, { duration: BUTTON_PRESS_DURATION_MS * 2 })}deg`,
      },
    ],
  }));

  // interpolate isn't directly usable here — the withTiming inside transform is the cleanest approach
  void interpolate; // imported for future use / type-checking

  const displayText = value ?? null;
  const showPlaceholder = displayText === null;

  return (
    <Pressable
      onPress={!disabled ? onPress : undefined}
      style={[
        styles.container,
        {
          borderColor,
          backgroundColor: bgColor,
        },
        disabled && styles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ expanded: isOpen, disabled }}
    >
      <Row align="center" justify="space-between" style={styles.inner}>
        <Column style={styles.textColumn}>
          {/* Label */}
          <NeoPopTypography
            fontSize={11}
            color={labelColor}
            style={labelStyle}
          >
            {label}
          </NeoPopTypography>

          {/* Value or placeholder */}
          <NeoPopTypography
            fontSize={14}
            color={showPlaceholder ? placeholderColor : valueColor}
            style={valueStyle}
          >
            {showPlaceholder ? placeholder : (displayText as string)}
          </NeoPopTypography>
        </Column>

        {/* Animated chevron — starts pointing south (↓), rotates to north (↑) when open */}
        <Animated.View style={chevronAnimStyle}>
          <Chevron direction="south" size={16} color={chevronColor} />
        </Animated.View>
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '100%',
  },
  inner: {
    width: '100%',
  },
  textColumn: {
    flex: 1,
    gap: 2,
  },
  disabled: {
    opacity: 0.5,
  },
});
