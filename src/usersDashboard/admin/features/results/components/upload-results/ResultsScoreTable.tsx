import { motion } from "framer-motion";
import { staggerContainer } from "../../animations/variants";
import type { Student, ResultScoresMap } from "../../types";
import ResultsScoreRow from "./ResultsScoreRow";

interface Props {
  students:      Student[];
  scores:        ResultScoresMap;
  search:        string;
  onScoreChange: (id: string, field: "assignment" | "test" | "exam", value: number | "") => void;
}

export default function ResultsScoreTable({ students, scores, search, onScoreChange }: Props) {
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.studentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80 border-b border-border-line02">
              <th className="py-3 px-4 text-left   text-xs font-semibold text-text-muted uppercase tracking-wide">#</th>
              <th className="py-3 px-4 text-left   text-xs font-semibold text-text-muted uppercase tracking-wide">Student</th>
              <th className="py-3 px-4 text-center text-xs font-semibold text-purple-500             uppercase tracking-wide">Assignment /30</th>
              <th className="py-3 px-4 text-center text-xs font-semibold text-blue-500               uppercase tracking-wide">Test /20</th>
              <th className="py-3 px-4 text-center text-xs font-semibold text-amber-500              uppercase tracking-wide">Exam /50</th>
              <th className="py-3 px-4 text-center text-xs font-semibold text-text-muted uppercase tracking-wide">Total /100</th>
              <th className="py-3 px-4 text-left   text-xs font-semibold text-text-muted uppercase tracking-wide">Grade</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {filtered.map((s, i) => (
              <ResultsScoreRow key={s.id} index={i} student={s} row={scores[s.id]} onScoreChange={onScoreChange} />
            ))}
          </motion.tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-border-line02">
        <p className="text-xs text-text-muted">Showing {filtered.length} of {students.length} students</p>
      </div>
    </div>
  );
}