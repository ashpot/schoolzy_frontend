import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { mockQuestions, classOptions } from "../../data/mockData";
import { useDeleteQuestion } from "../../hooks/useTests";
import QuestionTypeBadge from "./QuestionTypeBadge";
import { staggerContainer, rowVariant } from "../../animations/variants";
import type { Question } from "../../types";

const TYPE_OPTIONS = [
  { value: "",           label: "All Types" },
  { value: "objective",  label: "Objective" },
  { value: "subjective", label: "Subjective" },
  { value: "theory",     label: "Theory" },
];

const SELECT_CLS =
  "appearance-none pl-3 pr-7 py-1.5 rounded-lg border border-border-line02 bg-white text-xs text-text-nav focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 cursor-pointer";

interface Props { refreshKey: number; }

export default function QuestionsTable({ refreshKey }: Props) {
  const [questions,   setQuestions]   = useState<Question[]>(mockQuestions);
  const [search,      setSearch]      = useState("");
  const [filterType,  setFilterType]  = useState("");
  const [filterClass, setFilterClass] = useState("");

  const deleteMutation = useDeleteQuestion();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => setQuestions((prev) => prev.filter((q) => q.id !== id)),
    });
  };

  const filtered = questions.filter((q) => {
    const matchSearch = search === "" ||
      q.questionText.toLowerCase().includes(search.toLowerCase()) ||
      q.subject.toLowerCase().includes(search.toLowerCase());
    const matchType  = filterType  === "" || q.type  === filterType;
    const matchClass = filterClass === "" ||
      q.class === classOptions.find((o) => o.value === filterClass)?.label;
    return matchSearch && matchType && matchClass;
  });

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border-line02 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <h2 className="section-title">Manage Questions</h2>
          <span className="w-6 h-6 rounded-full bg-blue-50 flex-center text-xs font-semibold text-brand-primary">
            {filtered.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-1.5 rounded-lg border border-border-line02 bg-bg-input text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all w-44"
            />
          </div>

          {/* Type filter */}
          <div className="relative">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={SELECT_CLS}>
              {TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
          </div>

          {/* Class filter */}
          <div className="relative">
            <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className={SELECT_CLS}>
              <option value="">All Classes</option>
              {classOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-line02">
              {["#", "Subject", "Class", "Question", "Type", "Correct Answer", "Marks", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    className={`py-3 text-xs font-semibold text-text-muted uppercase tracking-wide text-left ${
                      col === "#" || col === "Actions" ? "px-6" : "px-4"
                    }`}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <motion.tbody
            key={refreshKey}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {filtered.map((q, idx) => (
              <motion.tr
                key={q.id}
                variants={rowVariant}
                className="border-b border-border-line02 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-text-muted">
                  {idx + 1}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-text-nav">
                  {q.subject}
                </td>
                <td className="px-4 py-4 text-sm text-text-secondary">
                  {q.class}
                </td>
                <td className="px-4 py-4 text-sm text-text-secondary max-w-55">
                  <p className="truncate">{q.questionText}</p>
                </td>
                <td className="px-4 py-4">
                  <QuestionTypeBadge type={q.type} />
                </td>
                <td className="px-4 py-4 text-sm text-text-muted max-w-45">
                  <p className="truncate">{q.correctAnswer}</p>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-green-200 bg-green-50 text-xs font-medium text-green-700">
                    {q.marks} Marks
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Edit"
                      className="w-8 h-8 rounded-lg flex-center text-brand-primary hover:bg-blue-50 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => handleDelete(q.id)}
                      disabled={deleteMutation.isPending}
                      className="w-8 h-8 rounded-lg flex-center text-danger hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-14 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex-center mb-3">
            <Search className="w-6 h-6 text-brand-primary" />
          </div>
          <p className="text-sm font-semibold text-text-nav">
            No questions found
          </p>
          <p className="text-xs text-text-muted mt-1">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
}