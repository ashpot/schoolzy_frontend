import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, CreditCard, FileText, GraduationCap, ShoppingBag, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { toneIconTile, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { formatCompactNaira, formatNumber } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { rowVariant, staggerContainer } from "../animations/variants";
import type { UsageData } from "../types";

const TILES: { key: keyof UsageData; label: string; icon: LucideIcon; tone: Tone }[] = [
  { key: "lessonNotes", label: "Lesson Notes Uploaded", icon: BookOpen, tone: "blue" },
  { key: "results", label: "Results Uploaded", icon: FileText, tone: "green" },
  { key: "attendance", label: "Attendance Records", icon: CheckCircle2, tone: "amber" },
  { key: "onlineTests", label: "Online Tests Completed", icon: GraduationCap, tone: "purple" },
  { key: "feesPaid", label: "Fees Paid", icon: CreditCard, tone: "red" },
  { key: "inventorySales", label: "Inventory Sales", icon: ShoppingBag, tone: "green" },
];

export default function PlatformUsageCard({ usage }: { usage: UsageData }) {
  return (
    <SectionCard title="Platform Usage" subtitle="Activity across all schools this period">
      <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="grid gap-3 sm:grid-cols-2">
        {TILES.map(({ key, label, icon: Icon, tone }) => (
          <motion.li key={key} variants={rowVariant} className="flex items-center gap-3 rounded-2xl bg-bg-input p-4">
            <span className={cn("flex-center h-10 w-10 shrink-0 rounded-xl", toneIconTile[tone])}>
              <Icon size={18} aria-hidden />
            </span>
            <div>
              <p className="text-base font-semibold tabular-nums text-text-primary">
                {key === "feesPaid" ? formatCompactNaira(usage[key]) : formatNumber(usage[key])}
              </p>
              <p className="text-xs text-text-secondary">{label}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </SectionCard>
  );
}