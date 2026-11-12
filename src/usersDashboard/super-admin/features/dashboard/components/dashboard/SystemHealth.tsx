import { motion } from "framer-motion";
import { Activity, Database, Server, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { toneBar, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import type { HealthId, HealthMetric, HealthStatus } from "../../types";

const ICONS: Record<HealthId, LucideIcon> = {
  uptime: Server,
  response: Activity,
  storage: Database,
  sessions: Users,
};

const iconColor: Record<Tone, string> = {
  green: "text-success",
  amber: "text-warning",
  blue: "text-brand-primary",
  red: "text-danger",
  gray: "text-text-muted",
  purple: "text-purple-600",
};

interface SystemHealthProps {
  metrics: HealthMetric[];
  status: HealthStatus;
}

export default function SystemHealth({ metrics, status }: SystemHealthProps) {
  return (
    <SectionCard
      title="System Health"
      subtitle="Live infrastructure status"
      action={
        <span className={cn("flex items-center gap-2 text-sm font-medium", iconColor[status.tone])}>
          <span className={cn("h-2 w-2 rounded-full", toneBar[status.tone])} aria-hidden /> {status.label}
        </span>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m) => {
          const Icon = ICONS[m.id];
          return (
            <div key={m.id} className="rounded-2xl border border-border-line02 bg-bg-input p-4">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Icon size={16} className={iconColor[m.tone]} aria-hidden />
                {m.label}
              </div>
              <p className="mt-4 font-lato text-2xl font-semibold text-text-primary">{m.value}</p>
              {m.progress != null && (
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
                    animate={{ width: `${Math.min(100, Math.max(0, m.progress))}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn("h-full rounded-full", toneBar[m.tone])}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}