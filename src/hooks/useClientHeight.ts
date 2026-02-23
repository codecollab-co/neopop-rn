import { useState, useCallback } from 'react';
import type { LayoutChangeEvent } from 'react-native';

/**
 * Measures and tracks the height of a component via onLayout.
 *
 * @returns [height, onLayout] — attach onLayout to a View
 *
 * @example
 * const [height, onLayout] = useClientHeight();
 * return <View onLayout={onLayout}>{children}</View>;
 */
export function useClientHeight(): [number, (event: LayoutChangeEvent) => void] {
  const [height, setHeight] = useState(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setHeight(event.nativeEvent.layout.height);
  }, []);

  return [height, onLayout];
}
