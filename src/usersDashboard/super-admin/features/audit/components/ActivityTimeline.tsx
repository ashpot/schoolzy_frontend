import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { toneIconTile, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { rowVariant, staggerContainer } from "../animations/variants";
import type { AuditLog } from "../types";
import { clock, dayMonth, isToday } from "../utils/format";
import { actionIcon } from "../utils/tones";

const tone = (l: AuditLog): Tone => (l.status === "Failed" ? "red" : l.status === "Critical" ? "purple" : "green");

export default function ActivityTimeline({ logs }: { logs: AuditLog[] }) {
  const recent = [...logs].sort((a, b) => +new Date(b.at) - +new Date(a.at)).slice(0, 9);

  return (
    <SectionCard title="Recent Activity Timeline" subtitle="Chronological view of today's platform events">
      <motion.ol variants={staggerContainer} initial="hidden" animate="show">
        {recent.map((l, i) => {
          const Icon = actionIcon[l.action];
          return (
            <motion.li key={l.id} variants={rowVariant} className="relative flex gap-4 pb-5 last:pb-0">
              {i < recent.length - 1 && <span aria-hidden className="absolute bottom-0 left-5 top-11 w-px bg-border-line02" />}
              <span className={cn("flex-center h-10 w-10 shrink-0 rounded-xl", toneIconTile[tone(l)])}><Icon size={17} aria-hidden /></span>
              <div>
                <p className="text-sm font-semibold text-text-primary">{l.summary}</p>
                <p className="text-xs text-text-muted">{l.user} · {isToday(l.at) ? "Today" : dayMonth(l.at)} {clock(l.at)}</p>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </SectionCard>
  );
}