import { motion } from "framer-motion";
import { rowVariant } from "../../animations/variants";
import { computeGrade, gradeStyles, gradeRemarks } from "../../utils/gradeUtils";
import type { Student, ResultScoresMap } from "../../types";

interface Props {
  index:         number;
  student:       Student;
  row:           ResultScoresMap[string] | undefined;
  onScoreChange: (id: string, field: "assignment" | "test" | "exam", value: number | "") => void;
}

type Field = "assignment" | "test" | "exam";
const MAXES: Record<Field, number> = { assignment: 30, test: 20, exam: 50 };

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",   "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",     "bg-indigo-100 text-indigo-700",
];

const avatarColor = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const getInitials = (name: string) => name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

const inputStyles: Record<Field, string> = {
  assignment: "border-purple-200 focus:ring-purple-200/40 focus:border-purple-400",
  test:       "border-blue-200   focus:ring-blue-200/40   focus:border-blue-400",
  exam:       "border-amber-200  focus:ring-amber-200/40  focus:border-amber-400",
};

export default function ResultsScoreRow({ index, student, row, onScoreChange }: Props) {
  const a = row?.assignment ?? "";
  const t = row?.test       ?? "";
  const e = row?.exam       ?? "";

  const isComplete = typeof a === "number" && typeof t === "number" && typeof e === "number";
  const total      = isComplete ? (a as number) + (t as number) + (e as number) : null;
  const grade      = total !== null ? computeGrade(total, 100) : null;

  const handleChange = (field: Field) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const raw = ev.target.value;
    if (raw === "") { onScoreChange(student.id, field, ""); return; }
    const num = Number(raw);
    if (!isNaN(num) && num >= 0 && num <= MAXES[field]) onScoreChange(student.id, field, num);
  };

  return (
    <motion.tr variants={rowVariant} className="border-b border-border-line02 hover:bg-gray-50/50">
      <td className="py-3.5 px-4 text-sm text-text-muted">{index + 1}</td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex-center text-sm font-semibold shrink-0 ${avatarColor(student.name)}`}>{getInitials(student.name)}</div>
          <div>
            <p className="text-sm font-medium text-brand-primary">{student.name}</p>
            <p className="text-xs text-text-muted">{student.studentId}</p>
          </div>
        </div>
      </td>
      {(["assignment", "test", "exam"] as Field[]).map((field) => (
        <td key={field} className="py-3.5 px-4 w-32">
          <input type="number" min={0} max={MAXES[field]} value={row?.[field] ?? ""} onChange={handleChange(field)} placeholder={`/${MAXES[field]}`}
            className={`w-full px-3 py-1.5 text-sm text-center rounded-lg bg-bg-input border outline-none focus:ring-2 transition-all ${inputStyles[field]}`} />
        </td>
      ))}
      <td className="py-3.5 px-4 text-center">
        {total !== null
          ? <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-brand-primary">{total}</span>
          : <span className="text-text-muted text-sm">—</span>}
      </td>
      <td className="py-3.5 px-4">
        {grade ? (
          <div>
            <span className={`w-8 h-8 rounded-full flex-center text-xs font-bold ${gradeStyles[grade]}`}>{grade}</span>
            <p className="text-xs text-text-muted mt-0.5">{gradeRemarks[grade]}</p>
          </div>
        ) : (
          <span className="w-8 h-8 rounded-full flex-center text-xs text-text-muted bg-gray-50 border border-gray-100">—</span>
        )}
      </td>
    </motion.tr>
  );
}