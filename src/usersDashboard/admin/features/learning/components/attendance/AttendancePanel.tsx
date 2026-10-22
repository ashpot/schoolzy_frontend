import { useMemo } from "react";
import { motion } from "framer-motion";
import { Info, Users } from "lucide-react";
import AttendanceHeader from "./AttendanceHeader";
import AttendanceRow from "./AttendanceRow";
import AttendanceFooter from "./AttendanceFooter";
import { TablePagination } from "../shared/TablePagination";
import { TableEmptyState } from "../shared/TableEmptyState";
import { ITEMS_PER_PAGE } from "../../shared/utils/constants";
import { countStatuses, formatLongDate } from "../../shared/utils/attendanceMapper";
import { staggerContainer } from "../../animations/variants";
import type { AttendanceSession, AttendanceStatus, AttendanceStudent } from "../../types";

interface AttendancePanelProps {
  session: AttendanceSession;
  students: AttendanceStudent[];
  search: string;
  page: number;
  prefilled: boolean;
  isSaving: boolean;
  saveError?: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onToggleStatus: (id: string, status: AttendanceStatus) => void;
  onMarkAllPresent: () => void;
  onReset: () => void;
  onSave: () => void;
}

const COLUMNS = [
  { label: "#", cls: "px-6 text-left w-12" },
  { label: "Student Name", cls: "px-4 text-left" },
  { label: "Attendance Status", cls: "px-4 text-center" },
];

export default function AttendancePanel(p: AttendancePanelProps) {
  const counts = useMemo(() => countStatuses(p.students), [p.students]);
  const q = p.search.trim().toLowerCase();
  const filtered = useMemo(
    () => p.students.filter((s) => !q || s.name.toLowerCase().includes(q) || s.admNo.toLowerCase().includes(q)),
    [p.students, q]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const page = Math.min(p.page, totalPages); // a restored page may no longer exist
  const start = (page - 1) * ITEMS_PER_PAGE;
  const rows = filtered.slice(start, start + ITEMS_PER_PAGE);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl card-shadow overflow-hidden"
    >
      <AttendanceHeader
        classLabel={p.session.className}
        total={p.students.length}
        counts={counts}
        search={p.search}
        onSearchChange={p.onSearchChange}
        onMarkAllPresent={p.onMarkAllPresent}
      />

      {p.prefilled && (
        <div className="px-6 py-2.5 bg-amber-50 border-b border-amber-100 flex items-center gap-2 text-xs text-amber-700">
          <Info className="w-3.5 h-3.5 shrink-0" />
          Attendance was already taken for {formatLongDate(p.session.date)}. Saving again will resubmit these marks.
        </div>
      )}

      {rows.length === 0 ? (
        <TableEmptyState
          icon={<Users className="w-7 h-7 text-brand-primary" />}
          title={p.students.length === 0 ? "No active students" : "No students match your search"}
          description={p.students.length === 0 ? "This class group has no active students yet" : "Try a different name or admission number"}
          minHeight="240px"
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-line02">
                {COLUMNS.map(({ label, cls }) => (
                  <th key={label} className={`${cls} py-3 text-xs font-semibold text-text-muted uppercase tracking-wide`}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody key={page} variants={staggerContainer} initial="hidden" animate="show">
              {rows.map((student, i) => (
                <AttendanceRow key={student.id} student={student} number={start + i + 1} onToggle={p.onToggleStatus} />
              ))}
            </motion.tbody>
          </table>
        </div>
      )}

      {filtered.length > 0 && (
        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          startIndex={start + 1}
          endIndex={Math.min(start + ITEMS_PER_PAGE, filtered.length)}
          totalItems={filtered.length}
          itemLabel="students"
          onPageChange={p.onPageChange}
        />
      )}

      <AttendanceFooter
        counts={counts}
        total={p.students.length}
        isSaving={p.isSaving}
        error={p.saveError}
        onReset={p.onReset}
        onSave={p.onSave}
      />
    </motion.div>
  );
}