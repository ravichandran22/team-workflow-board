import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "rounded-[26px] border border-[rgba(205,214,227,0.84)] bg-[var(--color-surface-strong)] p-5 shadow-[0_14px_34px_rgba(16,32,51,0.08)]",
        className,
      )}
      {...props}
    />
  );
};

export { Card };
