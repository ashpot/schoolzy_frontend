import type { ScheduledTest } from "../../types";

export type ScheduledStatusFilter = "all" | "upcoming" | "past";

interface Props {
  scheduledTests: ScheduledTest[];
  activeFilter: ScheduledStatusFilter;
  onFilterChange: (filter: ScheduledStatusFilter) => void;
}

export default function ScheduledTestStats({ scheduledTests, activeFilter, onFilterChange }: Props) {
  const total    = scheduledTests.length;
  const upcoming = scheduledTests.filter((t) => t.status === "upcoming").length;
  const past     = scheduledTests.filter((t) => t.status === "past").length;

  const stats: { key: ScheduledStatusFilter; label: string; count: number; style: string }[] = [
    { key: "all",      label: "Total Scheduled", count: total,    style: "bg-blue-50  text-blue-700  border-blue-100"  },
    { key: "upcoming", label: "Upcoming",        count: upcoming, style: "bg-green-50 text-green-700 border-green-100" },
    { key: "past",     label: "Past",            count: past,     style: "bg-gray-100 text-gray-600  border-gray-200"  },
  ];

  return (
    <div className="flex items-center gap-3">
      {stats.map(({ key, label, count, style }) => {
        const isActive = activeFilter === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onFilterChange(key)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${style} ${
              isActive ? "ring-2 ring-offset-1 ring-brand-primary/40" : "opacity-70 hover:opacity-100"
            }`}
          >
            <span className="text-base font-bold">{count}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}