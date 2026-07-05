import { motion } from "framer-motion";
import { CheckCircle2, Search, Clock, RotateCcw, CalendarCheck } from "lucide-react";
import Button from "@/shared/ui/Button";
import { avatarColor, getInitials } from "../../shared/utils/helpers";
import type { AttendanceStatus, AttendanceStudent } from "../../types";
import { FOOTER_STATS, ITEMS_PER_PAGE, STATUS_ACTIVE, STATUS_IDLE, STATUS_PILLS } from "../../shared/utils/constants";
import { staggerContainer, rowVariant } from "../../animations/variants";

interface AttendancePanelProps {
  loadedClass: { className: string; totalStudents: number };
  paginatedStudents: AttendanceStudent[];
  filteredCount: number;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  unmarkedCount: number;
  markedCount: number;
  total: number;
  isSaving: boolean;
  onSearchChange: (val: string) => void;
  onPageChange: (page: number) => void;
  onToggleStatus: (studentId: string, status: AttendanceStatus) => void;
  onMarkAllPresent: () => void;
  onReset: () => void;
  onSave: () => void;
}

const statCountMap = (
  present: number,
  absent: number,
  late: number,
  unmarked: number
): Record<string, number> => ({ present, absent, late, unmarked });

export default function AttendancePanel({
  loadedClass,
  paginatedStudents,
  filteredCount,
  currentPage,
  totalPages,
  searchQuery,
  presentCount,
  absentCount,
  lateCount,
  unmarkedCount,
  markedCount,
  total,
  isSaving,
  onSearchChange,
  onPageChange,
  onToggleStatus,
  onMarkAllPresent,
  onReset,
  onSave,
}: AttendancePanelProps) {
  const counts = statCountMap(presentCount, absentCount, lateCount, unmarkedCount);

  return (
    <motion.div
      key="loaded"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl card-shadow overflow-hidden"
    >
      {/* Panel Header */}
      <div className="px-6 py-4 border-b border-border-line02 space-y-3">
        {/* Row 1: class name + actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-text-nav">
              {loadedClass.className}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-xs font-medium text-brand-primary">
              {loadedClass.totalStudents} Students
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onMarkAllPresent}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Mark All Present
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
              <input
                type="text"
                placeholder="Search student..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 pr-4 py-1.5 rounded-lg border border-border-line02 bg-bg-input text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all w-40"
              />
            </div>
          </div>
        </div>

        {/* Row 2: status pills + warning */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {STATUS_PILLS.map(({ label, key, dot, pill }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${pill}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                {counts[key]} {label}
              </span>
            ))}
          </div>
          {unmarkedCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-amber-600">
              <Clock className="w-3.5 h-3.5" />
              {unmarkedCount} students not yet marked
            </span>
          )}
        </div>

        {/* Row 3: progress bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
            <span>Marking progress</span>
            <span>{markedCount}/{total}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden flex">
            {total > 0 && (
              <>
                <div className="bg-green-500 h-full transition-all duration-300" style={{ width: `${(presentCount / total) * 100}%` }} />
                <div className="bg-red-500 h-full transition-all duration-300"   style={{ width: `${(absentCount  / total) * 100}%` }} />
                <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${(lateCount    / total) * 100}%` }} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-line02">
              {[
                { label: "#",                  cls: "px-6 py-3 text-left w-12" },
                { label: "Student Name",       cls: "px-4 py-3 text-left" },
                { label: "Attendance Status",  cls: "px-4 py-3 text-center" },
                { label: "Time Marked",        cls: "px-6 py-3 text-right" },
              ].map(({ label, cls }) => (
                <th key={label} className={`${cls} text-xs font-semibold text-text-muted uppercase tracking-wide`}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {paginatedStudents.map((student, idx) => (
              <motion.tr
                key={student.id}
                variants={rowVariant}
                className="border-b border-border-line02 last:border-0 hover:bg-gray-50/40 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-text-muted">
                  {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex-center text-xs font-semibold shrink-0 ${avatarColor(student.name)}`}>
                      {getInitials(student.name)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-nav">{student.name}</p>
                      <p className="text-xs text-text-muted">{student.admNo}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {(["present", "absent", "late"] as AttendanceStatus[]).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => onToggleStatus(student.id, status)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          student.status === status ? STATUS_ACTIVE[status] : STATUS_IDLE
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-text-muted">
                  {student.timeMarked ?? "--:--"}
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredCount > 0 && (
        <div className="px-6 py-4 border-t border-border-line02 flex items-center justify-between">
          <p className="text-sm text-text-muted">
            Showing{" "}
            <span className="font-medium text-text-nav">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredCount)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-text-nav">{filteredCount}</span> students
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-text-secondary"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-lg flex-center text-sm font-medium transition-colors ${
                  p === currentPage
                    ? "bg-brand-primary text-white"
                    : "text-text-secondary hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg flex-center hover:bg-gray-100 disabled:opacity-30 transition-colors text-text-secondary"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* Footer bar */}
      <div className="px-6 py-4 bg-gray-50 border-t border-border-line02 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
          {FOOTER_STATS.map(({ label, key, dot, text }) => (
            <span key={label} className={`flex items-center gap-1.5 ${text}`}>
              <span className={`w-2 h-2 rounded-full ${dot}`} />
              {counts[key]} {label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={onReset}
            disabled={isSaving}
          >
            Reset
          </Button>
          <Button variant="primary" size="sm" onClick={onSave} isLoading={isSaving}>
            Save Attendance
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Empty state (used when no class loaded yet) ───────────────────────────
export function AttendanceEmptyState() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-2xl card-shadow p-16 flex flex-col items-center justify-center text-center min-h-110"
    >
      <div className="w-20 h-20 rounded-full bg-blue-50 flex-center mb-4">
        <CalendarCheck className="w-9 h-9 text-brand-primary" />
      </div>
      <h3 className="text-lg font-semibold text-text-nav mb-2">
        Ready to take attendance
      </h3>
      <p className="text-sm text-text-muted max-w-xs">
        Select a class, group and date above, then click{" "}
        <span className="font-semibold text-text-nav">Load Students</span>
      </p>
    </motion.div>
  );
}