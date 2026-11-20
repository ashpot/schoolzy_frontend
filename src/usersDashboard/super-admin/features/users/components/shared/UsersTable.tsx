import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { fadeUp, rowVariant, staggerContainer } from "../../animations/variants";
import type { ColumnDef, PlatformUser, UserAction } from "../../types";
import UserActionsMenu from "./UserActionsMenu";
import { UsersEmpty, UsersError, UsersSkeleton } from "./UsersTableStates";
import UsersPagination from "./UsersPagination";

const th = "px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-text-muted first:px-6";

interface UsersTableProps {
  columns: ColumnDef[];
  rows: PlatformUser[];
  minWidth: string;
  noun: string;
  canEmail: boolean;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onAction: (action: UserAction, user: PlatformUser) => void;
  hasFilters: boolean;
  pageKey: string;
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
  onPage: (p: number) => void;
}

export default function UsersTable(p: UsersTableProps) {
  const showTable = !p.isError && !p.isLoading && p.rows.length > 0;

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
              <tr className="border-b border-border-line02 bg-bg-input">
                {p.columns.map((c) => (
                  <th key={c.key} className={th}>{c.header}</th>
                ))}
                <th className={th}>Actions</th>
              </tr>
            </thead>
            <motion.tbody key={p.pageKey} variants={staggerContainer} initial="hidden" animate="show">
              <AnimatePresence>
                {p.rows.map((u) => (
                  <motion.tr
                    key={u.id}
                    layout
                    variants={rowVariant}
                    exit="exit"
                    className="border-t border-border-line02 transition-colors hover:bg-sa-row-hover"
                  >
                    {p.columns.map((c) => (
                      <td key={c.key} className="px-4 py-4 first:px-6">{c.render(u)}</td>
                    ))}
                    <td className="px-4 py-4">
                      <UserActionsMenu user={u} canEmail={p.canEmail} onAction={p.onAction} />
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      )}

      {showTable && (
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