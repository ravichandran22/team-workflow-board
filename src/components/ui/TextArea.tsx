import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, hasError = false, rows = 5, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[var(--color-ink-900)] shadow-sm outline-none transition placeholder:text-[var(--color-ink-500)] focus:border-[var(--color-brand-500)] focus:ring-2 focus:ring-[rgba(27,119,204,0.18)]",
          hasError ? "border-[var(--color-rose-500)]" : "border-[var(--color-ink-200)]",
          className,
        )}
        ref={ref}
        rows={rows}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";

export { TextArea };
