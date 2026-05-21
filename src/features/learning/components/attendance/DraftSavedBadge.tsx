// src/components/attendance/DraftSavedBadge.tsx
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function DraftSavedBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-xs font-medium text-green-700"
    >
      <CheckCircle2 className="w-3.5 h-3.5" />
      Draft auto-saved
    </motion.div>
  );
}