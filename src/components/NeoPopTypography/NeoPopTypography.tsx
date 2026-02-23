import React, { useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';
import type { TextStyle } from 'react-native';
import type { NeoPopTypographyProps } from './NeoPopTypography.types';
import {
  FontType,
  FontWeight,
  TextOverflow,
  LINE_HEIGHT_MULTIPLIER,
  LETTER_SPACING_MAP,
  TEXT_TRANSFORM_MAP,
  DEFAULT_FONT_FAMILY,
} from '../../primitives/typography';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';

/**
 * NeoPop-styled text component.
 *
 * Automatically resolves line height, letter spacing, text transform, and font
 * family from the `fontType` token, then merges with any explicit overrides.
 * Font scaling is disabled (`allowFontScaling=false`) to preserve layout fidelity.
 *
 * @param fontType - Semantic type token: HEADING, BODY, LABEL, etc. (default: BODY)
 * @param fontWeight - CSS-compatible weight string (default: REGULAR / '400')
 * @param fontSize - Font size in logical pixels (default: 14)
 * @param color - Text color; falls back to `theme.colors.text` then '#ffffff'
 * @param fontFamily - Overrides the default family for the given fontType
 * @param lineHeight - Overrides the auto-computed line height
 * @param overflow - CLIP or ELLIPSIS truncation behavior
 * @param lineClamp - Maximum number of visible lines (maps to numberOfLines)
 * @param style - Additional TextStyle overrides
 */
export function NeoPopTypography({
  fontType = FontType.BODY,
  fontWeight = FontWeight.REGULAR,
  fontSize = 14,
  children,
  color,
  fontFamily,
  lineHeight,
  overflow,
  lineClamp,
  style,
}: NeoPopTypographyProps) {
  const theme = useNeoPopTheme();

  const resolvedColor = color ?? (theme.colors?.text as string | undefined) ?? '#ffffff';
  const resolvedFontFamily = fontFamily ?? DEFAULT_FONT_FAMILY[fontType];
  const resolvedLineHeight = lineHeight ?? Math.round(fontSize * LINE_HEIGHT_MULTIPLIER[fontType]);

  const ellipsizeMode =
    overflow === TextOverflow.CLIP
      ? ('clip' as const)
      : overflow === TextOverflow.ELLIPSIS
        ? ('tail' as const)
        : undefined;

  const textStyle = useMemo(
    () =>
      StyleSheet.flatten([
        {
          fontSize,
          fontWeight: fontWeight as TextStyle['fontWeight'],
          lineHeight: resolvedLineHeight,
          letterSpacing: LETTER_SPACING_MAP[fontType],
          textTransform: TEXT_TRANSFORM_MAP[fontType],
          color: resolvedColor,
          ...(resolvedFontFamily !== 'System' ? { fontFamily: resolvedFontFamily } : {}),
        },
        style,
      ]),
    [fontSize, fontWeight, fontType, resolvedColor, resolvedFontFamily, resolvedLineHeight, style],
  );

  return (
    <Text
      style={textStyle}
      numberOfLines={lineClamp}
      ellipsizeMode={ellipsizeMode}
      allowFontScaling={false}
    >
      {children}
    </Text>
  );
}
