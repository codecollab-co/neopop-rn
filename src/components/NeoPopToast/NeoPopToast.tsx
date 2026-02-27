import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { NeoPopToastProps, ToastType } from './NeoPopToast.types';

const TYPE_COLORS: Record<ToastType, { background: string; color: string }> = {
  success: { background: '#06C270', color: '#ffffff' },
  error:   { background: '#EE4D37', color: '#ffffff' },
  warning: { background: '#F7B500', color: '#0d0d0d' },
  custom:  { background: '#1C1C1C', color: '#ffffff' },
};

const SWIPE_DISMISS_THRESHOLD = 60;
const SPRING_CONFIG = { damping: 20, stiffness: 300 };

/**
 * A single toast notification rendered by `ToastProvider`.
 *
 * Animates in from the bottom with a spring, can be swiped down to dismiss,
 * and auto-dismisses after `duration` ms (handled by `ToastProvider`).
 *
 * @param visible - Whether the toast is currently shown
 * @param message - Primary text content
 * @param description - Optional secondary text below the message
 * @param type - Semantic type controlling default colors
 * @param icon - Optional icon node rendered to the left of the text
 * @param onPress - Optional tap handler on the whole toast
 * @param onDismiss - Called after the toast finishes hiding
 * @param onHide - Internal callback from ToastProvider to remove from state
 */
export function NeoPopToast({
  visible,
  message,
  description,
  type = 'custom',
  icon,
  onPress,
  onDismiss,
  onHide,
  style,
  textStyle,
}: NeoPopToastProps) {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);
  const swipeY = useSharedValue(0);

  const handleHide = () => {
    if (onHide) onHide();
    if (onDismiss) onDismiss();
  };

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, SPRING_CONFIG);
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      translateY.value = withSpring(100, SPRING_CONFIG);
      opacity.value = withTiming(0, { duration: 150 });
    }
  }, [visible, translateY, opacity]);

  const dismiss = () => {
    translateY.value = withSpring(120, SPRING_CONFIG);
    opacity.value = withTiming(0, { duration: 150 }, () => {
      runOnJS(handleHide)();
    });
  };

  const panGesture = Gesture.Pan()
    .onChange((e) => {
      if (e.translationY > 0) swipeY.value = e.translationY;
    })
    .onEnd((e) => {
      if (e.translationY > SWIPE_DISMISS_THRESHOLD) {
        runOnJS(dismiss)();
      } else {
        swipeY.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value + swipeY.value }],
    opacity: opacity.value,
  }));

  const colors = TYPE_COLORS[type] ?? TYPE_COLORS.custom;

  const content = (
    <View
      style={[styles.container, { backgroundColor: colors.background }, style]}
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
    >
      {icon ? <View style={styles.iconSlot}>{icon}</View> : null}
      <View style={styles.textBlock}>
        <Text style={[styles.message, { color: colors.color }, textStyle]}>
          {message}
        </Text>
        {description ? (
          <Text style={[styles.description, { color: colors.color }]}>
            {description}
          </Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        {onPress ? (
          <Pressable onPress={onPress}>{content}</Pressable>
        ) : (
          content
        )}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
    zIndex: 9999,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  iconSlot: {
    marginRight: 12,
  },
  textBlock: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    marginTop: 2,
    opacity: 0.85,
    lineHeight: 16,
  },
});
