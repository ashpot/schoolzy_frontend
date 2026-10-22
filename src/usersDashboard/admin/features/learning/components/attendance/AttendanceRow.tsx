import { motion } from "framer-motion";
import { rowVariant } from "../../animations/variants";
import { STATUS_ACTIVE, STATUS_IDLE } from "../../shared/utils/constants";
import { avatarColor, getInitials } from "../../shared/utils/helpers";
import type { AttendanceStatus, AttendanceStudent } from "../../types";

const STATUSES = ["present", "absent", "late"] as const;

interface AttendanceRowProps {
  student: AttendanceStudent;
  number: number;
  onToggle: (id: string, status: AttendanceStatus) => void;
}

export default function AttendanceRow({ student, number, onToggle }: AttendanceRowProps) {
  return (
    <motion.tr
      variants={rowVariant}
      className="border-b border-border-line02 last:border-0 hover:bg-gray-50/40 transition-colors"
    >
      <td className="px-6 py-4 text-sm text-text-muted">{number}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          {student.photo ? (
            <img src={student.photo} alt={student.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
          ) : (
            <div className={`w-9 h-9 rounded-full flex-center text-xs font-semibold shrink-0 ${avatarColor(student.name)}`}>
              {getInitials(student.name)}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-text-nav">{student.name}</p>
            <p className="text-xs text-text-muted">{student.admNo || "—"}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-center gap-2">
          {STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onToggle(student.id, status)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                student.status === status ? STATUS_ACTIVE[status] : STATUS_IDLE
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </td>
    </motion.tr>
  );
}