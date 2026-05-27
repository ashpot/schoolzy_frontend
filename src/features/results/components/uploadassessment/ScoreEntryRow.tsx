import { motion } from "framer-motion";
import type { Student } from "../../types";
import { rowVariant } from "../../animations/variants";

interface Props {
  index:               number;
  student:             Student;
  score:               number | "";
  maxScore:            number;
  assessmentTypeLabel: string;
  onScoreChange: (studentId: string, value: number | "") => void;
}

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",   "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",     "bg-indigo-100 text-indigo-700",
];

const avatarColor = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const getInitials = (name: string) => name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

const computeGrade = (score: number, maxScore: number): string => {
  const pct = (score / maxScore) * 100;
  if (pct >= 75) return "A";
  if (pct >= 65) return "B";
  if (pct >= 55) return "C";
  if (pct >= 40) return "D";
  return "F";
};

const gradeStyles: Record<string, string> = {
  A: "border border-blue-200   bg-blue-50   text-blue-700",
  B: "border border-green-200  bg-green-50  text-green-700",
  C: "border border-yellow-200 bg-yellow-50 text-yellow-700",
  D: "border border-amber-200  bg-amber-50  text-amber-700",
  F: "border border-red-200    bg-red-50    text-red-700",
};

export default function ScoreEntryRow({
  index, student, score, maxScore, assessmentTypeLabel, onScoreChange,
}: Props) {
  const grade = typeof score === "number" ? computeGrade(score, maxScore) : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") { onScoreChange(student.id, ""); return; }
    const num = Number(raw);
    if (!isNaN(num) && num >= 0 && num <= maxScore) onScoreChange(student.id, num);
  };

  return (
    <motion.tr variants={rowVariant} className="border-b border-border-line02 hover:bg-gray-50/50">
      <td className="py-3.5 px-4 text-sm text-text-muted">{index + 1}</td>

      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex-center text-sm font-semibold shrink-0 ${avatarColor(student.name)}`}>
            {getInitials(student.name)}
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary leading-tight">{student.name}</p>
            <p className="text-xs text-text-muted">{student.studentId}</p>
          </div>
        </div>
      </td>

      <td className="py-3.5 px-4">
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
          {assessmentTypeLabel}
        </span>
      </td>

      <td className="py-3.5 px-4">
        <input
          type="number"
          min={0}
          max={maxScore}
          value={score}
          onChange={handleChange}
          placeholder="—"
          className="w-24 px-3 py-1.5 text-sm text-center rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
        />
      </td>

      <td className="py-3.5 px-4">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
          {maxScore}
        </span>
      </td>

      <td className="py-3.5 px-4">
        {grade ? (
          <span className={`w-8 h-8 rounded-full flex-center text-xs font-bold ${gradeStyles[grade]}`}>
            {grade}
          </span>
        ) : (
          <span className="w-8 h-8 rounded-full flex-center text-xs text-text-muted bg-gray-50 border border-gray-100">
            —
          </span>
        )}
      </td>
    </motion.tr>
  );
}