import { renderHook, act } from '@testing-library/react-native';
import { useDelayMount } from '../../src/hooks/useDelayMount';

describe('useDelayMount', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns true immediately when delay=0', () => {
    const { result } = renderHook(() => useDelayMount(0));
    expect(result.current).toBe(true);
  });

  it('returns true immediately when no delay argument is given (default 0)', () => {
    const { result } = renderHook(() => useDelayMount());
    expect(result.current).toBe(true);
  });

  it('returns false initially when delay > 0', () => {
    const { result } = renderHook(() => useDelayMount(300));
    expect(result.current).toBe(false);
  });

  it('returns true after the specified delay has elapsed', () => {
    const { result } = renderHook(() => useDelayMount(300));
    expect(result.current).toBe(false);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe(true);
  });

  it('does not return true before the delay has elapsed', () => {
    const { result } = renderHook(() => useDelayMount(500));

    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(result.current).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe(true);
  });

  it('clears the timer on unmount (ready stays false after unmount)', () => {
    const { result, unmount } = renderHook(() => useDelayMount(300));
    expect(result.current).toBe(false);

    // Unmount before timer fires
    unmount();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // After unmount the hook result should not have changed to true
    expect(result.current).toBe(false);
  });
});
