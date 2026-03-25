import { useContext } from "react";
import { ToastContext } from "./toastContext";

const useToast = () => {
  const value = useContext(ToastContext);

  if (!value) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return value;
};

export { useToast };
