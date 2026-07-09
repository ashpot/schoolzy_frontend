import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { roleStyles } from "../../utils/roleStyles";
import type { Classmate } from "../../types";
import { staggerContainer } from "@/usersDashboard/parent/features/fees/animations/variants";
import { rowVariant } from "@/usersDashboard/admin/features/tests/animations/variants";

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700", "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700", "bg-indigo-100 text-indigo-700",
];
function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}
function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

export default function ClassListTable({ classmates }: { classmates: Classmate[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => classmates.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [classmates, search]
  );

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-brand-primary" />
          <h3 className="section-title">My Classmates</h3>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs">
            {classmates.length} students
          </span>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search classmate..."
          className="px-3 py-2 text-sm rounded-lg border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-text-muted uppercase border-b border-border-line02">
              <th className="py-3 px-6">Photo & Full Name</th>
              <th className="py-3 px-6">Gender</th>
              <th className="py-3 px-6">Role</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {filtered.map((c) => (
              <motion.tr
                key={c.id}
                variants={rowVariant}
                className={`border-b border-border-line02 last:border-0 hover:bg-gray-50/50 ${c.isCurrentUser ? "bg-blue-50/40" : ""}`}
              >
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex-center text-xs font-semibold ${avatarColor(c.name)}`}>
                      {getInitials(c.name)}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary flex items-center gap-2">
                        {c.name}
                        {c.isCurrentUser && (
                          <span className="px-1.5 py-0.5 rounded bg-brand-primary text-white text-[10px]">You</span>
                        )}
                      </p>
                      <p className="text-xs text-text-muted">{c.className}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-6 text-text-secondary">{c.gender}</td>
                <td className="py-3 px-6">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleStyles[c.role]}`}>
                    {c.role}
                  </span>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}