import type { ReactNode } from "react";

interface FieldProps {
  children: ReactNode;
  error?: string;
  hint?: string;
  htmlFor: string;
  label: string;
}

const Field = ({ children, error, hint, htmlFor, label }: FieldProps) => {
  return (
    <div className="stack gap-2">
      <label
        className="text-sm font-semibold text-[var(--color-ink-900)]"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
      {hint ? (
        <p className="m-0 text-xs text-[var(--color-ink-500)]">{hint}</p>
      ) : null}
      {error ? (
        <p className="m-0 text-sm font-medium text-[var(--color-rose-500)]" id={`${htmlFor}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
};

export { Field };
