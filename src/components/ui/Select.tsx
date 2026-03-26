import { forwardRef } from "react";
import type { OptionHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, hasError = false, ...props }, ref) => {
    return (
      <select
        className={cn(
          "min-h-11 w-full rounded-2xl border bg-[rgba(255,255,255,0.92)] px-4 text-sm text-[var(--color-ink-900)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none transition duration-200 focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(32,131,211,0.14)]",
          hasError ? "border-[var(--color-rose-500)]" : "border-[var(--color-ink-200)]",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  },
);

const SelectOption = (props: OptionHTMLAttributes<HTMLOptionElement>) => {
  return <option {...props} />;
};

Select.displayName = "Select";

export { Select, SelectOption };
