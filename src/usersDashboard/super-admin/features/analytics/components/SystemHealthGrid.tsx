import { motion } from "framer-motion";
import { Database, HardDrive, Mail, MessageSquare, Server, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { toneBar, toneIconTile } from "@/usersDashboard/super-admin/shared/utils/tones";
import { fadeUp, staggerContainer } from "../animations/variants";
import type { HealthItem, HealthKey } from "../types";

const META: Record<HealthKey, { label: string; icon: LucideIcon }> = {
  api: { label: "API Response Time", icon: Zap },
  db: { label: "Database Health", icon: Database },
  load: { label: "Server Load", icon: Server },
  storage: { label: "Storage Usage", icon: HardDrive },
  email: { label: "Email Delivery Rate", icon: Mail },
  sms: { label: "SMS Delivery Rate", icon: MessageSquare },
};

export default function SystemHealthGrid({ items }: { items: HealthItem[] }) {
  return (
    <section aria-labelledby="sa-health-title">
      <h2 id="sa-health-title" className="section-title mb-4">System Health</h2>
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((h) => {
          const { label, icon: Icon } = META[h.key];
          const tone = h.warn ? "amber" : "green";
          return (
            <motion.article key={h.key} variants={fadeUp} className="rounded-3xl border border-border-line02 bg-white p-5">
              <div className="flex items-center gap-3">
                <span className={cn("flex-center h-11 w-11 shrink-0 rounded-xl", toneIconTile[tone])}>
                  <Icon size={20} aria-hidden />
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-text-primary">{h.value}</p>
                  <p className="text-xs text-text-secondary">{label}</p>
                </div>
                <span className={cn("h-2.5 w-2.5 rounded-full", toneBar[tone])} aria-hidden />
              </div>
              <div role="progressbar" aria-label={label} aria-valuenow={Math.round(h.progress)} aria-valuemin={0} aria-valuemax={100} className="mt-4 h-1.5 overflow-hidden rounded-full bg-sa-gray-line">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${h.progress}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={cn("h-full rounded-full", toneBar[tone])}
                />
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}