import React from "react";
import { CheckCircle2, Clock } from "lucide-react";
import type { StudentResult } from "../../types/studentResult";

const RemarkBanner: React.FC<{ result: StudentResult }> = ({ result }) => {
  const { summary, term, subjects } = result;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 bg-success/10 border border-success/20 rounded-xl px-4 py-3">
        <CheckCircle2 size={18} className="text-success shrink-0" />
        <p className="text-sm text-text-secondary">
          {summary.remark && (
            <>Overall Remark: <span className="font-semibold text-success">{summary.remark}</span>{" — "}</>
          )}
          {subjects.length} subject{subjects.length === 1 ? "" : "s"} recorded for {term.name}, {term.session} academic session.
        </p>
      </div>
      {!term.published && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <Clock size={18} className="text-warning shrink-0" />
          <p className="text-sm text-text-secondary">This term’s results have not been published yet, so figures are provisional.</p>
        </div>
      )}
    </div>
  );
};

export default RemarkBanner;