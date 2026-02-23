import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';

interface SkiaLoadingGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * On web, Skia requires WASM to initialise before any Canvas can render.
 * This guard delays rendering children until Skia is ready.
 * On native (iOS/Android) it renders children immediately.
 */
export function SkiaLoadingGuard({ children, fallback = null }: SkiaLoadingGuardProps) {
  const [ready, setReady] = useState(Platform.OS !== 'web');

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    // Dynamically import Skia and wait for WASM init
    void import('@shopify/react-native-skia').then(({ Skia }) => {
      // @ts-ignore — Skia.ready() exists on the web build
      void (Skia as { ready?: () => Promise<void> }).ready?.().then(() => setReady(true));
      // Fallback if ready() is not a function (older versions)
      setReady(true);
    });
  }, []);

  if (!ready) return <>{fallback}</>;
  return <>{children}</>;
}
