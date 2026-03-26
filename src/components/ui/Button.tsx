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
    "border border-[rgba(13,85,142,0.1)] bg-[linear-gradient(135deg,var(--color-brand-500),var(--color-brand-700))] text-white shadow-[0_18px_36px_rgba(22,104,171,0.26)] hover:-translate-y-px hover:shadow-[0_20px_40px_rgba(22,104,171,0.3)]",
  secondary:
    "bg-[rgba(255,255,255,0.88)] text-[var(--color-ink-900)] border border-[var(--color-ink-200)] shadow-[0_10px_24px_rgba(16,32,51,0.06)] hover:-translate-y-px hover:border-[var(--color-brand-500)] hover:text-[var(--color-brand-700)]",
  destructive:
    "border border-[rgba(192,88,78,0.14)] bg-[linear-gradient(135deg,var(--color-rose-500),#a84741)] text-white shadow-[0_16px_32px_rgba(192,88,78,0.2)] hover:-translate-y-px hover:brightness-95",
  ghost:
    "bg-transparent text-[var(--color-ink-700)] hover:bg-[rgba(255,255,255,0.8)] hover:text-[var(--color-ink-900)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3.5 text-sm",
  md: "min-h-11 px-4.5 text-sm",
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
        "inline-flex items-center justify-center rounded-2xl font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        isActive &&
          "border-[var(--color-brand-500)] bg-[var(--color-brand-100)] text-[var(--color-brand-700)] shadow-none",
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
