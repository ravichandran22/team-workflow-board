import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ToastItem, ToastTone } from "./toastContext";
import { ToastContext } from "./toastContext";

const toneClasses: Record<ToastTone, string> = {
  info: "border-sky-200 bg-white text-sky-950",
  success: "border-lime-200 bg-white text-lime-950",
  warning: "border-amber-200 bg-white text-amber-950",
};

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    if (!toasts.length) {
      return undefined;
    }

    const latest = toasts[toasts.length - 1];
    const timeout = window.setTimeout(() => removeToast(latest.id), 2800);
    return () => window.clearTimeout(timeout);
  }, [removeToast, toasts]);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-atomic="true"
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 right-5 z-[60] grid gap-3"
      >
        {toasts.map((toast) => (
          <div
            className={`pointer-events-auto min-w-[280px] max-w-sm rounded-3xl border px-4 py-3 shadow-[0_20px_48px_rgba(17,24,39,0.18)] ${toneClasses[toast.tone]}`}
            key={toast.id}
            role="status"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="m-0 text-sm font-semibold">{toast.title}</p>
                {toast.description ? (
                  <p className="mt-1 text-sm opacity-85">{toast.description}</p>
                ) : null}
              </div>
              <button
                aria-label="Dismiss notification"
                className="rounded-full px-2 py-1 text-xs font-semibold"
                onClick={() => removeToast(toast.id)}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export { ToastProvider };
