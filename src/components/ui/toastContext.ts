import { createContext } from "react";

type ToastTone = "info" | "success" | "warning";

interface ToastPayload {
  description?: string;
  title: string;
  tone: ToastTone;
}

interface ToastItem extends ToastPayload {
  id: string;
}

interface ToastContextValue {
  pushToast: (toast: ToastPayload) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export type { ToastItem, ToastPayload, ToastTone };
export { ToastContext };
