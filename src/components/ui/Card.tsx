import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "rounded-3xl border border-[rgba(205,214,227,0.8)] bg-white p-5 shadow-[0_18px_38px_rgba(17,24,39,0.08)]",
        className,
      )}
      {...props}
    />
  );
};

export { Card };
