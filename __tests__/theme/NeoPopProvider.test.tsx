import React from 'react';
import { render, renderHook } from '@testing-library/react-native';
import { Text } from 'react-native';
import {
  NeoPopProvider,
  useNeoPopTheme,
} from '../../src/theme/NeoPopProvider';
import { defaultDarkTheme } from '../../src/theme/defaultDarkTheme';
import { defaultLightTheme } from '../../src/theme/defaultLightTheme';

// ─── defaultDarkTheme sanity ──────────────────────────────────────────────────

describe('defaultDarkTheme', () => {
  it('has colorMode: "dark"', () => {
    expect(defaultDarkTheme.colorMode).toBe('dark');
  });

  it('has button key', () => {
    expect(defaultDarkTheme).toHaveProperty('button');
  });

  it('has card key', () => {
    expect(defaultDarkTheme).toHaveProperty('card');
  });

  it('has checkbox key', () => {
    expect(defaultDarkTheme).toHaveProperty('checkbox');
  });

  it('has toggle key', () => {
    expect(defaultDarkTheme).toHaveProperty('toggle');
  });
});

// ─── defaultLightTheme sanity ─────────────────────────────────────────────────

describe('defaultLightTheme', () => {
  it('has colorMode: "light"', () => {
    expect(defaultLightTheme.colorMode).toBe('light');
  });

  it('has button key', () => {
    expect(defaultLightTheme).toHaveProperty('button');
  });

  it('has card key', () => {
    expect(defaultLightTheme).toHaveProperty('card');
  });

  it('has checkbox key', () => {
    expect(defaultLightTheme).toHaveProperty('checkbox');
  });

  it('has toggle key', () => {
    expect(defaultLightTheme).toHaveProperty('toggle');
  });
});

// ─── useNeoPopTheme outside Provider ─────────────────────────────────────────

describe('useNeoPopTheme outside Provider', () => {
  it('returns the defaultDarkTheme (context default value)', () => {
    const { result } = renderHook(() => useNeoPopTheme());
    expect(result.current.colorMode).toBe(defaultDarkTheme.colorMode);
    expect(result.current.colors).toEqual(defaultDarkTheme.colors);
  });
});

// ─── NeoPopProvider with colorMode="dark" ────────────────────────────────────

describe('NeoPopProvider with colorMode="dark"', () => {
  it('provides dark theme values via useNeoPopTheme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <NeoPopProvider colorMode="dark">{children}</NeoPopProvider>
    );
    const { result } = renderHook(() => useNeoPopTheme(), { wrapper });
    expect(result.current.colorMode).toBe('dark');
    expect(result.current.colors?.background).toBe(defaultDarkTheme.colors?.background);
  });
});

// ─── NeoPopProvider with colorMode="light" ───────────────────────────────────

describe('NeoPopProvider with colorMode="light"', () => {
  it('provides light theme values via useNeoPopTheme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <NeoPopProvider colorMode="light">{children}</NeoPopProvider>
    );
    const { result } = renderHook(() => useNeoPopTheme(), { wrapper });
    expect(result.current.colorMode).toBe('light');
    expect(result.current.colors?.background).toBe(defaultLightTheme.colors?.background);
  });
});

// ─── Partial theme override deep-merges ──────────────────────────────────────

describe('NeoPopProvider partial theme override', () => {
  it('deep-merges overrides — only changed keys differ from the base', () => {
    const customButtonColor = '#aabbcc';
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <NeoPopProvider
        colorMode="dark"
        theme={{ button: { color: customButtonColor } }}
      >
        {children}
      </NeoPopProvider>
    );

    const { result } = renderHook(() => useNeoPopTheme(), { wrapper });

    // The overridden key should reflect our custom value.
    expect(result.current.button?.color).toBe(customButtonColor);

    // Sibling keys that were NOT overridden should retain dark-theme defaults.
    expect(result.current.button?.borderColor).toBe(
      defaultDarkTheme.button?.borderColor,
    );
    // Completely unrelated sections should also stay intact.
    expect(result.current.card?.color).toBe(defaultDarkTheme.card?.color);
  });
});

// ─── Renders children ─────────────────────────────────────────────────────────

describe('NeoPopProvider renders children', () => {
  it('renders child components without crashing', () => {
    const { getByText } = render(
      <NeoPopProvider colorMode="dark">
        <Text>Hello NeoPop</Text>
      </NeoPopProvider>,
    );
    expect(getByText('Hello NeoPop')).toBeTruthy();
  });
});
