import { Search, Download } from "lucide-react";
import Button from "@/shared/ui/Button";

interface Props {
  search:         string;
  gradeFilter:    string;
  onSearchChange: (v: string) => void;
  onGradeChange:  (v: string) => void;
}

const GRADES = ["All", "A", "B", "C", "D", "E", "F"];

export default function ScoresTableHeader({ search, gradeFilter, onSearchChange, onGradeChange }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border-line02">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input type="text" placeholder="Search by name, ID or grade..." value={search} onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-64 transition-all" />
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <select value={gradeFilter} onChange={(e) => onGradeChange(e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 text-sm rounded-lg border border-border-line02 bg-bg-input text-text-primary outline-none cursor-pointer">
            {GRADES.map((g) => <option key={g} value={g}>{g === "All" ? "Show: All" : `Grade ${g}`}</option>)}
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted text-xs">▾</span>
        </div>
        <Button type="button" variant="outline" size="sm" leftIcon={<Download size={14} />}>Export</Button>
      </div>
    </div>
  );
}