import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ToastConfig, ToastProviderProps } from './NeoPopToast.types';
import { NeoPopToast } from './NeoPopToast';

/** Internal shape stored in state — extends ToastConfig with runtime id + visibility flag. */
interface ToastItem extends ToastConfig {
  id: string;
  visible: boolean;
}

/** Context shape exposed to consumers via useToastContext(). */
interface ToastContextValue {
  toasts: ToastItem[];
  /** Enqueue a new toast; returns its auto-generated or caller-supplied id. */
  addToast: (config: ToastConfig) => string;
  /** Remove a specific toast by id. */
  removeToast: (id: string) => void;
  /** Dismiss all active toasts at once. */
  removeAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/** Monotonically increasing counter for auto-generated toast ids. */
let toastCounter = 0;

/**
 * Provides a toast queue to its subtree.
 *
 * Wrap your app (or screen) with `ToastProvider`, then call `useToast()`
 * from any descendant to enqueue and dismiss toasts.
 *
 * @param maxToasts - Maximum number of toasts shown simultaneously (default: 3)
 * @param defaultDuration - Auto-dismiss duration in ms; 0 = manual only (default: 3000)
 * @param position - Vertical anchor for the toast stack (default: 'bottom')
 * @param offset - Distance from the screen edge in px (default: 32)
 */
export function ToastProvider({
  children,
  maxToasts = 3,
  defaultDuration = 3000,
  position: _position = 'bottom',
  offset: _offset = 32,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const removeAll = useCallback(() => {
    setToasts([]);
  }, []);

  const addToast = useCallback(
    (config: ToastConfig): string => {
      const id = config.id ?? `toast-${++toastCounter}`;
      const duration = config.duration ?? defaultDuration;

      setToasts((prev) => {
        const next = [...prev, { ...config, id, visible: true }];
        return next.slice(-maxToasts);
      });

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }

      return id;
    },
    [defaultDuration, maxToasts, removeToast],
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, removeAll }}>
      {children}
      {toasts.map((toast) => (
        <NeoPopToast
          key={toast.id}
          {...toast}
          visible={toast.visible}
          onHide={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
}

/**
 * Returns the raw toast context value (toasts array + add/remove helpers).
 * Prefer the higher-level `useToast()` hook from `NeoPopToast/index` which
 * exposes only the `showToast` / `hideToast` / `hideAll` API.
 *
 * @throws if called outside a `<ToastProvider>`.
 */
export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToastContext must be used within a <ToastProvider>');
  }
  return ctx;
}
