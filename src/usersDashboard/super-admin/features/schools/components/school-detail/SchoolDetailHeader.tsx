import { motion } from "framer-motion";
import { Ban, LogIn, RotateCcw, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { toneText, toneTile, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { fadeUp } from "../../animations/variants";
import { formatDate } from "../../utils/format";
import { avatarClass, getInitial, planTone, schoolStatusTone } from "../../utils/schoolTones";
import type { DetailDialog, SchoolDetail } from "../../types/detail";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  tone: Tone;
  onClick: () => void;
}

function ActionButton({ icon: Icon, label, tone, onClick }: ActionButtonProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition-[filter] hover:brightness-95",
        toneTile[tone],
        toneText[tone]
      )}
    >
      <Icon size={16} aria-hidden /> {label}
    </motion.button>
  );
}

interface SchoolDetailHeaderProps {
  school: SchoolDetail;
  onAction: (a: DetailDialog) => void;
}

export default function SchoolDetailHeader({ school, onAction }: SchoolDetailHeaderProps) {
  const suspended = school.status === "Suspended";
  const meta = [
    ["Code", school.code ?? "—"],
    ["Renewal", formatDate(school.renewalDate)],
    ["State", school.state ?? "—"],
    ["Joined", formatDate(school.createdAt)],
  ];

  return (
    <motion.section
      variants={fadeUp}
      className="flex flex-wrap items-start justify-between gap-6 rounded-3xl border border-border-line02 bg-white p-6 lg:p-8"
    >
      <div className="flex items-start gap-5">
        <span
          className={cn(
            "flex-center h-20 w-20 shrink-0 rounded-2xl text-4xl font-semibold text-white",
            avatarClass(school.name)
          )}
        >
          {getInitial(school.name)}
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-jakarta text-2xl font-semibold text-text-primary">{school.name}</h2>
            <StatusBadge label={school.status} tone={schoolStatusTone[school.status]} />
            <StatusBadge label={school.plan ?? "No plan"} tone={planTone(school.plan)} />
          </div>
          <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            {meta.map(([k, v]) => (
              <div key={k} className="flex gap-1.5">
                <dt className="font-medium text-text-primary">{k}:</dt>
                <dd className="text-text-secondary">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <ActionButton icon={LogIn} label="Login as Admin" tone="blue" onClick={() => onAction("impersonate")} />
        <ActionButton icon={RotateCcw} label="Renew Subscription" tone="green" onClick={() => onAction("renew")} />
        {suspended ? (
          <ActionButton icon={RotateCcw} label="Reactivate School" tone="green" onClick={() => onAction("reactivate")} />
        ) : (
          <ActionButton icon={Ban} label="Suspend School" tone="red" onClick={() => onAction("suspend")} />
        )}
      </div>
    </motion.section>
  );
}