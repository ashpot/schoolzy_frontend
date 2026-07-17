import { Printer } from "lucide-react";
import { gradeStyles } from "../../utils/gradeUtils";
import type { ResultSheet } from "../../types";

export default function ResultSheetCard({ result }: { result: ResultSheet }) {
  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="bg-brand-primary text-white px-6 py-5 flex items-center justify-between">
        <div>
          <p className="font-semibold text-lg">Schoolzy Academy</p>
          <p className="text-sm text-white/80">Academic Result Sheet</p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/15 hover:bg-white/25 transition-colors text-sm"
        >
          <Printer size={14} /> Print
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-border-line02">
        <Meta label="Student Name" value={result.studentName} />
        <Meta label="Admission No." value={result.admissionNo} />
        <Meta label="Class" value={result.class} />
        <Meta label="Session" value={result.session} />
        <Meta label="Term" value={result.term} />
        <Meta label="Average" value={`${result.average}%`} />
        <Meta label="Position" value={result.position} />
        <Meta label="Remark" value={result.remark} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-text-muted uppercase bg-bg-input">
              <th className="px-6 py-3 font-medium">Subject</th>
              <th className="px-6 py-3 font-medium">CA (30)</th>
              <th className="px-6 py-3 font-medium">Exam (70)</th>
              <th className="px-6 py-3 font-medium">Total (100)</th>
              <th className="px-6 py-3 font-medium">Grade</th>
              <th className="px-6 py-3 font-medium">Remark</th>
            </tr>
          </thead>
          <tbody>
            {result.subjects.map((s) => (
              <tr key={s.subject} className="border-t border-border-line02">
                <td className="px-6 py-3 text-body text-text-primary">{s.subject}</td>
                <td className="px-6 py-3 text-body-small text-text-secondary">{s.ca}</td>
                <td className="px-6 py-3 text-body-small text-text-secondary">{s.exam}</td>
                <td className="px-6 py-3 font-semibold text-text-primary">{s.total}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${gradeStyles[s.grade]}`}>{s.grade}</span>
                </td>
                <td className="px-6 py-3 text-body-small text-text-secondary">{s.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-input rounded-xl p-3">
      <p className="text-xs text-text-muted uppercase">{label}</p>
      <p className="font-medium text-text-primary mt-0.5">{value}</p>
    </div>
  );
}