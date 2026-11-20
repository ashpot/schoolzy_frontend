import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Check, Clock, Globe } from "lucide-react";
import MetricGrid from "@/usersDashboard/super-admin/shared/components/MetricGrid";
import type { MetricItem } from "@/usersDashboard/super-admin/shared/components/MetricCard";
import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { UsersError } from "@/usersDashboard/super-admin/features/users/components/shared/UsersTableStates";
import { exportCsv } from "@/usersDashboard/super-admin/features/subscriptions/utils/exportCsv";
import { fadeUp, staggerContainer } from "../animations/variants";
import { useGrowth } from "../hooks/useGrowth";
import type { GrowthMetricKey, GrowthPeriod } from "../types/growth";
import { GROWTH_PERIODS } from "../utils/constants";
import PeriodBar from "../components/shared/PeriodBar";
import SmartInsights from "../components/SmartInsights";
import ConversionFunnel from "../components/growth/ConversionFunnel";
import FastestGrowingTable from "../components/growth/FastestGrowingTable";
import HealthScoresTable from "../components/growth/HealthScoresTable";
import RegionalDistribution from "../components/growth/RegionalDistribution";
import SchoolsJoinedChart from "../components/growth/SchoolsJoinedChart";

const META: Record<GrowthMetricKey, { label: string; icon: MetricItem["icon"]; tone: Tone }> = {
  new: { label: "New Schools", icon: Building2, tone: "blue" },
  total: { label: "Total Schools", icon: Globe, tone: "green" },
  trial: { label: "Trial Schools", icon: Clock, tone: "amber" },
  converted: { label: "Converted Schools", icon: Check, tone: "green" },
};

export default function GrowthPage() {
  const [period, setPeriod] = useState<GrowthPeriod>("year");
  const { data, isLoading, isError, refetch } = useGrowth(period);

  const metrics = useMemo<MetricItem[]>(
    () => (data?.metrics ?? []).map((m) => ({ key: m.key, ...META[m.key], value: m.value, delta: m.delta })),
    [data]
  );

  const handleExcel = () => {
    if (!data) return;
    exportCsv("school-growth", ["Period", "New schools"], data.joined.map((p) => [p.label, p.value]));
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <PeriodBar tabs={GROWTH_PERIODS} value={period} onChange={setPeriod} layoutId="sa-growth-period" onExcel={handleExcel} excelDisabled={!data} />

      {isError ? (
        <div className="rounded-3xl border border-border-line02 bg-white"><UsersError onRetry={() => refetch()} /></div>
      ) : (
        <>
          <MetricGrid items={metrics} isLoading={isLoading} />
          {data && (
            <>
              <motion.div variants={fadeUp}><SchoolsJoinedChart data={data.joined} /></motion.div>
              <motion.div variants={fadeUp} className="grid items-start gap-6 xl:grid-cols-2">
                <ConversionFunnel stages={data.funnel} />
                <RegionalDistribution regions={data.regions} />
              </motion.div>
              <FastestGrowingTable schools={data.fastest} />
              <HealthScoresTable rows={data.health} />
              <SmartInsights insights={data.insights} />
            </>
          )}
        </>
      )}
    </motion.div>
  );
}