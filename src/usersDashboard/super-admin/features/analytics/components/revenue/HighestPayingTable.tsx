import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { formatCompactNaira, formatNaira, initials2 } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { planTone, schoolTileClass } from "@/usersDashboard/super-admin/features/subscriptions/utils/tones";
import { rowVariant, staggerContainer } from "../../animations/variants";
import type { TopPayer } from "../../types/revenue";

const th = "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted";
const fmtDate = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function HighestPayingTable({ schools }: { schools: TopPayer[] }) {
  return (
    <SectionCard title="Highest Paying Schools" subtitle="Schools with the greatest total lifetime revenue">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="bg-bg-input">
              <th className={th}>School</th><th className={th}>Plan</th><th className={th}>Amount Paid</th>
              <th className={th}>Renewal Date</th><th className={th}>Lifetime Revenue</th>
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
                <td className="px-4 py-3.5"><StatusBadge label={s.plan} tone={planTone(s.plan)} /></td>
                <td className="px-4 py-3.5 text-sm font-semibold tabular-nums text-text-primary">{formatNaira(s.amountPaid)}</td>
                <td className="px-4 py-3.5 text-sm text-text-secondary">{fmtDate(s.renewalDate)}</td>
                <td className="px-4 py-3.5 text-sm font-semibold tabular-nums text-sa-green-text">{formatCompactNaira(s.lifetime)}</td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </SectionCard>
  );
}