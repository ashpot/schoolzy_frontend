import { cn } from "@/shared/utils/cn";
import { avatarClass, initials } from "../../utils/userFormat";

export function UserCell({ name, sub }: { name: string; sub?: string | null }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "flex-center h-11 w-11 shrink-0 rounded-full text-sm font-semibold text-white",
          avatarClass(name)
        )}
      >
        {initials(name)}
      </span>
      <div className="min-w-0">
        <p className="truncate font-semibold text-text-primary">{name}</p>
        {sub && <p className="truncate text-xs text-text-muted">{sub}</p>}
      </div>
    </div>
  );
}

export function TwoLine({ title, sub }: { title: string; sub?: string | null }) {
  return (
    <div>
      <p className="text-sm font-medium text-text-primary">{title}</p>
      {sub && <p className="text-xs text-text-muted">{sub}</p>}
    </div>
  );
}