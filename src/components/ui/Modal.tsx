import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  description?: string;
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

const Modal = ({ children, description, isOpen, onClose, title }: ModalProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    document.body.classList.add("modal-open");

    const focusTarget =
      containerRef.current?.querySelector<HTMLElement>(
        "input, textarea, select, button",
      ) ?? containerRef.current;

    focusTarget?.focus();

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,24,39,0.45)] p-4">
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-[28px] bg-white p-6 shadow-[0_40px_80px_rgba(17,24,39,0.28)] outline-none"
        onKeyDown={handleKeyDown}
        ref={containerRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="m-0 text-2xl font-bold text-[var(--color-ink-900)]" id={titleId}>
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-sm text-[var(--color-ink-700)]" id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>

          <button
            aria-label="Close dialog"
            className="rounded-full border border-[var(--color-ink-200)] p-2 text-[var(--color-ink-700)] transition hover:bg-[var(--color-ink-50)]"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body,
  );
};

export { Modal };
