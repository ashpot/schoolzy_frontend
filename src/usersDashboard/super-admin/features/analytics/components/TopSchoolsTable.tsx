import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { formatNumber, initials2 } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { schoolTileClass } from "@/usersDashboard/super-admin/features/subscriptions/utils/tones";
import { rowVariant, staggerContainer } from "../animations/variants";
import type { TopSchool } from "../types";

const th = "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted";

const RANK = ["bg-sa-amber-icon text-white", "bg-sa-gray-line text-sa-gray-text", "bg-sa-avatar-amber text-white"];

export default function TopSchoolsTable({ schools }: { schools: TopSchool[] }) {
  return (
    <SectionCard title="Top Active Schools" subtitle="Ranked by overall platform usage score">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="bg-bg-input">
              <th className={th}>#</th>
              <th className={th}>School</th>
              <th className={th}>Usage Score</th>
              <th className={th}>Active Users</th>
              <th className={th}>Attendance Rate</th>
              <th className={th}>Results Uploaded</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {schools.map((s, i) => (
              <motion.tr key={s.id} variants={rowVariant} className="border-t border-border-line02">
                <td className="px-4 py-3.5">
                  <span className={cn("flex-center h-7 w-7 rounded-full text-xs font-semibold", RANK[i] ?? "text-text-muted")}>{i + 1}</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className={cn("flex-center h-10 w-10 shrink-0 rounded-xl text-xs font-semibold", schoolTileClass(s.name))}>{initials2(s.name)}</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{s.name}</p>
                      <p className="text-xs text-text-muted">{s.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div role="progressbar" aria-label={`${s.name} usage score`} aria-valuenow={s.score} aria-valuemin={0} aria-valuemax={100} className="h-2 w-24 overflow-hidden rounded-full bg-sa-gray-line">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.score}%` }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className={cn("h-full rounded-full", s.score >= 90 ? "bg-sa-green-icon" : "bg-sa-blue-icon")}
                      />
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-text-primary">{s.score}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-sm tabular-nums text-text-primary">{formatNumber(s.activeUsers)}</td>
                <td className="px-4 py-3.5 text-sm tabular-nums text-text-primary">{s.attendanceRate}%</td>
                <td className="px-4 py-3.5 text-sm tabular-nums text-text-primary">{formatNumber(s.results)}</td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </SectionCard>
  );
}