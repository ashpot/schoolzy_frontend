import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { testTypeOptions, subjectOptions } from "../../data/mockData";
import { useDeleteScheduledTest } from "../../hooks/useTests";
import { staggerContainer, rowVariant } from "../../animations/variants";
import type { ScheduledTest } from "../../types";
import type { ScheduledStatusFilter } from "./ScheduledTestStats";

const ITEMS_PER_PAGE = 5;

const SELECT_CLS =
  "appearance-none pl-3 pr-7 py-1.5 rounded-lg border border-border-line02 bg-white text-xs text-text-nav focus:outline-none focus:ring-2 focus:ring-brand-primary/20 cursor-pointer";

const SUBJECT_COLORS: Record<string, string> = {
  "General Studies":  "bg-indigo-50 text-indigo-700",
  "Civic Education":  "bg-purple-50 text-purple-700",
  "Mathematics":      "bg-blue-50   text-blue-700",
  "English Language": "bg-green-50  text-green-700",
  "Biology":          "bg-emerald-50 text-emerald-700",
  "Economics":        "bg-amber-50  text-amber-700",
};

function subjectColor(subject: string) {
  return SUBJECT_COLORS[subject] ?? "bg-gray-100 text-gray-600";
}

interface Props {
  items: ScheduledTest[];
  onDelete: (id: string) => void;
  statusFilter: ScheduledStatusFilter;
}

export default function ScheduledTestsTable({ items, onDelete, statusFilter }: Props) {
  const [search,      setSearch]      = useState("");
  const [filterType,  setFilterType]  = useState("");
  const [filterSubj,  setFilterSubj]  = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const deleteMutation = useDeleteScheduledTest();

  const handleDelete = (id: string) =>
    deleteMutation.mutate(id, {
      onSuccess: () => {
        onDelete(id);
        setCurrentPage(1);
      },
    });

  const filtered = items.filter((s) => {
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    const matchSearch = search === "" ||
      s.testTitle.toLowerCase().includes(search.toLowerCase()) ||
      s.subject.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "" || s.type === filterType;
    const matchSubj = filterSubj === "" ||
      s.subject === subjectOptions.find((o) => o.value === filterSubj)?.label;
    return matchStatus && matchSearch && matchType && matchSubj;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border-line02 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <h2 className="section-title">Manage Scheduled Tests</h2>
          <span className="w-6 h-6 rounded-full bg-blue-50 flex-center text-xs font-semibold text-brand-primary">
            {filtered.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="pl-8 pr-4 py-1.5 rounded-lg border border-border-line02 bg-bg-input text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all w-40"
            />
          </div>

          <div className="relative">
            <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }} className={SELECT_CLS}>
              <option value="">All Types</option>
              {testTypeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
          </div>

          <div className="relative">
            <select value={filterSubj} onChange={(e) => { setFilterSubj(e.target.value); setCurrentPage(1); }} className={SELECT_CLS}>
              <option value="">All Subjects</option>
              {subjectOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
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
              {["#", "Test", "Class", "Date Scheduled", "Date Created", "Actions"].map((col) => (
                <th key={col} className={`py-3 text-xs font-semibold text-text-muted uppercase tracking-wide text-left ${col === "#" || col === "Actions" ? "px-6" : "px-4"}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <motion.tbody
            key={`${statusFilter}-${currentPage}`}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {paginated.map((item, idx) => (
              <motion.tr
                key={item.id}
                variants={rowVariant}
                className="border-b border-border-line02 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-text-muted">
                  {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                </td>

                <td className="px-4 py-4">
                  <p className="text-sm font-medium text-text-nav mb-1.5">
                    {item.testTitle}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${subjectColor(item.subject)}`}>
                      {item.subject}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                      {item.timeAllowed} mins
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4 text-sm font-medium text-text-nav">
                  {item.class}{item.classGroup ? ` ${item.classGroup}` : ""}
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-text-secondary">
                      {item.dateScheduled}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.status === "upcoming"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {item.status === "upcoming" ? "Upcoming" : "Past"}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4 text-sm text-text-muted">
                  {item.dateCreated}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button type="button" title="Edit" className="w-8 h-8 rounded-lg flex-center text-brand-primary bg-blue-50 hover:bg-blue-100 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => handleDelete(item.id)}
                      disabled={deleteMutation.isPending}
                      className="w-8 h-8 rounded-lg flex-center text-danger bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
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
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
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

      {filtered.length === 0 && (
        <div className="py-14 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex-center mb-3">
            <Search className="w-6 h-6 text-brand-primary" />
          </div>
          <p className="text-sm font-semibold text-text-nav">No scheduled tests found</p>
          <p className="text-xs text-text-muted mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}