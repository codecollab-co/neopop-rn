/**
 * NeoPopScoreMeter — a semi-circular arc gauge drawn on a Skia Canvas.
 *
 * Layout:
 *
 *    poor      average      excellent   ← legend labels (optional)
 *         ╭──────────────╮
 *         │    SCORE     │             ← score + description centred in arc
 *         ╰──────────────╯
 *
 * The arc spans 180° (left → right). The filled stroke animates from `oldReading`
 * to `reading` using Reanimated withTiming + useDerivedValue to produce
 * a Skia Path that is passed directly to Skia as an AnimatedProp.
 *
 * Score range: [lowerLimit, upperLimit] → arc [0% = leftmost, 100% = rightmost].
 * Type-based stroke color: 'excellent' → green, 'average' → orange, 'poor' → red.
 */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Canvas,
  Path,
  Skia,
  Circle,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import type { NeoPopScoreMeterProps } from './NeoPopScoreMeter.types';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import { SEMANTIC_ERROR, SEMANTIC_SUCCESS } from '../../primitives/colors';

/** Duration for the arc sweep animation. */
const SWEEP_DURATION_MS = 1400;

/**
 * Convert a score in [lowerLimit, upperLimit] to a sweep angle (0..180 degrees).
 * 0 = fully left (low score), 180 = fully right (high score).
 */
function scoreToSweep(
  score: number,
  lowerLimit: number,
  upperLimit: number,
): number {
  const range = upperLimit - lowerLimit;
  if (range === 0) return 0;
  const clamped = Math.max(lowerLimit, Math.min(upperLimit, score));
  return ((clamped - lowerLimit) / range) * 180;
}

/**
 * Build a Skia arc path given centre, radius, and sweep.
 * The arc always starts at 180° (leftmost / 9-o'clock position) and
 * sweeps clockwise by `sweepDeg` degrees.
 */
function buildArcPath(
  cx: number,
  cy: number,
  r: number,
  sweepDeg: number,
): ReturnType<typeof Skia.Path.Make> {
  const p    = Skia.Path.Make();
  const rect = { x: cx - r, y: cy - r, width: r * 2, height: r * 2 };
  // Start at 180° (left), sweep clockwise
  p.addArc(rect, 180, Math.max(0.01, sweepDeg));
  return p;
}

