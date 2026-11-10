import React from "react";
import type { StudentResult } from "../../types/studentResult";
import { fmt, gradeBadge, ordinal } from "../../utils/resultFormat";

const SubjectResultsTable: React.FC<{ result: StudentResult }> = ({ result }) => {
  const { subjects, assessments, summary } = result;
  const th = "px-6 py-3 font-medium uppercase whitespace-nowrap";

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-border-line02">
        <h3 className="section-title">Subject Results</h3>
        <span className="px-2 py-0.5 rounded-full bg-bg-input text-xs font-medium text-text-secondary">
          {subjects.length} Subjects
        </span>
      </div>

      {subjects.length === 0 ? (
        <p className="px-6 py-12 text-center text-sm text-text-muted">No scores recorded for this term yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-max">
            <thead>
              <tr className="text-left text-text-muted text-xs">
                <th className={th}>#</th>
                <th className={th}>Subject</th>
                <th className={th}>Teacher</th>
                {assessments.map((a) => (
                  <th key={a.id} className={th}>{a.name} <span className="normal-case">/{a.percentage}</span></th>
                ))}
                <th className={th}>Total</th>
                <th className={th}>Grade</th>
                <th className={th}>Position</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s, i) => (
                <tr key={s.key} className="border-t border-border-line02">
                  <td className="px-6 py-3.5 text-text-muted">{i + 1}</td>
                  <td className="px-6 py-3.5 font-medium text-text-primary capitalize">{s.name}</td>
                  <td className="px-6 py-3.5 text-text-secondary capitalize">{s.teacher || "—"}</td>
                  {assessments.map((a) => (
                    <td key={a.id} className="px-6 py-3.5 text-brand-primary">{fmt(s.scores[a.code])}</td>
                  ))}
                  <td className="px-6 py-3.5 font-semibold text-text-primary">{fmt(s.total)}</td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${gradeBadge(s.grade)}`}>{s.grade || "—"}</span>
                  </td>
                  <td className="px-6 py-3.5 text-text-muted">{ordinal(s.position)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-border-line02 bg-bg-input font-semibold">
                <td className="px-6 py-3.5" colSpan={3 + assessments.length}>Summary</td>
                <td className="px-6 py-3.5">{fmt(summary.total)}</td>
                <td className="px-6 py-3.5 text-brand-primary" colSpan={2}>
                  Avg: {summary.average === null ? "—" : `${fmt(summary.average)}%`} · {summary.grade || "—"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubjectResultsTable;