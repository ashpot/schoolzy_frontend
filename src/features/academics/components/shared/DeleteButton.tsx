import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteButtonProps {
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onConfirm, isLoading }) => {
  const [confirm, setConfirm] = useState(false);

  if (confirm) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-1"
        >
          <button
            onClick={() => { onConfirm(); setConfirm(false); }}
            disabled={isLoading}
            className="text-[10px] font-semibold text-white bg-danger px-2 py-0.5 rounded-md disabled:opacity-50"
          >
            Yes
          </button>
          <button
            onClick={() => setConfirm(false)}
            className="text-[10px] font-semibold text-text-secondary border border-border-line02 px-2 py-0.5 rounded-md hover:bg-bg-soft"
          >
            No
          </button>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      className="p-1.5 rounded-lg text-danger/60 hover:text-danger hover:bg-red-50 transition-colors"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
};

export default DeleteButton;