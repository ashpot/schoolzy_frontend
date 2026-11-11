import { motion } from "framer-motion";
import { Activity, Database, Server, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { toneBar } from "@/usersDashboard/super-admin/shared/utils/tones";
import type { HealthId, HealthMetric } from "../../types";

const ICONS: Record<HealthId, LucideIcon> = {
  uptime: Server,
  response: Activity,
  storage: Database,
  sessions: Users,
};

const iconColor: Record<string, string> = {
  green: "text-success",
  amber: "text-warning",
  blue: "text-brand-primary",
};

export default function SystemHealth({ metrics }: { metrics: HealthMetric[] }) {
  return (
    <SectionCard
      title="System Health"
      subtitle="Live infrastructure status"
      action={
        <span className="flex items-center gap-2 text-sm font-medium text-success">
          <span className="h-2 w-2 rounded-full bg-success" aria-hidden /> Operational
        </span>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m) => {
          const Icon = ICONS[m.id];
          return (
            <div key={m.id} className="rounded-2xl border border-border-line02 bg-bg-input p-4">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Icon size={16} className={cn(iconColor[m.tone])} aria-hidden />
                {m.label}
              </div>
              <p className="mt-4 font-lato text-2xl font-semibold text-text-primary">{m.value}</p>
              <div
                role="progressbar"
                aria-valuenow={Math.round(m.progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={m.label}
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-200"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={cn("h-full rounded-full", toneBar[m.tone])}
                />
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}