import React from 'react';
import { StyleSheet } from 'react-native';
import type { NeoPopHeaderProps } from './NeoPopHeader.types';
import { Chevron } from '../icons/Chevron';
import { NeoPopTypography } from '../NeoPopTypography/NeoPopTypography';
import { Row } from '../layout/Row';
import { Column } from '../layout/Column';
import { HorizontalSpacer } from '../layout/HorizontalSpacer';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import { Pressable } from 'react-native';

/**
 * Page-level header with optional back navigation, heading, description, and a
 * trailing right-element slot.
 *
 * Layout (with all optional parts present):
 *
 *   [ ← ]  Heading text                    [ rightElement ]
 *           Description sub-text
 *
 * @param heading - Primary heading text
 * @param description - Optional secondary/sub-text rendered below the heading
 * @param onBackPress - If provided, a back chevron is shown on the left
 * @param rightElement - Optional element placed at the far right of the header row
 * @param color - Explicit color for all text and the back chevron
 * @param textStyle - Additional style for the heading Text
 * @param colorMode - 'dark' or 'light' — picks colors from the active theme
 * @param style - Additional style for the outer View
 */
export function NeoPopHeader({
  heading,
  description,
  onBackPress,
  rightElement,
  color,
  textStyle,
  colorMode: _colorMode,
  style,
}: NeoPopHeaderProps) {
  const theme = useNeoPopTheme();

  const resolvedColor =
    color ?? (theme.colors?.text as string | undefined) ?? '#ffffff';

  const subtextColor =
    (theme.colors?.subtext as string | undefined) ?? '#8A8A8A';

  return (
    <Row align="center" justify="space-between" style={[styles.container, style]}>
      {/* Left section: optional back chevron + title/description column */}
      <Row align="center" style={styles.left}>
        {onBackPress != null && (
          <>
            <Pressable
              onPress={onBackPress}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Chevron direction="west" size={20} color={resolvedColor} />
            </Pressable>
            <HorizontalSpacer width={12} />
          </>
        )}

        <Column>
          {heading != null && (
            <NeoPopTypography fontSize={18} color={resolvedColor} style={textStyle}>
              {heading}
            </NeoPopTypography>
          )}
          {description != null && (
            <NeoPopTypography fontSize={13} color={subtextColor}>
              {description}
            </NeoPopTypography>
          )}
        </Column>
      </Row>

      {/* Right section */}
      {rightElement != null && (
        <Row align="center" style={styles.right}>
          {rightElement}
        </Row>
      )}
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
  },
  left: {
    flex: 1,
  },
  right: {
    flexShrink: 0,
  },
});
