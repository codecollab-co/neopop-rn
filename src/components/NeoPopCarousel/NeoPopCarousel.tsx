import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import type { NeoPopCarouselProps, NeoPopCarouselRef } from './NeoPopCarousel.types';

/** Spring config used when snapping to a carousel item. */
const SNAP_SPRING = { damping: 22, stiffness: 280 };

/**
 * A gesture-driven horizontal carousel with optional pagination dots.
 *
 * Items are laid out in a horizontal strip. A pan gesture lets the user drag
 * between items; on release the carousel snaps to the nearest item with a
 * spring animation. An imperative ref API lets callers programmatically
 * navigate to any item.
 *
 * ### Imperative API
 * ```tsx
 * const ref = useRef<NeoPopCarouselRef>(null);
 * ref.current?.scrollToIndex(2);
 * ref.current?.goNext();
 * ref.current?.goPrev();
 * ```
 *
 * @param data - Array of ReactNode items to display
 * @param itemWidth - Width of each item in logical pixels (default: 280)
 * @param itemSpacing - Gap between items in logical pixels (default: 16)
 * @param showDots - Render pagination dot indicators (default: true)
 * @param initialIndex - Index to start at (default: 0)
 * @param onIndexChange - Called when the active index changes
 * @param colorConfig - Color overrides for dots
 * @param colorMode - 'dark' | 'light' for theme-based defaults
 * @param style - Additional style for the outer container
 */
export const NeoPopCarousel = forwardRef<NeoPopCarouselRef, NeoPopCarouselProps>(
  function NeoPopCarousel(
    {
      data,
      itemWidth = 280,
      itemSpacing = 16,
      showDots = true,
      initialIndex = 0,
      onIndexChange,
      colorConfig,
      colorMode: _colorMode,
      style,
    }: NeoPopCarouselProps,
    ref,
  ) {
    // ── Color defaults ────────────────────────────────────────────────────────
    const dotColor = colorConfig?.dotColor ?? '#555555';
    const activeDotColor = colorConfig?.activeDotColor ?? '#ffffff';

    // ── State ─────────────────────────────────────────────────────────────────
    const count = data.length;
    const clampIndex = useCallback(
      (i: number) => Math.max(0, Math.min(count - 1, i)),
      [count],
    );

    const [currentIndex, setCurrentIndex] = useState(() => clampIndex(initialIndex));

    /** Pixel offset for item at `index`. */
    const offsetForIndex = useCallback(
      (index: number) => index * (itemWidth + itemSpacing),
      [itemWidth, itemSpacing],
    );

    // translateX = -offsetForIndex(currentIndex) when fully settled
    const translateX = useSharedValue(-offsetForIndex(clampIndex(initialIndex)));

    // ── JS-thread index update ────────────────────────────────────────────────
    const updateIndex = useCallback(
      (index: number) => {
        setCurrentIndex(index);
        onIndexChange?.(index);
      },
      [onIndexChange],
    );

    // ── Snap to index helper (works from both UI and JS threads) ──────────────
    const snapTo = useCallback(
      (index: number, animated: boolean = true) => {
        const clamped = clampIndex(index);
        const target = -offsetForIndex(clamped);
        if (animated) {
          translateX.value = withSpring(target, SNAP_SPRING);
        } else {
          translateX.value = target;
        }
        runOnJS(updateIndex)(clamped);
      },
      [clampIndex, offsetForIndex, translateX, updateIndex],
    );

    // ── Imperative API ────────────────────────────────────────────────────────
    useImperativeHandle(
      ref,
      () => ({
        scrollToIndex: (index: number, animated?: boolean) => {
          snapTo(index, animated !== false);
        },
        goNext: () => {
          snapTo(currentIndex + 1);
        },
        goPrev: () => {
          snapTo(currentIndex - 1);
        },
      }),
      [snapTo, currentIndex],
    );

    // ── Pan gesture ───────────────────────────────────────────────────────────
    const startX = useSharedValue(0);

    const panGesture = Gesture.Pan()
      .onBegin(() => {
        startX.value = translateX.value;
      })
      .onUpdate((e) => {
        translateX.value = startX.value + e.translationX;
      })
      .onEnd((e) => {
        // Velocity-aware snap: bias toward the swipe direction
        const stride = itemWidth + itemSpacing;
        const rawOffset = -(translateX.value);
        const velocityBias = -e.velocityX * 0.15;
        const biasedOffset = rawOffset + velocityBias;

        const nearestIndex = clampIndex(Math.round(biasedOffset / stride));
        runOnJS(snapTo)(nearestIndex);
      });

    // ── Animated style ────────────────────────────────────────────────────────
    const stripAnimStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }));

    return (
      <View style={[styles.container, style]}>
        {/* Clipping container */}
        <GestureHandlerRootView style={[styles.clipArea, { width: itemWidth }]}>
          <GestureDetector gesture={panGesture}>
            {/* Horizontal strip of items */}
            <Animated.View style={[styles.strip, stripAnimStyle]}>
              {data.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.itemWrapper,
                    {
                      width: itemWidth,
                      marginRight: index < count - 1 ? itemSpacing : 0,
                    },
                  ]}
                >
                  {item}
                </View>
              ))}
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>

        {/* Pagination dots */}
        {showDots && count > 1 && (
          <View style={styles.dotsRow} accessibilityRole="tablist">
            {data.map((_item, index) => {
              const isActive = index === currentIndex;
              return (
                <View
                  key={index}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  accessibilityLabel={`Slide ${index + 1} of ${count}`}
                  style={[
                    styles.dot,
                    {
                      backgroundColor: isActive ? activeDotColor : dotColor,
                      width: isActive ? 20 : 8,
                    },
                  ]}
                />
              );
            })}
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  clipArea: {
    overflow: 'hidden',
  },
  strip: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  itemWrapper: {
    overflow: 'hidden',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
