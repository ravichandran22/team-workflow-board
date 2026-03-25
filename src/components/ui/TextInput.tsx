import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, hasError = false, ...props }, ref) => {
    return (
      <input
        className={cn(
          "min-h-11 w-full rounded-2xl border bg-white px-4 text-sm text-[var(--color-ink-900)] shadow-sm outline-none transition placeholder:text-[var(--color-ink-500)] focus:border-[var(--color-brand-500)] focus:ring-2 focus:ring-[rgba(27,119,204,0.18)]",
          hasError ? "border-[var(--color-rose-500)]" : "border-[var(--color-ink-200)]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

TextInput.displayName = "TextInput";

export { TextInput };
