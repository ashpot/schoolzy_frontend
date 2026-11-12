import { Link } from "react-router-dom";
import { Building2, CreditCard, DollarSign, Megaphone, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { toneIconTile, toneTile } from "@/usersDashboard/super-admin/shared/utils/tones";
import { quickActions } from "../../data/quickActions";
import type { QuickActionId } from "../../types";

const ICONS: Record<QuickActionId, LucideIcon> = {
  addSchool: Building2,
  announce: Megaphone,
  payments: DollarSign,
  newPlan: CreditCard,
};

export default function QuickActions() {
  return (
    <SectionCard title="Quick Actions" subtitle="Common platform tasks">
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((a) => {
          const Icon = ICONS[a.id];
          return (
            <Link
              key={a.id}
              to={a.to}
              className={cn(
                "flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-2xl border p-4 text-center text-sm font-medium text-text-primary transition-transform hover:-translate-y-0.5",
                toneTile[a.tone]
              )}
            >
              <span className={cn("flex-center h-12 w-12 rounded-xl bg-white", toneIconTile[a.tone].split(" ")[1])}>
                <Icon size={22} aria-hidden />
              </span>
              {a.label}
            </Link>
          );
        })}
      </div>
    </SectionCard>
  );
}