import { motion } from "framer-motion";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import ViewAllLink from "@/usersDashboard/super-admin/shared/components/ViewAllLink";
import { SA_PATHS } from "@/usersDashboard/super-admin/shared/config/saPaths";
import { rowVariant, staggerContainer } from "../../animations/variants";
import { planTone, schoolStatusTone } from "../../utils/statusTones";
import type { RecentSchool } from "../../types";

const th = "pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wider text-text-muted";

export default function RecentSchoolsTable({ schools }: { schools: RecentSchool[] }) {
  return (
    <SectionCard
      title="Recent Schools"
      subtitle="Latest schools added to the platform"
      action={<ViewAllLink to={SA_PATHS.schools} />}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px] text-left">
          <thead>
            <tr>
              <th className={th}>School</th>
              <th className={th}>Location</th>
              <th className={th}>Plan</th>
              <th className={th}>Status</th>
              <th className={`${th} pr-0 text-right`}>Students</th>
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {schools.map((s) => (
              <motion.tr key={s.id} variants={rowVariant} className="border-t border-border-line02">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <span className="flex-center h-10 w-10 shrink-0 rounded-xl bg-bg-dark text-sm font-semibold text-white">
                      {s.name[0]}
                    </span>
                    <span className="text-sm font-medium text-text-primary">{s.name}</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-sm text-text-secondary">{s.location}</td>
                <td className="py-4 pr-4"><StatusBadge label={s.plan} tone={planTone[s.plan]} /></td>
                <td className="py-4 pr-4"><StatusBadge label={s.status} tone={schoolStatusTone[s.status]} /></td>
                <td className="py-4 text-right text-sm font-medium text-text-primary">
                  {s.students.toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </SectionCard>
  );
}