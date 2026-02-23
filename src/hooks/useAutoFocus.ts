import { useEffect, useRef } from 'react';
import type { TextInput } from 'react-native';

/**
 * Automatically focuses a TextInput after an optional delay.
 *
 * @param enabled - Whether auto-focus is active (default: true)
 * @param delay - Milliseconds to wait before focusing (default: 100)
 * @returns ref to attach to a TextInput
 *
 * @example
 * const ref = useAutoFocus();
 * return <TextInput ref={ref} />;
 */
export function useAutoFocus(enabled: boolean = true, delay: number = 100) {
  const ref = useRef<TextInput>(null);

  useEffect(() => {
    if (!enabled) return;
    const timer = setTimeout(() => {
      ref.current?.focus();
    }, delay);
    return () => clearTimeout(timer);
  }, [enabled, delay]);

  return ref;
}
