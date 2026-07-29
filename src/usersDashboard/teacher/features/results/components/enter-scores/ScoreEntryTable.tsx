import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckSquare, RotateCcw } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { computeGrade, gradeStyles } from "../../utils/gradeUtils";
import { getInitials, avatarColor } from "../../utils/avatar";
import type { ResultStudent, ScoreEntry } from "../../types";

interface Props {
  students: ResultStudent[];
  scores: ScoreEntry[];
  onChange: (studentId: string, field: keyof Omit<ScoreEntry, "studentId">, value: number | null) => void;
  onFillMax: () => void;
  onClear: () => void;
}

const MAX = { assignment: 30, test: 20, exam: 50 };

export default function ScoreEntryTable({ students, scores, onChange, onFillMax, onClear }: Props) {
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    return students
      .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
      .map((s) => {
        const score = scores.find((sc) => sc.studentId === s.id)!;
        const complete = score.assignment !== null && score.test !== null && score.exam !== null;
        const total = complete ? score.assignment! + score.test! + score.exam! : null;
        const grade = total !== null ? computeGrade(total) : null;
        return { student: s, score, total, grade };
      });
  }, [students, scores, search]);

  const completedCount = scores.filter((s) => s.assignment !== null && s.test !== null && s.exam !== null).length;
  const totals = rows.filter((r) => r.total !== null).map((r) => r.total!) as number[];
  const avg = totals.length ? (totals.reduce((a, b) => a + b, 0) / totals.length).toFixed(1) : "0.0";
  const highest = totals.length ? Math.max(...totals) : 0;
  const passCount = totals.filter((t) => t >= 40).length;

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <h3 className="section-title">Mathematics — Results</h3>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-bg-input text-text-secondary">{students.length} students</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onFillMax} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border-line02 hover:border-brand-primary hover:text-brand-primary transition-colors">
            <CheckSquare size={14} /> Fill All Max
          </button>
          <button type="button" onClick={onClear} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border-line02 hover:border-danger hover:text-danger transition-colors">
            <RotateCcw size={14} /> Clear Scores
          </button>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search student..." className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 px-6 py-3 border-b border-border-line02">
        <div className="flex-1 min-w-[120px] h-1.5 rounded-full bg-bg-input overflow-hidden">
          <div className="h-full bg-brand-primary rounded-full transition-all" style={{ width: `${(completedCount / (students.length || 1)) * 100}%` }} />
        </div>
        <span className="text-xs text-text-secondary">{completedCount}/{students.length} complete</span>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">Avg: {avg}/100</span>
        <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700">Highest: {highest}/100</span>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700">Pass: {passCount}/{totals.length}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-text-muted uppercase text-left">
              <th className="px-6 py-3 font-medium">#</th>
              <th className="px-2 py-3 font-medium">Student</th>
              <th className="px-2 py-3 font-medium text-purple-600">Assignment /30</th>
              <th className="px-2 py-3 font-medium text-blue-600">Test /20</th>
              <th className="px-2 py-3 font-medium text-amber-600">Exam /50</th>
              <th className="px-2 py-3 font-medium">Total /100</th>
              <th className="px-6 py-3 font-medium">Grade</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {rows.map((row, i) => (
              <motion.tr key={row.student.id} variants={rowVariant} className="border-t border-border-line02 hover:bg-gray-50/50">
                <td className="px-6 py-3 text-text-muted">{i + 1}</td>
                <td className="px-2 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`flex-center w-8 h-8 rounded-full text-xs font-semibold ${avatarColor(row.student.name)}`}>{getInitials(row.student.name)}</span>
                    <div>
                      <p className="font-medium text-text-primary">{row.student.name}</p>
                      <p className="text-xs text-text-muted">{row.student.admissionNo}</p>
                    </div>
                  </div>
                </td>
                {(["assignment", "test", "exam"] as const).map((field) => (
                  <td key={field} className="px-2 py-3">
                    <input
                      type="number"
                      min={0}
                      max={MAX[field]}
                      value={row.score[field] ?? ""}
                      onChange={(e) => onChange(row.student.id, field, e.target.value === "" ? null : Number(e.target.value))}
                      placeholder={`/${MAX[field]}`}
                      className={`w-20 text-center py-1.5 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 ${
                        field === "assignment" ? "border-purple-200" : field === "test" ? "border-blue-200" : "border-amber-200"
                      }`}
                    />
                  </td>
                ))}
                <td className="px-2 py-3">
                  <span className="inline-flex justify-center w-16 py-1.5 rounded-lg border border-border-line02 font-semibold">{row.total ?? "—"}</span>
                </td>
                <td className="px-6 py-3">
                  {row.grade ? <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${gradeStyles[row.grade]}`}>{row.grade}</span> : <span className="text-text-muted">—</span>}
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-border-line02 text-xs text-text-muted">Showing {rows.length} of {students.length} students</div>
    </div>
  );
}