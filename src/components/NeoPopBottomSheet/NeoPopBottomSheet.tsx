import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
} from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import type {
  NeoPopBottomSheetProps,
  NeoPopBottomSheetRef,
} from './NeoPopBottomSheet.types';
import { useNeoPopTheme } from '../../theme/NeoPopProvider';
import { useClientHeight } from '../../hooks/useClientHeight';
import {
  BUTTON_RELEASE_DAMPING,
  BUTTON_RELEASE_STIFFNESS,
  BUTTON_PRESS_DURATION_MS,
} from '../../primitives/buttons';

/** Fraction of sheet height dragged before auto-closing. */
const DISMISS_THRESHOLD = 0.4;

/**
 * A gesture-driven bottom sheet with an imperative ref API.
 *
 * The sheet position is controlled by a `translateY` shared value:
 *   - 0          → fully open
 *   - sheetHeight → fully closed (off-screen below)
 *
 * The overlay opacity is linked to the sheet position via `interpolate`.
 *
 * ### Imperative API (via ref)
 * ```tsx
 * const sheetRef = useRef<NeoPopBottomSheetRef>(null);
 * sheetRef.current?.open();
 * sheetRef.current?.close();
 * ```
 *
 * @param isOpen - Controlled open state (optional; use ref API for imperative control)
 * @param defaultOpen - Whether the sheet starts open (uncontrolled)
 * @param onClose - Called when the sheet begins closing
 * @param onBeforeClose - Called just before the close animation starts
 * @param onCloseEnd - Called when the close animation completes
 * @param onOpenEnd - Called when the open animation completes
 * @param maxHeight - Maximum sheet height in logical pixels (default: 400)
 * @param shouldShowNotch - Renders a drag-handle notch at the top (default: true)
 * @param shouldShowOverlay - Renders a semi-transparent backdrop (default: true)
 * @param blocking - When false, tapping the overlay closes the sheet (default: false)
 * @param sheetPlunkColor - Override for the sheet's plunk / shadow color
 * @param overlayColor - Override for the backdrop color
 * @param colorConfig - Per-token color overrides
 * @param colorMode - 'dark' | 'light' for theme-based defaults
 * @param style - Additional style for the sheet content View
 */
