import { motion } from "framer-motion";
import { rowVariant } from "../../animations/variants";
import { gradeStyles, gradeRemarks } from "../../utils/gradeUtils";
import type { ViewScore } from "../../types";

interface Props { index: number; score: ViewScore; }

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",   "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",     "bg-indigo-100 text-indigo-700",
];

const avatarColor = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const getInitials = (name: string) => name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

export default function ScoresTableRow({ index, score: s }: Props) {
  return (
    <motion.tr variants={rowVariant} className="border-b border-border-line02 hover:bg-gray-50/50">
      <td className="py-3.5 px-4 text-sm text-text-muted">{index + 1}</td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex-center text-sm font-semibold shrink-0 ${avatarColor(s.name)}`}>{getInitials(s.name)}</div>
          <div>
            <p className="text-sm font-medium text-text-primary">{s.name}</p>
            <p className="text-xs text-text-muted">{s.studentId}</p>
          </div>
        </div>
      </td>
      <td className="py-3.5 px-4 text-center"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100">{s.assignment}</span></td>
      <td className="py-3.5 px-4 text-center"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50   text-blue-700   border border-blue-100">{s.test}</span></td>
      <td className="py-3.5 px-4 text-center"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50  text-amber-700  border border-amber-100">{s.exam}</span></td>
      <td className="py-3.5 px-4 text-center"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-text-primary">{s.total}</span></td>
      <td className="py-3.5 px-4">
        <span className={`w-8 h-8 rounded-full flex-center text-xs font-bold ${gradeStyles[s.grade]}`}>{s.grade}</span>
        <p className="text-xs text-text-muted mt-0.5">{gradeRemarks[s.grade]}</p>
      </td>
    </motion.tr>
  );
}