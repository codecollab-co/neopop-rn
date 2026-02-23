import React, { createContext, useContext, useMemo } from 'react';
import type { ThemeConfig, ColorMode, NeoPopContextValue } from './types';
import { defaultDarkTheme } from './defaultDarkTheme';
import { defaultLightTheme } from './defaultLightTheme';
import { mergeDeep } from '../utils/helpers';

const NeoPopContext = createContext<NeoPopContextValue>(defaultDarkTheme);

export interface NeoPopProviderProps {
  children: React.ReactNode;
  /** Global color mode — overridden per-component via colorMode prop */
  colorMode?: ColorMode;
  /** Partial theme overrides — deep-merged with the default theme */
  theme?: Partial<ThemeConfig>;
}

/**
 * Wrap your app (or screen) with NeoPopProvider to set global
 * color mode and theme defaults for all neopop-rn components.
 *
 * @example
 * ```tsx
 * <NeoPopProvider colorMode="dark">
 *   <App />
 * </NeoPopProvider>
 * ```
 */
export function NeoPopProvider({ children, colorMode = 'dark', theme }: NeoPopProviderProps) {
  const base = colorMode === 'dark' ? defaultDarkTheme : defaultLightTheme;

  const resolved = useMemo<NeoPopContextValue>(
    () => mergeDeep({ ...base }, theme ?? {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colorMode, theme],
  );

  return <NeoPopContext.Provider value={resolved}>{children}</NeoPopContext.Provider>;
}

/**
 * Access the current NeoPop theme from any component inside NeoPopProvider.
 */
export function useNeoPopTheme(): NeoPopContextValue {
  return useContext(NeoPopContext);
}
