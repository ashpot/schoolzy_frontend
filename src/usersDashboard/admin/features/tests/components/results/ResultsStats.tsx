import { BarChart2, TrendingUp } from "lucide-react";
import type { TestResult } from "../../types";

interface Props {
  results: TestResult[];
}

export default function ResultsStats({ results }: Props) {
  const total    = results.length;
  const avgScore = total > 0
    ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / total)
    : 0;
  const passing = results.filter((r) => r.score >= 50).length;
  const failing = results.filter((r) => r.score <  50).length;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-blue-50 text-blue-700 text-sm font-medium">
        <BarChart2 className="w-4 h-4" />
        <span className="font-bold">{total}</span>
        Total Results
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-100 bg-green-50 text-sm font-medium">
        <TrendingUp className="w-4 h-4 text-green-600" />
        <span className="font-bold text-green-600">{avgScore}%</span>
        <span className="text-green-700">Average Score</span>
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-100 bg-green-50 text-green-700 text-sm font-medium">
        <span className="font-bold">{passing}</span>
        Passing (≥50%)
      </div>

      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${
        failing > 0
          ? "border-red-200 bg-red-50 text-red-600"
          : "border-red-100 bg-red-50 text-red-400"
      }`}>
        <span className="font-bold">{failing}</span>
        Failing
      </div>
    </div>
  );
}