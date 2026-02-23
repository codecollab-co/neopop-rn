import { useRef, useCallback } from 'react';
import type { ScrollView, View } from 'react-native';

/**
 * Scrolls a referenced element into view within a ScrollView.
 *
 * @returns { scrollViewRef, targetRef, scrollIntoView }
 *
 * @example
 * const { scrollViewRef, targetRef, scrollIntoView } = useScrollIntoView();
 *
 * return (
 *   <ScrollView ref={scrollViewRef}>
 *     <View ref={targetRef}>
 *       <TextInput onFocus={scrollIntoView} />
 *     </View>
 *   </ScrollView>
 * );
 */
export function useScrollIntoView() {
  const scrollViewRef = useRef<ScrollView>(null);
  const targetRef = useRef<View>(null);

  const scrollIntoView = useCallback(() => {
    if (!targetRef.current || !scrollViewRef.current) return;

    targetRef.current.measureLayout(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scrollViewRef.current as any,
      (_x: number, y: number) => {
        scrollViewRef.current?.scrollTo({ y: y - 16, animated: true });
      },
      () => {
        // measureLayout failed — no-op
      },
    );
  }, []);

  return { scrollViewRef, targetRef, scrollIntoView };
}
