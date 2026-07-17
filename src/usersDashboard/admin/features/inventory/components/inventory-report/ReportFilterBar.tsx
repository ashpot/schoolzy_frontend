import { ChevronDown, RefreshCw } from "lucide-react";
import { timeRangeOptions } from "../../data/mockData";
import type { ItemType } from "../../types";
import Button from "@/shared/ui/Button";

interface Props {
  timeRange: string;
  typeFilter: string;
  itemTypes: ItemType[];
  onTimeRangeChange: (v: string) => void;
  onTypeFilterChange: (v: string) => void;
  onGenerate: () => void;
  activeLabel: string;
  activeTypeLabel: string;
}

export default function ReportFilterBar({
  timeRange, typeFilter, itemTypes,
  onTimeRangeChange, onTypeFilterChange,
  onGenerate, activeLabel, activeTypeLabel,
}: Props) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-4">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Time Range */}
        <div className="relative">
          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm rounded-xl border border-border-line02 bg-bg-input text-text-primary focus:outline-none focus:border-brand-primary cursor-pointer font-medium"
          >
            {timeRangeOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>

        {/* Item Type filter */}
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm rounded-xl border border-border-line02 bg-bg-input text-text-secondary focus:outline-none focus:border-brand-primary cursor-pointer"
          >
            <option value="">Item Type (optional)</option>
            {itemTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>

        <Button variant="primary" leftIcon={<RefreshCw size={16} />} onClick={onGenerate} size="md">
          Generate Report
        </Button>
      </div>

      {/* Active filter pills */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs text-text-muted">Showing:</span>
        <span className="text-xs font-medium bg-blue-50 text-brand-primary px-2.5 py-1 rounded-full border border-blue-100">
          {activeLabel}
        </span>
        <span className="text-xs font-medium bg-blue-50 text-brand-primary px-2.5 py-1 rounded-full border border-blue-100">
          {activeTypeLabel}
        </span>
      </div>
    </div>
  );
}