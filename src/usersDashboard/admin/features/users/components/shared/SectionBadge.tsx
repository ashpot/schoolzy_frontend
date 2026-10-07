import React from "react";
import { cn } from "@/shared/utils/cn";

const SectionBadge: React.FC<{ section: string | undefined}> = ({ section }) => (
  <span
    className={cn(
      "inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-lato font-medium whitespace-nowrap",
      section === "Jnr Sec"
        ? "bg-[#E9F9EF] text-success"
        : "bg-[#FFF7ED] text-[#C2410C]"
    )}
  >
    {section}
  </span>
);

export default SectionBadge;