import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { mockTests, subjectOptions, testTypeOptions } from "../../data/mockData";
import { useDeleteTest } from "../../hooks/useTests";
import { staggerContainer, rowVariant } from "../../animations/variants";
import type { Test } from "../../types";

const SELECT_CLS =
  "appearance-none pl-3 pr-7 py-1.5 rounded-lg border border-border-line02 bg-white text-xs text-text-nav focus:outline-none focus:ring-2 focus:ring-brand-primary/20 cursor-pointer";

function getTimeBadge(mins: number): string {
  if (mins >= 90) return "bg-blue-50 text-blue-700 border-blue-100";
  if (mins >= 45) return "bg-amber-50 text-amber-700 border-amber-100";
  return "bg-green-50 text-green-700 border-green-100";
}

function getFormatBadge(format: string): string {
  return format === "External"
    ? "bg-purple-50 text-purple-700 border-purple-100"
    : "bg-gray-100 text-gray-600 border-gray-200";
}

interface Props { refreshKey: number; }

export default function TestsTable({ refreshKey }: Props) {
  const [tests,      setTests]      = useState<Test[]>(mockTests);
  const [search,     setSearch]     = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterSubj, setFilterSubj] = useState("");

  const deleteMutation = useDeleteTest();

  const handleDelete = (id: string) =>
    deleteMutation.mutate(id, {
      onSuccess: () => setTests((prev) => prev.filter((t) => t.id !== id)),
    });

  const filtered = tests.filter((t) => {
    const matchSearch = search === "" ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "" || t.type === filterType;
    const matchSubj = filterSubj === "" ||
      t.subject === subjectOptions.find((o) => o.value === filterSubj)?.label;
    return matchSearch && matchType && matchSubj;
  });

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border-line02 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <h2 className="section-title">Manage Tests</h2>
          <span className="w-6 h-6 rounded-full bg-blue-50 flex-center text-xs font-semibold text-brand-primary">
            {filtered.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search tests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-1.5 rounded-lg border border-border-line02 bg-bg-input text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all w-44"
            />
          </div>

          <div className="relative">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={SELECT_CLS}>
              <option value="">All Types</option>
              {testTypeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
          </div>

          <div className="relative">
            <select value={filterSubj} onChange={(e) => setFilterSubj(e.target.value)} className={SELECT_CLS}>
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
              {["#", "Title & Class", "Subject", "Passcode", "Time", "Date Created", "Actions"].map((col) => (
                <th key={col} className={`py-3 text-xs font-semibold text-text-muted uppercase tracking-wide text-left ${col === "#" || col === "Actions" ? "px-6" : "px-4"}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <motion.tbody key={refreshKey} variants={staggerContainer} initial="hidden" animate="show">
            {filtered.map((test, idx) => (
              <motion.tr
                key={test.id}
                variants={rowVariant}
                className="border-b border-border-line02 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-text-muted">{idx + 1}</td>

                <td className="px-4 py-4">
                  <p className="text-sm font-medium text-text-nav">{test.title}</p>
                  <p className="text-xs text-text-muted mt-0.5">{test.class}</p>
                </td>

                <td className="px-4 py-4 text-sm text-text-secondary">{test.subject}</td>

                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-semibold ${getFormatBadge(test.format)}`}>
                    {test.format}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-semibold ${getTimeBadge(test.timeAllowed)}`}>
                    {test.timeAllowed} Mins
                  </span>
                </td>

                <td className="px-4 py-4 text-sm text-text-muted">{test.dateCreated}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button type="button" title="Edit" className="w-8 h-8 rounded-lg flex-center text-brand-primary bg-blue-50 hover:bg-blue-100 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => handleDelete(test.id)}
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

      {filtered.length === 0 && (
        <div className="py-14 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex-center mb-3">
            <Search className="w-6 h-6 text-brand-primary" />
          </div>
          <p className="text-sm font-semibold text-text-nav">No tests found</p>
          <p className="text-xs text-text-muted mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}