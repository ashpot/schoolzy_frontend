import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import type { Child } from "../../types";

const AVATAR_COLORS = [
  "bg-purple-100 text-purple-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-amber-100 text-amber-700",
];

function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}
function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

export default function MyKidsCard({ children }: { children: Child[] }) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-bg-input flex-center">
            <Users size={16} className="text-brand-primary" />
          </div>
          <h2 className="section-title">My Kids</h2>
        </div>
        <span className="w-6 h-6 rounded-full bg-blue-50 text-brand-primary text-xs flex-center font-medium">
          {children.length}
        </span>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="text-xs text-text-muted uppercase">
            <th className="pb-3 font-medium">Admission No.</th>
            <th className="pb-3 font-medium">Full Name</th>
            <th className="pb-3 font-medium">Gender</th>
            <th className="pb-3 font-medium">Class</th>
          </tr>
        </thead>
        <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
          {children.map((child) => (
            <motion.tr key={child.id} variants={rowVariant} className="border-t border-border-line02">
              <td className="py-3 text-body-small text-text-secondary">{child.admissionNo}</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex-center text-xs font-semibold ${avatarColor(child.fullName)}`}>
                    {getInitials(child.fullName)}
                  </div>
                  <span className="text-body text-text-primary">{child.fullName}</span>
                </div>
              </td>
              <td className="py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs ${child.gender === "Male" ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-600"}`}>
                  {child.gender}
                </span>
              </td>
              <td className="py-3 text-body-small text-text-secondary">{child.class}</td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
}