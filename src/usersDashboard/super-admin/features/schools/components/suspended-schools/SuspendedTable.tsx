import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { fadeUp, staggerContainer } from "../../animations/variants";
import type { Paged } from "../../hooks/usePaged";
import type { ConfirmAction, School } from "../../types";
import { TableError, TableSkeleton } from "../all-schools/SchoolsTableStates";
import SchoolsPagination from "../all-schools/SchoolsPagination";
import QueueEmpty from "../shared/QueueEmpty";
import SuspendedRow from "./SuspendedRow";

const th = "px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-text-muted first:px-6";

interface SuspendedTableProps {
  paged: Paged<School>;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onAction: (a: ConfirmAction, s: School) => void;
}

export default function SuspendedTable({ paged, isLoading, isError, onRetry, onAction }: SuspendedTableProps) {
  const hasRows = !isError && !isLoading && paged.total > 0;

  return (
    <motion.section variants={fadeUp} className="overflow-hidden rounded-3xl border border-border-line02 bg-white">
      <div className="p-6">
        <h2 className="section-title">Suspended Schools</h2>
        <p className="mt-1 text-sm text-text-secondary">Schools with restricted access to the platform</p>
      </div>

      {isError ? (
        <TableError onRetry={onRetry} />
      ) : isLoading ? (
        <TableSkeleton />
      ) : paged.total === 0 ? (
        <QueueEmpty icon={ShieldCheck} title="No suspended schools" hint="Schools that lose access will appear here." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left">
            <thead>
              <tr className="border-y border-border-line02">
                <th className={th}>School</th>
                <th className={th}>School Admin</th>
                <th className={th}>Reason</th>
                <th className={th}>Date Suspended</th>
                <th className={th}>Subscription</th>
                <th className={th}>Outstanding</th>
                <th className={th}>Actions</th>
              </tr>
            </thead>
            <motion.tbody key={paged.page} variants={staggerContainer} initial="hidden" animate="show">
              <AnimatePresence>
                {paged.pageItems.map((s) => (
                  <SuspendedRow key={s.id} school={s} onAction={onAction} />
                ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      )}

      {hasRows && (
        <SchoolsPagination
          page={paged.page}
          totalPages={paged.totalPages}
          total={paged.total}
          from={paged.from}
          to={paged.to}
          onPage={paged.setPage}
        />
      )}
    </motion.section>
  );
}