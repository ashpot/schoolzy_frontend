import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { avatarColor, getInitials, attendanceBarColor } from "../../utils/avatar";
import type { EnrolledStudent } from "../../types";

export default function EnrolledStudentsTable({
  className,
  students,
}: {
  className: string;
  students: EnrolledStudent[];
}) {
  const [search, setSearch] = useState("");

  const filtered = students.filter((s) =>
    s.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-2">
          <h2 className="section-title">{className}</h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs font-medium">
            {students.length} students
          </span>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student..."
            className="pl-8 pr-3 py-2 text-sm rounded-lg border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 w-56"
          />
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-t border-border-line02 text-xs text-text-muted uppercase tracking-wide">
            <th className="text-left font-medium px-6 py-3">Admission Number</th>
            <th className="text-left font-medium px-6 py-3">Photo</th>
            <th className="text-left font-medium px-6 py-3">Full Name</th>
            <th className="text-left font-medium px-6 py-3">Gender</th>
            <th className="text-left font-medium px-6 py-3">Class</th>
            <th className="text-left font-medium px-6 py-3">Attendance %</th>
          </tr>
        </thead>
        <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
          {filtered.map((s) => (
            <motion.tr
              key={s.id}
              variants={rowVariant}
              className="border-t border-border-line02 hover:bg-gray-50/50"
            >
              <td className="px-6 py-4 text-body-small text-text-secondary">{s.admissionNumber}</td>
              <td className="px-6 py-4">
                <div className={`w-8 h-8 rounded-full flex-center text-xs font-semibold ${avatarColor(s.fullName)}`}>
                  {getInitials(s.fullName)}
                </div>
              </td>
              <td className="px-6 py-4 text-body-small text-text-primary font-medium">{s.fullName}</td>
              <td className="px-6 py-4 text-body-small text-text-secondary">{s.gender}</td>
              <td className="px-6 py-4 text-body-small text-text-secondary">{s.className}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 w-40">
                  <div className="flex-1 h-1.5 rounded-full bg-bg-input overflow-hidden">
                    <div
                      className={`h-full rounded-full ${attendanceBarColor(s.attendancePercent)}`}
                      style={{ width: `${s.attendancePercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-text-primary">{s.attendancePercent}%</span>
                </div>
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>

      {filtered.length === 0 && (
        <div className="py-14 flex flex-col items-center text-center">
          <span className="w-12 h-12 rounded-full bg-blue-50 flex-center mb-3">
            <Users size={20} className="text-brand-primary" />
          </span>
          <p className="text-body-small text-text-primary font-medium">No students found</p>
          <p className="text-xs text-text-muted mt-1">Try a different search term.</p>
        </div>
      )}
    </div>
  );
}