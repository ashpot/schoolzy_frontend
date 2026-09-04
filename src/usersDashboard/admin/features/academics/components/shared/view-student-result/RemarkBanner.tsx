import React from "react";
import { CheckCircle2 } from "lucide-react";
import { gradeRemarks } from "@/shared/utils/gradeUtils";
import type { StudentResultData } from "../../../types/studentResult";

interface RemarkBannerProps {
  result: StudentResultData;
}

const RemarkBanner: React.FC<RemarkBannerProps> = ({ result }) => (
  <div className="flex items-center gap-2 bg-success/10 border border-success/20 rounded-xl px-4 py-3">
    <CheckCircle2 size={18} className="text-success shrink-0" />
    <p className="text-sm text-text-secondary">
      Overall Remark: <span className="font-semibold text-success">{gradeRemarks[result.overallGrade]}</span>
      {" — "}{result.subjects.length} subjects recorded for {result.term}, {result.session} academic session.
    </p>
  </div>
);

export default RemarkBanner;