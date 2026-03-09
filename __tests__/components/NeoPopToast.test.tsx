import React from 'react';
import { Text } from 'react-native';
import { render, act } from '@testing-library/react-native';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('@shopify/react-native-skia', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => children,
  Path: () => null,
  Skia: {
    Path: { Make: () => ({ moveTo: jest.fn(), lineTo: jest.fn() }) },
    Paint: () => ({ setColor: jest.fn(), setStyle: jest.fn() }),
    Color: (c: string) => c,
    Matrix: () => ({ identity: jest.fn(), translate: jest.fn(), rotate: jest.fn() }),
  },
}));

jest.mock('expo-haptics', () => ({}), { virtual: true });

jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    GestureDetector: ({ children }: { children: React.ReactNode }) => children,
    Gesture: {
      Pan: () => ({
        onChange: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
      }),
    },
    GestureHandlerRootView: View,
  };
});

import { NeoPopToast } from '../../src/components/NeoPopToast/NeoPopToast';
import { ToastProvider } from '../../src/components/NeoPopToast/ToastProvider';
import { useToastContext } from '../../src/components/NeoPopToast/ToastProvider';

// Helper to consume ToastProvider via a test component
function ToastTrigger({ onReady }: { onReady: (ctx: ReturnType<typeof useToastContext>) => void }) {
  const ctx = useToastContext();
  React.useEffect(() => { onReady(ctx); }, [ctx, onReady]);
  return null;
}

describe('NeoPopToast (standalone)', () => {
  it('renders visible toast with message', () => {
    const { getByText } = render(
      <NeoPopToast visible message="Hello Toast" />,
    );
    expect(getByText('Hello Toast')).toBeTruthy();
  });

  it('renders description when provided', () => {
    const { getByText } = render(
      <NeoPopToast visible message="Title" description="Subtitle" />,
    );
    expect(getByText('Subtitle')).toBeTruthy();
  });

  it('renders with type="success"', () => {
    const { getByText } = render(
      <NeoPopToast visible message="Success" type="success" />,
    );
    expect(getByText('Success')).toBeTruthy();
  });

  it('renders with type="error"', () => {
    const { getByText } = render(
      <NeoPopToast visible message="Error" type="error" />,
    );
    expect(getByText('Error')).toBeTruthy();
  });

  it('renders with type="warning"', () => {
    const { getByText } = render(
      <NeoPopToast visible message="Warning" type="warning" />,
    );
    expect(getByText('Warning')).toBeTruthy();
  });

  it('renders icon slot when icon is provided', () => {
    const { getByText } = render(
      <NeoPopToast visible message="With Icon" icon={<Text>★</Text>} />,
    );
    expect(getByText('★')).toBeTruthy();
  });

  it('has accessibilityLiveRegion="polite"', () => {
    const { UNSAFE_getByProps } = render(
      <NeoPopToast visible message="Live Region" />,
    );
    const el = UNSAFE_getByProps({ accessibilityRole: 'alert' });
    expect(el.props.accessibilityLiveRegion).toBe('polite');
  });

  it('has accessibilityRole="alert"', () => {
    const { UNSAFE_getByProps } = render(
      <NeoPopToast visible message="Alert" />,
    );
    expect(UNSAFE_getByProps({ accessibilityRole: 'alert' })).toBeTruthy();
  });
});

describe('ToastProvider', () => {
  it('renders children without crashing', () => {
    const { getByText } = render(
      <ToastProvider>
        <Text>App Content</Text>
      </ToastProvider>,
    );
    expect(getByText('App Content')).toBeTruthy();
  });

  it('addToast enqueues a toast and removeToast clears it', () => {
    let ctx: ReturnType<typeof useToastContext> | null = null;
    render(
      <ToastProvider>
        <ToastTrigger onReady={(c) => { ctx = c; }} />
      </ToastProvider>,
    );

    act(() => {
      ctx!.addToast({ message: 'Hello', duration: 0 });
    });
    expect(ctx!.toasts).toHaveLength(1);
    expect(ctx!.toasts[0]?.message).toBe('Hello');

    act(() => {
      ctx!.removeToast(ctx!.toasts[0]!.id);
    });
    expect(ctx!.toasts).toHaveLength(0);
  });

  it('removeAll clears all toasts', () => {
    let ctx: ReturnType<typeof useToastContext> | null = null;
    render(
      <ToastProvider>
        <ToastTrigger onReady={(c) => { ctx = c; }} />
      </ToastProvider>,
    );

    act(() => {
      ctx!.addToast({ message: 'One', duration: 0 });
      ctx!.addToast({ message: 'Two', duration: 0 });
    });
    expect(ctx!.toasts).toHaveLength(2);

    act(() => { ctx!.removeAll(); });
    expect(ctx!.toasts).toHaveLength(0);
  });

  it('respects maxToasts limit', () => {
    let ctx: ReturnType<typeof useToastContext> | null = null;
    render(
      <ToastProvider maxToasts={2}>
        <ToastTrigger onReady={(c) => { ctx = c; }} />
      </ToastProvider>,
    );

    act(() => {
      ctx!.addToast({ message: 'A', duration: 0 });
      ctx!.addToast({ message: 'B', duration: 0 });
      ctx!.addToast({ message: 'C', duration: 0 });
    });
    expect(ctx!.toasts).toHaveLength(2);
  });

  it('throws when useToastContext is used outside ToastProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      render(<ToastTrigger onReady={jest.fn()} />);
    }).toThrow('useToastContext must be used within a <ToastProvider>');
    spy.mockRestore();
  });
});
