import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { toneBar, toneText } from "@/usersDashboard/super-admin/shared/utils/tones";
import { initials2 } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { planTone, schoolTileClass } from "@/usersDashboard/super-admin/features/subscriptions/utils/tones";
import { rowVariant, staggerContainer } from "../../animations/variants";
import type { HealthRow } from "../../types/growth";
import { riskOf } from "../../utils/growthTones";

const th = "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted";

export default function HealthScoresTable({ rows }: { rows: HealthRow[] }) {
  return (
    <SectionCard title="School Health Scores" subtitle="Overall account health based on activity, payments and engagement">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="bg-bg-input">
              <th className={th}>School</th><th className={th}>Health Score</th><th className={th}>Subscription</th><th className={th}>Risk Level</th><th className={th}>Status</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {rows.map((r) => {
              const { risk, status, tone } = riskOf(r.score);
              return (
                <motion.tr key={r.id} variants={rowVariant} className="border-t border-border-line02">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className={cn("flex-center h-10 w-10 shrink-0 rounded-xl text-xs font-semibold", schoolTileClass(r.name))}>{initials2(r.name)}</span>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{r.name}</p>
                        <p className="text-xs text-text-muted">{r.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div role="progressbar" aria-label={`${r.name} health score`} aria-valuenow={r.score} aria-valuemin={0} aria-valuemax={100} className="h-2 w-24 overflow-hidden rounded-full bg-sa-gray-line">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${r.score}%` }} transition={{ duration: 0.7, ease: "easeOut" }} className={cn("h-full rounded-full", toneBar[tone])} />
                      </div>
                      <span className="text-sm font-semibold tabular-nums text-text-primary">{r.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><StatusBadge label={r.plan} tone={planTone(r.plan)} /></td>
                  <td className={cn("px-4 py-3.5 text-sm font-medium", toneText[tone])}>{risk}</td>
                  <td className="px-4 py-3.5"><StatusBadge label={status} tone={tone} /></td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>
    </SectionCard>
  );
}