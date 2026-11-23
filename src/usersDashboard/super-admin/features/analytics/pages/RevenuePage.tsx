import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Building2, CreditCard, TrendingUp } from "lucide-react";
import MetricGrid from "@/usersDashboard/super-admin/shared/components/MetricGrid";
import type { MetricItem } from "@/usersDashboard/super-admin/shared/components/MetricCard";
import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { UsersError } from "@/usersDashboard/super-admin/features/users/components/shared/UsersTableStates";
import { exportCsv } from "@/usersDashboard/super-admin/features/subscriptions/utils/exportCsv";
import { formatCompactNaira, formatNaira } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { fadeUp, staggerContainer } from "../animations/variants";
import { useRevenue } from "../hooks/useRevenue";
import type { RevenueMetricKey, RevenuePeriod } from "../types/revenue";
import { REVENUE_PERIODS } from "../utils/constants";
import PeriodBar from "../components/shared/PeriodBar";
import SmartInsights from "../components/SmartInsights";
import HighestPayingTable from "../components/revenue/HighestPayingTable";
import PaymentMethodDonut from "../components/revenue/PaymentMethodDonut";
import RateCards from "../components/revenue/RateCards";
import RevenueByPlanChart from "../components/revenue/RevenueByPlanChart";
import RevenueTrendChart from "../components/revenue/RevenueTrendChart";

const META: Record<RevenueMetricKey, { label: string; icon: MetricItem["icon"]; tone: Tone; compact: boolean }> = {
  mrr: { label: "Monthly Recurring Revenue", icon: TrendingUp, tone: "green", compact: true },
  arr: { label: "Annual Recurring Revenue", icon: BarChart3, tone: "blue", compact: true },
  avg: { label: "Avg Revenue Per School", icon: Building2, tone: "amber", compact: false },
  ltv: { label: "Customer Lifetime Value", icon: CreditCard, tone: "purple", compact: false },
};

export default function RevenuePage() {
  const [period, setPeriod] = useState<RevenuePeriod>("monthly");
  const { data, isLoading, isError, refetch } = useRevenue(period);

  const metrics = useMemo<MetricItem[]>(
    () =>
      (data?.metrics ?? []).map((m) => {
        const { label, icon, tone, compact } = META[m.key];
        return { key: m.key, label, icon, tone, value: compact ? formatCompactNaira(m.value) : formatNaira(m.value), delta: m.delta };
      }),
    [data]
  );

  const handleExcel = () => {
    if (!data) return;
    exportCsv("revenue", ["Period", "This period (NGN)", "Last period (NGN)"], data.trend.map((p) => [p.label, p.current, p.previous]));
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <PeriodBar tabs={REVENUE_PERIODS} value={period} onChange={setPeriod} layoutId="sa-revenue-period" onExcel={handleExcel} excelDisabled={!data} />

      {isError ? (
        <div className="rounded-3xl border border-border-line02 bg-white"><UsersError onRetry={() => refetch()} /></div>
      ) : (
        <>
          <MetricGrid items={metrics} isLoading={isLoading} />
          {data && (
            <>
              <motion.div variants={fadeUp} className="grid gap-6 xl:grid-cols-2">
                <RevenueTrendChart data={data.trend} />
                <RevenueByPlanChart data={data.byPlan} />
              </motion.div>
              <motion.div variants={fadeUp} className="grid items-start gap-6 xl:grid-cols-[1.2fr_1fr]">
                <PaymentMethodDonut data={data.byMethod} />
                <RateCards rates={data.rates} />
              </motion.div>
              <HighestPayingTable schools={data.topSchools} />
              <SmartInsights insights={data.insights} />
            </>
          )}
        </>
      )}
    </motion.div>
  );
}