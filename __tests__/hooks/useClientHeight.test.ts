import { renderHook, act } from '@testing-library/react-native';
import { useClientHeight } from '../../src/hooks/useClientHeight';
import type { LayoutChangeEvent } from 'react-native';

/** Build a minimal LayoutChangeEvent with the given height. */
function makeLayoutEvent(height: number): LayoutChangeEvent {
  return {
    nativeEvent: {
      layout: { height, width: 0, x: 0, y: 0 },
    },
  } as LayoutChangeEvent;
}

describe('useClientHeight', () => {
  it('starts with an initial height of 0', () => {
    const { result } = renderHook(() => useClientHeight());
    const [height] = result.current;
    expect(height).toBe(0);
  });

  it('returns an onLayout callback as the second element', () => {
    const { result } = renderHook(() => useClientHeight());
    const [, onLayout] = result.current;
    expect(typeof onLayout).toBe('function');
  });

  it('updates height when onLayout is called with a layout event', () => {
    const { result } = renderHook(() => useClientHeight());

    act(() => {
      const [, onLayout] = result.current;
      onLayout(makeLayoutEvent(200));
    });

    const [height] = result.current;
    expect(height).toBe(200);
  });

  it('updates height correctly on multiple successive calls', () => {
    const { result } = renderHook(() => useClientHeight());

    act(() => {
      const [, onLayout] = result.current;
      onLayout(makeLayoutEvent(100));
    });
    expect(result.current[0]).toBe(100);

    act(() => {
      const [, onLayout] = result.current;
      onLayout(makeLayoutEvent(350));
    });
    expect(result.current[0]).toBe(350);
  });

  it('returns the same onLayout reference across renders (useCallback)', () => {
    const { result, rerender } = renderHook(() => useClientHeight());
    const firstOnLayout = result.current[1];
    rerender({});
    expect(result.current[1]).toBe(firstOnLayout);
  });
});
