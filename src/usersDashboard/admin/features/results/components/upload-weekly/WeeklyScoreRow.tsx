import { motion } from "framer-motion";
import { rowVariant } from "../../animations/variants";
import { computeGrade, gradeStyles } from "../../utils/gradeUtils";
import type { Student } from "../../types";

interface Props {
  index:         number;
  student:       Student;
  score:         number | "";
  selectedWeek:  number;
  onScoreChange: (id: string, value: number | "") => void;
}

const WEEKLY_MAX  = 10;
const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",   "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",     "bg-indigo-100 text-indigo-700",
];

const avatarColor = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const getInitials = (name: string) => name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

export default function WeeklyScoreRow({ index, student, score, selectedWeek, onScoreChange }: Props) {
  const grade = typeof score === "number" ? computeGrade(score, WEEKLY_MAX) : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") { onScoreChange(student.id, ""); return; }
    const num = Number(raw);
    if (!isNaN(num) && num >= 0 && num <= WEEKLY_MAX) onScoreChange(student.id, num);
  };

  return (
    <motion.tr variants={rowVariant} className="border-b border-border-line02 hover:bg-gray-50/50">
      <td className="py-3.5 px-4 text-sm text-text-muted">{index + 1}</td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex-center text-sm font-semibold shrink-0 ${avatarColor(student.name)}`}>{getInitials(student.name)}</div>
          <div>
            <p className="text-sm font-medium text-text-primary">{student.name}</p>
            <p className="text-xs text-text-muted">{student.studentId}</p>
          </div>
        </div>
      </td>
      <td className="py-3.5 px-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">Wk {selectedWeek}</span>
      </td>
      <td className="py-3.5 px-4">
        <input type="number" min={0} max={WEEKLY_MAX} value={score} onChange={handleChange} placeholder={`0–${WEEKLY_MAX}`}
          className="w-24 px-3 py-1.5 text-sm text-center rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
      </td>
      <td className="py-3.5 px-4">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">{WEEKLY_MAX}</span>
      </td>
      <td className="py-3.5 px-4">
        {grade
          ? <span className={`w-8 h-8 rounded-full flex-center text-xs font-bold ${gradeStyles[grade]}`}>{grade}</span>
          : <span className="w-8 h-8 rounded-full flex-center text-xs text-text-muted bg-gray-50 border border-gray-100">—</span>}
      </td>
    </motion.tr>
  );
}