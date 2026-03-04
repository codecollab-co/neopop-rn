import { renderHook, act } from '@testing-library/react-native';
import { useAutoFocus } from '../../src/hooks/useAutoFocus';

describe('useAutoFocus', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('calls ref.current.focus() after the default 100ms when enabled=true', () => {
    const { result } = renderHook(() => useAutoFocus(true));
    const focusMock = jest.fn();
    // Simulate attaching the ref to a TextInput-like object
    (result.current as { current: { focus: jest.Mock } | null }).current = {
      focus: focusMock,
    };

    // Before the timer fires, focus should not have been called
    expect(focusMock).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(focusMock).toHaveBeenCalledTimes(1);
  });

  it('does not call focus() when enabled=false', () => {
    const { result } = renderHook(() => useAutoFocus(false));
    const focusMock = jest.fn();
    (result.current as { current: { focus: jest.Mock } | null }).current = {
      focus: focusMock,
    };

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(focusMock).not.toHaveBeenCalled();
  });

  it('respects a custom delay of 500ms — does not focus before delay', () => {
    const { result } = renderHook(() => useAutoFocus(true, 500));
    const focusMock = jest.fn();
    (result.current as { current: { focus: jest.Mock } | null }).current = {
      focus: focusMock,
    };

    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(focusMock).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(focusMock).toHaveBeenCalledTimes(1);
  });

  it('clears the timer on unmount (focus not called after unmount)', () => {
    const { result, unmount } = renderHook(() => useAutoFocus(true, 200));
    const focusMock = jest.fn();
    (result.current as { current: { focus: jest.Mock } | null }).current = {
      focus: focusMock,
    };

    // Unmount before timer fires
    unmount();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(focusMock).not.toHaveBeenCalled();
  });

  it('returns a ref object', () => {
    const { result } = renderHook(() => useAutoFocus());
    expect(result.current).toHaveProperty('current');
  });
});
