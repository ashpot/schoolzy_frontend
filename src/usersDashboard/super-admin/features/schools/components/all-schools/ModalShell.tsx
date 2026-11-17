import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { backdropVariant, modalVariant } from "../../animations/variants";

interface ModalShellProps {
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  widthClass?: string;
  closeOnBackdrop?: boolean;
}

// Portal'd to <body> so animated parents (transforms) can never trap the fixed overlay.
export default function ModalShell({
  onClose,
  labelledBy,
  children,
  widthClass = "max-w-lg",
  closeOnBackdrop = true,
}: ModalShellProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeRef.current();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        variants={backdropVariant}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-0 bg-sa-overlay backdrop-blur-sm"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        variants={modalVariant}
        initial="hidden"
        animate="show"
        exit="exit"
        className={cn(
          "relative max-h-[90vh] w-full overflow-y-auto rounded-3xl bg-white shadow-2xl outline-none",
          widthClass
        )}
      >
        {children}
      </motion.div>
    </div>,
    document.body
  );
}