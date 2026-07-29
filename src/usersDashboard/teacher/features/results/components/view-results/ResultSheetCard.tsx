import { Printer } from "lucide-react";
import { gradeStyles } from "../../utils/gradeUtils";
import { getInitials, avatarColor } from "../../utils/avatar";
import type { StudentResultSheet } from "../../types";

interface Props {
  result: StudentResultSheet;
}

export default function ResultSheetCard({ result }: Props) {
  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02">
        <h3 className="section-title">Result Sheet</h3>
        <button type="button" onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border-line02 hover:border-brand-primary hover:text-brand-primary transition-colors">
          <Printer size={14} /> Print
        </button>
      </div>

      <div className="flex items-center gap-4 px-6 py-4 border-b border-border-line02">
        <span className={`flex-center w-14 h-14 rounded-full text-lg font-semibold ${avatarColor(result.studentName)}`}>{getInitials(result.studentName)}</span>
        <div>
          <p className="font-semibold text-text-primary">{result.studentName}</p>
          <p className="text-xs text-text-secondary mt-0.5">
            Adm No: <span className="font-medium text-text-primary">{result.admissionNo}</span> &nbsp;
            Class: <span className="font-medium text-text-primary">{result.className}</span> &nbsp;
            Term: <span className="font-medium text-text-primary">{result.term}</span> &nbsp;
            Session: <span className="font-medium text-text-primary">{result.session}</span> &nbsp;
            Teacher: <span className="font-medium text-text-primary">{result.teacherName}</span>
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-text-muted uppercase text-left">
              <th className="px-6 py-3 font-medium">Subject</th>
              <th className="px-2 py-3 font-medium">Assessment (30)</th>
              <th className="px-2 py-3 font-medium">Exam (50)</th>
              <th className="px-2 py-3 font-medium">Total (80)</th>
              <th className="px-2 py-3 font-medium">Grade</th>
              <th className="px-6 py-3 font-medium">Remark</th>
            </tr>
          </thead>
          <tbody>
            {result.subjects.map((row) => (
              <tr key={row.subject} className="border-t border-border-line02">
                <td className="px-6 py-3 font-medium text-text-primary">{row.subject}</td>
                <td className="px-2 py-3 text-text-secondary">{row.assessment}</td>
                <td className="px-2 py-3 text-text-secondary">{row.exam}</td>
                <td className="px-2 py-3 font-semibold">{row.total}</td>
                <td className="px-2 py-3">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${gradeStyles[row.grade]}`}>{row.grade}</span>
                </td>
                <td className="px-6 py-3 text-text-secondary">{row.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-6 py-5 border-t border-border-line02">
        <div>
          <p className="text-xs text-text-muted">Total Score</p>
          <p className="font-semibold text-text-primary mt-1">{result.totalScore}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted">Average</p>
          <p className="font-semibold text-text-primary mt-1">{result.average}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted">Overall Grade</p>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-xs font-semibold ${gradeStyles[result.overallGrade]}`}>{result.overallGrade}</span>
        </div>
        <div>
          <p className="text-xs text-text-muted">Remark</p>
          <p className="font-semibold text-text-primary mt-1">{result.overallRemark}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted">Position</p>
          <p className="font-semibold text-text-primary mt-1">{result.position}</p>
        </div>
      </div>
    </div>
  );
}