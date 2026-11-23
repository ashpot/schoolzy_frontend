import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, BarChart3, Building2, Clock, Server, Users } from "lucide-react";
import MetricGrid from "@/usersDashboard/super-admin/shared/components/MetricGrid";
import type { MetricItem } from "@/usersDashboard/super-admin/shared/components/MetricCard";
import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { UsersError } from "@/usersDashboard/super-admin/features/users/components/shared/UsersTableStates";
import { exportCsv } from "@/usersDashboard/super-admin/features/subscriptions/utils/exportCsv";
import { fadeUp, staggerContainer } from "../animations/variants";
import { useAnalytics } from "../hooks/useAnalytics";
import type { MetricKey, Period } from "../types";
import { DEFAULT_PERIOD, PERIODS } from "../utils/constants";
import AnalyticsControls from "../components/AnalyticsControls";
import DailyActiveUsersChart from "../components/DailyActiveUsersChart";
import LoginsChart from "../components/LoginsChart";
import PlatformUsageCard from "../components/PlatformUsageCard";
import SmartInsights from "../components/SmartInsights";
import SystemHealthGrid from "../components/SystemHealthGrid";
import TopSchoolsTable from "../components/TopSchoolsTable";
import UsersByRoleCard from "../components/UsersByRoleCard";

const META: Record<MetricKey, { label: string; icon: MetricItem["icon"]; tone: Tone }> = {
  schools: { label: "Total Schools", icon: Building2, tone: "blue" },
  users: { label: "Total Users", icon: Users, tone: "green" },
  dau: { label: "Daily Active Users", icon: Activity, tone: "amber" },
  mau: { label: "Monthly Active Users", icon: BarChart3, tone: "purple" },
  uptime: { label: "Platform Uptime", icon: Server, tone: "green" },
  session: { label: "Avg Session Duration", icon: Clock, tone: "red" },
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>(DEFAULT_PERIOD);
  const { data, isLoading, isError, refetch } = useAnalytics(period);

  const metrics = useMemo<MetricItem[]>(
    () => (data?.metrics ?? []).map((m) => ({ key: m.key, ...META[m.key], value: m.value, delta: m.delta })),
    [data]
  );

  const handleExcel = () => {
    if (!data) return;
    const label = PERIODS.find((p) => p.id === period)?.label ?? period;
    exportCsv(
      "platform-analytics",
      ["Metric", "Value", "Period"],
      [
        ...metrics.map((m) => [m.label, m.value, label] as (string | number)[]),
        ...Object.entries(data.usage).map(([k, v]) => [k, v, label] as (string | number)[]),
      ]
    );
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <AnalyticsControls period={period} onPeriod={setPeriod} onExcel={handleExcel} exportDisabled={!data} />

      {isError ? (
        <div className="rounded-3xl border border-border-line02 bg-white"><UsersError onRetry={() => refetch()} /></div>
      ) : (
        <>
          <MetricGrid items={metrics} isLoading={isLoading} columns={3} />

          {data && (
            <>
              <motion.div variants={fadeUp} className="grid gap-6 xl:grid-cols-2">
                <DailyActiveUsersChart data={data.dailyActive} />
                <LoginsChart data={data.logins} />
              </motion.div>
              <motion.div variants={fadeUp} className="grid items-start gap-6 xl:grid-cols-2">
                <UsersByRoleCard roles={data.roles} />
                <PlatformUsageCard usage={data.usage} />
              </motion.div>
              <TopSchoolsTable schools={data.topSchools} />
              <SystemHealthGrid items={data.health} />
              <SmartInsights insights={data.insights} />
            </>
          )}
        </>
      )}
    </motion.div>
  );
}