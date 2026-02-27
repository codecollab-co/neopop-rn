import React, { useState, useEffect, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Chevron } from '../icons/Chevron';
import type { NeoPopAccordionProps } from './NeoPopAccordion.types';

const SPRING_CONFIG = { damping: 18, stiffness: 260 };

/**
 * Collapsible accordion section.
 *
 * Can be controlled (`isExpanded` + `onToggle`) or uncontrolled
 * (`defaultExpanded`). The body animates with a spring on expand/collapse;
 * the chevron rotates 180° to indicate state.
 *
 * @param title - Header title text
 * @param children - Body content
 * @param isExpanded - Controlled expand state
 * @param onToggle - Called with next boolean when header is pressed
 * @param defaultExpanded - Initial state for uncontrolled mode
 */
export function NeoPopAccordion({
  title,
  children,
  isExpanded: isExpandedProp,
  onToggle,
  defaultExpanded = false,
  colorConfig,
  style,
  headerStyle,
  titleStyle,
  bodyStyle,
  rightElement,
}: NeoPopAccordionProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = isExpandedProp !== undefined;
  const expanded = isControlled ? isExpandedProp : internalExpanded;

  const bodyHeight = useSharedValue(0);
  const chevronRotation = useSharedValue(expanded ? 180 : 0);
  const bodyOpacity = useSharedValue(expanded ? 1 : 0);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    if (measuredHeight === 0) return;
    chevronRotation.value = withTiming(expanded ? 180 : 0, { duration: 250 });
    bodyOpacity.value = withTiming(expanded ? 1 : 0, { duration: 200 });
    bodyHeight.value = withSpring(expanded ? measuredHeight : 0, SPRING_CONFIG);
  }, [expanded, measuredHeight, bodyHeight, chevronRotation, bodyOpacity]);

  const handlePress = useCallback(() => {
    const next = !expanded;
    if (!isControlled) setInternalExpanded(next);
    onToggle?.(next);
  }, [expanded, isControlled, onToggle]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${chevronRotation.value}deg` }],
  }));

  const bodyContainerStyle = useAnimatedStyle(() => ({
    height: bodyHeight.value,
    opacity: bodyOpacity.value,
    overflow: 'hidden',
  }));

  const headerBg = colorConfig?.headerBackground ?? '#1C1C1C';
  const titleColor = colorConfig?.headerTextColor ?? '#ffffff';
  const chevronColor = colorConfig?.chevronColor ?? '#ffffff';
  const bodyBg = colorConfig?.bodyBackground ?? '#161616';
  const edgeColor = colorConfig?.edgeColor ?? '#3D3D3D';

  return (
    <View style={[styles.container, style]}>
      {/* Header */}
      <Pressable
        onPress={handlePress}
        style={[styles.header, { backgroundColor: headerBg, borderBottomColor: edgeColor }, headerStyle]}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={title}
      >
        <Text style={[styles.title, { color: titleColor }, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.headerRight}>
          {rightElement}
          <Animated.View style={chevronStyle}>
            <Chevron direction="south" size={16} color={chevronColor} strokeWidth={2} />
          </Animated.View>
        </View>
      </Pressable>

      {/* Body — measured in a hidden layer first, then animated */}
      <Animated.View style={bodyContainerStyle}>
        <View style={[styles.body, { backgroundColor: bodyBg }, bodyStyle]}>
          {children}
        </View>
      </Animated.View>

      {/* Hidden measurement view */}
      <View
        style={styles.measurer}
        onLayout={(e) => {
          const h = e.nativeEvent.layout.height;
          if (h > 0 && h !== measuredHeight) {
            setMeasuredHeight(h);
            // Set immediately if already expanded on mount
            if (expanded) bodyHeight.value = h;
          }
        }}
        pointerEvents="none"
      >
        <View style={[styles.body, { backgroundColor: bodyBg }, bodyStyle]}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
    marginRight: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  measurer: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
});
