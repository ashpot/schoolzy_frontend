import { motion } from "framer-motion";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { cn } from "@/shared/utils/cn";
import { rowVariant, staggerContainer } from "../../animations/variants";
import type { SchoolAcademics } from "../../types/detail";

const COLORS = ["bg-sa-avatar-blue", "bg-sa-avatar-purple", "bg-sa-avatar-amber", "bg-sa-avatar-teal", "bg-sa-avatar-pink"];

export default function ActiveTeachers({ teachers }: { teachers: SchoolAcademics["topTeachers"] }) {
  const max = Math.max(...teachers.map((t) => t.count), 1);

  return (
    <SectionCard title="Most Active Teachers" subtitle="By activity count this term">
      <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="space-y-5">
        {teachers.map((t, i) => {
          const color = COLORS[i % COLORS.length];
          return (
            <motion.li key={t.id} variants={rowVariant}>
              <div className="flex items-center gap-3">
                <span className={cn("flex-center h-9 w-9 shrink-0 rounded-full text-sm font-semibold text-white", color)}>
                  {t.name[0]}
                </span>
                <p className="flex-1 text-sm">
                  <span className="font-semibold text-text-primary">{t.name}</span>
                  <span className="ml-2 text-xs text-text-muted">{t.subject}</span>
                </p>
                <span className="text-sm font-semibold tabular-nums text-text-primary">{t.count}</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-sa-gray-line">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(t.count / max) * 100}%` }}
                  transition={{ duration: 0.7, delay: 0.1 * i, ease: "easeOut" }}
                  className={cn("h-full rounded-full", color)}
                />
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </SectionCard>
  );
}