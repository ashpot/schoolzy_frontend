import { cn } from "@/shared/utils/cn";
import { initials2 } from "../../utils/format";
import { schoolTileClass } from "../../utils/tones";

export default function SchoolCell({ name, location }: { name: string; location: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn("flex-center h-11 w-11 shrink-0 rounded-xl text-sm font-semibold", schoolTileClass(name))}>
        {initials2(name)}
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-text-primary">{name}</p>
        <p className="text-xs text-text-muted">{location}</p>
      </div>
    </div>
  );
}