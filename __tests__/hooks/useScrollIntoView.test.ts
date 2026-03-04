import { renderHook } from '@testing-library/react-native';
import { useScrollIntoView } from '../../src/hooks/useScrollIntoView';

describe('useScrollIntoView', () => {
  it('returns an object with scrollViewRef, targetRef, and scrollIntoView keys', () => {
    const { result } = renderHook(() => useScrollIntoView());
    expect(result.current).toHaveProperty('scrollViewRef');
    expect(result.current).toHaveProperty('targetRef');
    expect(result.current).toHaveProperty('scrollIntoView');
  });

  it('scrollViewRef is a React ref (has a current property)', () => {
    const { result } = renderHook(() => useScrollIntoView());
    expect(result.current.scrollViewRef).toHaveProperty('current');
  });

  it('targetRef is a React ref (has a current property)', () => {
    const { result } = renderHook(() => useScrollIntoView());
    expect(result.current.targetRef).toHaveProperty('current');
  });

  it('scrollIntoView is a function', () => {
    const { result } = renderHook(() => useScrollIntoView());
    expect(typeof result.current.scrollIntoView).toBe('function');
  });

  it('calling scrollIntoView when refs are null does not throw', () => {
    const { result } = renderHook(() => useScrollIntoView());
    // Both refs start as null — calling should be a no-op
    expect(() => result.current.scrollIntoView()).not.toThrow();
  });

  it('returns a stable scrollIntoView reference across renders (useCallback)', () => {
    const { result, rerender } = renderHook(() => useScrollIntoView());
    const first = result.current.scrollIntoView;
    rerender({});
    expect(result.current.scrollIntoView).toBe(first);
  });
});
