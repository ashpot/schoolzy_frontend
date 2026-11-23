import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, Search } from "lucide-react";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import { fadeUp } from "../../animations/variants";
import type { FilterOption } from "../../types";

interface SubToolbarProps {
  searchPlaceholder: string;
  search: string;
  onSearch: (v: string) => void;
  filters?: FilterOption[];
  values?: Record<string, string>;
  onFilter?: (key: string, v: string) => void;
  onExport: () => void;
  exportDisabled: boolean;
  action?: ReactNode; // e.g. the Create Plan button
}

export default function SubToolbar(p: SubToolbarProps) {
  const filters = p.filters ?? [];
  const compact = filters.length === 0;

  return (
    <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 rounded-3xl border border-border-line02 bg-white p-5">
      <div className={cn("relative min-w-[220px]", compact ? "flex-1" : "w-full")}>
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden />
        <input
          type="search"
          value={p.search}
          onChange={(e) => p.onSearch(e.target.value)}
          placeholder={p.searchPlaceholder}
          aria-label={p.searchPlaceholder}
          autoComplete="off"
          className="w-full rounded-xl border border-border-line02 bg-bg-input py-3 pl-11 pr-4 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
        />
      </div>

      {filters.map((f) => (
        <label key={f.key} className="flex items-center gap-3 text-sm font-medium text-text-secondary">
          <span>{f.label}</span>
          <span className="relative">
            <select
              value={p.values?.[f.key] ?? "All"}
              onChange={(e) => p.onFilter?.(f.key, e.target.value)}
              className="select-field appearance-none pr-10"
            >
              {["All", ...f.options].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden />
          </span>
        </label>
      ))}

      <div className="ml-auto flex items-center gap-3">
        <Button type="button" variant="outline" leftIcon={<Download size={16} />} onClick={p.onExport} disabled={p.exportDisabled}>
          Export
        </Button>
        {p.action}
      </div>
    </motion.div>
  );
}