export function NeoPopScoreMeter({
  reading,
  oldReading,
  type,
  scoreDesc,
  showIndicators = true,
  showLegends = true,
  lowerLimit = 300,
  upperLimit = 900,
  colorMode: _colorMode,
  colorConfig,
  size = 220,
  strokeWidth = 14,
  onAnimationComplete,
  style,
}: NeoPopScoreMeterProps) {
  const theme = useNeoPopTheme();

  // ── Color resolution ───────────────────────────────────────────────────────
  const excellentColor =
    colorConfig?.excellentColor ??
    theme.scoreMeter?.meterStrokeColor?.excellent ??
    SEMANTIC_SUCCESS[4];

  const averageColor =
    colorConfig?.averageColor ??
    theme.scoreMeter?.meterStrokeColor?.average ??
    '#F5A623';

  const poorColor =
    colorConfig?.poorColor ??
    theme.scoreMeter?.meterStrokeColor?.poor ??
    SEMANTIC_ERROR[4];

  const trackColor =
    colorConfig?.trackColor ??
    (theme.scoreMeter?.meterStrokeBackground as string | undefined) ??
    '#3D3D3D';

  const dotColor =
    colorConfig?.indicatorColor ??
    (theme.scoreMeter?.dotColor as string | undefined) ??
    '#ffffff';

  const scoreTextColor =
    colorConfig?.scoreTextColor ??
    (theme.scoreMeter?.scoreColor as string | undefined) ??
    '#ffffff';

  const descTextColor =
    colorConfig?.descTextColor ??
    (theme.scoreMeter?.scoreColor as string | undefined) ??
    '#8A8A8A';

  // Resolve stroke color from `type` or auto-derive from reading value
  function resolveStrokeColor(): string {
    if (type === 'excellent') return excellentColor;
    if (type === 'average')   return averageColor;
    if (type === 'poor')      return poorColor;
    const range = upperLimit - lowerLimit;
    const ratio = range > 0 ? (reading - lowerLimit) / range : 0;
    if (ratio >= 0.66) return excellentColor;
    if (ratio >= 0.33) return averageColor;
    return poorColor;
  }

  const strokeColor = resolveStrokeColor();

  // ── Canvas geometry ────────────────────────────────────────────────────────
  const canvasWidth  = size;
  // semi-circle: height = radius + stroke overhang
  const radius       = size / 2 - strokeWidth - 4;
  const cx           = size / 2;
  const cy           = size / 2;   // arc centre; only top half shown
  const canvasHeight = size / 2 + strokeWidth + 4;

  // ── Score → sweep angles ───────────────────────────────────────────────────
  const oldSweep     = scoreToSweep(oldReading, lowerLimit, upperLimit);
  const targetSweep  = scoreToSweep(reading,    lowerLimit, upperLimit);

  // ── Reanimated → Skia bridge ───────────────────────────────────────────────
  // `sweepAnim` drives the arc from oldSweep to targetSweep on the UI thread.
  const sweepAnim = useSharedValue(oldSweep);

  // Skia 1.x accepts AnimatedProp<T> = T | SharedValue<T>, so we derive a
  // SharedValue<SkPath> directly using Reanimated's useDerivedValue and pass
  // it straight to <Path path={...}> — no useSharedValueEffect needed.
  const filledPath = useDerivedValue(() =>
    buildArcPath(cx, cy, radius, sweepAnim.value),
  );

  // ── Kick off animation ─────────────────────────────────────────────────────
  useEffect(() => {
    sweepAnim.value = oldSweep;
    sweepAnim.value = withTiming(targetSweep, {
      duration: SWEEP_DURATION_MS,
      easing: Easing.out(Easing.cubic),
    }, (finished) => {
      if (finished && onAnimationComplete) {
        runOnJS(onAnimationComplete)();
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reading, oldReading]);

  // ── Static paths ───────────────────────────────────────────────────────────
  // Full 180° background track
  const trackPath = buildArcPath(cx, cy, radius, 180);

  // ── Dot indicator position (at the tip of the filled arc) ─────────────────
  // Angle in Skia convention: 180° = start (left), sweepAnim adds clockwise
  // Dot at angle = 180 + targetSweep  (for the final resting position)
  const dotAngleRad = ((180 + targetSweep) * Math.PI) / 180;
  const dotX        = cx + radius * Math.cos(dotAngleRad);
  const dotY        = cy + radius * Math.sin(dotAngleRad);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <View style={[styles.container, style]}>
      {/* Arc canvas */}
      <Canvas style={{ width: canvasWidth, height: canvasHeight }}>
        {/* Background track (full 180°) */}
        <Path
          path={trackPath}
          color={trackColor}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
        />

        {/* Animated filled arc */}
        <Path
          path={filledPath}
          color={strokeColor}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
        />

        {/* Dot at reading tip */}
        {showIndicators && (
          <Circle
            cx={dotX}
            cy={dotY}
            r={strokeWidth / 2 + 3}
            color={dotColor}
          />
        )}
      </Canvas>

      {/* Score text, centred inside the arc opening */}
      <View
        style={[
          styles.scoreOverlay,
          {
            width: size,
            // Position roughly at mid-height of the arc's opening
            top: canvasHeight * 0.25,
          },
        ]}
        pointerEvents="none"
      >
        <Text style={[styles.scoreValue, { color: scoreTextColor }]}>
          {reading}
        </Text>
        {scoreDesc != null && (
          <Text style={[styles.scoreDesc, { color: descTextColor }]}>
            {scoreDesc}
          </Text>
        )}
      </View>

      {/* Legend row */}
      {showLegends && (
        <View style={[styles.legendRow, { width: size }]}>
          <Text style={[styles.legendLabel, { color: poorColor }]}>
            Poor
          </Text>
          <Text style={[styles.legendLabel, { color: averageColor }]}>
            Average
          </Text>
          <Text style={[styles.legendLabel, { color: excellentColor }]}>
            Excellent
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  scoreOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -1,
  },
  scoreDesc: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 2,
  },
  legendLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});
