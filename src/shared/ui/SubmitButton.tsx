import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isLoading?: boolean;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, isLoading, className}) => (
  <motion.button
    type="submit"
    disabled={isLoading}
    whileHover={!isLoading ? { scale: 1.01, y: -1 } : {}}
    whileTap={!isLoading ? { scale: 0.98 } : {}}
    className={cn(
      "flex items-center justify-center rounded-lg bg-brand-primary text-white px-4 py-2 w-full",
      isLoading ? "cursor-not-allowed opacity-70" : "hover:bg-brand-primary/90",
      className
    )}
  >
    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
    {label}
  </motion.button>
);

export default SubmitButton;