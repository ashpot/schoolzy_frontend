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
        ? "bg-[#FDF2F8] text-female"
        : "bg-[#E8F3FB] text-brand-primary",
    )}
  >
    {gender}
  </motion.span>
);

export default GenderBadge;