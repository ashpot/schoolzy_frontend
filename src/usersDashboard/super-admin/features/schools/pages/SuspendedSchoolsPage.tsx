import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Ban, DollarSign, XCircle } from "lucide-react";
import { staggerContainer } from "../animations/variants";
import { usePaged } from "../hooks/usePaged";
import { useSuspendedSchools } from "../hooks/useQueues";
import type { ConfirmAction, School } from "../types";
import QueueStatCard, { type QueueStat } from "../components/shared/QueueStatCard";
import SuspendedTable from "../components/suspended-schools/SuspendedTable";
import SchoolActionModal from "../components/all-schools/SchoolActionModal";

const NONE: School[] = [];
const SOON = "Not available yet";

export default function SuspendedSchoolsPage() {
  const { data, isLoading, isError, refetch } = useSuspendedSchools();
  const schools = data ?? NONE;
  const paged = usePaged(schools);
  const [confirm, setConfirm] = useState<{ action: ConfirmAction; school: School } | null>(null);

  const stats: QueueStat[] = [
    { key: "suspended", icon: Ban, tone: "red", value: schools.length, label: "Suspended Schools" },
    { key: "expired", icon: XCircle, tone: "amber", value: schools.filter((s) => s.status === "Expired").length, label: "Expired Plans" },
    { key: "balance", icon: DollarSign, tone: "red", value: "—", label: "Outstanding Balance", hint: SOON },
    { key: "recent", icon: AlertCircle, tone: "purple", value: "—", label: "Recent Suspensions", hint: SOON },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-[170px] animate-pulse rounded-3xl bg-sa-gray-soft" />
          ))}
        </div>
      ) : (
        <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <QueueStatCard key={s.key} stat={s} />
          ))}
        </motion.div>
      )}

      <SuspendedTable
        paged={paged}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        onAction={(action, school) => setConfirm({ action, school })}
      />

      <AnimatePresence>
        {confirm && (
          <SchoolActionModal
            key={`${confirm.action}-${confirm.school.id}`}
            action={confirm.action}
            school={confirm.school}
            onClose={() => setConfirm(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}