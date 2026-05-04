import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";

const GenderBadge: React.FC<{ gender: "Male" | "Female" }> = ({ gender }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.25, ease: "backOut" }}
    className={cn(
      "inline-flex px-2.5 py-0.5 rounded-full text-xs font-lato font-medium",
      gender === "Female"
        ? "bg-pink-50 text-pink-500 border border-pink-100"
        : "bg-sky-50 text-sky-500 border border-sky-100"
    )}
  >
    {gender}
  </motion.span>
);

export default GenderBadge;