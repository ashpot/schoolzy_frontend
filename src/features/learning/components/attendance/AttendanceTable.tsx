import { motion } from "framer-motion";
import { Search, CheckCircle2, RotateCcw } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { TablePagination } from "../shared/TablePagination";
import { getInitials, getAvatarColor } from "../../shared/utils/avatar";
import Button from "@/shared/ui/Button";
import type { AttendanceStudent, AttendanceStatus } from "../../types";
import { AttendanceStats } from "./AttendanceStats";

const STATUS_ACTIVE: Record<string, string> = {
  present: "bg-green-500 text-white border-green-500",
  absent: "bg-red-500 text-white border-red-500",
  late: "bg-amber-500 text-white border-amber-500",
};
const STATUS_IDLE =
  "bg-white text-[var(--color-text-secondary)] border-[var(--color-border-line02)] hover:border-gray-300";

const ITEMS_PER_PAGE = 10;

interface AttendanceTableProps {
  className: string;
  totalStudents: number;
  students: AttendanceStudent[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleStatus: (studentId: string, status: AttendanceStatus) => void;
  onMarkAllPresent: () => void;
  onReset: () => void;
  onSave: () => void;
  isSaving: boolean;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  filteredCount: number;
  onPageChange: (page: number) => void;
  stats: ReturnType<typeof import("@/features/learning/hooks/useStats").useStats>;
}

export function AttendanceTable({
  className,
  totalStudents,
  students,
  searchQuery,
  onSearchChange,
  onToggleStatus,
  onMarkAllPresent,
  onReset,
  onSave,
  isSaving,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  filteredCount,
  onPageChange,
  stats,
}: AttendanceTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl card-shadow overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--color-border-line02)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-[var(--color-text-nav)]">
              {className}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-xs font-medium text-[var(--color-brand-primary)]">
              {totalStudents} Students
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search student..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 pr-4 py-1.5 rounded-lg border border-[var(--color-border-line02)] bg-[var(--color-bg-input)] text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all w-40"
              />
            </div>
          </div>
        </div>

        <AttendanceStats stats={stats} />

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-1.5">
            <span>Marking progress</span>
            <span>
              {stats.marked}/{stats.total}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden flex">
            {stats.total > 0 && (
              <>
                <div
                  className="bg-green-500 h-full transition-all duration-300"
                  style={{ width: `${(stats.present / stats.total) * 100}%` }}
                />
                <div
                  className="bg-red-500 h-full transition-all duration-300"
                  style={{ width: `${(stats.absent / stats.total) * 100}%` }}
                />
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${(stats.late / stats.total) * 100}%` }}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border-line02)]">
              <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide w-12">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                Student Name
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                Attendance Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                Time Marked
              </th>
            </tr>
          </thead>
          <motion.tbody
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {students.map((student, idx) => (
              <motion.tr
                key={student.id}
                variants={rowVariant}
                className="border-b border-[var(--color-border-line02)] last:border-0 hover:bg-gray-50/40 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">
                  {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex-center text-xs font-semibold flex-shrink-0 ${getAvatarColor(
                        student.name
                      )}`}
                    >
                      {getInitials(student.name)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-nav)]">
                        {student.name}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {student.admNo}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {(
                      ["present", "absent", "late"] as AttendanceStatus[]
                    ).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => onToggleStatus(student.id, status)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          student.status === status
                            ? STATUS_ACTIVE[status]
                            : STATUS_IDLE
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </td>

                <td className="px-6 py-4 text-right text-sm font-medium text-[var(--color-text-muted)]">
                  {student.timeMarked ?? "--:--"}
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={filteredCount}
        itemLabel="students"
        onPageChange={onPageChange}
      />

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-[var(--color-border-line02)] flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
          {[
            {
              label: "Present",
              count: stats.present,
              dot: "bg-green-500",
              text: "text-green-700",
            },
            {
              label: "Absent",
              count: stats.absent,
              dot: "bg-red-500",
              text: "text-red-600",
            },
            {
              label: "Late",
              count: stats.late,
              dot: "bg-amber-500",
              text: "text-amber-700",
            },
            {
              label: "Unmarked",
              count: stats.unmarked,
              dot: "bg-gray-300",
              text: "text-gray-500",
            },
          ].map(({ label, count, dot, text }) => (
            <span key={label} className={`flex items-center gap-1.5 ${text}`}>
              <span className={`w-2 h-2 rounded-full ${dot}`} />
              {count} {label}
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
          <Button
            variant="primary"
            size="sm"
            onClick={onSave}
            isLoading={isSaving}
          >
            Save Attendance
          </Button>
        </div>
      </div>
    </motion.div>
  );
}