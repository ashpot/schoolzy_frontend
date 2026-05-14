import React from "react";
import type { SchoolSection } from "../../types";

interface SectionBadgeProps {
  section: SchoolSection;
}

const styles: Record<SchoolSection, string> = {
  Nursery: "text-pink-500 bg-pink-50",
  Primary: "text-violet-500 bg-violet-50",
  "Junior Secondary": "text-emerald-600 bg-emerald-50",
  "Senior Secondary": "text-orange-500 bg-orange-50",
};

const shortLabels: Record<SchoolSection, string> = {
  Nursery: "Nursery",
  Primary: "Primary",
  "Junior Secondary": "Jnr Sec",
  "Senior Secondary": "Snr Sec",
};

const SectionBadge: React.FC<SectionBadgeProps> = ({ section }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold font-lato ${styles[section]}`}
  >
    {shortLabels[section]}
  </span>
);

export default SectionBadge;