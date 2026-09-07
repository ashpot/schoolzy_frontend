import React from "react";
import { gradeStyles } from "@/shared/utils/gradeUtils";
import type { StudentResultData } from "../../types/studentResult";

interface SubjectResultsTableProps {
  result: StudentResultData;
}

const SubjectResultsTable: React.FC<SubjectResultsTableProps> = ({ result }) => {
  const subjects = result?.subjects ?? [];

  const totals = subjects.reduce(
    (acc, s) => ({
      assignment: acc.assignment + s.assignment,
      test: acc.test + s.test,
      exam: acc.exam + s.exam,
      total: acc.total + s.total,
    }),
    { assignment: 0, test: 0, exam: 0, total: 0 }
  );

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-border-line02">
        <h3 className="section-title">Subject Results</h3>
        <span className="px-2 py-0.5 rounded-full bg-bg-input text-xs font-medium text-text-secondary">
          {subjects.length} Subjects
        </span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-text-muted text-xs">
            <th className="px-6 py-3 font-medium">#</th>
            <th className="px-6 py-3 font-medium">SUBJECT</th>
            <th className="px-6 py-3 font-medium">ASSIGNMENT</th>
            <th className="px-6 py-3 font-medium">TEST</th>
            <th className="px-6 py-3 font-medium">EXAM</th>
            <th className="px-6 py-3 font-medium">TOTAL</th>
            <th className="px-6 py-3 font-medium">GRADE</th>
            <th className="px-6 py-3 font-medium">SUBJECT POS.</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((s, i) => (
            <tr key={s.id} className="border-t border-border-line02">
              <td className="px-6 py-3.5 text-text-muted">{i + 1}</td>
              <td className="px-6 py-3.5 font-medium text-text-primary">{s.subject}</td>
              <td className="px-6 py-3.5 text-brand-primary">{s.assignment}<span className="text-text-muted">/{s.assignmentMax}</span></td>
              <td className="px-6 py-3.5 text-success">{s.test}<span className="text-text-muted">/{s.testMax}</span></td>
              <td className="px-6 py-3.5 text-brand-primary">{s.exam}<span className="text-text-muted">/{s.examMax}</span></td>
              <td className="px-6 py-3.5 font-semibold text-text-primary">{s.total}<span className="text-text-muted font-normal">/{s.totalMax}</span></td>
              <td className="px-6 py-3.5">
                <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${gradeStyles[s.grade]}`}>{s.grade}{s.total >= 75 ? "1" : "4"}</span>
              </td>
              <td className="px-6 py-3.5 text-text-muted">{s.subjectPosition}</td>
            </tr>
          ))}
          {subjects.length > 0 && (
            <tr className="border-t-2 border-border-line02 bg-bg-input font-semibold">
              <td className="px-6 py-3.5" colSpan={2}>Summary</td>
              <td className="px-6 py-3.5">{totals.assignment}<span className="text-text-muted font-normal">/{subjects.length * 10}</span></td>
              <td className="px-6 py-3.5">{totals.test}<span className="text-text-muted font-normal">/{subjects.length * 20}</span></td>
              <td className="px-6 py-3.5">{totals.exam}<span className="text-text-muted font-normal">/{subjects.length * 70}</span></td>
              <td className="px-6 py-3.5">{totals.total}<span className="text-text-muted font-normal">/{subjects.length * 100}</span></td>
              <td className="px-6 py-3.5 text-brand-primary" colSpan={2}>Avg: {result.averageScore}% · {result.overallGrade}2</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectResultsTable;