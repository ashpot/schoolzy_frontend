import { Users, CheckCircle, XCircle } from "lucide-react";
import type { ViewScore } from "../../types";

interface Props { scores: ViewScore[]; }

export default function PageHeaderStats({ scores }: Props) {
  const total  = scores.length;
  const passed = scores.filter((s) => s.grade !== "F").length;
  const failed = total - passed;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50  text-blue-700  border border-blue-100">
        <Users size={13} />{total} students
      </span>
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
        <CheckCircle size={13} />{passed} passed
      </span>
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50   text-red-700   border border-red-100">
        <XCircle size={13} />{failed} failed
      </span>
    </div>
  );
}