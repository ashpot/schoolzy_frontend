import { useDeferredValue, useMemo, useState } from "react";
import type { FilterDef, PlatformUser } from "../types";

export function useUserFilters(users: PlatformUser[], defs: FilterDef[], pageSize: number) {
  const [search, setSearchState] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const deferred = useDeferredValue(search);

  // Option lists come from the loaded data, so they keep working with the real API.
  const options = useMemo(() => {
    const out: Record<string, string[]> = {};
    for (const d of defs) {
      const unique = new Set<string>();
      for (const u of users) {
        const v = d.get(u);
        if (v) unique.add(v);
      }
      out[d.key] = ["All", ...Array.from(unique).sort()];
    }
    return out;
  }, [users, defs]);

  const filtered = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    return users.filter((u) => {
      const matchesFilters = defs.every((d) => {
        const chosen = values[d.key] ?? "All";
        return chosen === "All" || d.get(u) === chosen;
      });
      if (!matchesFilters) return false;
      if (!q) return true;
      return [u.name, u.email, u.phone ?? "", u.school, u.admissionNo ?? "", u.parentName ?? ""].some((v) =>
        v.toLowerCase().includes(q)
      );
    });
  }, [users, defs, values, deferred]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  // Changing any filter jumps back to page 1
  return {
    search,
    setSearch: (v: string) => { setSearchState(v); setPage(1); },
    values,
    setFilter: (key: string, v: string) => { setValues((prev) => ({ ...prev, [key]: v })); setPage(1); },
    options,
    filtered,
    pageItems,
    page: safePage,
    setPage,
    totalPages,
    from: filtered.length ? start + 1 : 0,
    to: start + pageItems.length,
    hasFilters: Boolean(deferred.trim()) || Object.values(values).some((v) => v !== "All"),
    // Changing this re-runs the row stagger animation
    pageKey: `${safePage}|${deferred}|${JSON.stringify(values)}`,
  };
}