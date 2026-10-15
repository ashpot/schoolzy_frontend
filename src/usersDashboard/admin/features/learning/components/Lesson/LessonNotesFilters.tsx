import { Search } from "lucide-react";
import FilterPill from "./FilterPill";
import type { LessonNoteFilters } from "../../types";

type Option = { value: string; label: string };

interface LessonNotesFiltersProps {
  filters: LessonNoteFilters;
  onChange: (key: keyof LessonNoteFilters, value: string) => void;
  classOptions: Option[];
  subjectOptions: Option[];
  teacherOptions: Option[];
}

export default function LessonNotesFilters({
  filters, onChange, classOptions, subjectOptions, teacherOptions,
}: LessonNotesFiltersProps) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-4">
      <div className="flex items-center gap-3 flex-wrap">
        <FilterPill label="All Classes"  value={filters.classGroup} options={classOptions}   onChange={(v) => onChange("classGroup", v)} />
        <FilterPill label="All Subjects" value={filters.subject}    options={subjectOptions} onChange={(v) => onChange("subject", v)} />
        <FilterPill label="All Teachers" value={filters.teacher}    options={teacherOptions} onChange={(v) => onChange("teacher", v)} />
        <div className="flex-1 min-w-45 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search notes..."
            value={filters.search}
            onChange={(e) => onChange("search", e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border-line02 bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
          />
        </div>
      </div>
    </div>
  );
}