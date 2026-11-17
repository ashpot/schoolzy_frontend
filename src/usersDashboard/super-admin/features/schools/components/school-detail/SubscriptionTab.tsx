import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../animations/variants";
import { useSchoolSubscription } from "../../hooks/useSchoolDetail";
import { TabError, TabSkeleton } from "./TabStates";
import SubscriptionStats from "./SubscriptionStats";
import UsageQuotaCard from "./UsageQuotaCard";
import SubscriptionTimeline from "./SubscriptionTimeline";

interface SubscriptionTabProps {
  schoolId: string;
  onRenew: () => void;
}

export default function SubscriptionTab({ schoolId, onRenew }: SubscriptionTabProps) {
  const { data, isLoading, isError, refetch } = useSchoolSubscription(schoolId);

  if (isLoading) return <TabSkeleton />;
  if (isError || !data) return <TabError onRetry={() => refetch()} />;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <SubscriptionStats sub={data} />
      <motion.div variants={fadeUp} className="grid items-start gap-6 xl:grid-cols-2">
        <UsageQuotaCard usage={data.usage} onRenew={onRenew} />
        <SubscriptionTimeline sub={data} />
      </motion.div>
    </motion.div>
  );
}