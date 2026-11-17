import { motion } from "framer-motion";
import { Ban, RotateCcw } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { rowVariant } from "../../animations/variants";
import { avatarClass, getInitial, schoolStatusTone } from "../../utils/schoolTones";
import type { ConfirmAction, School } from "../../types";

interface SuspendedRowProps {
  school: School;
  onAction: (a: ConfirmAction, s: School) => void;
}

export default function SuspendedRow({ school, onAction }: SuspendedRowProps) {
  return (
    <motion.tr layout variants={rowVariant} exit="exit" className="border-t border-border-line02 transition-colors hover:bg-sa-row-hover">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="relative shrink-0">
            <span className={cn("flex-center h-12 w-12 rounded-xl text-lg font-semibold text-white", avatarClass(school.name))}>
              {getInitial(school.name)}
            </span>
            <span className="flex-center absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-sa-red-icon text-white">
              <Ban size={10} aria-hidden />
            </span>
          </span>
          <div>
            <p className="font-semibold text-text-primary">{school.name}</p>
            <p className="text-xs text-text-muted">Location not provided</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-text-primary">{school.admin ?? "—"}</td>
      <td className="px-4 py-4 text-sm text-text-secondary">—</td>
      <td className="px-4 py-4 text-sm text-text-secondary">—</td>
      <td className="px-4 py-4">
        <StatusBadge label={school.status} tone={schoolStatusTone[school.status]} />
      </td>
      <td className="px-4 py-4 text-sm text-text-secondary">—</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => onAction("reactivate", school)}
            className="inline-flex items-center gap-2 rounded-xl bg-sa-green-soft px-4 py-2.5 text-sm font-medium text-sa-green-text transition-[filter] hover:brightness-95"
          >
            <RotateCcw size={14} aria-hidden /> Restore
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => onAction("delete", school)}
            className="rounded-xl bg-sa-red-soft px-4 py-2.5 text-sm font-medium text-sa-red-text transition-[filter] hover:brightness-95"
          >
            Delete
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
}