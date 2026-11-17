import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { rowVariant, staggerContainer } from "../../animations/variants";
import { formatDate, formatNaira } from "../../utils/format";
import type { SchoolSubscription } from "../../types/detail";

export default function SubscriptionTimeline({ sub }: { sub: SchoolSubscription }) {
  const { timeline, planSummary: p } = sub;

  return (
    <SectionCard title="Subscription Timeline">
      <motion.ol variants={staggerContainer} initial="hidden" animate="show">
        {timeline.map((item, i) => (
          <motion.li key={item.id} variants={rowVariant} className="relative flex gap-4 pb-6 last:pb-0">
            {i < timeline.length - 1 && <span aria-hidden className="absolute bottom-0 left-5 top-10 w-px bg-sa-green-line" />}
            <span
              className={cn(
                "flex-center h-10 w-10 shrink-0 rounded-full",
                item.done ? "bg-sa-green-icon text-white" : "border-2 border-dashed border-sa-gray-line bg-sa-gray-soft text-sa-gray-icon"
              )}
            >
              {item.done ? <Check size={18} aria-hidden /> : <Clock size={18} aria-hidden />}
            </span>
            <div>
              <p className="font-semibold text-text-primary">{item.label}</p>
              <p className="text-sm text-text-muted">{formatDate(item.date)}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      <div className="mt-6 rounded-2xl border border-sa-blue-line bg-sa-blue-soft p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-sa-blue-text">{sub.plan} plan</p>
        <p className="mt-1 text-lg font-semibold text-text-primary">{formatNaira(p.price)}/yr</p>
        <p className="mt-1 text-sm text-text-secondary">
          Up to {p.students.toLocaleString()} students · {p.teachers} teachers · {p.storageGb} GB storage
        </p>
      </div>
    </SectionCard>
  );
}