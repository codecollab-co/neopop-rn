import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withDelay,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import type { NeoPopShimmerProps } from './NeoPopShimmer.types';
import {
  SHIMMER_WIDTH,
  SHIMMER_GAP_WIDTH,
  SHIMMER_DURATION_MS,
  SHIMMER_DELAY_MS,
} from '../../primitives/buttons';

const DEFAULT_SHIMMER_COLOR = 'rgba(255,255,255,0.35)';

/**
 * NeoPopShimmer — wraps any child with a sweeping diagonal shimmer overlay.
 *
 * Works by translating a fixed-width semi-transparent band from left=-width
 * to right=containerWidth across the clipped container. The shimmer is
 * composed of two angled strips (gap between them) matching the CRED web pattern.
 *
 * Animation lifecycle:
 *   delay  →  sweep (duration)  →  repeatDelay  →  repeat ∞
 */
export function NeoPopShimmer({
  children,
  enabled = true,
  config = {},
  style,
}: NeoPopShimmerProps) {
  const {
    color = DEFAULT_SHIMMER_COLOR,
    width = SHIMMER_WIDTH,
    gap = SHIMMER_GAP_WIDTH,
    duration = SHIMMER_DURATION_MS,
    delay = SHIMMER_DELAY_MS,
    repeatDelay = SHIMMER_DELAY_MS,
    angle = 20,
  } = config;

  const translateX = useSharedValue(-200);
  const containerWidthRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      cancelAnimation(translateX);
      translateX.value = -200;
      return;
    }

    const totalTravel = containerWidthRef.current + width * 2 + 100;

    translateX.value = -width - 50;
    translateX.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(totalTravel, {
            duration,
            easing: Easing.linear,
          }),
          withDelay(
            repeatDelay,
            withTiming(-width - 50, { duration: 0 }),
          ),
        ),
        -1,
        false,
      ),
    );

    return () => {
      cancelAnimation(translateX);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, width, duration, delay, repeatDelay]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const skewDeg = `${-angle}deg`;

  return (
    <View
      style={[styles.container, style]}
      onLayout={(e) => {
        containerWidthRef.current = e.nativeEvent.layout.width;
      }}
    >
      {children}
      {enabled && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Animated.View style={[styles.shimmerTrack, shimmerStyle]}>
            {/* First strip */}
            <View
              style={[
                styles.strip,
                {
                  width,
                  backgroundColor: color,
                  transform: [{ skewX: skewDeg }],
                },
              ]}
            />
            {/* Gap + second strip */}
            <View style={{ width: gap }} />
            <View
              style={[
                styles.strip,
                {
                  width: width * 0.5,
                  backgroundColor: color,
                  transform: [{ skewX: skewDeg }],
                },
              ]}
            />
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  shimmerTrack: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  strip: {
    flex: 0,
  },
});
