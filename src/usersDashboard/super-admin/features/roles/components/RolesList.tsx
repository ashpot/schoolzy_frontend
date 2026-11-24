import { Lock, Plus } from "lucide-react";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import { schoolTileClass } from "@/usersDashboard/super-admin/features/subscriptions/utils/tones";
import type { Role } from "../types";
import { userCount } from "../utils/format";

interface RolesListProps {
  roles: Role[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
}

export default function RolesList({ roles, activeId, onSelect, onCreate }: RolesListProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-border-line02 bg-white" aria-label="Roles">
      <h2 className="border-b border-border-line02 px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Roles</h2>
      <ul>
        {roles.map((r) => (
          <li key={r.id}>
            <button
              type="button"
              aria-current={r.id === activeId}
              onClick={() => onSelect(r.id)}
              className={cn("flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-sa-row-hover", r.id === activeId && "bg-sa-blue-soft")}
            >
              <span className={cn("flex-center h-10 w-10 shrink-0 rounded-xl text-sm font-semibold", schoolTileClass(r.name))}>{r.name[0]?.toUpperCase()}</span>
              <span className="min-w-0 flex-1">
                <span className={cn("block truncate text-sm font-semibold", r.id === activeId ? "text-brand-primary" : "text-text-primary")}>{r.name}</span>
                <span className="block text-xs text-text-muted">{userCount(r.users)}</span>
              </span>
              {r.system && <Lock size={14} className="shrink-0 text-text-muted" aria-label="System role" />}
            </button>
          </li>
        ))}
      </ul>
      <div className="border-t border-border-line02 p-4">
        <Button type="button" variant="outline" className="w-full" leftIcon={<Plus size={16} />} onClick={onCreate}>Create Role</Button>
      </div>
    </section>
  );
}