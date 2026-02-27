import React from 'react';
import { Pressable } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import type { CrossProps } from './icons.types';

/**
 * Cross (×) icon rendered via Skia Path.
 *
 * @param size - Bounding box in logical pixels (default: 24)
 * @param color - Stroke color (default: '#000000')
 * @param strokeWidth - Line thickness (default: 2)
 * @param onPress - Optional press handler; wraps output in a Pressable
 * @param hitSlop - Hit slop passed to Pressable
 */
export function Cross({
  size = 24,
  color = '#000000',
  strokeWidth = 2,
  onPress,
  hitSlop,
  style,
}: CrossProps) {
  const pad = strokeWidth / 2;
  const path = Skia.Path.Make();
  path.moveTo(pad, pad);
  path.lineTo(size - pad, size - pad);
  path.moveTo(size - pad, pad);
  path.lineTo(pad, size - pad);

  const paint = Skia.Paint();
  paint.setColor(Skia.Color(color));
  paint.setStrokeWidth(strokeWidth);
  paint.setStyle(1 /* Stroke */);
  paint.setStrokeCap(1 /* Round */);
  paint.setAntiAlias(true);

  const canvas = (
    <Canvas style={[{ width: size, height: size }, style]}>
      <Path path={path} paint={paint} />
    </Canvas>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} hitSlop={hitSlop}>
        {canvas}
      </Pressable>
    );
  }

  return canvas;
}
