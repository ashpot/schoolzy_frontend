import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Layers, Search, Trash2 } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { useDeleteSession } from "../../hooks/useSessions";
import type { Session } from "../../types";
import { dateFormat } from "../../utils/dateFormat";

interface Props {
  sessions: Session[];
  onDelete: (id: string) => void;
}

const ROWS_PER_PAGE = 8;

export default function SessionsTable({ sessions, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);
  const deleteMutation      = useDeleteSession();

  const filtered = sessions.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  const total     = filtered.length;
  const totalPages = Math.ceil(total / ROWS_PER_PAGE);
  const start     = (page - 1) * ROWS_PER_PAGE;
  const rows      = filtered.slice(start, start + ROWS_PER_PAGE);

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, { onSuccess: () => onDelete(id) });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-brand-primary" />
          <h3 className="section-title">Sessions List</h3>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
            {sessions.length}
          </span>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search sessions…"
            className="pl-9 pr-4 py-2 text-sm rounded-xl border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-text-primary placeholder:text-text-muted"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-line02 bg-gray-50/60">
              {["ID", "NAME", "START DATE", "END DATE", "ACTIVE", "ACTIONS"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody
            key={page}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <Layers size={22} className="text-brand-primary" />
                    </div>
                    <p className="font-medium text-text-primary">No sessions found</p>
                    <p className="text-xs text-text-muted">Try adjusting your search</p>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((session, idx) => (
                <motion.tr
                  key={session.id}
                  variants={rowVariant}
                  className="border-b border-border-line02 last:border-0 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-text-muted font-medium">{start + idx + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Layers size={14} className="text-text-muted shrink-0" />
                      <span className={`font-semibold ${session.isActive ? "text-brand-primary" : "text-text-primary"}`}>
                        {session.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-text-secondary">
                      <CalendarDays size={13} className="text-text-muted shrink-0" />
                      {dateFormat(session.startDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-text-secondary">
                      <CalendarDays size={13} className="text-text-muted shrink-0" />
                      {dateFormat(session.endDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <ActiveBadge active={session.isActive} />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => handleDelete(session.id)}
                      disabled={deleteMutation.isPending}
                      className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-red-50 transition-colors disabled:opacity-40"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </motion.tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > ROWS_PER_PAGE && (
        <div className="flex items-center justify-between px-6 py-3 border-t border-border-line02">
          <p className="text-xs text-text-muted">
            Showing {start + 1}–{Math.min(start + ROWS_PER_PAGE, total)} of {total}
          </p>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                  p === page
                    ? "bg-brand-primary text-white"
                    : "text-text-secondary hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ActiveBadge({ active }: { active: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
      active
        ? "bg-blue-50 text-blue-600 border-blue-100"
        : "bg-gray-100 text-gray-500 border-gray-200"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-blue-500" : "bg-gray-400"}`} />
      {active ? "YES" : "NO"}
    </span>
  );
}