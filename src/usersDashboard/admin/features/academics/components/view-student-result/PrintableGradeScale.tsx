import React from "react";
import { gradeBadge } from "../../utils/resultFormat";
import { GRADE_SCALE } from "../../utils/studentResultConstant";

const PrintableGradeScale: React.FC = () => (
  <div className="print-avoid-break">
    <h4 className="text-sm font-semibold text-text-primary mb-3 tracking-wide">GRADE SCALE</h4>
    <div className="flex flex-wrap gap-2">
      {GRADE_SCALE.map((g) => (
        <span key={g.grade} className={`px-3 py-1.5 rounded-lg text-xs ${gradeBadge(g.grade)}`}>
          <span className="font-bold">{g.grade}</span>{" "}
          <span className="opacity-70">({g.range})</span> — {g.remark}
        </span>
      ))}
    </div>
  </div>
);

export default PrintableGradeScale;