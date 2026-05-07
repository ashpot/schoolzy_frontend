import React from "react";
import { cn } from "@/shared/utils/cn";

const SectionBadge: React.FC<{ section: string }> = ({ section }) => (
  <span
    className={cn(
      "inline-flex px-2 py-0.5 rounded-full text-xs font-lato font-medium transition-colors",
      section === "Jnr Sec"
        ? "bg-[#E9F9EF] text-success"
        : "bg-[#FFF7ED] text-[#C2410C]"
    )}
  >
    {section}
  </span>
);

export default SectionBadge;