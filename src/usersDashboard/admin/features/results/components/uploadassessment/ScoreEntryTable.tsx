import { motion } from "framer-motion";
import ScoreEntryRow from "./ScoreEntryRow";
import type { ScoresMap, Student } from "../../types";
import { assessmentTypeOptions } from "../../data/mockData";
import { staggerContainer } from "../../animations/variants";

interface Props {
  students:       Student[];
  scores:         ScoresMap;
  maxScore:       number;
  assessmentType: string;
  search:         string;
  onScoreChange:  (studentId: string, value: number | "") => void;
}

const HEADERS = ["#", "Student", "Assessment Type", "Score", "Max Score", "Grade"];

export default function ScoreEntryTable({ students, scores, maxScore, assessmentType, search, onScoreChange }: Props) {
  const typeLabel = assessmentTypeOptions.find((o) => o.value === assessmentType)?.label ?? assessmentType;

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
                <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {filtered.map((student, i) => (
              <ScoreEntryRow
                key={student.id}
                index={i}
                student={student}
                score={scores[student.id] ?? ""}
                maxScore={maxScore}
                assessmentTypeLabel={typeLabel}
                onScoreChange={onScoreChange}
              />
            ))}
          </motion.tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-border-line02">
        <p className="text-xs text-text-muted">
          Showing {filtered.length} of {students.length} students
        </p>
      </div>
    </div>
  );
}