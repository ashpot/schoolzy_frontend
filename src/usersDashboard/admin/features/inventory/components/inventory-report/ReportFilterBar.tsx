import { ChevronDown, RefreshCw } from "lucide-react";
import type { ReportPeriod } from "../../types";
import Button from "@/shared/ui/Button";

const PERIOD_OPTIONS: { value: ReportPeriod; label: string }[] = [
  { value: "current_week", label: "This Week" },
  { value: "current_month", label: "This Month" },
  { value: "current_year", label: "This Year" },
  { value: "lifetime", label: "Lifetime" },
];

interface Props {
  period: ReportPeriod;
  onPeriodChange: (v: ReportPeriod) => void;
  onRefresh: () => void;
  isFetching: boolean;
}

export default function ReportFilterBar({ period, onPeriodChange, onRefresh, isFetching }: Props) {
  const activeLabel = PERIOD_OPTIONS.find((o) => o.value === period)?.label ?? "This Month";

  return (
    <div className="bg-white rounded-2xl card-shadow p-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value as ReportPeriod)}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm rounded-xl border border-border-line02 bg-bg-input text-text-primary focus:outline-none focus:border-brand-primary cursor-pointer font-medium"
          >
            {PERIOD_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>

        <Button variant="primary" leftIcon={<RefreshCw size={16} />} onClick={onRefresh} size="md" isLoading={isFetching}>
          Refresh
        </Button>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs text-text-muted">Showing:</span>
        <span className="text-xs font-medium bg-blue-50 text-brand-primary px-2.5 py-1 rounded-full border border-blue-100">
          {activeLabel}
        </span>
      </div>
    </div>
  );
}