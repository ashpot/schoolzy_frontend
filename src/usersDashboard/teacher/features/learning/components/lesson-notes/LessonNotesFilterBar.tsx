import { Search } from "lucide-react";
import { useState } from "react";
import { classOptions, subjectOptions } from "../../data/mockData";

export default function LessonNotesFilterBar({
  onFilter,
}: {
  onFilter: (filters: { classId: string; subjectId: string; search: string }) => void;
}) {
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="bg-white rounded-2xl card-shadow p-4 flex flex-wrap items-center gap-3">
      <select
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
        className="select-field"
      >
        <option value="">All Classes</option>
        {classOptions.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>

      <select
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
        className="select-field"
      >
        <option value="">All Subjects</option>
        {subjectOptions.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      <div className="relative flex-1 min-w-50">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="pl-8 pr-3 py-2.5 text-sm rounded-xl border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 w-full"
        />
      </div>

      <button
        type="button"
        onClick={() => onFilter({ classId, subjectId, search })}
        className="px-5 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-medium hover:bg-brand-hover transition-colors"
      >
        Filter
      </button>
    </div>
  );
}