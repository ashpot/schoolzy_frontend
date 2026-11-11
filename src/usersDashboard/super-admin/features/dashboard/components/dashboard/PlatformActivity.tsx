import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { toneIconTile } from "@/usersDashboard/super-admin/shared/utils/tones";
import { rowVariant, staggerContainer } from "../../animations/variants";
import { activityMeta } from "../../utils/activityMeta";
import type { ActivityItem } from "../../types";

export default function PlatformActivity({ items }: { items: ActivityItem[] }) {
  return (
    <SectionCard title="Platform Activity" subtitle="Real-time platform events">
      <motion.ul variants={staggerContainer} initial="hidden" animate="show">
        {items.map((item) => {
          const { icon: Icon, tone } = activityMeta[item.type];
          return (
            <motion.li
              key={item.id}
              variants={rowVariant}
              className="flex items-start gap-4 border-b border-border-line02 py-4 last:border-b-0"
            >
              <span className={cn("flex-center h-11 w-11 shrink-0 rounded-xl", toneIconTile[tone])}>
                <Icon size={20} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                <p className="mt-0.5 text-xs text-text-muted">{item.detail}</p>
              </div>
              <span className="shrink-0 text-xs text-text-muted">{item.time}</span>
            </motion.li>
          );
        })}
      </motion.ul>
    </SectionCard>
  );
}