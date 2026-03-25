import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type BadgeTone = "neutral" | "info" | "success" | "warning" | "danger";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-[var(--color-ink-100)] text-[var(--color-ink-700)]",
  info: "bg-[var(--color-brand-100)] text-[var(--color-brand-700)]",
  success: "bg-[var(--color-lime-100)] text-[var(--color-lime-500)]",
  warning: "bg-[var(--color-amber-100)] text-[var(--color-amber-500)]",
  danger: "bg-[var(--color-rose-100)] text-[var(--color-rose-500)]",
};

const Badge = ({ children, tone = "neutral" }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.02em]",
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
};

export { Badge };
