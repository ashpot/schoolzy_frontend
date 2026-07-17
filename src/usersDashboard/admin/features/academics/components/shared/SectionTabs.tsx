import React from "react";
import type { SchoolSection } from "../../types";
import { SECTIONS } from "../../types";

interface SectionTabsProps {
  active: SchoolSection | "All";
  onChange: (section: SchoolSection | "All") => void;
}

const tabs: (SchoolSection | "All")[] = ["All", ...SECTIONS];

const SectionTabs: React.FC<SectionTabsProps> = ({ active, onChange }) => (
  <div className="flex items-center gap-2 flex-wrap">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onChange(tab)}
        className={`px-3 py-1 rounded-full text-xs font-normal font-lato transition-all duration-150 ${
          active === tab
            ? "bg-brand-primary text-white"
            : "bg-white border border-border-line02 text-text-secondary hover:bg-bg-soft"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default SectionTabs;