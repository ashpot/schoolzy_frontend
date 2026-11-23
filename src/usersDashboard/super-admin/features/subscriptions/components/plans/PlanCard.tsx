import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, HardDrive, Headphones, Pencil, Power, PowerOff, Star, Trash2, Users } from "lucide-react";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { fadeUp } from "../../animations/variants";
import type { Plan, PlanMenuKey } from "../../types";
import { formatNaira, formatNumber, yearlySavePct } from "../../utils/format";
import type { MenuItem } from "../../utils/menus";
import ActionMenu from "../shared/ActionMenu";

function menuFor(plan: Plan): MenuItem<PlanMenuKey>[] {
  return [
    { key: "edit", label: "Edit Plan", icon: Pencil },
    plan.recommended
      ? { key: "unrecommend", label: "Remove Most Popular", icon: Star }
      : { key: "recommend", label: "Mark as Most Popular", icon: Star },
    plan.active
      ? { key: "deactivate", label: "Deactivate Plan", icon: PowerOff }
      : { key: "activate", label: "Activate Plan", icon: Power },
    { key: "delete", label: "Delete Plan", icon: Trash2, danger: true },
  ];
}

interface PlanCardProps {
  plan: Plan;
  onMenu: (key: PlanMenuKey) => void;
}

export default function PlanCard({ plan, onMenu }: PlanCardProps) {
  const save = yearlySavePct(plan.monthlyPrice, plan.yearlyPrice);
  const limits = [
    { icon: Users, text: `${formatNumber(plan.maxStudents)} Students` },
    { icon: BookOpen, text: `${formatNumber(plan.maxTeachers)} Teachers` },
    { icon: HardDrive, text: `${plan.storageGb} GB Storage` },
    { icon: Headphones, text: `${plan.support} Support` },
  ];

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className={cn(
        "relative flex flex-col rounded-3xl bg-white p-8 transition-shadow hover:card-shadow",
        plan.recommended ? "border-2 border-brand-primary" : "border border-border-line02",
        !plan.active && "opacity-75"
      )}
    >
      {plan.recommended && (
        <span className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg bg-brand-primary px-5 py-1.5 text-sm font-semibold text-white">
          Most Popular
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <h2 className="font-jakarta text-2xl font-semibold text-text-primary">{plan.name}</h2>
        <ActionMenu label={`Actions for ${plan.name} plan`} items={menuFor(plan)} onSelect={onMenu} />
      </div>

      <p className="mt-6 font-lato text-[40px] font-bold leading-none text-text-primary">
        {formatNaira(plan.monthlyPrice)}
        <span className="ml-1 text-base font-normal text-text-muted">/mo</span>
      </p>
      <p className="mt-4">
        <span className="inline-block rounded-full bg-sa-green-soft px-3 py-1 text-sm font-medium text-sa-green-text">
          {formatNaira(plan.yearlyPrice)}/yr{save > 0 && ` · save ${save}%`}
        </span>
      </p>

      <p className="mt-5 min-h-[3rem] text-sm leading-relaxed text-text-secondary">{plan.description || "No description."}</p>

      <ul className="mt-5 space-y-3">
        {limits.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-sm text-text-primary">
            <Icon size={18} className="text-sa-blue-icon" aria-hidden /> {text}
          </li>
        ))}
      </ul>

      <hr className="my-6 border-border-line02" />

      <ul className="flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-text-primary">
            <CheckCircle2 size={18} className="shrink-0 text-sa-green-icon" aria-hidden /> {f}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-border-line02 pt-5">
        <div className="flex items-center gap-3">
          <StatusBadge label={plan.active ? "Active" : "Inactive"} tone={plan.active ? "green" : "gray"} />
          <span className="text-sm text-text-muted">{formatNumber(plan.schools)} schools</span>
        </div>
        <Button type="button" variant="outline" size="sm" leftIcon={<Pencil size={14} />} onClick={() => onMenu("edit")}>
          Edit
        </Button>
      </div>
    </motion.article>
  );
}