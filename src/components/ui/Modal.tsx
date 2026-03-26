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
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = () =>
    containerRef.current
      ? Array.from(
          containerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((element) => !element.hasAttribute("disabled"))
      : [];

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("modal-open");

    const focusTarget = getFocusableElements()[0] ?? containerRef.current;
    focusTarget?.focus();

    return () => {
      document.body.classList.remove("modal-open");
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements();

    if (!focusableElements.length) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(16,32,51,0.5)] p-3 sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-[30px] border border-[rgba(255,255,255,0.7)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,248,252,0.92))] p-4 shadow-[0_40px_80px_rgba(16,32,51,0.28)] outline-none sm:p-6"
        onKeyDown={handleKeyDown}
        ref={containerRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-[rgba(223,230,240,0.9)] pb-4">
          <div>
            <h2 className="m-0 text-2xl font-bold tracking-[-0.03em] text-[var(--color-ink-900)]" id={titleId}>
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-sm leading-7 text-[var(--color-ink-700)]" id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>

          <button
            aria-label="Close dialog"
            className="rounded-full border border-[var(--color-ink-200)] bg-[rgba(255,255,255,0.7)] p-2 text-[var(--color-ink-700)] transition hover:bg-white"
            onClick={onClose}
            type="button"
          >
            X
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body,
  );
};

export { Modal };
