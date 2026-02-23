/**
 * NeoPopTiltedButton — a parallelogram-shaped button drawn on a Skia Canvas.
 *
 * Uses `computeTiltGeometry` to derive the face and plunk/shadow polygon points,
 * then paints them with Skia Path. Supports:
 *  - `tiltDirection`: 'left' | 'right' — which corner is elevated
 *  - Continuous floating bob animation (optional via `isFloating`)
 *  - Tap press-down animation: face translates in the tilt direction
 *  - Shimmer overlay via NeoPopShimmer
 *  - Full color theming via `decoration` + theme defaults
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import {
  Canvas,
  Path,
  Skia,
} from '@shopify/react-native-skia';
import type { NeoPopTiltedButtonProps } from './NeoPopTiltedButton.types';
import { NeoPopShimmer } from '../NeoPopShimmer/NeoPopShimmer';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import { triggerHaptic } from '../../utils/haptics';
import { computeTiltGeometry } from '../../skia/NeoPopTiltGeometry';
import { useClientHeight } from '../../hooks/useClientHeight';
import {
  BUTTON_PRESS_DURATION_MS,
  BUTTON_RELEASE_DAMPING,
  BUTTON_RELEASE_STIFFNESS,
  TILTED_BUTTON_DEPTH,
  TILTED_BUTTON_SHADOW_DIST,
  TILTED_BUTTON_FLOATING_MS,
  TILTED_BUTTON_FLOAT_DELAY_MS,
  TILTED_BUTTON_TAP_MS,
} from '../../primitives/buttons';

/** Default button face width in logical pixels (measured from layout). */
const DEFAULT_WIDTH  = 200;
const DEFAULT_HEIGHT = 48;

/**
 * Build a Skia Path from 4 corner points (parallelogram / polygon).
 */
function polygonPath(
  pts: Array<{ x: number; y: number }>,
): ReturnType<typeof Skia.Path.Make> {
  const p = Skia.Path.Make();
  p.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    p.lineTo(pts[i].x, pts[i].y);
  }
  p.close();
  return p;
}

