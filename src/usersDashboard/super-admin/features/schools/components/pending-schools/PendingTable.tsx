import { AnimatePresence, motion } from "framer-motion";
import { Inbox } from "lucide-react";
import { fadeUp, staggerContainer } from "../../animations/variants";
import type { Paged } from "../../hooks/usePaged";
import type { School } from "../../types";
import type { QueueDecision } from "../../types/queues";
import { TableError, TableSkeleton } from "../all-schools/SchoolsTableStates";
import SchoolsPagination from "../all-schools/SchoolsPagination";
import QueueEmpty from "../shared/QueueEmpty";
import PendingRow from "./PendingRow";

const th = "px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-text-muted first:px-6";

interface PendingTableProps {
  paged: Paged<School>;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onDetails: (s: School) => void;
  onDecide: (a: QueueDecision, s: School) => void;
}

export default function PendingTable({ paged, isLoading, isError, onRetry, onDetails, onDecide }: PendingTableProps) {
  const hasRows = !isError && !isLoading && paged.total > 0;

  return (
    <motion.section variants={fadeUp} className="overflow-hidden rounded-3xl border border-border-line02 bg-white">
      <div className="p-6">
        <h2 className="section-title">Pending Registrations</h2>
        <p className="mt-1 text-sm text-text-secondary">Schools waiting for admin review and approval</p>
      </div>

      {isError ? (
        <TableError onRetry={onRetry} />
      ) : isLoading ? (
        <TableSkeleton />
      ) : paged.total === 0 ? (
        <QueueEmpty icon={Inbox} title="No pending schools" hint="New registrations awaiting approval will appear here." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="border-y border-border-line02 bg-bg-input">
                <th className={th}>School</th>
                <th className={th}>Submitted By</th>
                <th className={th}>Email</th>
                <th className={th}>Date Registered</th>
                <th className={th}>Requested Plan</th>
                <th className={th}>Docs Status</th>
                <th className={th}>Actions</th>
              </tr>
            </thead>
            <motion.tbody key={paged.page} variants={staggerContainer} initial="hidden" animate="show">
              <AnimatePresence>
                {paged.pageItems.map((s) => (
                  <PendingRow key={s.id} school={s} onDetails={onDetails} onDecide={onDecide} />
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