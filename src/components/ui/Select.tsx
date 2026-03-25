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
          "min-h-11 w-full rounded-2xl border bg-white px-4 text-sm text-[var(--color-ink-900)] shadow-sm outline-none transition focus:border-[var(--color-brand-500)] focus:ring-2 focus:ring-[rgba(27,119,204,0.18)]",
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
