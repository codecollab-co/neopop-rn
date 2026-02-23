/**
 * NeoPop3DSurface — core five-surface Skia painter.
 *
 * Canvas layout (with right + bottom edges):
 *
 *   ┌──────────────────────┬───┐
 *   │                      │ R │  ← right edge parallelogram
 *   │       face           │ i │
 *   │    (width × height)  │ g │
 *   │                      │ h │
 *   ├──────────────────────┤ t │
 *   │  bottom edge         └───┘
 *   └──────────────────────────┘
 *
 * Total canvas = (width + rightDepth + leftDepth) × (height + bottomDepth + topDepth)
 *
 * Each edge is a parallelogram drawn as a Skia Path.
 * The face is a simple Rect with an optional border stroke.
 */

import React, { useMemo } from 'react';
import { View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  Canvas,
  Path,
  Rect,
  Skia,
} from '@shopify/react-native-skia';
import { deriveEdgeColors } from './EdgeColorDeriver';

export interface NeoPop3DSurfaceProps {
  width: number;
  height: number;
  depth: number;
  faceColor: string;
  edgeColors?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  edges?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
  };
  borderColor?: string;
  borderWidth?: number;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function NeoPop3DSurface({
  width,
  height,
  depth,
  faceColor,
  edgeColors: edgeColorOverrides,
  edges = { right: true, bottom: true },
  borderColor,
  borderWidth = 1,
  children,
  style,
}: NeoPop3DSurfaceProps) {
  const derived = useMemo(
    () => deriveEdgeColors({ faceColor, overrides: edgeColorOverrides }),
    [faceColor, edgeColorOverrides],
  );

  const leftDepth   = edges.left   ? depth : 0;
  const rightDepth  = edges.right  ? depth : 0;
  const topDepth    = edges.top    ? depth : 0;
  const bottomDepth = edges.bottom ? depth : 0;

  const canvasWidth  = width  + leftDepth  + rightDepth;
  const canvasHeight = height + topDepth   + bottomDepth;

  // Face origin within canvas
  const faceX = leftDepth;
  const faceY = topDepth;

  const paths = useMemo(() => {
    const result: Array<{ path: ReturnType<typeof Skia.Path.Make>; color: string }> = [];

    // ── Bottom edge parallelogram ────────────────────────────────────────────
    // Top-left  = (faceX,           faceY + height)
    // Top-right = (faceX + width,   faceY + height)
    // Bot-right = (faceX + width + rightDepth, faceY + height + bottomDepth)
    // Bot-left  = (faceX - leftDepth,          faceY + height + bottomDepth)
    if (edges.bottom && derived.bottom) {
      const p = Skia.Path.Make();
      p.moveTo(faceX,                      faceY + height);
      p.lineTo(faceX + width,              faceY + height);
      p.lineTo(faceX + width + rightDepth, faceY + height + bottomDepth);
      p.lineTo(faceX - leftDepth,          faceY + height + bottomDepth);
      p.close();
      result.push({ path: p, color: derived.bottom });
    }

    // ── Right edge parallelogram ─────────────────────────────────────────────
    // Top-left  = (faceX + width,              faceY)
    // Top-right = (faceX + width + rightDepth, faceY - topDepth)
    // Bot-right = (faceX + width + rightDepth, faceY + height + bottomDepth - topDepth)
    // Bot-left  = (faceX + width,              faceY + height)
    if (edges.right && derived.right) {
      const p = Skia.Path.Make();
      p.moveTo(faceX + width,              faceY);
      p.lineTo(faceX + width + rightDepth, faceY - topDepth);
      p.lineTo(faceX + width + rightDepth, faceY + height + bottomDepth - topDepth);
      p.lineTo(faceX + width,              faceY + height);
      p.close();
      result.push({ path: p, color: derived.right });
    }

    // ── Top edge parallelogram ───────────────────────────────────────────────
    // Top-left  = (faceX - leftDepth,          faceY - topDepth)
    // Top-right = (faceX + width + rightDepth, faceY - topDepth)
    // Bot-right = (faceX + width,              faceY)
    // Bot-left  = (faceX,                      faceY)
    if (edges.top && derived.top) {
      const p = Skia.Path.Make();
      p.moveTo(faceX - leftDepth,          faceY - topDepth);
      p.lineTo(faceX + width + rightDepth, faceY - topDepth);
      p.lineTo(faceX + width,              faceY);
      p.lineTo(faceX,                      faceY);
      p.close();
      result.push({ path: p, color: derived.top });
    }

    // ── Left edge parallelogram ──────────────────────────────────────────────
    // Top-left  = (faceX - leftDepth, faceY - topDepth)
    // Top-right = (faceX,             faceY)
    // Bot-right = (faceX,             faceY + height)
    // Bot-left  = (faceX - leftDepth, faceY + height + bottomDepth)
    if (edges.left && derived.left) {
      const p = Skia.Path.Make();
      p.moveTo(faceX - leftDepth, faceY - topDepth);
      p.lineTo(faceX,             faceY);
      p.lineTo(faceX,             faceY + height);
      p.lineTo(faceX - leftDepth, faceY + height + bottomDepth);
      p.close();
      result.push({ path: p, color: derived.left });
    }

    return result;
  }, [derived, edges, faceX, faceY, width, height, leftDepth, rightDepth, topDepth, bottomDepth]);

  return (
    <View style={[{ width: canvasWidth, height: canvasHeight }, style]}>
      <Canvas style={{ width: canvasWidth, height: canvasHeight }}>
        {/* Face rectangle */}
        <Rect
          x={faceX}
          y={faceY}
          width={width}
          height={height}
          color={faceColor}
        />

        {/* Edge parallelograms */}
        {paths.map(({ path, color }, i) => (
          <Path key={i} path={path} color={color} />
        ))}

        {/* Border stroke on face — drawn as a separate unfilled rect */}
        {borderColor && (
          <Rect
            x={faceX + borderWidth / 2}
            y={faceY + borderWidth / 2}
            width={width - borderWidth}
            height={height - borderWidth}
            color={borderColor}
            style="stroke"
            strokeWidth={borderWidth}
          />
        )}
      </Canvas>

      {/* Children overlay — positioned over the face area */}
      {children && (
        <View
          style={{
            position: 'absolute',
            left: faceX,
            top: faceY,
            width,
            height,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          pointerEvents="box-none"
        >
          {children}
        </View>
      )}
    </View>
  );
}
