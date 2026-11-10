import React, { useDeferredValue, useMemo, useState } from "react";
import { Check, Loader2, Search } from "lucide-react";
import type { StudentSearchItem } from "../../types/studentResult";
import { searchStudents } from "../../utils/studentSearch";
import { getInitials } from "../../utils/resultFormat";

interface Props {
  value: string;
  students: StudentSearchItem[];
  isLoading?: boolean;
  loadError?: string;
  isSelected?: boolean;
  disabled?: boolean;
  error?: string;
  onTextChange: (text: string) => void;
  onSelect: (student: StudentSearchItem) => void;
}

const StudentSearchInput: React.FC<Props> = ({
  value, students, isLoading, loadError, isSelected, disabled, error, onTextChange, onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const deferred = useDeferredValue(value); // keeps typing instant while the match list catches up
  const matches = useMemo(() => searchStudents(students, deferred), [students, deferred]);

  const pick = (s: StudentSearchItem) => { onSelect(s); setOpen(false); };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || !matches.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => (i + 1) % matches.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i - 1 + matches.length) % matches.length); }
    else if (e.key === "Enter") { e.preventDefault(); pick(matches[active]); }
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className="relative">
      <label className="text-sm font-medium text-label mb-1.5 block">Search Student</label>
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          autoComplete="off"
          disabled={disabled}
          value={value}
          placeholder={isLoading ? "Loading students…" : "Enter student name"}
          onChange={(e) => { onTextChange(e.target.value); setActive(0); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          className={`w-full pl-10 pr-10 py-2.5 rounded-lg border bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary disabled:opacity-60 ${
            error || loadError ? "border-danger" : "border-border-line02"
          }`}
        />
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
          {isLoading ? <Loader2 size={15} className="animate-spin text-text-muted" />
            : isSelected ? <Check size={15} className="text-success" /> : null}
        </span>
      </div>
      {loadError && <p className="text-xs text-danger mt-1.5 wrap-break-word">Could not load students: {loadError}</p>}
      {error && <p className="text-xs text-danger mt-1.5">{error}</p>}

      {open && value.trim() && !isLoading && !loadError && (
        <ul role="listbox" className="absolute z-30 mt-1.5 w-full max-h-72 overflow-y-auto bg-white rounded-xl border border-border-line02 shadow-xl py-1">
          {matches.length === 0 ? (
            <li className="px-4 py-3 text-sm text-text-muted">No students match “{value}”</li>
          ) : (
            matches.map((s, i) => (
              <li
                key={s.id}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => { e.preventDefault(); pick(s); }}
                onMouseEnter={() => setActive(i)}
                className={`flex items-center gap-3 px-3.5 py-2.5 cursor-pointer ${i === active ? "bg-bg-input" : ""}`}
              >
                {s.photo ? (
                  <img src={s.photo} alt="" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex-center">
                    {getInitials(s.fullName)}
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-text-primary capitalize truncate">{s.fullName}</span>
                  <span className="block text-xs text-text-muted truncate">
                    {s.admissionNo || "No adm. no."}{s.className ? ` · ${s.className}` : ""}
                  </span>
                </span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default StudentSearchInput;