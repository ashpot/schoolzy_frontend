import { motion } from "framer-motion";
import { ChevronDown, Download, Plus, Search } from "lucide-react";
import Button from "@/shared/ui/Button";
import { fadeUp } from "../../animations/variants";
import { PLAN_FILTERS, STATUS_FILTERS } from "../../utils/constants";
import type { PlanFilter, StatusFilter } from "../../types";

interface FilterSelectProps<T extends string> {
  label: string;
  value: T;
  options: T[];
  onChange: (v: T) => void;
}

function FilterSelect<T extends string>({ label, value, options, onChange }: FilterSelectProps<T>) {
  return (
    <label className="flex items-center gap-3 text-sm font-medium text-text-secondary">
      <span>{label}</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="select-field appearance-none pr-10"
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden />
      </span>
    </label>
  );
}

interface SchoolsToolbarProps {
  search: string;
  onSearch: (v: string) => void;
  status: StatusFilter;
  onStatus: (v: StatusFilter) => void;
  plan: PlanFilter;
  onPlan: (v: PlanFilter) => void;
  onExport: () => void;
  exportDisabled: boolean;
  onAdd: () => void;
}

export default function SchoolsToolbar(p: SchoolsToolbarProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-wrap items-center gap-4 rounded-3xl border border-border-line02 bg-white p-5"
    >
      <div className="relative min-w-[220px] flex-1">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden />
        <input
          type="search"
          value={p.search}
          onChange={(e) => p.onSearch(e.target.value)}
          placeholder="Search schools..."
          aria-label="Search schools"
          autoComplete="off"
          className="w-full rounded-xl border border-border-line02 bg-bg-input py-3 pl-11 pr-4 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
        />
      </div>
      <FilterSelect label="Status" value={p.status} options={STATUS_FILTERS} onChange={p.onStatus} />
      <FilterSelect label="Plan" value={p.plan} options={PLAN_FILTERS} onChange={p.onPlan} />
      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" leftIcon={<Download size={16} />} onClick={p.onExport} disabled={p.exportDisabled}>
          Export
        </Button>
        <Button type="button" variant="primary" leftIcon={<Plus size={16} />} onClick={p.onAdd}>
          Add New School
        </Button>
      </div>
    </motion.div>
  );
}