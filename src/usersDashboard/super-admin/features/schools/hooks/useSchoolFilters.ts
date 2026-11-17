import { useDeferredValue, useMemo, useState } from "react";
import type { PlanFilter, School, StatusFilter } from "../types";
import { PAGE_SIZE } from "../utils/constants";

const NONE: School[] = [];

export function useSchoolFilters(schools: School[] = NONE) {
  const [search, setSearchState] = useState("");
  const [status, setStatusState] = useState<StatusFilter>("All");
  const [plan, setPlanState] = useState<PlanFilter>("All");
  const [page, setPage] = useState(1);
  const deferredSearch = useDeferredValue(search);

  const filtered = useMemo(() => {
    const q = deferredSearch.trim().toLowerCase();
    return schools.filter(
      (s) =>
        (status === "All" || s.status === status) &&
        (plan === "All" || (s.plan ?? "No plan").toLowerCase() === plan.toLowerCase()) &&
        (!q || [s.name, s.code ?? "", s.admin ?? ""].some((v) => v.toLowerCase().includes(q)))
    );
  }, [schools, deferredSearch, status, plan]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  // Changing any filter jumps back to page 1
  return {
    search,
    setSearch: (v: string) => { setSearchState(v); setPage(1); },
    status,
    setStatus: (v: StatusFilter) => { setStatusState(v); setPage(1); },
    plan,
    setPlan: (v: PlanFilter) => { setPlanState(v); setPage(1); },
    page: safePage,
    setPage,
    totalPages,
    filtered,
    pageItems,
    from: filtered.length ? start + 1 : 0,
    to: start + pageItems.length,
    hasFilters: Boolean(deferredSearch.trim()) || status !== "All" || plan !== "All",
    // Changing this re-runs the row stagger animation
    pageKey: `${safePage}|${deferredSearch}|${status}|${plan}`,
  };
}