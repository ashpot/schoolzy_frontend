import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { backdropVariant, drawerVariant } from "../../animations/variants";

interface SideDrawerProps {
  title: string;
  subtitle: string;
  titleId: string;
  onClose: () => void;
  children: ReactNode;
  footer: ReactNode;
}

// Portal'd to <body> so animated parents can never trap the fixed overlay.
export default function SideDrawer({ title, subtitle, titleId, onClose, children, footer }: SideDrawerProps) {
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      // A confirm modal opened from the drawer gets Escape first
      if (e.key === "Escape" && document.querySelectorAll('[role="dialog"]').length <= 1) closeRef.current();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50">
      <motion.div
        variants={backdropVariant}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-0 bg-sa-overlay backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <motion.aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        variants={drawerVariant}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col bg-white shadow-2xl outline-none"
      >
        <header className="flex items-start justify-between gap-4 border-b border-border-line02 px-8 py-6">
          <div>
            <h2 id={titleId} className="font-jakarta text-xl font-semibold text-text-primary">{title}</h2>
            <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-2 text-text-muted hover:bg-sa-gray-soft hover:text-text-primary">
            <X size={20} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">{children}</div>
        <footer className="space-y-3 border-t border-border-line02 px-8 py-6">{footer}</footer>
      </motion.aside>
    </div>,
    document.body
  );
}