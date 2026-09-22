import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { modalVariant } from "../../animations/variants";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  itemLabel: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  itemLabel,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            variants={modalVariant}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
          >
            <div className="w-12 h-12 rounded-full bg-danger/10 flex-center mx-auto mb-4">
              <AlertTriangle size={22} className="text-danger" />
            </div>
            <h2 className="section-title text-center">Delete {itemLabel}?</h2>
            <p className="text-body-small text-text-secondary text-center mt-2 mb-6">
              This action cannot be undone. This will permanently remove{" "}
              <span className="font-medium text-text-primary">{itemLabel}</span> from the system.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-lg border border-border-line02 text-text-secondary text-sm font-medium hover:bg-bg-soft transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-lg bg-danger text-white text-sm font-medium hover:bg-danger/90 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}