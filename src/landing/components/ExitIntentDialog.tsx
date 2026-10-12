import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/shared/ui/Button";
import { modalVariant } from "../animations/variants";
interface Props {
  onDemo: () => void;
  onClose: () => void;
}

export default function ExitIntentDialog({ onDemo, onClose }: Props) {
  // Escape to close + lock body scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        variants={modalVariant}
        initial="hidden"
        animate="show"
        exit="exit"
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-center"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-soft transition-colors"
        >
          <X size={18} />
        </button>

        <h2 id="exit-intent-title" className="text-2xl sm:text-3xl font-bold text-brand-primary mt-2">
          Wait! Before you go...
        </h2>
        <p className="text-text-secondary mt-3">
          Get a <strong className="text-text-primary">free personalised demo</strong> of
          Schoolzy and see how it automates your school's daily operations.
        </p>

        <Button onClick={onDemo} className="w-full mt-6 rounded-full text-xl font-lato uppercase" size="lg" variant="primary">
          Get Free Demo
        </Button>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 text-sm text-text-muted underline hover:text-text-secondary transition-colors"
        >
          No thanks, I'll manage manually
        </button>
      </motion.div>
    </div>
  );
}