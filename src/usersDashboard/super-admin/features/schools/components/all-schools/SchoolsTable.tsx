import { AnimatePresence, motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../animations/variants";
import type { School, SchoolAction } from "../../types";
import SchoolRow from "./SchoolRow";
import SchoolsPagination from "./SchoolsPagination";
import { TableEmpty, TableError, TableSkeleton } from "./SchoolsTableStates";

const th = "px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-text-muted first:px-6";

interface SchoolsTableProps {
  schools: School[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onAction: (action: SchoolAction, school: School) => void;
  hasFilters: boolean;
  pageKey: string;
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
  onPage: (p: number) => void;
}

export default function SchoolsTable(p: SchoolsTableProps) {
  const showTable = !p.isError && !p.isLoading && p.schools.length > 0;

  return (
    <motion.section variants={fadeUp} className="overflow-hidden rounded-3xl border border-border-line02 bg-white">
      {p.isError ? (
        <TableError onRetry={p.onRetry} />
      ) : p.isLoading ? (
        <TableSkeleton />
      ) : p.schools.length === 0 ? (
        <TableEmpty filtered={p.hasFilters} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead>
              <tr className="border-b border-border-line02">
                <th className={th}>School</th>
                <th className={th}>Code</th>
                <th className={th}>Admin</th>
                <th className={th}>Students</th>
                <th className={th}>Teachers</th>
                <th className={th}>Plan</th>
                <th className={th}>Renewal</th>
                <th className={th}>Status</th>
                <th className={th}><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <motion.tbody key={p.pageKey} variants={staggerContainer} initial="hidden" animate="show">
              <AnimatePresence>
                {p.schools.map((s) => (
                  <SchoolRow key={s.id} school={s} onAction={p.onAction} />
                ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      )}

      {showTable && (
        <SchoolsPagination
          page={p.page}
          totalPages={p.totalPages}
          total={p.total}
          from={p.from}
          to={p.to}
          onPage={p.onPage}
        />
      )}
    </motion.section>
  );
}