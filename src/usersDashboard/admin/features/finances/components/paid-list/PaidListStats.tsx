import { Users, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { formatNaira } from "../../utils/feeUtils";
import type { PaidListEntry } from "../../types";

interface PaidListStatsProps {
  entries: PaidListEntry[];
}

export default function PaidListStats({ entries }: PaidListStatsProps) {
  const totalCollected  = entries.reduce((s, e) => s + e.amountPaid, 0);
  const totalOutstanding = entries.reduce((s, e) => s + Math.max(0, e.totalFeeAmount - e.amountPaid), 0);
  const fullyPaid       = entries.filter((e) => e.amountPaid >= e.totalFeeAmount).length;

  const stats = [
    {
      icon: Users,
      value: entries.length,
      label: "Records Found",
      bg: "bg-blue-50",
      iconColor: "text-blue-500",
      valueColor: "text-blue-700",
    },
    {
      icon: TrendingUp,
      value: formatNaira(totalCollected),
      label: "Total Collected",
      bg: "bg-green-50",
      iconColor: "text-green-500",
      valueColor: "text-green-700",
    },
    {
      icon: AlertCircle,
      value: formatNaira(totalOutstanding),
      label: "Outstanding",
      bg: "bg-red-50",
      iconColor: "text-red-500",
      valueColor: "text-red-600",
    },
    {
      icon: CheckCircle,
      value: `${fullyPaid} / ${entries.length}`,
      label: "Fully Paid",
      bg: "bg-green-50",
      iconColor: "text-green-500",
      valueColor: "text-green-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className={`${s.bg} rounded-2xl p-4 flex items-center gap-3`}>
          <div className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center shrink-0">
            <s.icon size={18} className={s.iconColor} />
          </div>
          <div>
            <p className={`text-lg font-bold leading-tight ${s.valueColor}`}>{s.value}</p>
            <p className="text-xs text-text-muted mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}