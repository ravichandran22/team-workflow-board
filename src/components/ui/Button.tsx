import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isActive?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-brand-600)] text-white shadow-[0_16px_32px_rgba(20,93,160,0.22)] hover:bg-[var(--color-brand-700)]",
  secondary:
    "bg-white text-[var(--color-ink-900)] border border-[var(--color-ink-200)] hover:border-[var(--color-brand-500)] hover:text-[var(--color-brand-700)]",
  destructive:
    "bg-[var(--color-rose-500)] text-white shadow-[0_14px_26px_rgba(190,75,73,0.2)] hover:brightness-95",
  ghost:
    "bg-transparent text-[var(--color-ink-700)] hover:bg-white hover:text-[var(--color-ink-900)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3.5 text-sm",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-5 text-base",
};

const Button = ({
  children,
  className,
  isActive = false,
  size = "md",
  type = "button",
  variant = "secondary",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        isActive &&
          "border-[var(--color-brand-500)] bg-[var(--color-brand-100)] text-[var(--color-brand-700)]",
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
