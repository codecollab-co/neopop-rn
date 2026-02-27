import React from 'react';
import { Pressable } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import type { ChevronProps } from './icons.types';

const DIRECTION_DEGREES: Record<string, number> = {
  north: 0,
  east:  90,
  south: 180,
  west:  270,
};

/**
 * Chevron (∨) icon rendered via Skia Path — crisp at any pixel density.
 *
 * @param direction - Pointing direction (default: 'south')
 * @param size - Bounding box in logical pixels (default: 24)
 * @param color - Stroke color (default: '#000000')
 * @param strokeWidth - Line thickness (default: 2)
 * @param onPress - Optional press handler; wraps output in a Pressable
 */
export function Chevron({
  direction = 'south',
  size = 24,
  color = '#000000',
  strokeWidth = 2,
  animated: _animated = false,
  style,
  onPress,
}: ChevronProps & { onPress?: () => void }) {
  const degrees = DIRECTION_DEGREES[direction] ?? 180;
  const cx = size / 2;
  const cy = size / 2;
  const arm = size * 0.28;

  // Downward ∨ centred in [0..size], rotated by direction
  const tipY = cy + arm * 0.7;
  const leftX = cx - arm;
  const leftY = cy - arm * 0.35;
  const rightX = cx + arm;

  const path = Skia.Path.Make();
  path.moveTo(leftX, leftY);
  path.lineTo(cx, tipY);
  path.lineTo(rightX, leftY);

  const matrix = Skia.Matrix();
  matrix.identity();
  matrix.translate(cx, cy);
  matrix.rotate((degrees * Math.PI) / 180);
  matrix.translate(-cx, -cy);
  path.transform(matrix);

  const paint = Skia.Paint();
  paint.setColor(Skia.Color(color));
  paint.setStrokeWidth(strokeWidth);
  paint.setStyle(1 /* Stroke */);
  paint.setStrokeCap(1 /* Round */);
  paint.setStrokeJoin(1 /* Round */);
  paint.setAntiAlias(true);

  const canvas = (
    <Canvas style={[{ width: size, height: size }, style]}>
      <Path path={path} paint={paint} />
    </Canvas>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{canvas}</Pressable>;
  }

  return canvas;
}
