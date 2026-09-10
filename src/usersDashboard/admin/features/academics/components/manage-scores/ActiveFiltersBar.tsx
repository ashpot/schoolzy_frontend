import React from "react";

interface ActiveFiltersBarProps {
  filters: { label: string }[];
}

const ActiveFiltersBar: React.FC<ActiveFiltersBarProps> = ({ filters }) => (
  <div className="flex items-center gap-2 flex-wrap">
    {filters.map((f) => (
      <span key={f.label} className="px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-medium">
        {f.label}
      </span>
    ))}
  </div>
);

export default ActiveFiltersBar;