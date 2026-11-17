import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../animations/variants";
import { useSchoolFinance } from "../../hooks/useSchoolDetail";
import { TabError, TabSkeleton } from "./TabStates";
import FinanceStats from "./FinanceStats";
import PaymentsTable from "./PaymentsTable";
import ExpensesTable from "./ExpensesTable";

export default function FinanceTab({ schoolId }: { schoolId: string }) {
  const { data, isLoading, isError, refetch } = useSchoolFinance(schoolId);

  if (isLoading) return <TabSkeleton />;
  if (isError || !data) return <TabError onRetry={() => refetch()} />;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <FinanceStats f={data} />
      <motion.div variants={fadeUp} className="grid items-start gap-6 xl:grid-cols-2">
        <PaymentsTable payments={data.payments} />
        <ExpensesTable expenses={data.expenses} />
      </motion.div>
    </motion.div>
  );
}