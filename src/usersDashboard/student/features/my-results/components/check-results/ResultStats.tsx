import { TrendingUp, Award, CheckCircle2, XCircle } from "lucide-react";
import type { ResultSheet } from "../../types";

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}

export default function ResultStats({ result }: { result: ResultSheet }) {
  const passed = result.subjects.filter((s) => s.grade !== "F").length;
  const failed = result.subjects.length - passed;

  const stats = [
    { icon: TrendingUp, value: `${result.overallAverage}%`, label: "Overall Average", tone: "text-brand-primary bg-blue-50" },
    { icon: Award, value: ordinal(result.classPosition), label: "Class Position", tone: "text-amber-600 bg-amber-50" },
    { icon: CheckCircle2, value: passed, label: "Subjects Passed", tone: "text-green-600 bg-green-50" },
    { icon: XCircle, value: failed, label: "Subjects Failed", tone: "text-danger bg-red-50" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ icon: Icon, value, label, tone }) => (
        <div key={label} className="bg-white rounded-2xl card-shadow p-4 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex-center ${tone}`}>
            <Icon size={18} />
          </div>
          <div>
            <p className="card-number">{value}</p>
            <p className="text-body-small text-text-secondary">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}