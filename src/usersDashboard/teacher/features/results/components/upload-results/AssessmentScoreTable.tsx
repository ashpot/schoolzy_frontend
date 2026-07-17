import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckSquare } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { computeGrade, gradeStyles } from "../../utils/gradeUtils";
import { getInitials, avatarColor } from "../../utils/avatar";
import type { ResultStudent } from "../../types";

interface Props {
  students: ResultStudent[];
  maxScore: number;
  typeLabel: string;
  scores: Record<string, number | null>;
  onChange: (studentId: string, value: number | null) => void;
  onFillMax: () => void;
}

export default function AssessmentScoreTable({ students, maxScore, typeLabel, scores, onChange, onFillMax }: Props) {
  const [search, setSearch] = useState("");

  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
  const filledCount = Object.values(scores).filter((v) => v !== null).length;
  const filledValues = Object.values(scores).filter((v): v is number => v !== null);
  const avg = filledValues.length ? (filledValues.reduce((a, b) => a + b, 0) / filledValues.length).toFixed(1) : "0.0";

  const gradeFor = (score: number) => computeGrade((score / maxScore) * 100);

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <h3 className="section-title">Score Entry</h3>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-bg-input text-text-secondary">{students.length} Students</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onFillMax} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border-line02 hover:border-brand-primary hover:text-brand-primary transition-colors">
            <CheckSquare size={14} /> Fill Max ({maxScore})
          </button>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search student..." className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-border-line02">
        <div className="flex items-center gap-3">
          <span className="text-xs px-2 py-1 rounded-full bg-bg-input text-text-secondary">{filledCount}/{students.length} filled</span>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">Avg: {avg} / {maxScore}</span>
        </div>
        <span className="text-xs text-text-muted">Max score for this type: <span className="font-medium text-text-primary">{maxScore}</span></span>
      </div>

      <div className="h-1.5 bg-bg-input mx-6 my-3 rounded-full overflow-hidden">
        <div className="h-full bg-brand-primary rounded-full transition-all" style={{ width: `${(filledCount / (students.length || 1)) * 100}%` }} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-text-muted uppercase text-left">
              <th className="px-6 py-3 font-medium">#</th>
              <th className="px-2 py-3 font-medium">Student</th>
              <th className="px-2 py-3 font-medium">Assessment Type</th>
              <th className="px-2 py-3 font-medium">Score</th>
              <th className="px-2 py-3 font-medium">Max Score</th>
              <th className="px-6 py-3 font-medium">Grade</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {filtered.map((s, i) => {
              const score = scores[s.id];
              const grade = score !== null && score !== undefined ? gradeFor(score) : null;
              return (
                <motion.tr key={s.id} variants={rowVariant} className="border-t border-border-line02 hover:bg-gray-50/50">
                  <td className="px-6 py-3 text-text-muted">{i + 1}</td>
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`flex-center w-8 h-8 rounded-full text-xs font-semibold ${avatarColor(s.name)}`}>{getInitials(s.name)}</span>
                      <div>
                        <p className="font-medium text-text-primary">{s.name}</p>
                        <p className="text-xs text-text-muted">{s.admissionNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <span className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">{typeLabel}</span>
                  </td>
                  <td className="px-2 py-3">
                    <input
                      type="number"
                      min={0}
                      max={maxScore}
                      value={score ?? ""}
                      onChange={(e) => onChange(s.id, e.target.value === "" ? null : Number(e.target.value))}
                      className="w-20 text-center py-1.5 rounded-lg border border-border-line02 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                    />
                  </td>
                  <td className="px-2 py-3 text-text-secondary">{maxScore}</td>
                  <td className="px-6 py-3">
                    {grade ? <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${gradeStyles[grade]}`}>{grade}</span> : <span className="text-text-muted">—</span>}
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-border-line02 text-xs text-text-muted">Showing {filtered.length} of {students.length} students</div>
    </div>
  );
}