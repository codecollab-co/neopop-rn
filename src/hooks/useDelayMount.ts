import { useState, useEffect } from 'react';

/**
 * Delays rendering of a component by a given duration.
 * Useful for preventing layout jank during enter animations.
 *
 * @param delay - Milliseconds to wait before returning true (default: 0)
 * @returns boolean — false until delay has elapsed, then true
 *
 * @example
 * const shouldRender = useDelayMount(300);
 * if (!shouldRender) return null;
 * return <AnimatedContent />;
 */
export function useDelayMount(delay: number = 0): boolean {
  const [ready, setReady] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) return;
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return ready;
}
