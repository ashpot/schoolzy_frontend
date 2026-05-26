import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { TestResult } from "../../types";
import QuestionCard from "./QuestionCard";
import { modalVariant } from "../../animations/variants";

const QUESTIONS_PER_PAGE = 5;

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
];

function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function getGradeCircleColor(grade: string): string {
  const map: Record<string, string> = {
    A: "bg-green-600", B: "bg-blue-500",
    C: "bg-yellow-500", D: "bg-amber-500", F: "bg-red-500",
  };
  return map[grade.charAt(0)] ?? "bg-gray-500";
}

interface Props {
  result: TestResult;
  onClose: () => void;
}

export default function ResultModal({ result, onClose }: Props) {
  const [page, setPage] = useState(1);

  const correctCount = result.questions.filter((q) => q.isCorrect).length;
  const wrongCount   = result.questions.length - correctCount;
  const totalPages   = Math.ceil(result.questions.length / QUESTIONS_PER_PAGE);
  const pageQuestions = result.questions.slice(
    (page - 1) * QUESTIONS_PER_PAGE,
    page * QUESTIONS_PER_PAGE
  );

  const stats = [
    { label: "Questions", value: result.questions.length, color: "text-blue-600" },
    { label: "Correct",   value: correctCount,            color: "text-green-600" },
    { label: "Wrong",     value: wrongCount,              color: "text-red-500"   },
    { label: "Score",     value: `${result.score}%`,      color: "text-green-700" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        variants={modalVariant}
        initial="hidden"
        animate="show"
        exit="exit"
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[88vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex-center text-sm font-bold shrink-0 ${avatarColor(result.student.name)}`}>
              {getInitials(result.student.name)}
            </div>
            <div>
              <h2 className="text-base font-semibold text-text-nav">
                {result.student.name}
              </h2>
              <p className="text-xs text-text-muted">{result.test}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 transition-colors text-text-muted"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {/* Stats grid */}
          <div className="grid grid-cols-4 rounded-xl border border-border-line02 overflow-hidden">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center py-4 ${i < 3 ? "border-r border-border-line02" : ""}`}
              >
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                <span className="text-xs text-text-muted mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Overall Performance */}
          <div className="flex items-start gap-3 p-4 rounded-xl border border-border-line02">
            <div className={`w-10 h-10 rounded-full flex-center text-white text-sm font-bold shrink-0 ${getGradeCircleColor(result.grade)}`}>
              {result.grade.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-semibold text-text-nav">
                  Overall Performance
                </span>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-700">{result.score}%</p>
                  <p className="text-xs text-text-muted">{result.student.class}</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <p className="text-xs text-text-muted mt-1">{result.dateAdded}</p>
            </div>
          </div>

          {/* Question Breakdown */}
          <div>
            <h3 className="text-sm font-semibold text-text-nav mb-3">
              Question Breakdown{" "}
              <span className="text-text-muted font-normal">
                ({result.questions.length} questions)
              </span>
            </h3>
            <div className="space-y-3">
              {pageQuestions.map((q) => (
                <QuestionCard key={q.id} question={q} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer pagination */}
        <div className="px-6 py-4 border-t border-border-line02 flex items-center justify-between shrink-0">
          <span className="text-sm text-text-muted">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-text-secondary"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg flex-center text-sm font-medium transition-colors ${
                  p === page
                    ? "bg-brand-primary text-white"
                    : "text-text-secondary hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-text-secondary"
            >
              ›
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}