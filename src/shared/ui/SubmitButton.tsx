import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  label: string;
  isLoading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, isLoading }) => (
  <motion.button
    type="submit"
    disabled={isLoading}
    whileHover={!isLoading ? { scale: 1.01, y: -1 } : {}}
    whileTap={!isLoading ? { scale: 0.98 } : {}}
    className="w-full mt-2 bg-brand-primary hover:bg-brand-hover text-white font-lato font-semibold py-3 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
  >
    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
    {label}
  </motion.button>
);

export default SubmitButton;