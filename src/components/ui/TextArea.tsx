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
          "w-full rounded-2xl border bg-[rgba(255,255,255,0.92)] px-4 py-3 text-sm text-[var(--color-ink-900)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none transition duration-200 placeholder:text-[var(--color-ink-500)] focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(32,131,211,0.14)]",
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
