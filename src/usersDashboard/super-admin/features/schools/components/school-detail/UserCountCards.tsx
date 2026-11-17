import { motion } from "framer-motion";
import { BookOpen, ShieldCheck, User, Users } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { toneIconTile } from "@/usersDashboard/super-admin/shared/utils/tones";
import { fadeUp, staggerContainer } from "../../animations/variants";
import { formatNumber } from "../../utils/format";
import type { SchoolUsersData } from "../../types/detail";

export default function UserCountCards({ counts }: { counts: SchoolUsersData["counts"] }) {
  const items = [
    { label: "Students", value: counts.students, icon: Users, tone: "blue" as const },
    { label: "Teachers", value: counts.teachers, icon: BookOpen, tone: "purple" as const },
    { label: "Parents", value: counts.parents, icon: User, tone: "green" as const },
    { label: "Admins", value: counts.admins, icon: ShieldCheck, tone: "amber" as const },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ label, value, icon: Icon, tone }) => (
        <motion.article
          key={label}
          variants={fadeUp}
          whileHover={{ y: -3 }}
          className="flex items-center gap-4 rounded-3xl border border-border-line02 bg-white p-5 transition-shadow hover:card-shadow"
        >
          <span className={cn("flex-center h-12 w-12 shrink-0 rounded-xl", toneIconTile[tone])}>
            <Icon size={22} aria-hidden />
          </span>
          <div>
            <p className="font-lato text-2xl font-semibold tabular-nums text-text-primary">{formatNumber(value)}</p>
            <p className="text-sm text-text-secondary">{label}</p>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}