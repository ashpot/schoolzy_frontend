import type { QuestionType } from "../../types";

const STYLES: Record<QuestionType, string> = {
  objective:  "bg-blue-50 text-blue-600 border-blue-100",
  subjective: "bg-amber-50 text-amber-600 border-amber-100",
  theory:     "bg-green-50 text-green-700 border-green-100",
};

const LABELS: Record<QuestionType, string> = {
  objective:  "Objective",
  subjective: "Subjective",
  theory:     "Theory",
};

export default function QuestionTypeBadge({ type }: { type: QuestionType }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${STYLES[type]}`}>
      {LABELS[type]}
    </span>
  );
}