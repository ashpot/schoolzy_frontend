import React from "react";
import { gradeStyles } from "@/shared/utils/gradeUtils";

const SCALE = [
  { caption: "A1", range: "75-100", remark: "Excellent" },
  { caption: "B2", range: "70-74", remark: "Very Good" },
  { caption: "B3", range: "65-69", remark: "Good" },
  { caption: "C4", range: "60-64", remark: "Good" },
  { caption: "C5", range: "55-59", remark: "Average" },
  { caption: "C6", range: "50-54", remark: "Average" },
  { caption: "D7", range: "45-49", remark: "Pass" },
  { caption: "E8", range: "40-44", remark: "Pass" },
  { caption: "F9", range: "0-39", remark: "Fail" },
];

const gradeLetterOf = (caption: string) => caption[0] as keyof typeof gradeStyles;

const PrintableGradeScale: React.FC = () => (
  <div>
    <h4 className="text-sm font-semibold text-text-primary mb-3">GRADE SCALE</h4>
    <div className="flex flex-wrap gap-2">
      {SCALE.map((g) => (
        <span key={g.caption} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${gradeStyles[gradeLetterOf(g.caption)]}`}>
          <span className="font-semibold">{g.caption}</span> ({g.range}) — {g.remark}
        </span>
      ))}
    </div>
  </div>
);

export default PrintableGradeScale;