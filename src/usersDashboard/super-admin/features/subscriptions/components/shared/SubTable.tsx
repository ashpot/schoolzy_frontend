import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import UsersPagination from "@/usersDashboard/super-admin/features/users/components/shared/UsersPagination";
import { UsersEmpty, UsersError, UsersSkeleton } from "@/usersDashboard/super-admin/features/users/components/shared/UsersTableStates";
import { fadeUp, rowVariant, staggerContainer } from "../../animations/variants";

export interface Col<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

interface SubTableProps<T extends { id: string }> {
  columns: Col<T>[];
  rows: T[];
  minWidth: string; // tailwind class, e.g. "min-w-[1000px]"
  noun: string;
  onRowClick: (row: T) => void;
  renderActions: (row: T) => ReactNode;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  hasFilters: boolean;
  pageKey: string;
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
  onPage: (p: number) => void;
}

const th = "px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-text-muted first:px-6";

export default function SubTable<T extends { id: string }>(p: SubTableProps<T>) {
  const showPagination = !p.isError && !p.isLoading && p.rows.length > 0;

  return (
    <motion.section variants={fadeUp} className="overflow-hidden rounded-3xl border border-border-line02 bg-white">
      {p.isError ? (
        <UsersError onRetry={p.onRetry} />
      ) : p.isLoading ? (
        <UsersSkeleton />
      ) : p.rows.length === 0 ? (
        <UsersEmpty noun={p.noun} filtered={p.hasFilters} />
      ) : (
        <div className="overflow-x-auto">
          <table className={cn("w-full text-left", p.minWidth)}>
            <thead>
              <tr className="border-b border-border-line02">
                {p.columns.map((c) => (
                  <th key={c.key} className={th}>{c.header}</th>
                ))}
                <th className={th}><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <motion.tbody key={p.pageKey} variants={staggerContainer} initial="hidden" animate="show">
              <AnimatePresence>
                {p.rows.map((row) => (
                  <motion.tr
                    key={row.id}
                    layout
                    variants={rowVariant}
                    exit="exit"
                    onClick={() => p.onRowClick(row)}
                    className="cursor-pointer border-t border-border-line02 transition-colors hover:bg-sa-row-hover"
                  >
                    {p.columns.map((c) => (
                      <td key={c.key} className="px-4 py-4 first:px-6">{c.render(row)}</td>
                    ))}
                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      {p.renderActions(row)}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      )}

      {showPagination && (
        <UsersPagination
          page={p.page}
          totalPages={p.totalPages}
          total={p.total}
          from={p.from}
          to={p.to}
          noun={p.noun}
          onPage={p.onPage}
        />
      )}
    </motion.section>
  );
}