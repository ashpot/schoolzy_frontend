import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Clock, RefreshCw } from "lucide-react";
import { staggerContainer } from "../animations/variants";
import { useListFilters } from "../hooks/useListFilters";
import { useSubscriptions } from "../hooks/useSubscriptions";
import type { FilterOption, MenuKey, SubStat, Subscription } from "../types";
import { PAGE_SIZE, SUB_STATUS_FILTERS } from "../utils/constants";
import { daysFromToday, formatDate } from "../utils/format";
import { exportCsv } from "../utils/exportCsv";
import { activeMenu } from "../utils/menus";
import { activeColumns } from "../components/active-subscriptions/activeColumns";
import SubscriptionDrawer from "../components/active-subscriptions/SubscriptionDrawer";
import ActionMenu from "../components/shared/ActionMenu";
import StatGrid from "../components/shared/StatGrid";
import SubscriptionDialogs, { type DialogTarget } from "../components/shared/SubscriptionDialogs";
import SubTable from "../components/shared/SubTable";
import SubToolbar from "../components/shared/SubToolbar";

const NONE: Subscription[] = [];

const FILTER_CONFIG = {
  pageSize: PAGE_SIZE,
  text: (s: Subscription) => [s.school, s.location, s.plan],
  predicates: {
    plan: (s: Subscription, v: string) => s.plan === v,
    status: (s: Subscription, v: string) => s.status === v,
  },
};

export default function ActiveSubscriptionsPage() {
  const { data, isLoading, isError, refetch } = useSubscriptions();
  const subs = data ?? NONE;
  const f = useListFilters(subs, FILTER_CONFIG);

  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogTarget | null>(null);
  const drawerSub = subs.find((s) => s.id === drawerId) ?? null;

  const filters = useMemo<FilterOption[]>(
    () => [
      { key: "plan", label: "Plans", options: Array.from(new Set(subs.map((s) => s.plan))).sort() },
      { key: "status", label: "Status", options: SUB_STATUS_FILTERS },
    ],
    [subs]
  );

  const stats = useMemo<SubStat[]>(() => {
    const now = new Date();
    const thisMonth = subs.filter((s) => {
      const d = new Date(`${s.expires}T00:00:00`);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && daysFromToday(s.expires) >= 0;
    }).length;
    return [
      { key: "active", icon: Check, tone: "green", label: "Active Schools", value: subs.filter((s) => s.status === "Active").length, hint: "Paying subscribers" },
      { key: "trial", icon: Clock, tone: "blue", label: "Trial Schools", value: subs.filter((s) => s.status === "Trial").length, hint: "Free trial period" },
      { key: "expired", icon: AlertCircle, tone: "red", label: "Expired Subscriptions", value: subs.filter((s) => s.status === "Expired").length, hint: "Require action" },
      { key: "renewals", icon: RefreshCw, tone: "amber", label: "Renewals This Month", value: thisMonth, hint: "Expiring soon" },
    ];
  }, [subs]);

  const handleMenu = (key: MenuKey, sub: Subscription) => {
    if (key === "view") return setDrawerId(sub.id);
    setDialog({ key, sub });
  };

  const handleExport = () =>
    exportCsv(
      "active-subscriptions",
      ["School", "Location", "Plan", "Billing", "Started", "Expires", "Amount (NGN)", "Auto Renewal", "Status"],
      f.filtered.map((s) => [s.school, s.location, s.plan, s.billing, formatDate(s.started), formatDate(s.expires), s.amount, s.autoRenew ? "On" : "Off", s.status])
    );

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <StatGrid stats={stats} isLoading={isLoading} />

      <SubToolbar
        searchPlaceholder="Search schools..."
        search={f.search}
        onSearch={f.setSearch}
        filters={filters}
        values={f.values}
        onFilter={f.setFilter}
        onExport={handleExport}
        exportDisabled={f.filtered.length === 0}
      />

      <SubTable
        columns={activeColumns}
        rows={f.pageItems}
        minWidth="min-w-[1080px]"
        noun="subscriptions"
        onRowClick={(s) => setDrawerId(s.id)}
        renderActions={(s) => (
          <ActionMenu label={`Actions for ${s.school}`} items={activeMenu(s)} onSelect={(k) => handleMenu(k, s)} />
        )}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        hasFilters={f.hasFilters}
        pageKey={f.pageKey}
        page={f.page}
        totalPages={f.totalPages}
        total={f.filtered.length}
        from={f.from}
        to={f.to}
        onPage={f.setPage}
      />

      <AnimatePresence>
        {drawerSub && (
          <SubscriptionDrawer
            key={drawerSub.id}
            sub={drawerSub}
            onClose={() => setDrawerId(null)}
            onAction={(key, sub) => setDialog({ key, sub })}
          />
        )}
      </AnimatePresence>
      <SubscriptionDialogs target={dialog} onClose={() => setDialog(null)} />
    </motion.div>
  );
}