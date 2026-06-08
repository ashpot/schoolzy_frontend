import { TrendingUp, Trophy, TrendingDown, BookOpen } from "lucide-react";
import type { ViewScore } from "../../types";

interface Props { scores: ViewScore[]; }

export default function ScoreStatsRow({ scores }: Props) {
  const totals  = scores.map((s) => s.total);
  const avg     = totals.reduce((a, b) => a + b, 0) / totals.length;
  const highest = Math.max(...totals);
  const lowest  = Math.min(...totals);
  const passed  = scores.filter((s) => s.grade !== "F").length;

  const stats = [
    { label: "Class Average", value: avg.toFixed(1), sub: "out of 100",                                  icon: TrendingUp,  color: "text-blue-500",   bg: "bg-blue-50"   },
    { label: "Highest Score", value: String(highest), sub: "out of 100",                                  icon: Trophy,      color: "text-green-500",  bg: "bg-green-50"  },
    { label: "Lowest Score",  value: String(lowest),  sub: "out of 100",                                  icon: TrendingDown, color: "text-amber-500", bg: "bg-amber-50"  },
    { label: "Pass Rate",     value: `${Math.round((passed / scores.length) * 100)}%`, sub: `${passed} of ${scores.length}`, icon: BookOpen, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, sub, icon: Icon, color, bg }) => (
        <div key={label} className="bg-white rounded-2xl card-shadow p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-lg ${bg} flex-center`}>
              <Icon size={16} className={color} />
            </div>
            <p className="text-xs font-medium text-text-secondary">{label}</p>
          </div>
          <p className="card-number text-text-primary">{value}</p>
          <p className="text-xs text-text-muted mt-0.5">{sub}</p>
        </div>
      ))}
    </div>
  );
}