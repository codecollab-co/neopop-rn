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
