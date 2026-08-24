import React from "react";

interface SectionBadgeProps {
  section: string;
}

const COLOR_PALETTE = [
  "text-pink-500 bg-pink-50",
  "text-violet-500 bg-violet-50",
  "text-emerald-600 bg-emerald-50",
  "text-orange-500 bg-orange-50",
  "text-blue-600 bg-blue-50",
  "text-amber-600 bg-amber-50",
];

function sectionColor(section: string) {
  const code = section.charCodeAt(0) || 0;
  return COLOR_PALETTE[code % COLOR_PALETTE.length];
}

const SectionBadge: React.FC<SectionBadgeProps> = ({ section }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold font-lato ${sectionColor(section)}`}
  >
    {section}
  </span>
);

export default SectionBadge;