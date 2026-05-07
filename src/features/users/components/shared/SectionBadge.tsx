import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";

const SectionBadge: React.FC<{ section: string }> = ({ section }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.25, ease: "backOut" }}
    className={cn(
      "inline-flex px-2 py-0.5 rounded-md text-xs font-lato font-medium",
      section === "Jnr Sec"
        ? "bg-success/10 text-success"
        : "bg-warning/10 text-warning"
    )}
  >
    {section}
  </motion.span>
);

export default SectionBadge;