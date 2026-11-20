import { useDeferredValue, useMemo, useState } from "react";

interface Config<T> {
  pageSize: number;
  text: (item: T) => string[]; // fields the search box looks in
  predicates: Record<string, (item: T, value: string) => boolean>; // one per filter key
}

// Keep `config` at module level so it stays stable between renders.
export function useListFilters<T>(items: T[], config: Config<T>) {
  const [search, setSearchState] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const deferred = useDeferredValue(search);

  const filtered = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    return items.filter((item) => {
      for (const [key, test] of Object.entries(config.predicates)) {
        const chosen = values[key] ?? "All";
        if (chosen !== "All" && !test(item, chosen)) return false;
      }
      return !q || config.text(item).some((t) => t.toLowerCase().includes(q));
    });
  }, [items, deferred, values, config]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / config.pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * config.pageSize;
  const pageItems = filtered.slice(start, start + config.pageSize);

  // Changing any filter jumps back to page 1
  return {
    search,
    setSearch: (v: string) => { setSearchState(v); setPage(1); },
    values,
    setFilter: (key: string, v: string) => { setValues((prev) => ({ ...prev, [key]: v })); setPage(1); },
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