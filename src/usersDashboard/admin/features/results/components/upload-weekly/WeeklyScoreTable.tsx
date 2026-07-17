import { motion } from "framer-motion";
import { staggerContainer } from "../../animations/variants";
import type { Student, ScoresMap } from "../../types";
import WeeklyScoreRow from "./WeeklyScoreRow";

interface Props {
  students:      Student[];
  scores:        ScoresMap;
  selectedWeek:  number;
  search:        string;
  onScoreChange: (id: string, value: number | "") => void;
}

const HEADERS = ["#", "Student", "Week", "Score", "Max", "Grade"];

export default function WeeklyScoreTable({ students, scores, selectedWeek, search, onScoreChange }: Props) {
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
              {HEADERS.map((h) => (
                <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {filtered.map((s, i) => (
              <WeeklyScoreRow key={s.id} index={i} student={s} score={scores[s.id] ?? ""} selectedWeek={selectedWeek} onScoreChange={onScoreChange} />
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