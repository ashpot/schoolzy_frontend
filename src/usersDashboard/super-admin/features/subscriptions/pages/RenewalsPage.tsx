import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Calendar, Clock, TrendingUp } from "lucide-react";
import { staggerContainer } from "../animations/variants";
import { useListFilters } from "../hooks/useListFilters";
import { useSubscriptions } from "../hooks/useSubscriptions";
import type { FilterOption, MenuKey, RenewalRow, SubStat } from "../types";
import { DAYS_FILTERS, PAGE_SIZE, RENEWAL_STATUS_FILTERS } from "../utils/constants";
import { toRenewalRow } from "../utils/derive";
import { exportCsv } from "../utils/exportCsv";
import { daysLabel, formatCompactNaira, formatDate } from "../utils/format";
import { renewalMenu } from "../utils/menus";
import RenewalDrawer from "../components/renewals/RenewalDrawer";
import { renewalColumns } from "../components/renewals/renewalColumns";
import ActionMenu from "../components/shared/ActionMenu";
import StatGrid from "../components/shared/StatGrid";
import SubscriptionDialogs, { type DialogTarget } from "../components/shared/SubscriptionDialogs";
import SubTable from "../components/shared/SubTable";
import SubToolbar from "../components/shared/SubToolbar";

const NONE: RenewalRow[] = [];

const DAYS_TESTS: Record<string, (r: RenewalRow) => boolean> = {
  Overdue: (r) => r.days < 0,
  "Due today": (r) => r.days === 0,
  "Next 7 days": (r) => r.days >= 1 && r.days <= 7,
  "Next 30 days": (r) => r.days >= 1 && r.days <= 30,
  Later: (r) => r.days > 30,
};

const FILTER_CONFIG = {
  pageSize: PAGE_SIZE,
  text: (r: RenewalRow) => [r.school, r.location, r.plan],
  predicates: {
    days: (r: RenewalRow, v: string) => DAYS_TESTS[v]?.(r) ?? true,
    plan: (r: RenewalRow, v: string) => r.plan === v,
    status: (r: RenewalRow, v: string) => r.renewalStatus === v,
  },
};

export default function RenewalsPage() {
  const { data, isLoading, isError, refetch } = useSubscriptions();

  // Suspended subscriptions aren't renewing; soonest (or most overdue) first
  const rows = useMemo(
    () => (data ?? []).filter((s) => s.status !== "Suspended").map(toRenewalRow).sort((a, b) => a.days - b.days),
    [data]
  );
  const list = isLoading ? NONE : rows;
  const f = useListFilters(list, FILTER_CONFIG);

  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogTarget | null>(null);
  const drawerRow = rows.find((r) => r.id === drawerId) ?? null;

  const filters = useMemo<FilterOption[]>(
    () => [
      { key: "days", label: "Days Remaining", options: DAYS_FILTERS },
      { key: "plan", label: "Plans", options: Array.from(new Set(rows.map((r) => r.plan))).sort() },
      { key: "status", label: "Status", options: RENEWAL_STATUS_FILTERS },
    ],
    [rows]
  );

  const stats = useMemo<SubStat[]>(
    () => [
      { key: "today", icon: AlertCircle, tone: "amber", label: "Renewals Due Today", value: rows.filter((r) => r.days === 0).length, hint: "Requires immediate action" },
      { key: "week", icon: Calendar, tone: "blue", label: "Renewals This Week", value: rows.filter((r) => r.days >= 1 && r.days <= 7).length, hint: "Next 7 days" },
      { key: "overdue", icon: Clock, tone: "red", label: "Overdue Renewals", value: rows.filter((r) => r.days < 0).length, hint: "Past due date" },
      { key: "revenue", icon: TrendingUp, tone: "purple", label: "Revenue Expected", value: formatCompactNaira(rows.filter((r) => r.days <= 30).reduce((sum, r) => sum + r.amount, 0)), hint: "From pending renewals" },
    ],
    [rows]
  );

  const handleMenu = (key: MenuKey, row: RenewalRow) => {
    if (key === "view") return setDrawerId(row.id);
    setDialog({ key, sub: row });
  };

  const handleExport = () =>
    exportCsv(
      "renewals",
      ["School", "Location", "Plan", "Renewal Date", "Days Remaining", "Amount Due (NGN)", "Status"],
      f.filtered.map((r) => [r.school, r.location, r.plan, formatDate(r.expires), daysLabel(r.days), r.amount, r.renewalStatus])
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
        columns={renewalColumns}
        rows={f.pageItems}
        minWidth="min-w-[1000px]"
        noun="renewals"
        onRowClick={(r) => setDrawerId(r.id)}
        renderActions={(r) => (
          <ActionMenu label={`Actions for ${r.school}`} items={renewalMenu()} onSelect={(k) => handleMenu(k, r)} />
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
        {drawerRow && (
          <RenewalDrawer
            key={drawerRow.id}
            row={drawerRow}
            onClose={() => setDrawerId(null)}
            onAction={(key, sub) => setDialog({ key, sub })}
          />
        )}
      </AnimatePresence>
      <SubscriptionDialogs target={dialog} onClose={() => setDialog(null)} />
    </motion.div>
  );
}