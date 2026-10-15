import React from "react";
import { useSectionsList } from "../../hooks/useAcademics";

interface SectionTabsProps {
  active: string; // "All" or a section id as a string
  onChange: (section: string) => void;
}

const SectionTabs: React.FC<SectionTabsProps> = ({ active, onChange }) => {
  const { data: sections = [] } = useSectionsList();

  const tabs = [
    { value: "All", label: "All" },
    ...sections.map((s) => ({ value: String(s.id), label: s.title })),
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`px-3 py-1 rounded-full text-xs font-normal font-lato transition-all duration-150 ${
            active === tab.value
              ? "bg-brand-primary text-white"
              : "bg-white border border-border-line02 text-text-secondary hover:bg-bg-soft"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SectionTabs;