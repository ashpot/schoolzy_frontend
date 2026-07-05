import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Eye, Trash2 } from "lucide-react";
import { subjectOptions, classOptions, testTypeOptions } from "../../data/mockData";
import { useDeleteResult } from "../../hooks/useTests";
import { staggerContainer, rowVariant } from "../../animations/variants";
import type { TestResult } from "../../types";
import ResultModal from "./ResultModal";

const ITEMS_PER_PAGE = 7;

const SELECT_CLS =
  "appearance-none pl-3 pr-7 py-1.5 rounded-lg border border-border-line02 bg-white text-xs text-text-nav focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 cursor-pointer";

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",   "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",     "bg-indigo-100 text-indigo-700",
];

function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function getScoreBarColor(score: number): string {
  if (score >= 90) return "bg-green-600";
  if (score >= 80) return "bg-green-500";
  if (score >= 70) return "bg-amber-500";
  if (score >= 60) return "bg-yellow-400";
  if (score >= 50) return "bg-orange-400";
  return "bg-red-500";
}

function getGradeBadge(grade: string): string {
  const map: Record<string, string> = {
    A: "border border-blue-200  bg-blue-50  text-blue-700",
    B: "border border-green-200 bg-green-50 text-green-700",
    C: "border border-yellow-200 bg-yellow-50 text-yellow-700",
    D: "border border-amber-200 bg-amber-50 text-amber-700",
    F: "border border-red-200   bg-red-50   text-red-700",
  };
  return map[grade.charAt(0)] ?? "border border-gray-200 bg-gray-50 text-gray-700";
}

interface Props {
  results: TestResult[];
  onDelete: (id: string) => void;
}

export default function ResultsTable({ results, onDelete }: Props) {
  const [search,         setSearch]         = useState("");
  const [filterType,     setFilterType]     = useState("");
  const [filterClass,    setFilterClass]    = useState("");
  const [filterSubj,     setFilterSubj]     = useState("");
  const [currentPage,    setCurrentPage]    = useState(1);
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);

  const deleteMutation = useDeleteResult();

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteMutation.mutate(id, {
      onSuccess: () => { onDelete(id); setCurrentPage(1); },
    });
  };

  const filtered = results.filter((r) => {
    const matchSearch = search === "" ||
      r.student.name.toLowerCase().includes(search.toLowerCase()) ||
      r.test.toLowerCase().includes(search.toLowerCase());
    const matchType  = filterType  === "" || r.testType === filterType;
    const matchSubj  = filterSubj  === "" ||
      r.subject === subjectOptions.find((o) => o.value === filterSubj)?.label;
    const matchClass = filterClass === "" ||
      r.student.class.startsWith(classOptions.find((o) => o.value === filterClass)?.label ?? "");
    return matchSearch && matchType && matchSubj && matchClass;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-line02 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <h2 className="section-title">All Results</h2>
            <span className="w-6 h-6 rounded-full bg-blue-50 flex-center text-xs font-semibold text-brand-primary">
              {filtered.length}
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="pl-8 pr-4 py-1.5 rounded-lg border border-border-line02 bg-bg-input text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all w-44"
              />
            </div>

            {/* Dropdowns */}
            {[
              { value: filterType,  setter: setFilterType,  options: testTypeOptions, label: "All Types"    },
              { value: filterClass, setter: setFilterClass, options: classOptions,    label: "All Classes"  },
              { value: filterSubj,  setter: setFilterSubj,  options: subjectOptions,  label: "All Subjects" },
            ].map(({ value, setter, options, label }) => (
              <div key={label} className="relative">
                <select
                  value={value}
                  onChange={(e) => { setter(e.target.value); setCurrentPage(1); }}
                  className={SELECT_CLS}
                >
                  <option value="">{label}</option>
                  {options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-line02">
                {["#", "Date Added", "Student", "Test", "Right", "Wrong", "Score", "Grade", "Actions"].map((col) => (
                  <th
                    key={col}
                    className={`py-3 text-xs font-semibold text-text-muted uppercase tracking-wide text-left ${
                      col === "#" || col === "Actions" ? "px-6" : "px-4"
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <motion.tbody
              key={currentPage}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {paginated.map((result, idx) => (
                <motion.tr
                  key={result.id}
                  variants={rowVariant}
                  onClick={() => setSelectedResult(result)}
                  className="border-b border-border-line02 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  {/* # */}
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4 text-sm text-text-secondary whitespace-nowrap">
                    {result.dateAdded}
                  </td>

                  {/* Student */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex-center text-xs font-bold shrink-0 ${avatarColor(result.student.name)}`}>
                        {getInitials(result.student.name)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-nav whitespace-nowrap">
                          {result.student.name}
                        </p>
                        <p className="text-xs text-text-muted">
                          {result.student.class}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Test */}
                  <td className="px-4 py-4 text-sm text-text-secondary whitespace-nowrap">
                    {result.test}
                  </td>

                  {/* Right */}
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center justify-center min-w-9 px-2 py-1 rounded-lg bg-green-50 border border-green-200 text-xs font-bold text-green-700">
                      {String(result.right).padStart(2, "0")}
                    </span>
                  </td>

                  {/* Wrong */}
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center justify-center min-w-9 px-2 py-1 rounded-lg bg-red-50 border border-red-200 text-xs font-bold text-red-600">
                      {String(result.wrong).padStart(2, "0")}
                    </span>
                  </td>

                  {/* Score */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden shrink-0">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${getScoreBarColor(result.score)}`}
                          style={{ width: `${result.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-text-nav whitespace-nowrap">
                        {result.score}%
                      </span>
                    </div>
                  </td>

                  {/* Grade */}
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center justify-center w-10 py-0.5 rounded-full text-xs font-bold ${getGradeBadge(result.grade)}`}>
                      {result.grade}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        title="View breakdown"
                        onClick={(e) => { e.stopPropagation(); setSelectedResult(result); }}
                        className="w-8 h-8 rounded-lg flex-center text-brand-primary hover:bg-blue-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Delete"
                        onClick={(e) => handleDelete(result.id, e)}
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

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="px-6 py-4 border-t border-border-line02 flex items-center justify-between">
            <p className="text-sm text-text-muted">
              Showing{" "}
              <span className="font-medium text-text-nav">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-text-nav">{filtered.length}</span>
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-text-secondary">‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 rounded-lg flex-center text-sm font-medium transition-colors ${p === currentPage ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-gray-100"}`}>{p}</button>
              ))}
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-text-secondary">›</button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-14 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex-center mb-3">
              <Search className="w-6 h-6 text-brand-primary" />
            </div>
            <p className="text-sm font-semibold text-text-nav">No results found</p>
            <p className="text-xs text-text-muted mt-1">Try adjusting your filters</p>
          </div>
        )}

        {/* Footer hint */}
        {filtered.length > 0 && (
          <div className="px-6 pb-4">
            <p className="text-xs text-text-muted italic">
              Click any row to view the full question-by-question breakdown
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedResult && (
          <ResultModal
            result={selectedResult}
            onClose={() => setSelectedResult(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}