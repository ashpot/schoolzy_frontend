import React from "react";
import { motion } from "framer-motion";

interface SummaryPlaceholderProps {
  icon: React.ReactNode;
  title: string;
  text: React.ReactNode;
}

export default function SummaryPlaceholder({ icon, title, text }: SummaryPlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center justify-center text-center"
    >
      <div className="w-20 h-20 rounded-full bg-blue-50 flex-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-text-nav mb-2">{title}</h3>
      <p className="text-sm text-text-muted max-w-md">{text}</p>
    </motion.div>
  );
}