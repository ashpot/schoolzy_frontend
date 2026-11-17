import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { toneIconTile } from "@/usersDashboard/super-admin/shared/utils/tones";
import { rowVariant, staggerContainer } from "../../animations/variants";
import { useSchoolActivity } from "../../hooks/useSchoolDetail";
import { activityMeta } from "../../utils/detailTones";
import { exportRowsCsv } from "../../utils/exportRows";
import { formatDateTime } from "../../utils/formatDetail";
import { TabError, TabSkeleton } from "./TabStates";

export default function ActivityTab({ schoolId }: { schoolId: string }) {
  const { data, isLoading, isError, refetch } = useSchoolActivity(schoolId);

  if (isLoading) return <TabSkeleton />;
  if (isError || !data) return <TabError onRetry={() => refetch()} />;

  const handleExport = () =>
    exportRowsCsv("activity-logs", ["Activity", "By", "Category", "When"],
      data.map((a) => [a.title, a.by, a.category, a.at]));

  return (
    <SectionCard
      title="Activity Logs"
      subtitle="Chronological log of all platform activity for this school"
      action={<Button type="button" variant="outline" size="sm" leftIcon={<Download size={14} />} onClick={handleExport}>Export</Button>}
    >
      <motion.ul variants={staggerContainer} initial="hidden" animate="show">
        {data.map((a, i) => {
          const { icon: Icon, tone } = activityMeta[a.category];
          return (
            <motion.li key={a.id} variants={rowVariant} className="relative flex items-start gap-4 pb-6 last:pb-0">
              {i < data.length - 1 && <span aria-hidden className="absolute bottom-0 left-[22px] top-12 w-px bg-border-line02" />}
              <span className={cn("flex-center h-11 w-11 shrink-0 rounded-xl", toneIconTile[tone])}>
                <Icon size={20} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-text-primary">{a.title}</p>
                <p className="text-sm text-text-muted">
                  by <strong className="font-semibold text-text-primary">{a.by}</strong>
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-3">
                <StatusBadge label={a.category} tone={tone} />
                <span className="text-xs text-text-muted">{formatDateTime(a.at)}</span>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </SectionCard>
  );
}