import { Pencil } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { schoolTileClass } from "@/usersDashboard/super-admin/features/subscriptions/utils/tones";
import type { Role } from "../types";
import { countGranted } from "../utils/derive";
import { dayMonthYear, monthYear, userCount } from "../utils/format";

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-text-primary">{value}</dd>
    </div>
  );
}

export default function RoleHeader({ role, onEdit }: { role: Role; onEdit: () => void }) {
  return (
    <section className="rounded-3xl border border-border-line02 bg-white p-6 lg:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className={cn("flex-center h-14 w-14 shrink-0 rounded-2xl text-xl font-semibold", schoolTileClass(role.name))}>{role.name[0]?.toUpperCase()}</span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-jakarta text-xl font-semibold text-text-primary">{role.name}</h2>
              {role.system && <StatusBadge label="System" tone="red" />}
              <StatusBadge label={role.active ? "Active" : "Inactive"} tone={role.active ? "green" : "gray"} />
            </div>
            <p className="mt-1 text-sm text-text-secondary">{role.description}</p>
          </div>
        </div>
        {!role.system && (
          <button type="button" aria-label={`Edit ${role.name}`} onClick={onEdit} className="rounded-lg p-2 text-text-muted hover:bg-sa-gray-soft hover:text-text-primary">
            <Pencil size={18} />
          </button>
        )}
      </div>
      <dl className="mt-6 grid gap-5 border-t border-border-line02 pt-6 sm:grid-cols-3">
        <Meta label="Users Assigned" value={userCount(role.users)} />
        <Meta label="Permissions" value={`${countGranted(role.permissions)} granted`} />
        <Meta label="Created By" value={role.createdBy} />
        <Meta label="Created" value={monthYear(role.createdAt)} />
        <Meta label="Last Modified" value={dayMonthYear(role.updatedAt)} />
        <Meta label="Status" value={role.active ? "Active" : "Inactive"} />
      </dl>
    </section>
  );
}