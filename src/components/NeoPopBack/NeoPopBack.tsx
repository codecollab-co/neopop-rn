import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import type { NeoPopBackProps } from './NeoPopBack.types';
import { Chevron } from '../icons/Chevron';
import { NeoPopTypography } from '../NeoPopTypography/NeoPopTypography';
import { Row } from '../layout/Row';
import { HorizontalSpacer } from '../layout/HorizontalSpacer';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';

/**
 * A back-navigation row that pairs a westward Chevron with optional heading text.
 *
 * @param heading - Optional label shown to the right of the chevron
 * @param color - Explicit color for both the chevron and heading text
 * @param onPress - Called when the row is tapped
 * @param rightElement - Optional element rendered at the far right (e.g. a close button)
 * @param textStyle - Additional style for the heading Text
 * @param colorMode - 'dark' or 'light' — picks text/icon color from the active theme
 * @param style - Additional style for the outer Pressable
 */
export function NeoPopBack({
  heading,
  color,
  onPress,
  rightElement,
  textStyle,
  colorMode,
  style,
}: NeoPopBackProps) {
  const theme = useNeoPopTheme();

  // Resolve icon/text color: explicit prop > colorMode-derived > theme text color
  const resolvedColor =
    color ??
    (colorMode === 'light'
      ? (theme.colors?.text as string)
      : colorMode === 'dark'
        ? (theme.colors?.text as string)
        : (theme.colors?.text as string | undefined)) ??
    '#ffffff';

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, style]}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={heading ?? 'Go back'}
    >
      <Row align="center" justify="flex-start" style={styles.row}>
        {/* Westward-pointing chevron acts as the back arrow */}
        <Chevron direction="west" size={20} color={resolvedColor} />

        {heading != null && (
          <>
            <HorizontalSpacer width={8} />
            <NeoPopTypography
              fontSize={16}
              color={resolvedColor}
              style={textStyle}
            >
              {heading}
            </NeoPopTypography>
          </>
        )}

        {rightElement != null && (
          <Row style={styles.right} align="center">
            {rightElement}
          </Row>
        )}
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  row: {
    flex: 1,
  },
  right: {
    marginLeft: 'auto',
  },
});
