import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useStudentOptionsList } from "../../hooks/useFinances";
import type { Student } from "../../types";

interface StudentSearchInputProps {
  value: string;
  onChange: (studentId: string) => void;
  error?: string;
  isLoading?: boolean;
}

export default function StudentSearchInput({ value, onChange, error, isLoading }: StudentSearchInputProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { data: students } = useStudentOptionsList();

  // Derive the selected student from `value` + the fetched list, instead of
  // keeping separate local state that could drift from the controlled value.
  const selected: Student | undefined = (students ?? []).find((s) => s.id === value);

  const filtered = query.length > 0
    ? (students ?? []).filter((s: Student) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (student: Student) => {
    onChange(student.id);
    setQuery("");
    setOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setQuery("");
  };

  return (
    <div>
      <label className="text-sm font-medium text-label block mb-1.5">Search Student *</label>
      <div ref={wrapperRef} className="relative">
        <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-bg-input transition-all
          ${error ? "border-danger" : open ? "border-brand-primary ring-2 ring-brand-primary/20" : "border-border-line02"}
          ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
        >
          <Search size={14} className="text-text-muted shrink-0" />
          <input
            type="text"
            placeholder="Search by name or admission no…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => query.length > 0 && setOpen(true)}
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
          />
          {query && (
            <button type="button" onClick={() => { setQuery(""); setOpen(false); }}>
              <X size={13} className="text-text-muted hover:text-text-primary transition-colors" />
            </button>
          )}
        </div>

        {open && filtered.length > 0 && (
          <div className="absolute z-20 top-full mt-1 w-full bg-white rounded-xl border border-border-line02 card-shadow overflow-hidden max-h-52 overflow-y-auto">
            {filtered.map((s: Student) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSelect(s)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{s.name}</p>
                  <p className="text-xs text-text-muted">{s.admissionNo}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="mt-2 flex items-center gap-3 px-3 py-2.5 rounded-xl border border-brand-primary/30 bg-blue-50/40">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary">{selected.name}</p>
            <span className="text-xs text-text-muted">{selected.admissionNo}</span>
          </div>
          <button type="button" onClick={handleClear} className="shrink-0">
            <X size={14} className="text-text-muted hover:text-danger transition-colors" />
          </button>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}