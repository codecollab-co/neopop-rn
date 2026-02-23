import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ToastConfig, ToastProviderProps } from './NeoPopToast.types';
import { NeoPopToast } from './NeoPopToast';

interface ToastItem extends ToastConfig {
  id: string;
  visible: boolean;
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (config: ToastConfig) => string;
  removeToast: (id: string) => void;
  removeAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

export function ToastProvider({
  children,
  maxToasts = 3,
  defaultDuration = 3000,
  position = 'bottom',
  offset = 32,
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

export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToastContext must be used within a <ToastProvider>');
  }
  return ctx;
}
