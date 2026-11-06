import { motion } from "framer-motion";
import { staggerContainer } from "../../animations/variants";
import ResultsScoreRow from "./ResultsScoreRow";
import type { ScoreInputs, Scoresheet } from "../../types/uploadResults";

interface ResultsScoreTableProps {
  sheet: Scoresheet;
  inputs: ScoreInputs;
  original: ScoreInputs;
  search: string;
  onChange: (studentId: number, colId: number, value: string) => void;
}

const th = "py-3 px-4 text-xs font-semibold uppercase tracking-wide";

export default function ResultsScoreTable({ sheet, inputs, original, search, onChange }: ResultsScoreTableProps) {
  const q = search.trim().toLowerCase();
  const rows = sheet.rows.filter((r) => !q || r.name.toLowerCase().includes(q));

  return (
    <div>
      {rows.length === 0 ? (
        <p className="py-12 text-center text-sm text-text-muted">No students match your search</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-border-line02">
                <th className={`${th} text-left text-text-muted`}>#</th>
                <th className={`${th} text-left text-text-muted`}>Student</th>
                {sheet.columns.map((c) => (
                  <th key={c.id} className={`${th} text-center text-text-muted`}>
                    {c.name}
                    <span className="block text-[10px] font-medium normal-case tracking-normal">
                      {c.max !== null ? `/${c.max}` : ""}
                      {c.weight !== null ? ` · ${c.weight}%` : ""}
                    </span>
                  </th>
                ))}
                <th className={`${th} text-center text-text-muted`}>Total</th>
                <th className={`${th} text-left text-text-muted`}>Grade</th>
              </tr>
            </thead>
            <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
              {rows.map((r, i) => (
                <ResultsScoreRow
                  key={r.studentId}
                  index={i}
                  row={r}
                  columns={sheet.columns}
                  values={inputs[String(r.studentId)]}
                  original={original[String(r.studentId)]}
                  onChange={onChange}
                />
              ))}
            </motion.tbody>
          </table>
        </div>
      )}
      <div className="px-4 py-3 border-t border-border-line02">
        <p className="text-xs text-text-muted">Showing {rows.length} of {sheet.rows.length} students</p>
      </div>
    </div>
  );
}