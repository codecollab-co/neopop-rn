import React, { useRef, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import type { NeoPopOTPInputProps } from './NeoPopOTPInput.types';

const DEFAULT_BORDER = '#3D3D3D';
const DEFAULT_ACTIVE_BORDER = '#ffffff';
const DEFAULT_ERROR_BORDER = '#EE4D37';
const DEFAULT_BG = 'transparent';
const DEFAULT_TEXT = '#ffffff';
const BOX_SIZE = 48;
const BOX_GAP = 8;

/**
 * Multi-box OTP / PIN entry field.
 *
 * Renders `length` digit boxes backed by a single hidden TextInput.
 * Focus is managed by the hidden input; tapping any box focuses it.
 * Auto-advances and auto-backfills as the user types or deletes.
 *
 * @param length - Number of digit boxes (default: 6)
 * @param value - Controlled value string
 * @param onChange - Called on every keystroke
 * @param onComplete - Called when all boxes are filled
 * @param mask - Show • instead of the digit
 * @param hasError - Apply error border to all boxes
 * @param disabled - Disable interaction
 */
export function NeoPopOTPInput({
  length = 6,
  value = '',
  onChange,
  onComplete,
  mask = false,
  hasError = false,
  disabled = false,
  colorConfig,
  containerStyle,
  boxStyle,
  textStyle,
}: NeoPopOTPInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const borderColor = colorConfig?.borderColor ?? DEFAULT_BORDER;
  const activeBorderColor = colorConfig?.activeBorderColor ?? DEFAULT_ACTIVE_BORDER;
  const errorBorderColor = colorConfig?.errorBorderColor ?? DEFAULT_ERROR_BORDER;
  const backgroundColor = colorConfig?.backgroundColor ?? DEFAULT_BG;
  const textColor = colorConfig?.textColor ?? DEFAULT_TEXT;

  const handleChange = useCallback(
    (text: string) => {
      const digits = text.replace(/[^0-9]/g, '').slice(0, length);
      onChange?.(digits);
      if (digits.length === length) {
        onComplete?.(digits);
        inputRef.current?.blur();
      }
    },
    [length, onChange, onComplete],
  );

  const focusInput = () => {
    if (!disabled) inputRef.current?.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={focusInput} accessibilityRole="none">
      <View style={[styles.row, containerStyle]}>
        {Array.from({ length }).map((_, i) => {
          const digit = value[i] ?? '';
          const isCurrentFocus = focused && i === Math.min(value.length, length - 1);
          const borderCol = hasError
            ? errorBorderColor
            : isCurrentFocus
            ? activeBorderColor
            : borderColor;

          return (
            <View
              key={i}
              style={[
                styles.box,
                { borderColor: borderCol, backgroundColor },
                boxStyle,
              ]}
              accessibilityLabel={`Digit ${i + 1}`}
            >
              <Text style={[styles.digit, { color: textColor }, textStyle]}>
                {digit ? (mask ? '•' : digit) : ''}
              </Text>
            </View>
          );
        })}

        {/* Hidden TextInput drives the actual input */}
        <TextInput
          ref={inputRef}
          style={styles.hidden}
          value={value}
          onChangeText={handleChange}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={length}
          caretHidden
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editable={!disabled}
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: BOX_GAP,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digit: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
  },
  hidden: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});
