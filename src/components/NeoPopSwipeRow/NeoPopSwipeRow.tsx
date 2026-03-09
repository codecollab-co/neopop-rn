import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import type { NeoPopSwipeRowProps } from './NeoPopSwipeRow.types';

/** Maximum reveal distance in pixels for action panels. */
const MAX_REVEAL = 100;

/** Spring config for snap-back animation. */
const SNAP_SPRING = { damping: 20, stiffness: 300 };

/**
 * A swipeable list row with configurable left and right action panels.
 *
 * Swipe right to reveal `leftActions`; swipe left to reveal `rightActions`.
 * If the swipe exceeds the threshold (default 60 px), the corresponding
 * callback fires and the panel stays open. Otherwise the row springs back
 * to the closed position.
 *
 * @param children - The main row content rendered on top of the action panels
 * @param leftActions - Content revealed when the user swipes right
 * @param rightActions - Content revealed when the user swipes left
 * @param leftThreshold - Translation needed to trigger `onSwipeRight` (default: 60)
 * @param rightThreshold - Translation needed to trigger `onSwipeLeft` (default: 60)
 * @param onSwipeLeft - Called when a left-swipe exceeds `rightThreshold`
 * @param onSwipeRight - Called when a right-swipe exceeds `leftThreshold`
 * @param colorConfig - Color overrides for the component
 * @param colorMode - 'dark' | 'light' for theme-based defaults
 * @param rowHeight - Height of the row in logical pixels (default: 64)
 * @param style - Additional style for the outer container
 */
export function NeoPopSwipeRow({
  children,
  leftActions,
  rightActions,
  leftThreshold = 60,
  rightThreshold = 60,
  onSwipeLeft,
  onSwipeRight,
  colorConfig,
  colorMode: _colorMode,
  rowHeight = 64,
  style,
}: NeoPopSwipeRowProps) {
  // ── Color defaults ──────────────────────────────────────────────────────────
  const bgColor = colorConfig?.background ?? 'transparent';
  const leftBg = colorConfig?.leftActionBackground ?? '#06C270';
  const rightBg = colorConfig?.rightActionBackground ?? '#E84545';

  // ── Shared value for horizontal translation ─────────────────────────────────
  const translateX = useSharedValue(0);

  // ── JS-thread callbacks ─────────────────────────────────────────────────────
  const fireSwipeLeft = useCallback(() => {
    onSwipeLeft?.();
  }, [onSwipeLeft]);

  const fireSwipeRight = useCallback(() => {
    onSwipeRight?.();
  }, [onSwipeRight]);

  // ── Pan gesture ─────────────────────────────────────────────────────────────
  const startX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = translateX.value;
    })
    .onUpdate((e) => {
      const raw = startX.value + e.translationX;
      // Clamp to [-MAX_REVEAL, MAX_REVEAL]
      translateX.value = Math.max(-MAX_REVEAL, Math.min(MAX_REVEAL, raw));
    })
    .onEnd((e) => {
      const tx = e.translationX;

      if (tx > leftThreshold) {
        // Swiped right enough — keep open at MAX_REVEAL and fire callback
        translateX.value = withSpring(MAX_REVEAL, SNAP_SPRING);
        runOnJS(fireSwipeRight)();
      } else if (tx < -rightThreshold) {
        // Swiped left enough — keep open at -MAX_REVEAL and fire callback
        translateX.value = withSpring(-MAX_REVEAL, SNAP_SPRING);
        runOnJS(fireSwipeLeft)();
      } else {
        // Not enough — spring back to closed
        translateX.value = withSpring(0, SNAP_SPRING);
      }
    });

  // ── Animated style for the main row ────────────────────────────────────────
  const rowAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={[styles.wrapper, { height: rowHeight }, style]}>
      {/* Left action panel */}
      {leftActions != null && (
        <View
          style={[
            styles.actionPanel,
            styles.leftPanel,
            { backgroundColor: leftBg, width: MAX_REVEAL, height: rowHeight },
          ]}
          accessibilityLabel="Swipe right actions"
        >
          {leftActions}
        </View>
      )}

      {/* Right action panel */}
      {rightActions != null && (
        <View
          style={[
            styles.actionPanel,
            styles.rightPanel,
            { backgroundColor: rightBg, width: MAX_REVEAL, height: rowHeight },
          ]}
          accessibilityLabel="Swipe left actions"
        >
          {rightActions}
        </View>
      )}

      {/* Main row content — sits on top and slides with gesture */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[styles.row, { backgroundColor: bgColor, height: rowHeight }, rowAnimStyle]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
  },
  actionPanel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftPanel: {
    left: 0,
  },
  rightPanel: {
    right: 0,
  },
  row: {
    width: '100%',
    justifyContent: 'center',
  },
});
