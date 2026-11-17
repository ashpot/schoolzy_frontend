import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, FileText, ShieldCheck } from "lucide-react";
import { staggerContainer } from "../animations/variants";
import { usePaged } from "../hooks/usePaged";
import { usePendingSchools } from "../hooks/useQueues";
import type { School } from "../types";
import type { QueueDecision } from "../types/queues";
import QueueStatCard, { type QueueStat } from "../components/shared/QueueStatCard";
import PendingTable from "../components/pending-schools/PendingTable";
import PendingDetailsModal from "../components/pending-schools/PendingDetailsModal";
import PendingActionModal from "../components/pending-schools/PendingActionModal";

const NONE: School[] = [];
const SOON = "Not available yet";

export default function PendingSchoolsPage() {
  const { data, isLoading, isError, refetch } = usePendingSchools();
  const schools = data ?? NONE;
  const paged = usePaged(schools);

  const [details, setDetails] = useState<School | null>(null);
  const [decision, setDecision] = useState<{ action: QueueDecision; school: School } | null>(null);

  // Details modal hands over to the confirm dialog
  const decide = (action: QueueDecision, school: School) => {
    setDetails(null);
    setDecision({ action, school });
  };

  const stats: QueueStat[] = [
    { key: "pending", icon: Clock, tone: "amber", value: schools.length, label: "Pending Schools" },
    { key: "docs", icon: FileText, tone: "blue", value: "—", label: "Awaiting Documents", hint: SOON },
    { key: "verify", icon: ShieldCheck, tone: "purple", value: "—", label: "Pending Verification", hint: SOON },
    { key: "avg", icon: Calendar, tone: "green", value: "—", label: "Avg. Approval Time", hint: SOON },
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

      <PendingTable
        paged={paged}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        onDetails={setDetails}
        onDecide={decide}
      />

      <AnimatePresence>
        {details && (
          <PendingDetailsModal key={`d-${details.id}`} school={details} onClose={() => setDetails(null)} onDecide={decide} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {decision && (
          <PendingActionModal
            key={`${decision.action}-${decision.school.id}`}
            action={decision.action}
            school={decision.school}
            onClose={() => setDecision(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}