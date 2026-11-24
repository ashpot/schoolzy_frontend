import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import SubmitButton from "@/shared/ui/SubmitButton";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import type { ModuleId, Permission, PermissionMap, Role } from "../types";
import { MODULES, PERMISSION_LABELS } from "../utils/constants";

interface PermissionsMatrixProps {
  role: Role;
  draft: PermissionMap;
  onChange: (next: PermissionMap) => void;
  dirty: boolean;
  saving: boolean;
  saved: boolean;
  error: string | null;
  onSave: () => void;
}

export default function PermissionsMatrix({ role, draft, onChange, dirty, saving, saved, error, onSave }: PermissionsMatrixProps) {
  const [open, setOpen] = useState<Set<ModuleId>>(new Set(["schools"]));
  const readonly = role.system;

  const toggleOpen = (id: ModuleId) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  // Granting anything also grants View. Removing View clears the whole module.
  const toggle = (id: ModuleId, perm: Permission) => {
    const mod = MODULES.find((m) => m.id === id);
    if (!mod || readonly) return;
    let set = new Set(draft[id]);
    if (set.has(perm)) {
      if (perm === "view") set = new Set();
      else set.delete(perm);
    } else {
      set.add(perm);
      set.add("view");
    }
    onChange({ ...draft, [id]: mod.permissions.filter((p) => set.has(p)) });
  };

  const setAll = (id: ModuleId, on: boolean) => {
    const mod = MODULES.find((m) => m.id === id);
    if (mod && !readonly) onChange({ ...draft, [id]: on ? [...mod.permissions] : [] });
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form onSubmit={submit} noValidate>
      <SectionCard title="Permissions Matrix" subtitle={readonly ? "System roles cannot be modified." : `Edit permissions for ${role.name}.`}>
        <div className="-mx-6 mt-2 lg:-mx-8">
          {MODULES.map((m) => {
            const granted = draft[m.id].length;
            const all = granted === m.permissions.length;
            const isOpen = open.has(m.id);
            return (
              <div key={m.id} className="border-t border-border-line02 px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 py-4">
                  <button type="button" aria-expanded={isOpen} onClick={() => toggleOpen(m.id)} className="flex items-center gap-3 text-sm font-semibold text-text-primary">
                    <ChevronRight size={16} className={cn("text-text-muted transition-transform", isOpen && "rotate-90")} aria-hidden />
                    {m.label}
                    <span className="rounded-full bg-sa-gray-soft px-2.5 py-0.5 text-xs font-medium text-text-secondary">{granted}/{m.permissions.length}</span>
                  </button>
                  {!readonly && (
                    <button type="button" onClick={() => setAll(m.id, !all)} className={cn("text-xs font-medium hover:underline", all ? "text-sa-red-text" : "text-brand-primary")}>
                      {all ? "Remove all" : "Grant all"}
                    </button>
                  )}
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="flex flex-wrap gap-3 pb-5">
                        {m.permissions.map((p) => {
                          const on = draft[m.id].includes(p);
                          return (
                            <button
                              key={p}
                              type="button"
                              aria-pressed={on}
                              disabled={readonly}
                              onClick={() => toggle(m.id, p)}
                              className={cn(
                                "inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-default",
                                on ? "border-sa-blue-line bg-sa-blue-soft text-sa-blue-text" : "border-border-line03 text-text-secondary enabled:hover:border-brand-primary"
                              )}
                            >
                              {on && <Check size={13} aria-hidden />} {PERMISSION_LABELS[p]}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {!readonly && (
          <div className="mt-2 space-y-3 border-t border-border-line02 pt-5">
            {error && <p role="alert" className="rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">{error}</p>}
            <div className="flex items-center justify-end gap-4">
              {saved && !dirty && <span role="status" className="mr-auto text-sm text-sa-green-text">Permissions saved</span>}
              {dirty ? <div className="w-56"><SubmitButton label="Save Permissions" isLoading={saving} /></div> : <span className="text-sm text-text-muted">No unsaved changes</span>}
            </div>
          </div>
        )}
      </SectionCard>
    </form>
  );
}