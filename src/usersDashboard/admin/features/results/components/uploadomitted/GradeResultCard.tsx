import { CheckCircle2 } from "lucide-react";

interface Props {
  grade:    string;
  score:    number;
  maxScore: number;
}

const gradeRemarks: Record<string, string> = {
  A: "Excellent",
  B: "Good",
  C: "Average",
  D: "Below Average",
  F: "Fail",
};

const gradeColors: Record<string, { card: string; badge: string; check: string }> = {
  A: { card: "bg-green-50 border-green-200",   badge: "bg-green-100 text-green-700",   check: "text-green-500"  },
  B: { card: "bg-blue-50 border-blue-200",     badge: "bg-blue-100 text-blue-700",     check: "text-blue-500"   },
  C: { card: "bg-yellow-50 border-yellow-200", badge: "bg-yellow-100 text-yellow-700", check: "text-yellow-500" },
  D: { card: "bg-amber-50 border-amber-200",   badge: "bg-amber-100 text-amber-700",   check: "text-amber-500"  },
  F: { card: "bg-red-50 border-red-200",       badge: "bg-red-100 text-red-700",       check: "text-red-500"    },
};

export default function GradeResultCard({ grade, score, maxScore }: Props) {
  const pct    = maxScore > 0 ? ((score / maxScore) * 100).toFixed(1) : "0.0";
  const colors = gradeColors[grade] ?? gradeColors["F"];

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border ${colors.card}`}>
      <div className="flex items-center gap-4">
        <span className={`w-12 h-12 rounded-full flex-center text-xl font-bold shrink-0 ${colors.badge}`}>
          {grade}
        </span>
        <div>
          <p className="font-semibold text-text-primary">{gradeRemarks[grade] ?? "—"}</p>
          <p className="text-sm text-text-secondary mt-0.5">
            Score: <span className="font-medium">{score} / {maxScore}</span>
            {" · "}
            Percentage: <span className="font-medium">{pct}%</span>
          </p>
        </div>
      </div>
      <CheckCircle2 size={22} className={colors.check} />
    </div>
  );
}