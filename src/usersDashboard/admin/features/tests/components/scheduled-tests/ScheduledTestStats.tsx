import type { ScheduledTest } from "../../types";

interface Props {
  scheduledTests: ScheduledTest[];
}

export default function ScheduledTestStats({ scheduledTests }: Props) {
  const total    = scheduledTests.length;
  const upcoming = scheduledTests.filter((t) => t.status === "upcoming").length;
  const past     = scheduledTests.filter((t) => t.status === "past").length;

  const stats = [
    { label: "Total Scheduled", count: total,    style: "bg-blue-50  text-blue-700  border-blue-100"  },
    { label: "Upcoming",        count: upcoming, style: "bg-green-50 text-green-700 border-green-100" },
    { label: "Past",            count: past,     style: "bg-gray-100 text-gray-600  border-gray-200"  },
  ];

  return (
    <div className="flex items-center gap-3">
      {stats.map(({ label, count, style }) => (
        <div
          key={label}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${style}`}
        >
          <span className="text-base font-bold">{count}</span>
          {label}
        </div>
      ))}
    </div>
  );
}