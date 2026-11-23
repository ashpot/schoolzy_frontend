import { motion } from "framer-motion";
import { BookOpen, GraduationCap, TrendingUp } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { initials2 } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { schoolTileClass } from "@/usersDashboard/super-admin/features/subscriptions/utils/tones";
import { rowVariant, staggerContainer } from "../../animations/variants";
import type { FastGrower } from "../../types/growth";

const th = "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted";

export default function FastestGrowingTable({ schools }: { schools: FastGrower[] }) {
  return (
    <SectionCard title="Fastest Growing Schools" subtitle="Schools with the highest user growth this period">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="bg-bg-input">
              <th className={th}>School</th><th className={th}>Students Added</th><th className={th}>Teachers Added</th><th className={th}>Growth %</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {schools.map((s) => (
              <motion.tr key={s.id} variants={rowVariant} className="border-t border-border-line02">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className={cn("flex-center h-10 w-10 shrink-0 rounded-xl text-xs font-semibold", schoolTileClass(s.name))}>{initials2(s.name)}</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{s.name}</p>
                      <p className="text-xs text-text-muted">{s.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-sm tabular-nums text-text-primary"><span className="flex items-center gap-2"><GraduationCap size={15} className="text-sa-blue-icon" aria-hidden /> +{s.students}</span></td>
                <td className="px-4 py-3.5 text-sm tabular-nums text-text-primary"><span className="flex items-center gap-2"><BookOpen size={15} className="text-sa-green-icon" aria-hidden /> +{s.teachers}</span></td>
                <td className="px-4 py-3.5 text-sm font-semibold tabular-nums text-sa-green-text"><span className="flex items-center gap-1.5"><TrendingUp size={14} aria-hidden /> +{s.growth}%</span></td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </SectionCard>
  );
}