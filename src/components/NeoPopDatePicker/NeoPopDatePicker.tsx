import React, { useState, useCallback, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  type ListRenderItemInfo,
} from 'react-native';
import type { NeoPopDatePickerProps } from './NeoPopDatePicker.types';
import { triggerHaptic } from '../../utils/haptics';

/** Height of each picker row in logical pixels. */
const ITEM_HEIGHT = 48;

/** Number of visible rows (selected item is always center). */
const VISIBLE_ITEMS = 5;

/** Short month names. */
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** Returns the number of days in the given month/year (1-based month). */
function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

/** Build an integer array from `start` to `end` (inclusive). */
function range(start: number, end: number): number[] {
  const arr: number[] = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}

// ─── Column ────────────────────────────────────────────────────────────────────

interface ColumnProps {
  items: string[];
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  textColor: string;
  selectedTextColor: string;
  selectedBackground: string;
  separatorColor: string;
  enableHaptics: boolean;
}

function PickerColumn({
  items,
  selectedIndex,
  onIndexChange,
  textColor,
  selectedTextColor,
  selectedBackground,
  separatorColor,
  enableHaptics,
}: ColumnProps) {
  const flatListRef = useRef<FlatList<string>>(null);
  const lastIndex = useRef(selectedIndex);

  // Scroll to initial position once FlatList is ready
  const handleLayout = useCallback(() => {
    flatListRef.current?.scrollToOffset({
      offset: selectedIndex * ITEM_HEIGHT,
      animated: false,
    });
  }, [selectedIndex]);

  const handleMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = e.nativeEvent.contentOffset.y;
      const index = Math.round(offset / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(items.length - 1, index));
      if (clamped !== lastIndex.current) {
        lastIndex.current = clamped;
        onIndexChange(clamped);
        if (enableHaptics) triggerHaptic('selection');
      }
    },
    [items.length, onIndexChange, enableHaptics],
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<string>) => {
      const isSelected = index === selectedIndex;
      return (
        <View
          style={[styles.itemContainer, { height: ITEM_HEIGHT }]}
          accessibilityRole="menuitem"
          accessibilityState={{ selected: isSelected }}
        >
          <Text
            style={[
              styles.itemText,
              { color: textColor },
              isSelected && {
                color: selectedTextColor,
                fontSize: 18,
                fontWeight: 'bold' as const,
              },
              !isSelected && styles.unselectedText,
            ]}
            numberOfLines={1}
          >
            {item}
          </Text>
        </View>
      );
    },
    [selectedIndex, textColor, selectedTextColor],
  );

  const columnHeight = ITEM_HEIGHT * VISIBLE_ITEMS;
  const centerOffset = ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2);

  return (
    <View style={[styles.columnWrapper, { height: columnHeight }]}>
      {/* Selected row highlight */}
      <View
        style={[
          styles.selectionHighlight,
          {
            top: centerOffset,
            height: ITEM_HEIGHT,
            backgroundColor: selectedBackground,
          },
        ]}
        pointerEvents="none"
      />

      {/* Top separator */}
      <View
        style={[
          styles.separator,
          { top: centerOffset, backgroundColor: separatorColor },
        ]}
        pointerEvents="none"
      />

      {/* Bottom separator */}
      <View
        style={[
          styles.separator,
          { top: centerOffset + ITEM_HEIGHT, backgroundColor: separatorColor },
        ]}
        pointerEvents="none"
      />

      <FlatList<string>
        ref={flatListRef}
        data={items}
        keyExtractor={(_item, index) => String(index)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onLayout={handleLayout}
        contentContainerStyle={{
          paddingTop: centerOffset,
          paddingBottom: centerOffset,
        }}
        getItemLayout={(_data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
}

// ─── NeoPopDatePicker ──────────────────────────────────────────────────────────

/**
 * A drum-roll style date picker with three scrollable columns: Day, Month, Year.
 *
 * Each column is a FlatList that snaps to `ITEM_HEIGHT` (48 px). The selected
 * row is highlighted and flanked by separator lines. Supports controlled
 * (`value` + `onDateChange`) and uncontrolled (`defaultValue`) modes.
 *
 * @param value - Controlled date value
 * @param defaultValue - Initial date for uncontrolled mode (default: today)
 * @param minDate - Earliest selectable date
 * @param maxDate - Latest selectable date
 * @param onDateChange - Called when any column changes
 * @param enableHaptics - Fires a selection haptic per scroll step (default: false)
 * @param colorConfig - Color overrides for the component
 * @param colorMode - 'dark' | 'light' for theme-based defaults
 * @param style - Additional style for the outer container
 */
export function NeoPopDatePicker({
  value: controlledValue,
  defaultValue,
  minDate,
  maxDate,
  onDateChange,
  enableHaptics = false,
  colorConfig,
  colorMode: _colorMode,
  style,
}: NeoPopDatePickerProps) {
  // ── Color defaults ──────────────────────────────────────────────────────────
  const bgColor = colorConfig?.background ?? '#1C1C1C';
  const textColor = colorConfig?.textColor ?? '#ffffff';
  const selectedTextColor = colorConfig?.selectedTextColor ?? '#ffffff';
  const selectedBg = colorConfig?.selectedBackground ?? 'rgba(255,255,255,0.1)';
  const separatorColor = colorConfig?.separatorColor ?? '#3D3D3D';

  // ── Year range ──────────────────────────────────────────────────────────────
  const currentYear = new Date().getFullYear();
  const minYear = minDate ? minDate.getFullYear() : currentYear - 100;
  const maxYear = maxDate ? maxDate.getFullYear() : currentYear + 10;

  // ── Initial date ────────────────────────────────────────────────────────────
  const isControlled = controlledValue !== undefined;
  const resolveInitialDate = (): Date => {
    const d = controlledValue ?? defaultValue ?? new Date();
    return d;
  };

  const [internalDate, setInternalDate] = useState<Date>(resolveInitialDate);
  const activeDate = isControlled ? (controlledValue ?? internalDate) : internalDate;

  const activeYear = activeDate.getFullYear();
  const activeMonth = activeDate.getMonth() + 1; // 1-based
  const activeDay = activeDate.getDate();

  // ── Column data ─────────────────────────────────────────────────────────────
  const numDays = daysInMonth(activeMonth, activeYear);
  const dayItems = range(1, numDays).map(String);
  const monthItems = MONTH_NAMES;
  const yearItems = range(minYear, maxYear).map(String);

  // ── Selected indices ────────────────────────────────────────────────────────
  const dayIndex = Math.max(0, Math.min(activeDay - 1, numDays - 1));
  const monthIndex = activeMonth - 1;
  const yearIndex = Math.max(0, activeYear - minYear);

  // ── Column change handlers ──────────────────────────────────────────────────
  const emitChange = useCallback(
    (day: number, month: number, year: number) => {
      const safeDay = Math.min(day, daysInMonth(month, year));
      const next = new Date(year, month - 1, safeDay);
      if (!isControlled) setInternalDate(next);
      onDateChange?.(next);
    },
    [isControlled, onDateChange],
  );

  const handleDayChange = useCallback(
    (index: number) => {
      emitChange(index + 1, activeMonth, activeYear);
    },
    [emitChange, activeMonth, activeYear],
  );

  const handleMonthChange = useCallback(
    (index: number) => {
      emitChange(activeDay, index + 1, activeYear);
    },
    [emitChange, activeDay, activeYear],
  );

  const handleYearChange = useCallback(
    (index: number) => {
      emitChange(activeDay, activeMonth, minYear + index);
    },
    [emitChange, activeDay, activeMonth, minYear],
  );

  const columnProps = {
    textColor,
    selectedTextColor,
    selectedBackground: selectedBg,
    separatorColor,
    enableHaptics,
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }, style]}>
      {/* Day column */}
      <PickerColumn
        items={dayItems}
        selectedIndex={dayIndex}
        onIndexChange={handleDayChange}
        {...columnProps}
      />

      {/* Month column */}
      <PickerColumn
        items={monthItems}
        selectedIndex={monthIndex}
        onIndexChange={handleMonthChange}
        {...columnProps}
      />

      {/* Year column */}
      <PickerColumn
        items={yearItems}
        selectedIndex={yearIndex}
        onIndexChange={handleYearChange}
        {...columnProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  columnWrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  selectionHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 0,
  },
  separator: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    zIndex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 14,
    textAlign: 'center',
  },
  unselectedText: {
    opacity: 0.5,
  },
});
