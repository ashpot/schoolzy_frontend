import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import SectionTabs from "./SectionTabs";
import { listStagger, rowFadeUp } from "../../animations/variants";

export interface ColumnDef<T> {
  key: string;
  header: string;
  className?: string;
  render: (row: T, index: number) => React.ReactNode;
}

interface AcademicsListPanelProps<T extends { id: string }> {
  title: string;
  count: number;
  columns: ColumnDef<T>[];
  data: T[];
  total: number;
  page: number;
  perPage?: number;
  search: string;
  section: string;
  isLoading?: boolean;
  onSearch: (v: string) => void;
  onPageChange: (p: number) => void;
  onSectionChange: (section: string) => void;
  searchPlaceholder?: string;
}

function AcademicsListPanel<T extends { id: string }>({
  title,
  count,
  columns,
  data,
  total,
  page,
  perPage = 8,
  search,
  section,
  isLoading,
  onSearch,
  onPageChange,
  onSectionChange,
  searchPlaceholder = "Search...",
}: AcademicsListPanelProps<T>) {
  const totalPages = Math.ceil(total / perPage);
  const startItem = (page - 1) * perPage + 1;
  const endItem = Math.min(page * perPage, total);

  return (
    <div className="bg-white rounded-2xl card-shadow flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border-line02">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <h2 className="section-title">{title}</h2>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold font-lato">
              {count}
            </span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <input
              value={search}
              onChange={(e) => { onSearch(e.target.value); onPageChange(1); }}
              placeholder={searchPlaceholder}
              className="pl-8 pr-3 py-2 text-xs rounded-xl border border-border-line02 bg-bg-input focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary placeholder:text-text-muted w-44"
            />
          </div>
        </div>
        <div className="mt-3">
          <SectionTabs
            active={section}
            onChange={(s) => { onSectionChange(s); onPageChange(1); }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-line02 bg-border-line02/40">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3 text-left text-[11px] font-semibold text-text-muted uppercase tracking-wider font-lato ${col.className ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <AnimatePresence mode="wait">
            <motion.tbody
              key={`${page}-${search}-${section}`}
              variants={listStagger}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border-line02">
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-4">
                        <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-5 py-12 text-center text-text-muted text-sm">
                    No records found.
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    variants={rowFadeUp}
                    className="border-b border-border-line02 hover:bg-bg-soft/50 transition-colors"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-5 py-4 text-sm text-text-primary font-lato ${col.className ?? ""}`}
                      >
                        {col.render(row, index)}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>

      {/* Pagination */}
      {total > 0 && (
        <div className="px-5 py-3.5 border-t border-border-line02 flex items-center justify-between">
          <p className="text-xs text-text-muted font-lato">
            Showing{" "}
            <span className="text-text-primary">{startItem}–{endItem}</span>{" "}
            of <span className=" text-text-primary">{total}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="w-7 h-7 rounded-lg flex items-center justify-center border border-border-line02 text-text-secondary hover:bg-bg-soft disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-7 h-7 rounded-lg text-xs font-normal font-lato transition-colors ${
                  p === page
                    ? "bg-brand-primary text-white"
                    : "border border-border-line02 text-text-secondary hover:bg-bg-soft"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="w-7 h-7 rounded-lg flex items-center justify-center border border-border-line02 text-text-secondary hover:bg-bg-soft disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AcademicsListPanel;