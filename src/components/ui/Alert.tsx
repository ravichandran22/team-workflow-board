import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type AlertTone = "info" | "success" | "warning" | "error";

interface AlertProps {
  description?: ReactNode;
  title: string;
  tone?: AlertTone;
}

const toneClasses: Record<AlertTone, string> = {
  info: "border-sky-200 bg-sky-50 text-sky-900",
  success: "border-lime-200 bg-lime-50 text-lime-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  error: "border-rose-200 bg-rose-50 text-rose-900",
};

const Alert = ({ description, title, tone = "info" }: AlertProps) => {
  return (
    <div className={cn("rounded-3xl border px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]", toneClasses[tone])}>
      <p className="m-0 text-sm font-semibold tracking-[0.01em]">{title}</p>
      {description ? <div className="mt-1.5 text-sm leading-6">{description}</div> : null}
    </div>
  );
};

export { Alert };
