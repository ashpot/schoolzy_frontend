import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { rowVariant } from "../../animations/variants";
import { formatDate } from "../../utils/format";
import { avatarClass, getInitial, planTone } from "../../utils/schoolTones";
import type { School } from "../../types";
import type { QueueDecision } from "../../types/queues";

interface PendingRowProps {
  school: School;
  onDetails: (s: School) => void;
  onDecide: (a: QueueDecision, s: School) => void;
}

const btn = "rounded-xl px-4 py-2.5 text-sm font-medium transition-[filter] hover:brightness-95";

export default function PendingRow({ school, onDetails, onDecide }: PendingRowProps) {
  return (
    <motion.tr layout variants={rowVariant} exit="exit" className="border-t border-border-line02 transition-colors hover:bg-sa-row-hover">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <span className={cn("flex-center h-12 w-12 shrink-0 rounded-xl text-lg font-semibold text-white", avatarClass(school.name))}>
            {getInitial(school.name)}
          </span>
          <div>
            <p className="font-semibold text-text-primary">{school.name}</p>
            <p className="text-xs text-text-muted">Location not provided</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-text-primary">{school.admin ?? "—"}</td>
      <td className="px-4 py-4 text-sm text-text-secondary">—</td>
      <td className="px-4 py-4 text-sm text-text-secondary">{formatDate(school.createdAt)}</td>
      <td className="px-4 py-4">
        <StatusBadge label={school.plan ?? "No plan"} tone={planTone(school.plan)} />
      </td>
      <td className="px-4 py-4 text-sm text-text-secondary">—</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <motion.button type="button" whileTap={{ scale: 0.96 }} onClick={() => onDecide("approve", school)} className={cn(btn, "bg-sa-green-icon text-white")}>
            Approve
          </motion.button>
          <motion.button type="button" whileTap={{ scale: 0.96 }} onClick={() => onDecide("reject", school)} className={cn(btn, "bg-sa-red-icon text-white")}>
            Reject
          </motion.button>
          <motion.button type="button" whileTap={{ scale: 0.96 }} onClick={() => onDetails(school)} className={cn(btn, "bg-sa-blue-soft text-sa-blue-text")}>
            Details
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
}