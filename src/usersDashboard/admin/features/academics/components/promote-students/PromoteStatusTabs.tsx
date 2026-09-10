import React from "react";
import type { PromotionStatus } from "../../types/promoteStudents";

export type StatusFilter = "all" | PromotionStatus;

interface PromoteStatusTabsProps {
  active: StatusFilter;
  counts: Record<StatusFilter, number>;
  onChange: (filter: StatusFilter) => void;
}

const TABS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "promoted", label: "Promoted" },
  { key: "repeated", label: "Repeated" },
];

const PromoteStatusTabs: React.FC<PromoteStatusTabsProps> = ({ active, counts, onChange }) => (
  <div className="flex items-center gap-1 bg-bg-input rounded-lg p-1 w-fit">
    {TABS.map((tab) => (
      <button
        key={tab.key}
        onClick={() => onChange(tab.key)}
        className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
          active === tab.key ? "bg-white text-brand-primary shadow-sm border border-border-line02" : "text-text-muted"
        }`}
      >
        {tab.label} {tab.key !== "all" && `(${counts[tab.key]})`}
      </button>
    ))}
  </div>
);

export default PromoteStatusTabs;