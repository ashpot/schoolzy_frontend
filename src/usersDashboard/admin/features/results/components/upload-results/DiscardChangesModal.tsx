import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Button from "@/shared/ui/Button";
import { modalVariant } from "../../../users/animations/variants";

interface DiscardChangesModalProps {
  count: number;
  onKeep: () => void;
  onDiscard: () => void;
}

export default function DiscardChangesModal({ count, onKeep, onDiscard }: DiscardChangesModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onKeep}
      />
      <motion.div
        variants={modalVariant} initial="hidden" animate="show" exit="exit"
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
      >
        <div className="w-11 h-11 rounded-xl bg-amber-50 flex-center mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        <h2 className="text-base font-semibold text-text-primary">Discard unsaved scores?</h2>
        <p className="text-sm text-text-secondary mt-1.5">
          You have {count} unsaved {count === 1 ? "change" : "changes"}. Changing the setup will discard them.
        </p>
        <div className="flex gap-3 mt-6">
          <Button variant="outline" size="md" className="flex-1" onClick={onKeep}>Keep entering</Button>
          <Button variant="destructive" size="md" className="flex-1" onClick={onDiscard}>Discard &amp; change</Button>
        </div>
      </motion.div>
    </div>
  );
}