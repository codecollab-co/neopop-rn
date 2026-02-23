/**
 * NeoPop3DSurface — the core five-surface Skia painter.
 *
 * Renders a 3D extruded rectangle with configurable edge surfaces.
 * Used internally by NeoPopButton, NeoPopCard, and NeoPopCheckbox.
 *
 * TODO: Implement with @shopify/react-native-skia
 * The actual Skia Canvas + Path drawing goes here.
 * Stub is in place for TypeScript compilation and API surface.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
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

/**
 * Renders the NeoPop 3D surface effect using Skia Canvas.
 *
 * The canvas total size is (width + depth) × (height + depth)
 * to accommodate the protruding edge surfaces.
 */
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
  const derived = deriveEdgeColors({ faceColor, overrides: edgeColorOverrides });

  const canvasWidth  = width  + (edges.right  ? depth : 0) + (edges.left  ? depth : 0);
  const canvasHeight = height + (edges.bottom ? depth : 0) + (edges.top   ? depth : 0);

  // TODO: Replace this View-based stub with full Skia Canvas implementation.
  // The Skia implementation will:
  // 1. Draw face rectangle at (leftDepth, topDepth, width, height)
  // 2. Draw bottom edge parallelogram if edges.bottom
  // 3. Draw right edge parallelogram if edges.right
  // 4. Draw top/left edges if requested
  // 5. Draw border stroke on face if borderColor is provided

  return (
    <View
      style={[
        {
          width: canvasWidth,
          height: canvasHeight,
        },
        style,
      ]}
    >
      {/* Face */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            width,
            height,
            backgroundColor: faceColor,
            borderWidth: borderColor ? borderWidth : 0,
            borderColor: borderColor ?? 'transparent',
          },
        ]}
      />
      {/* Bottom edge stub */}
      {edges.bottom && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: width + depth,
            height: depth,
            backgroundColor: derived.bottom,
          }}
        />
      )}
      {/* Right edge stub */}
      {edges.right && (
        <View
          style={{
            position: 'absolute',
            top: depth,
            right: 0,
            width: depth,
            height,
            backgroundColor: derived.right,
          }}
        />
      )}
      {children}
    </View>
  );
}
