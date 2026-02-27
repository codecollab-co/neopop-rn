import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import type { NeoPopProgressBarProps } from './NeoPopProgressBar.types';

const DEFAULT_TRACK = '#3D3D3D';
const DEFAULT_FILL = '#06C270';
const DEFAULT_LABEL = '#ffffff';
const ANIM_DURATION = 600;

/**
 * Progress indicator in horizontal bar or circular arc form.
 *
 * Progress animates smoothly with `withTiming` on every change.
 * The circular variant uses a Skia arc on a Canvas for crisp rendering.
 *
 * @param progress - Value between 0 (empty) and 1 (full)
 * @param variant - 'horizontal' | 'circular' (default: 'horizontal')
 * @param showLabel - Show percentage text (default: false)
 * @param size - Bar height (horizontal) or diameter (circular) in px
 * @param strokeWidth - Arc stroke width for circular variant (default: 8)
 */
export function NeoPopProgressBar(props: NeoPopProgressBarProps) {
  if (props.variant === 'circular') {
    return <CircularProgressBar {...props} />;
  }
  return <HorizontalProgressBar {...props} />;
}

// ─── Horizontal variant ───────────────────────────────────────────────────────

function HorizontalProgressBar({
  progress,
  showLabel = false,
  label,
  size,
  colorConfig,
  style,
  labelStyle,
}: NeoPopProgressBarProps) {
  const trackColor = colorConfig?.trackColor ?? DEFAULT_TRACK;
  const fillColor = colorConfig?.fillColor ?? DEFAULT_FILL;
  const labelColor = colorConfig?.labelColor ?? DEFAULT_LABEL;
  const barHeight = size ?? 8;
  const pct = Math.round(Math.min(Math.max(progress, 0), 1) * 100);
  const displayLabel = label ?? `${pct}%`;

  const animatedProgress = useSharedValue(Math.min(Math.max(progress, 0), 1));

  useEffect(() => {
    animatedProgress.value = withTiming(Math.min(Math.max(progress, 0), 1), {
      duration: ANIM_DURATION,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress, animatedProgress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%` as unknown as number,
  }));

  return (
    <View style={style}>
      <View
        style={[
          styles.track,
          { height: barHeight, backgroundColor: trackColor, borderRadius: barHeight / 2 },
        ]}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: pct }}
      >
        <Animated.View
          style={[
            styles.fill,
            { height: barHeight, backgroundColor: fillColor, borderRadius: barHeight / 2 },
            fillStyle,
          ]}
        />
      </View>
      {showLabel ? (
        <Text style={[styles.labelH, { color: labelColor }, labelStyle]}>
          {displayLabel}
        </Text>
      ) : null}
    </View>
  );
}

// ─── Circular variant ─────────────────────────────────────────────────────────

function CircularProgressBar({
  progress,
  showLabel = false,
  label,
  size,
  strokeWidth = 8,
  colorConfig,
  style,
  labelStyle,
}: NeoPopProgressBarProps) {
  const trackColor = colorConfig?.trackColor ?? DEFAULT_TRACK;
  const fillColor = colorConfig?.fillColor ?? DEFAULT_FILL;
  const labelColor = colorConfig?.labelColor ?? DEFAULT_LABEL;
  const diameter = size ?? 80;
  const radius = (diameter - strokeWidth) / 2;
  const cx = diameter / 2;
  const cy = diameter / 2;
  const pct = Math.round(Math.min(Math.max(progress, 0), 1) * 100);
  const displayLabel = label ?? `${pct}%`;

  const animatedProgress = useSharedValue(Math.min(Math.max(progress, 0), 1));

  useEffect(() => {
    animatedProgress.value = withTiming(Math.min(Math.max(progress, 0), 1), {
      duration: ANIM_DURATION,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress, animatedProgress]);

  const trackPath = Skia.Path.Make();
  trackPath.addCircle(cx, cy, radius);

  const arcPath = useDerivedValue(() => {
    const sweep = animatedProgress.value * 360;
    const p = Skia.Path.Make();
    p.addArc(
      { x: cx - radius, y: cy - radius, width: radius * 2, height: radius * 2 },
      -90,
      sweep,
    );
    return p;
  });

  const trackPaint = Skia.Paint();
  trackPaint.setColor(Skia.Color(trackColor));
  trackPaint.setStyle(1 /* Stroke */);
  trackPaint.setStrokeWidth(strokeWidth);
  trackPaint.setAntiAlias(true);

  const fillPaint = Skia.Paint();
  fillPaint.setColor(Skia.Color(fillColor));
  fillPaint.setStyle(1 /* Stroke */);
  fillPaint.setStrokeWidth(strokeWidth);
  fillPaint.setStrokeCap(1 /* Round */);
  fillPaint.setAntiAlias(true);

  return (
    <View
      style={[
        { width: diameter, height: diameter, alignItems: 'center', justifyContent: 'center' },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: pct }}
    >
      <Canvas style={[styles.absoluteFill, { width: diameter, height: diameter }]}>
        <Path path={trackPath} paint={trackPaint} />
        <Path path={arcPath} paint={fillPaint} />
      </Canvas>
      {showLabel ? (
        <Text style={[styles.labelC, { color: labelColor }, labelStyle]}>
          {displayLabel}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  absoluteFill: {
    position: 'absolute',
  },
  labelH: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  labelC: {
    fontSize: 14,
    fontWeight: '700',
  },
});
