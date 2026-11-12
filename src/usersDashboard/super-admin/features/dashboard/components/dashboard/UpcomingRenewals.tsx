import { motion } from "framer-motion";
import { CalendarClock, Clock } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import EmptyPanel from "@/usersDashboard/super-admin/shared/components/EmptyPanel";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { toneIconTile, toneTile } from "@/usersDashboard/super-admin/shared/utils/tones";
import { rowVariant, staggerContainer } from "../../animations/variants";
import { formatNaira } from "../../utils/format";
import { RENEWAL_URGENT_DAYS } from "../../utils/statusTones";
import type { Renewal } from "../../types";

export default function UpcomingRenewals({ renewals }: { renewals: Renewal[] }) {
  return (
    <SectionCard title="Upcoming Renewals" subtitle="Schools renewing soon">
      {renewals.length === 0 ? (
        <EmptyPanel icon={CalendarClock} title="No upcoming renewals" hint="Nothing is due to renew soon." />
      ) : (
        <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="space-y-3">
          {renewals.map((r) => {
            const urgent = r.daysLeft != null && r.daysLeft <= RENEWAL_URGENT_DAYS;
            return (
              <motion.li
                key={r.id}
                variants={rowVariant}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border p-4",
                  urgent ? toneTile.amber : toneTile.gray
                )}
              >
                <span className={cn("flex-center h-10 w-10 shrink-0 rounded-xl", toneIconTile[urgent ? "amber" : "blue"])}>
                  <Clock size={18} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-text-primary">{r.school}</p>
                  <p className="mt-0.5 text-xs text-text-muted">
                    {r.plan}
                    {r.amount != null && ` · ${formatNaira(r.amount)}`}
                  </p>
                </div>
                <StatusBadge
                  label={r.daysLeft == null ? "—" : `${r.daysLeft}d left`}
                  tone={urgent ? "amber" : "blue"}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </SectionCard>
  );
}