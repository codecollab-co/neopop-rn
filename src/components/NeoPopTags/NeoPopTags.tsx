import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { NeoPopTagsProps } from './NeoPopTags.types';
import { Row } from '../layout/Row';
import { HorizontalSpacer } from '../layout/HorizontalSpacer';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import {
  SEMANTIC_WARNING,
  SEMANTIC_ERROR,
  SEMANTIC_SUCCESS,
  SEMANTIC_INFO,
} from '../../primitives/colors';

/** Semantic type → background color mapping using the mid-range palette step (index 2). */
const TYPE_BACKGROUND: Record<string, string> = {
  warning: SEMANTIC_WARNING[2],
  error:   SEMANTIC_ERROR[2],
  success: SEMANTIC_SUCCESS[2],
  info:    SEMANTIC_INFO[2],
};

/** Semantic type → foreground/text color mapping using the brand-strength step (index 4). */
const TYPE_COLOR: Record<string, string> = {
  warning: SEMANTIC_WARNING[4],
  error:   SEMANTIC_ERROR[4],
  success: SEMANTIC_SUCCESS[4],
  info:    SEMANTIC_INFO[4],
};

/**
 * A pill-shaped badge / tag component with semantic color presets.
 *
 * @param type - Semantic intent: 'warning' | 'error' | 'success' | 'info' | 'custom'
 * @param colorConfig - Custom colors when `type='custom'` (or to override semantic colors)
 * @param icon - Optional icon node rendered to the left of children
 * @param noContainer - When true, renders children inline without the badge shell
 * @param textStyle - Style forwarded to a wrapping text node (useful when children is a string)
 * @param style - Additional style for the badge container
 */
export function NeoPopTags({
  children,
  type = 'custom',
  colorMode: _colorMode,
  colorConfig,
  icon,
  noContainer = false,
  style,
}: NeoPopTagsProps) {
  const theme = useNeoPopTheme();

  // Resolve background and text colors with precedence:
  //   explicit colorConfig > semantic type map > theme.tags defaults
  const bgColor =
    colorConfig?.background ??
    (type !== 'custom' ? TYPE_BACKGROUND[type] : undefined) ??
    (theme.tags?.background as string | undefined) ??
    '#161616';

  const textColor =
    colorConfig?.color ??
    (type !== 'custom' ? TYPE_COLOR[type] : undefined) ??
    (theme.tags?.color as string | undefined) ??
    '#ffffff';

  const borderColor =
    colorConfig?.borderColor ??
    (type !== 'custom' ? TYPE_COLOR[type] : undefined);

  // When noContainer is true just render the children bare (useful for inline labels)
  if (noContainer) {
    return <>{children}</>;
  }

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bgColor,
          ...(borderColor ? { borderColor, borderWidth: 1 } : {}),
        },
        style,
      ]}
      accessibilityRole="text"
    >
      <Row align="center" justify="center">
        {icon != null && (
          <>
            <View style={{ tintColor: textColor } as object}>{icon}</View>
            <HorizontalSpacer width={4} />
          </>
        )}
        {/* Wrap string children in a Text-compatible element via cloneElement if needed */}
        {typeof children === 'string' ? (
          // Render string children using the theme text color
          <View>
            {React.createElement(
              require('../NeoPopTypography/NeoPopTypography').NeoPopTypography,
              { fontSize: 12, color: textColor },
              children,
            )}
          </View>
        ) : (
          children
        )}
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
});
