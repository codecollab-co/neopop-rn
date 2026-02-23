import { useCallback } from 'react';
import { useToastContext } from './ToastProvider';
import type { ToastConfig, UseToastReturn } from './NeoPopToast.types';

/**
 * useToast — hook to imperatively show / hide toasts.
 *
 * Must be called inside a <ToastProvider> tree.
 */
export function useToast(): UseToastReturn {
  const { addToast, removeToast, removeAll } = useToastContext();

  const showToast = useCallback(
    (config: ToastConfig): string => addToast(config),
    [addToast],
  );

  const hideToast = useCallback(
    (id: string) => removeToast(id),
    [removeToast],
  );

  const hideAll = useCallback(() => removeAll(), [removeAll]);

  return { showToast, hideToast, hideAll };
}
