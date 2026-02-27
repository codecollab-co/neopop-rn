import React from 'react';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import type { PointerProps } from './icons.types';

/**
 * Pointer (→) icon rendered via Skia Path.
 * A horizontal shaft with a filled arrowhead, pointing right.
 *
 * @param size - Bounding box in logical pixels (default: 24)
 * @param color - Fill/stroke color (default: '#ffffff')
 * @param strokeWidth - Shaft line thickness (default: 2)
 */
export function Pointer({
  size = 24,
  color = '#ffffff',
  strokeWidth = 2,
  style,
}: PointerProps) {
  const cy = size / 2;
  const headW = size * 0.38;
  const headH = size * 0.32;
  const shaftEnd = size - headW;

  const shaft = Skia.Path.Make();
  shaft.moveTo(0, cy);
  shaft.lineTo(shaftEnd, cy);

  const head = Skia.Path.Make();
  head.moveTo(size, cy);
  head.lineTo(shaftEnd, cy - headH / 2);
  head.lineTo(shaftEnd, cy + headH / 2);
  head.close();

  const strokePaint = Skia.Paint();
  strokePaint.setColor(Skia.Color(color));
  strokePaint.setStrokeWidth(strokeWidth);
  strokePaint.setStyle(1 /* Stroke */);
  strokePaint.setStrokeCap(1 /* Round */);
  strokePaint.setAntiAlias(true);

  const fillPaint = Skia.Paint();
  fillPaint.setColor(Skia.Color(color));
  fillPaint.setStyle(0 /* Fill */);
  fillPaint.setAntiAlias(true);

  return (
    <Canvas style={[{ width: size, height: size }, style]}>
      <Path path={shaft} paint={strokePaint} />
      <Path path={head} paint={fillPaint} />
    </Canvas>
  );
}
