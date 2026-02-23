import React, { useRef, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import type { NeoPopInputFieldProps, InputMode } from './NeoPopInputField.types';
import { NeoPopTypography } from '../NeoPopTypography/NeoPopTypography';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import { useAutoFocus } from '../../hooks/useAutoFocus';
import { BUTTON_PRESS_DURATION_MS } from '../../primitives/buttons';

/** Maps our InputMode union to the TextInput keyboardType prop. */
function resolveKeyboardType(mode: InputMode): React.ComponentProps<typeof TextInput>['keyboardType'] {
  switch (mode) {
    case 'numeric':
    case 'decimal': return 'numeric';
    case 'tel':     return 'phone-pad';
    case 'email':   return 'email-address';
    case 'url':     return 'url';
    default:        return 'default';
  }
}

/** Maps InputMode to secureTextEntry (password only). */
function isPassword(mode?: InputMode): boolean {
  return mode === 'password';
}

/**
 * A themed TextInput with animated border, label, error message, and optional
 * character count.
 *
 * Focus transitions the border from `borderColor` → `activeBorderColor` via
 * `interpolateColor` with a `withTiming` progress value.
 *
 * @param label - Label rendered above the input
 * @param placeholder - Placeholder text
 * @param value - Controlled value
 * @param defaultValue - Uncontrolled default value
 * @param maxLength - Maximum character count
 * @param showCharacterCount - Renders `currentLength / maxLength` below the input
 * @param isDisabled - Disables the input
 * @param hasError - Applies error border styling
 * @param errorMessage - Error message rendered below the input when `hasError=true`
 * @param inputMode - Keyboard variant (text, email, numeric, tel, url, password…)
 * @param autoFocus - Automatically focuses the input after a 100 ms delay
 * @param scrollIntoView - Not used directly here; pass `scrollRef` instead
 * @param colorConfig - Per-token color overrides
 * @param colorMode - 'dark' | 'light' for theme-based defaults
 * @param style - Additional style for the outer container View
 * @param inputStyle - Additional style for the TextInput
 * @param labelStyle - Additional style for the label Text
 */
export function NeoPopInputField({
  name: _name,
  id: _id,
  label,
  placeholder,
  value,
  defaultValue,
  maxLength,
  showCharacterCount = false,
  isDisabled = false,
  hasError = false,
  errorMessage,
  inputMode,
  autoComplete: _autoComplete,
  autoFocus = false,
  returnKeyType,
  multiline = false,
  numberOfLines,
  onChange,
  onBlur,
  onFocus,
  onSubmitEditing,
  scrollIntoView: _scrollIntoView,
  scrollRef: _scrollRef,
  colorConfig,
  colorMode: _colorMode,
  style,
  inputStyle,
  labelStyle,
}: NeoPopInputFieldProps) {
  const theme = useNeoPopTheme();

  // ── Color resolution ──────────────────────────────────────────────────────
  const borderColor =
    colorConfig?.containerBorderColor ??
    (theme.inputField?.borderColor as string | undefined) ??
    '#3D3D3D';

  const activeBorderColor =
    colorConfig?.focusedBorderColor ??
    (theme.inputField?.activeBorderColor as string | undefined) ??
    '#ffffff';

  const errorBorderColor =
    colorConfig?.errorBorderColor ??
    (theme.inputField?.errorColor as string | undefined) ??
    '#EE4D37';

  const labelColor =
    colorConfig?.labelColor ??
    (theme.inputField?.labelColor as string | undefined) ??
    '#8A8A8A';

  const textColor =
    colorConfig?.inputTextColor ??
    (theme.inputField?.textColor as string | undefined) ??
    '#ffffff';

  const placeholderColor =
    colorConfig?.placeholderColor ??
    (theme.inputField?.placeholderColor as string | undefined) ??
    '#8A8A8A';

  const bgColor =
    colorConfig?.backgroundColor ??
    (theme.inputField?.backgroundColor as string | undefined) ??
    '#0d0d0d';

  const disabledBgColor =
    colorConfig?.disabledBackgroundColor ??
    bgColor;

  // ── Focus animation ───────────────────────────────────────────────────────
  // progress: 0 = blurred, 1 = focused
  const focusProgress = useSharedValue(0);

  const borderAnimStyle = useAnimatedStyle(() => {
    // Error always overrides to error color; otherwise interpolate on focus
    if (hasError) {
      return { borderColor: errorBorderColor };
    }
    return {
      borderColor: interpolateColor(
        focusProgress.value,
        [0, 1],
        [borderColor, activeBorderColor],
      ),
    };
  });

  // ── Auto-focus ────────────────────────────────────────────────────────────
  const autoFocusRef = useAutoFocus(autoFocus);
  const manualRef = useRef<TextInput>(null);
  // Use the auto-focus ref when autoFocus=true, otherwise use a plain ref
  const inputRef = autoFocus ? autoFocusRef : manualRef;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleFocus = useCallback(() => {
    focusProgress.value = withTiming(1, { duration: BUTTON_PRESS_DURATION_MS * 2 });
    onFocus?.();
  }, [focusProgress, onFocus]);

  const handleBlur = useCallback(() => {
    focusProgress.value = withTiming(0, { duration: BUTTON_PRESS_DURATION_MS * 2 });
    onBlur?.();
  }, [focusProgress, onBlur]);

  // ── Character count ───────────────────────────────────────────────────────
  const currentLength = value?.length ?? 0;

  return (
    <View style={[styles.container, style]}>
      {/* Label */}
      {label != null && (
        <NeoPopTypography fontSize={12} color={labelColor} style={[styles.label, labelStyle]}>
          {label}
        </NeoPopTypography>
      )}

      {/* Animated border wrapper */}
      <Animated.View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: isDisabled ? disabledBgColor : bgColor,
          },
          borderAnimStyle,
          isDisabled && styles.disabled,
        ]}
      >
        <TextInput
          ref={inputRef}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          onChangeText={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={onSubmitEditing}
          editable={!isDisabled}
          maxLength={maxLength}
          keyboardType={inputMode ? resolveKeyboardType(inputMode) : 'default'}
          secureTextEntry={isPassword(inputMode)}
          returnKeyType={returnKeyType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={[
            styles.input,
            { color: textColor },
            multiline && styles.multiline,
            inputStyle,
          ]}
          allowFontScaling={false}
        />
      </Animated.View>

      {/* Footer row: error message + character count */}
      {(hasError && errorMessage != null) || showCharacterCount ? (
        <View style={styles.footer}>
          {hasError && errorMessage != null && (
            <Text style={[styles.errorText, { color: errorBorderColor }]}>
              {errorMessage}
            </Text>
          )}
          {showCharacterCount && maxLength != null && (
            <Text style={[styles.charCount, { color: labelColor }]}>
              {currentLength}/{maxLength}
            </Text>
          )}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 6,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 12,
    paddingVertical: 0,
    minHeight: 44,
    justifyContent: 'center',
  },
  input: {
    fontSize: 14,
    paddingVertical: 10,
  },
  multiline: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    flex: 1,
  },
  charCount: {
    fontSize: 12,
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});
