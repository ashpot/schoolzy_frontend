import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import { useSuperAdminDashboard } from "../hooks/useSuperAdminDashboard";
import StatCards from "../components/dashboard/StatCards";
import RevenueTrendChart from "../components/dashboard/RevenueTrendChart";
import SchoolGrowthChart from "../components/dashboard/SchoolGrowthChart";
import RecentSchoolsTable from "../components/dashboard/RecentSchoolsTable";
import RecentPaymentsTable from "../components/dashboard/RecentPaymentsTable";
import PlatformActivity from "../components/dashboard/PlatformActivity";
import UpcomingRenewals from "../components/dashboard/UpcomingRenewals";
import SystemHealth from "../components/dashboard/SystemHealth";
import QuickActions from "../components/dashboard/QuickActions";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import DashboardError from "../components/dashboard/DashboardError";

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useSuperAdminDashboard();

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !data) return <DashboardError onRetry={() => refetch()} />;

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <StatCards stats={data.stats} />
      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueTrendChart data={data.revenue} />
        <SchoolGrowthChart data={data.growth} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <RecentSchoolsTable schools={data.schools} />
        <RecentPaymentsTable payments={data.payments} />
      </div>
      <div className="grid items-start gap-6 xl:grid-cols-3">
        <PlatformActivity items={data.activity} />
        <UpcomingRenewals renewals={data.renewals} />
        <div className="space-y-6">
          <SystemHealth metrics={data.health} />
          <QuickActions />
        </div>
      </div>
    </motion.div>
  );
}