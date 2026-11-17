import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { SA_PATHS } from "@/usersDashboard/super-admin/shared/config/saPaths";
import { rowVariant } from "../../animations/variants";
import { formatDate, formatNumber } from "../../utils/format";
import { avatarClass, getInitial, planTone, schoolStatusTone } from "../../utils/schoolTones";
import type { School, SchoolAction } from "../../types";
import SchoolActionsMenu from "./SchoolActionsMenu";

interface SchoolRowProps {
  school: School;
  onAction: (action: SchoolAction, school: School) => void;
}

export default function SchoolRow({ school, onAction }: SchoolRowProps) {
  return (
    <motion.tr
      layout
      variants={rowVariant}
      exit="exit"
      onClick={() => onAction("view", school)}
      className="cursor-pointer border-t border-border-line02 transition-colors hover:bg-sa-row-hover"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <span
            className={cn(
              "flex-center h-12 w-12 shrink-0 rounded-xl text-lg font-semibold text-white",
              avatarClass(school.name)
            )}
          >
            {getInitial(school.name)}
          </span>
          <Link
            to={SA_PATHS.schoolDetail(school.id)}
            onClick={(e) => e.stopPropagation()}
            className="font-semibold text-text-primary hover:text-brand-primary"
          >
            {school.name}
          </Link>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-text-muted">{school.code ?? "—"}</td>
      <td className="px-4 py-4 text-sm text-text-primary">{school.admin ?? "—"}</td>
      <td className="px-4 py-4 text-sm font-medium text-text-primary tabular-nums">{formatNumber(school.students)}</td>
      <td className="px-4 py-4 text-sm font-medium text-text-primary tabular-nums">{formatNumber(school.teachers)}</td>
      <td className="px-4 py-4">
        <StatusBadge label={school.plan ?? "No plan"} tone={planTone(school.plan)} />
      </td>
      <td className="px-4 py-4 text-sm text-text-secondary">{formatDate(school.renewalDate)}</td>
      <td className="px-4 py-4"><StatusBadge label={school.status} tone={schoolStatusTone[school.status]} /></td>
      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
        <SchoolActionsMenu school={school} onAction={onAction} />
      </td>
    </motion.tr>
  );
}