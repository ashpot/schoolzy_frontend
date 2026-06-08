import { BarChart2 } from "lucide-react";
import type { ViewScore } from "../../types";

interface Props { scores: ViewScore[]; }

const GRADES = ["A", "B", "C", "D", "E", "F"];

const gradeColors: Record<string, string> = {
  A: "bg-blue-50   text-blue-700   border-blue-200",
  B: "bg-green-50  text-green-700  border-green-200",
  C: "bg-yellow-50 text-yellow-700 border-yellow-200",
  D: "bg-amber-50  text-amber-700  border-amber-200",
  E: "bg-orange-50 text-orange-700 border-orange-200",
  F: "bg-red-50    text-red-700    border-red-200",
};

export default function GradeDistribution({ scores }: Props) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 size={16} className="text-brand-primary" />
        <h2 className="section-title">Grade Distribution</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {GRADES.map((g) => {
          const count = scores.filter((s) => s.grade === g).length;
          const pct   = Math.round((count / scores.length) * 100);
          return (
            <div key={g} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${gradeColors[g]}`}>
              <span className="text-xl font-bold">{g}</span>
              <div>
                <p className="text-sm font-semibold leading-tight">{count}</p>
                <p className="text-xs opacity-70">{pct}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}