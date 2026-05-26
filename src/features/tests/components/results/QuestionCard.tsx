import { CheckCircle, XCircle } from "lucide-react";
import type { QuestionResult } from "../../types";

interface Props {
  question: QuestionResult;
}

export default function QuestionCard({ question }: Props) {
  const { number, questionText, studentAnswer, correctAnswer, isCorrect } = question;

  return (
    <div className={`rounded-xl border p-4 space-y-3 ${
      isCorrect ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className={`w-6 h-6 rounded-full flex-center text-xs font-bold text-white shrink-0 mt-0.5 ${
            isCorrect ? "bg-green-600" : "bg-red-500"
          }`}>
            {number}
          </span>
          <p className="text-sm font-medium text-text-nav">
            {questionText}
          </p>
        </div>
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-medium shrink-0 ${
          isCorrect
            ? "bg-green-100 text-green-700 border-green-200"
            : "bg-red-100 text-red-600 border-red-200"
        }`}>
          {isCorrect
            ? <><CheckCircle className="w-3 h-3" /> Correct</>
            : <><XCircle className="w-3 h-3" /> Wrong</>
          }
        </span>
      </div>

      {/* Answer(s) */}
      {isCorrect ? (
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
            Student's Answer
          </p>
          <div className="px-3 py-2 rounded-lg bg-green-100 text-sm font-medium text-green-800">
            {studentAnswer}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Student's Answer
            </p>
            <div className="px-3 py-2 rounded-lg bg-red-100 text-sm font-medium text-red-700">
              {studentAnswer}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
              Correct Answer
            </p>
            <div className="px-3 py-2 rounded-lg bg-green-100 text-sm font-medium text-green-800">
              {correctAnswer}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}