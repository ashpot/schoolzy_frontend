import { Building2, CreditCard, Headphones, Plus, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { initials2 } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { planTone, schoolTileClass } from "@/usersDashboard/super-admin/features/subscriptions/utils/tones";
import type { Conversation } from "../../types";

interface Props {
  conversation: Conversation;
  onOpenSchool: () => void;
  onCreateTicket: () => void;
  onViewSubscription: () => void;
}

function Detail({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-bg-input px-4 py-3 text-sm">
      <span className="flex items-center gap-2.5 text-text-secondary"><Icon size={16} aria-hidden /> {label}</span>
      <span className="font-semibold text-text-primary">{value}</span>
    </div>
  );
}

function QuickAction({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 rounded-xl border border-border-line02 px-4 py-3 text-sm font-medium text-text-primary transition-colors hover:border-brand-primary hover:text-brand-primary">
      <Icon size={16} className="text-sa-blue-icon" aria-hidden /> {label}
    </button>
  );
}

export default function SchoolDetailsPanel({ conversation: c, onOpenSchool, onCreateTicket, onViewSubscription }: Props) {
  return (
    <aside className="rounded-3xl border border-border-line02 bg-white p-6" aria-label="School details">
      <div className="text-center">
        <span className={cn("flex-center mx-auto h-16 w-16 rounded-2xl text-xl font-semibold", schoolTileClass(c.school))}>{initials2(c.school)}</span>
        <p className="mt-3 font-jakarta text-lg font-semibold text-text-primary">{c.school}</p>
        <p className="text-sm text-text-secondary">{c.location} · {c.contact}</p>
        <div className="mt-2"><StatusBadge label={c.plan} tone={planTone(c.plan)} /></div>
      </div>

      <h3 className="mt-6 text-[11px] font-semibold uppercase tracking-wider text-text-muted">Details</h3>
      <div className="mt-3 space-y-2">
        <Detail icon={CreditCard} label="Subscription" value={c.plan} />
        <Detail icon={Headphones} label="Open Tickets" value={String(c.openTickets)} />
        <Detail icon={Building2} label="Status" value={c.online ? "Online" : "Offline"} />
      </div>

      <h3 className="mt-6 text-[11px] font-semibold uppercase tracking-wider text-text-muted">Recent Activity</h3>
      <ul className="mt-3 space-y-2.5">
        {c.recent.map((r) => (
          <li key={r} className="flex items-center gap-3 text-sm text-text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-sa-blue-icon" aria-hidden /> {r}
          </li>
        ))}
      </ul>

      <h3 className="mt-6 text-[11px] font-semibold uppercase tracking-wider text-text-muted">Quick Actions</h3>
      <div className="mt-3 space-y-2">
        <QuickAction icon={Building2} label="Open School" onClick={onOpenSchool} />
        <QuickAction icon={Plus} label="Create Ticket" onClick={onCreateTicket} />
        <QuickAction icon={CreditCard} label="View Subscription" onClick={onViewSubscription} />
      </div>
    </aside>
  );
}