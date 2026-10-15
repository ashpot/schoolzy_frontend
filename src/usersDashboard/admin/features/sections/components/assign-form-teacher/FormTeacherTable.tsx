import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, Search, Trash2, Info } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { getClassBadgeColor } from "../../utils/colors";
import type { FormTeacherAssignment } from "../../types";
import NumberSpan from "../shared/NumberSpan";
import EditButton from "@/shared/ui/EditButton";

interface Props {
  assignments: FormTeacherAssignment[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const PAGE_SIZE = 8;
const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",   "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",     "bg-indigo-100 text-indigo-700",
];

const avatarColor = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
const getInitials = (name: string) => name.replace(/^(Mrs?|Ms)\.?\s/, "").split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

export default function FormTeacherTable({ assignments, isLoading, isError, onRetry }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(t);
  }, [notice]);

  const q = search.toLowerCase();
  const filtered = assignments.filter(
    (a) => a.className.toLowerCase().includes(q) || a.teacherName.toLowerCase().includes(q)
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, filtered.length);

  return (
    <div className="whitespace-nowrap bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <UserCheck size={16} className="text-brand-primary" />
          <h2 className="section-title">Class Form Teachers</h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs font-semibold">{assignments.length}</span>
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" placeholder="Search assignments..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-44 transition-all" />
        </div>
      </div>

      {notice && (
        <motion.div
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-50 border-b border-amber-100 text-xs text-amber-700"
        >
          <Info size={14} /> {notice}
        </motion.div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-max">
          <thead>
            <tr className="bg-gray-50/80 border-b border-border-line02">
              {["#", "Class", "Teacher", "Assigned By", "Actions"].map((h) => (
                <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show" key={`${page}-${isLoading}-${isError}`}>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-border-line02">
                  {[0, 1, 2, 3, 4].map((c) => (
                    <td key={c} className="py-4 px-4"><div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" /></td>
                  ))}
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <p className="text-sm text-danger">Couldn't load assignments.</p>
                  <button type="button" onClick={onRetry} className="text-xs text-brand-primary hover:underline mt-1">Try again</button>
                </td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex-center mx-auto mb-3">
                    <UserCheck size={20} className="text-brand-primary" />
                  </div>
                  <p className="text-sm font-medium text-text-primary">
                    {search ? "No matching assignments" : "No assignments yet"}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {search ? "Try a different search" : "Assign a teacher using the form"}
                  </p>
                </td>
              </tr>
            ) : (
              paginated.map((a, i) => (
                <motion.tr key={a.id} variants={rowVariant} className="border-b border-border-line02 hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 text-sm text-text-muted">
                    <NumberSpan number={(page - 1) * PAGE_SIZE + i + 1} />
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getClassBadgeColor(a.className)}`}>
                      {a.className}
                    </span>
                    <p className="text-xs text-text-muted mt-1">
                      Form teacher: {a.classFormTeacher ?? "None"}
                    </p>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex-center text-xs font-bold shrink-0 ${avatarColor(a.teacherName)}`}>
                        {getInitials(a.teacherName)}
                      </div>
                      <p className="text-sm font-medium text-text-primary leading-tight">{a.teacherName}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-sm font-medium text-text-primary">{a.assignedBy}</p>
                    <p className="text-xs text-text-muted">{a.assignedAt}</p>
                  </td>
                  <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      {/* TODO: no update endpoint yet. Wire api.patch(`/academics/assigned-classes/${id}/`) once available */}
                      <EditButton onClick={() => setNotice("Editing assignments isn't available yet.")} />
                      {/* TODO: no delete endpoint yet. Wire api.delete once available */}
                      <button
                        type="button"
                        onClick={() => setNotice("Removing assignments isn't available yet.")}
                        className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </motion.tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-border-line02">
        <p className="text-xs text-text-muted">Showing {from}–{to} of {filtered.length} assignments</p>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-7 h-7 flex-center rounded-lg text-sm hover:bg-gray-100 disabled:opacity-30">‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 flex-center rounded-lg text-sm font-medium transition-colors ${page === p ? "bg-brand-primary text-white" : "hover:bg-gray-100 text-text-secondary"}`}>{p}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-7 h-7 flex-center rounded-lg text-sm hover:bg-gray-100 disabled:opacity-30">›</button>
          </div>
        )}
      </div>
    </div>
  );
}