export function NeoPopTiltedButton({
  children,
  isFloating = false,
  floatingDuration = TILTED_BUTTON_FLOATING_MS,
  floatingDelay = TILTED_BUTTON_FLOAT_DELAY_MS,
  tapDuration = TILTED_BUTTON_TAP_MS,
  tiltDirection = 'left',
  tiltAngle,
  color,
  decoration,
  buttonDepth = TILTED_BUTTON_DEPTH,
  shadowDistance = TILTED_BUTTON_SHADOW_DIST,
  enabled = true,
  onTapUp,
  onTapDown,
  onPress,
  enableHaptics = false,
  colorMode: _colorMode,
  style,
}: NeoPopTiltedButtonProps) {
  const theme = useNeoPopTheme();

  // ── Layout measurement ─────────────────────────────────────────────────────
  // We need actual width/height to compute the tilt geometry
  const [width, setWidth]   = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  const onLayout = useCallback(
    (e: { nativeEvent: { layout: { width: number; height: number } } }) => {
      setWidth(e.nativeEvent.layout.width);
      setHeight(e.nativeEvent.layout.height);
    },
    [],
  );

  // ── Color resolution ───────────────────────────────────────────────────────
  const faceColor =
    decoration?.color ?? color ?? theme.tiltedButton?.color ?? '#ffffff';

  const plunkColor =
    decoration?.plunkColor ?? theme.tiltedButton?.plunkColor ?? '#3D3D3D';

  const shadowColor =
    decoration?.shadowColor ?? theme.tiltedButton?.shadowColor ?? '#161616';

  const borderColor =
    decoration?.border !== false
      ? (theme.tiltedButton?.borderColor ?? faceColor)
      : undefined;

  const showShimmer = decoration?.showShimmer ?? false;

  // ── Tilt geometry ──────────────────────────────────────────────────────────
  const geo = computeTiltGeometry({
    width,
    height,
    depth:          buttonDepth,
    angle:          tiltAngle != null ? (tiltAngle * Math.PI) / 180 : undefined,
    shadowDistance,
    direction:      tiltDirection,
  });

  // Build paths from geometry
  const facePath  = polygonPath(geo.facePoints as Array<{ x: number; y: number }>);
  const plunkPath = polygonPath(geo.plunkPoints as Array<{ x: number; y: number }>);

  // Border stroke path mirrors the face
  const borderPath = borderColor ? polygonPath(geo.facePoints as Array<{ x: number; y: number }>) : null;

  // ── Animation shared values ────────────────────────────────────────────────
  const floatY  = useSharedValue(0);   // levitation
  const tapDx   = useSharedValue(0);   // press x-offset (left tilt → positive; right → negative)
  const tapDy   = useSharedValue(0);   // press y-offset

  // ── Floating loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isFloating || !enabled) {
      cancelAnimation(floatY);
      floatY.value = withTiming(0, { duration: 200 });
      return;
    }

    const half = floatingDuration / 2;
    floatY.value = withRepeat(
      withSequence(
        withTiming(-buttonDepth, { duration: half, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,            { duration: half, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );

    return () => cancelAnimation(floatY);
  }, [isFloating, enabled, floatY, floatingDuration, buttonDepth]);

  // ── Tap handlers ───────────────────────────────────────────────────────────
  // Press sink direction follows the tilt: left-tilt sinks right+down, right-tilt sinks left+down
  const sinkX = tiltDirection === 'left' ? buttonDepth * 0.5 : -buttonDepth * 0.5;
  const sinkY = buttonDepth * 0.5;

  const handlePressIn = useCallback(() => {
    if (!enabled) return;
    if (enableHaptics) void triggerHaptic('impactLight');
    cancelAnimation(floatY);
    floatY.value = withTiming(0, { duration: 60 });
    tapDx.value = withTiming(sinkX, { duration: tapDuration, easing: Easing.out(Easing.quad) });
    tapDy.value = withTiming(sinkY, { duration: tapDuration, easing: Easing.out(Easing.quad) });
    onTapDown?.();
  }, [enabled, enableHaptics, floatY, tapDx, tapDy, sinkX, sinkY, tapDuration, onTapDown]);

  const handlePressOut = useCallback(() => {
    tapDx.value = withSpring(0, { damping: BUTTON_RELEASE_DAMPING, stiffness: BUTTON_RELEASE_STIFFNESS });
    tapDy.value = withSpring(0, { damping: BUTTON_RELEASE_DAMPING, stiffness: BUTTON_RELEASE_STIFFNESS });
    onTapUp?.();
    // Resume floating if enabled
    if (isFloating && enabled) {
      const half = floatingDuration / 2;
      floatY.value = withRepeat(
        withSequence(
          withTiming(-buttonDepth, { duration: half, easing: Easing.inOut(Easing.ease) }),
          withTiming(0,            { duration: half, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    }
  }, [tapDx, tapDy, onTapUp, isFloating, enabled, floatY, floatingDuration, buttonDepth]);

  // ── Animated styles ────────────────────────────────────────────────────────
  const outerAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
    opacity: enabled ? 1 : 0.45,
  }));

  const faceAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tapDx.value },
      { translateY: tapDy.value },
    ],
  }));

  // ── Render ─────────────────────────────────────────────────────────────────
  const canvasNode = (
    <Animated.View
      style={[
        { width: geo.canvasWidth, height: geo.canvasHeight },
        faceAnimStyle,
      ]}
    >
      <Canvas style={{ width: geo.canvasWidth, height: geo.canvasHeight }}>
        {/* Shadow parallelogram (drawn first so face sits on top) */}
        <Path path={plunkPath} color={shadowColor} />

        {/* Plunk / side edge */}
        <Path path={plunkPath} color={plunkColor} style="fill" />

        {/* Face parallelogram */}
        <Path path={facePath} color={faceColor} />

        {/* Optional border stroke */}
        {borderPath && (
          <Path
            path={borderPath}
            color={borderColor as string}
            style="stroke"
            strokeWidth={1.5}
          />
        )}
      </Canvas>

      {/* Children overlaid on the face polygon */}
      <View
        style={{
          position: 'absolute',
          left:   Math.min(...geo.facePoints.map((p) => p.x)),
          top:    Math.min(...geo.facePoints.map((p) => p.y)),
          width,
          height,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        pointerEvents="box-none"
      >
        {children}
      </View>
    </Animated.View>
  );

  const inner = (
    <Pressable
      onPress={enabled ? onPress : undefined}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={!enabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !enabled }}
      style={style}
    >
      <Animated.View style={outerAnimStyle}>
        {/* Invisible layout measurement view */}
        <View
          style={[styles.measureView, { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }]}
          onLayout={onLayout}
          pointerEvents="none"
        />
        {canvasNode}
      </Animated.View>
    </Pressable>
  );

  if (showShimmer) {
    return <NeoPopShimmer enabled>{inner}</NeoPopShimmer>;
  }

  return inner;
}

const styles = StyleSheet.create({
  measureView: {
    position: 'absolute',
    opacity: 0,
  },
});