export const NeoPopBottomSheet = forwardRef<NeoPopBottomSheetRef, NeoPopBottomSheetProps>(
  function NeoPopBottomSheet(
    {
      children,
      isOpen,
      defaultOpen = false,
      onClose,
      onBeforeClose,
      onCloseEnd,
      onOpenEnd,
      maxHeight = 400,
      shouldShowNotch = true,
      shouldShowOverlay = true,
      blocking = false,
      overlayColor: overlayColorProp,
      colorConfig,
      colorMode: _colorMode,
      style,
    }: NeoPopBottomSheetProps,
    ref,
  ) {
    const theme = useNeoPopTheme();

    // ── Colors ──────────────────────────────────────────────────────────────
    const sheetBg =
      colorConfig?.sheetBackgroundColor ??
      (theme.bottomSheet?.background as string | undefined) ??
      '#161616';

    const notchColor =
      colorConfig?.notchColor ??
      (theme.bottomSheet?.notchColor as string | undefined) ??
      '#3D3D3D';

    const overlayColor =
      overlayColorProp ??
      colorConfig?.overlayColor ??
      (theme.bottomSheet?.overlayColor as string | undefined) ??
      'rgba(0,0,0,0.6)';

    // ── Sheet height measurement ─────────────────────────────────────────────
    const [measuredHeight, onLayout] = useClientHeight();
    const sheetHeight = measuredHeight > 0 ? measuredHeight : maxHeight;

    // ── Animation shared values ──────────────────────────────────────────────
    // translateY: 0 = open, sheetHeight = closed
    const translateY = useSharedValue(sheetHeight);
    // Whether the sheet is logically "mounted" (visible at all)
    const isVisible = useSharedValue(defaultOpen ? 1 : 0);

    // ── Open / close helpers (JS-thread safe wrappers) ──────────────────────
    const openSheet = useCallback(() => {
      isVisible.value = 1;
      translateY.value = withSpring(0, {
        damping: BUTTON_RELEASE_DAMPING,
        stiffness: BUTTON_RELEASE_STIFFNESS,
      }, (finished) => {
        if (finished && onOpenEnd) runOnJS(onOpenEnd)();
      });
    }, [translateY, isVisible, onOpenEnd]);

    const closeSheet = useCallback(() => {
      if (onBeforeClose) onBeforeClose();
      translateY.value = withTiming(sheetHeight, { duration: BUTTON_PRESS_DURATION_MS * 3 }, (finished) => {
        if (finished) {
          isVisible.value = 0;
          if (onCloseEnd) runOnJS(onCloseEnd)();
        }
      });
      if (onClose) onClose();
    }, [translateY, isVisible, sheetHeight, onClose, onBeforeClose, onCloseEnd]);

    // ── Controlled isOpen prop ───────────────────────────────────────────────
    useEffect(() => {
      if (isOpen === true) openSheet();
      else if (isOpen === false) closeSheet();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // ── Imperative ref API ───────────────────────────────────────────────────
    useImperativeHandle(ref, () => ({
      open: openSheet,
      close: closeSheet,
    }), [openSheet, closeSheet]);

    // ── Pan gesture for drag-to-dismiss ─────────────────────────────────────
    const startY = useSharedValue(0);

    const panGesture = Gesture.Pan()
      .onBegin(() => {
        startY.value = translateY.value;
      })
      .onUpdate((e) => {
        // Only allow dragging downward (positive dy)
        const newY = startY.value + Math.max(0, e.translationY);
        translateY.value = newY;
      })
      .onEnd((e) => {
        const draggedFraction = e.translationY / sheetHeight;
        if (draggedFraction > DISMISS_THRESHOLD) {
          // Dismiss the sheet
          runOnJS(closeSheet)();
        } else {
          // Snap back to open
          translateY.value = withSpring(0, {
            damping: BUTTON_RELEASE_DAMPING,
            stiffness: BUTTON_RELEASE_STIFFNESS,
          });
        }
      });

    // ── Animated styles ──────────────────────────────────────────────────────
    const sheetAnimStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const overlayAnimStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
        translateY.value,
        [0, sheetHeight],
        [1, 0],
        Extrapolation.CLAMP,
      ),
      pointerEvents: translateY.value < sheetHeight ? 'auto' : 'none',
    }));

    const visibleAnimStyle = useAnimatedStyle(() => ({
      display: isVisible.value > 0 ? 'flex' : 'none',
    }));

    return (
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.root, visibleAnimStyle]}
        pointerEvents="box-none"
      >
        {/* Backdrop overlay */}
        {shouldShowOverlay && (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: overlayColor },
              overlayAnimStyle,
            ]}
            pointerEvents={blocking ? 'none' : 'auto'}
          >
            {!blocking && (
              <Pressable style={StyleSheet.absoluteFill} onPress={closeSheet} />
            )}
          </Animated.View>
        )}

        {/* Sheet */}
        <GestureHandlerRootView style={styles.gestureRoot} pointerEvents="box-none">
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={[
                styles.sheet,
                {
                  backgroundColor: sheetBg,
                  maxHeight,
                },
                sheetAnimStyle,
              ]}
              onLayout={onLayout}
            >
              {/* Drag notch */}
              {shouldShowNotch && (
                <View style={styles.notchRow}>
                  <View style={[styles.notch, { backgroundColor: notchColor }]} />
                </View>
              )}

              {/* Content */}
              <View style={[styles.content, style]}>{children}</View>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  gestureRoot: {
    // Takes only the space the sheet needs
    width: '100%',
    ...Platform.select({ web: { cursor: 'grab' } as object }),
  },
  sheet: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  notchRow: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4,
  },
  notch: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 8,
  },
});
