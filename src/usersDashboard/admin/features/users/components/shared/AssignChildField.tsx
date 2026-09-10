import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import ChildChip from "./ChildChip";
import { mockSearchableStudents } from "../../data/mockData";
import type { AssignedChild, ParentFormValues } from "../../schemas";

interface AssignChildFieldProps {
  control: Control<ParentFormValues>;
  error?: string;
}

const AssignChildField: React.FC<AssignChildFieldProps> = ({ control, error }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      control={control}
      name="assignedChildren"
      render={({ field }) => {
        const selected: AssignedChild[] = field.value ?? [];

        const results = useMemo(() => {
          const lower = query.trim().toLowerCase();
          return mockSearchableStudents.filter((s) => {
            const alreadyAdded = selected.some((c) => c.id === s.id);
            if (alreadyAdded) return false;
            if (!lower) return true;
            return s.name.toLowerCase().includes(lower) || s.id.includes(lower);
          });
        }, [query, selected]);

        const addChild = (child: AssignedChild) => {
          field.onChange([...selected, child]);
          setQuery("");
        };

        const removeChild = (id: string) => {
          field.onChange(selected.filter((c) => c.id !== id));
        };

        return (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-text-primary">Assign Child</h3>
              {selected.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-primary text-white text-xs flex-center font-medium">
                  {selected.length}
                </span>
              )}
            </div>
            <div className="border-t border-border-line02 mb-3" />

            {selected.length > 0 && (
              <div className="flex flex-col gap-2 mb-3">
                {selected.map((child) => (
                  <ChildChip key={child.id} child={child} onRemove={removeChild} />
                ))}
              </div>
            )}

            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 150)}
                placeholder="Search student by name or ID..."
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border-line02 bg-bg-input text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              />
              {isOpen && (
                <div className="absolute z-10 mt-1.5 w-full bg-white border border-border-line02 rounded-lg card-shadow max-h-52 overflow-y-auto">
                  {results.length > 0 ? (
                    results.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => addChild(s)}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 text-left text-sm hover:bg-bg-soft transition-colors"
                      >
                        <span className="text-text-primary font-medium">{s.name}</span>
                        <span className="text-text-muted text-xs">{s.classLabel}</span>
                      </button>
                    ))
                  ) : (
                    <p className="px-3.5 py-3 text-sm text-text-muted text-center">No students found</p>
                  )}
                </div>
              )}
            </div>

            {error && <p className="text-xs text-danger mt-1.5">{error}</p>}
          </div>
        );
      }}
    />
  );
};

export default AssignChildField;