import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, AlertCircle, Eye, LogIn, RefreshCw, XCircle } from "lucide-react";
import MetricGrid from "@/usersDashboard/super-admin/shared/components/MetricGrid";
import type { MetricItem } from "@/usersDashboard/super-admin/shared/components/MetricCard";
import SubTable from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SubTable";
import SubToolbar from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SubToolbar";
import { useListFilters } from "@/usersDashboard/super-admin/features/subscriptions/hooks/useListFilters";
import { exportCsv } from "@/usersDashboard/super-admin/features/subscriptions/utils/exportCsv";
import type { FilterOption } from "@/usersDashboard/super-admin/features/subscriptions/types";
import { fadeUp, staggerContainer } from "../animations/variants";
import { useAuditLogs } from "../hooks/useAudit";
import type { AuditLog } from "../types";
import { ACTIONS, CATEGORIES, PAGE_SIZE, STATUSES } from "../utils/constants";
import { isToday, stamp } from "../utils/format";
import ActivityTimeline from "../components/ActivityTimeline";
import LogDrawer from "../components/LogDrawer";
import SecurityInsights from "../components/SecurityInsights";
import { auditColumns } from "../components/auditColumns";

const NONE: AuditLog[] = [];

const FILTER_CONFIG = {
  pageSize: PAGE_SIZE,
  text: (l: AuditLog) => [l.user, l.school ?? "", l.role, l.ip, l.summary, l.code],
  predicates: {
    category: (l: AuditLog, v: string) => l.category === v,
    action: (l: AuditLog, v: string) => l.action === v,
    status: (l: AuditLog, v: string) => l.status === v,
    role: (l: AuditLog, v: string) => l.role === v,
  },
};

export default function AuditLogsPage() {
  const { data, isLoading, isError, isFetching, refetch } = useAuditLogs();
  const logs = data?.logs ?? NONE;
  const f = useListFilters(logs, FILTER_CONFIG);
  const [openId, setOpenId] = useState<string | null>(null);
  const openLog = logs.find((l) => l.id === openId) ?? null;

  const filters = useMemo<FilterOption[]>(
    () => [
      { key: "category", label: "Category", options: CATEGORIES },
      { key: "action", label: "Action", options: ACTIONS },
      { key: "status", label: "Status", options: STATUSES },
      { key: "role", label: "Role", options: Array.from(new Set(logs.map((l) => l.role).filter((r) => r !== "—"))).sort() },
    ],
    [logs]
  );

  const stats = useMemo<MetricItem[]>(() => {
    if (!data) return [];
    const today = data.logs.filter((l) => isToday(l.at));
    const d = data.deltas;
    return [
      { key: "events", icon: Activity, tone: "blue", value: today.length, label: "Total Events Today", delta: d.events },
      { key: "failed", icon: XCircle, tone: "red", value: today.filter((l) => l.status === "Failed").length, label: "Failed Actions", delta: d.failed },
      { key: "logins", icon: LogIn, tone: "green", value: today.filter((l) => l.action === "Login" && l.status === "Success").length, label: "Successful Logins", delta: d.logins },
      { key: "critical", icon: AlertCircle, tone: "purple", value: today.filter((l) => l.status === "Critical").length, label: "Critical Events", delta: d.critical },
    ];
  }, [data]);

  const handleExport = () =>
    exportCsv(
      "audit-logs",
      ["Timestamp", "User", "Role", "School", "Category", "Action", "IP Address", "Status", "Description"],
      f.filtered.map((l) => [stamp(l.at), l.user, l.role, l.school ?? "", l.category, l.action, l.ip, l.status, l.description])
    );

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <MetricGrid items={stats} isLoading={isLoading} />

      <SubToolbar
        searchPlaceholder="Search by user, school..."
        search={f.search}
        onSearch={f.setSearch}
        filters={filters}
        values={f.values}
        onFilter={f.setFilter}
        onExport={handleExport}
        exportDisabled={f.filtered.length === 0}
        action={
          <button
            type="button"
            aria-label="Refresh logs"
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex-center h-11 w-11 rounded-xl border border-border-line02 text-text-secondary transition-colors hover:bg-sa-gray-soft disabled:opacity-60"
          >
            <RefreshCw size={16} className={isFetching ? "animate-spin" : undefined} />
          </button>
        }
      />

      <SubTable
        columns={auditColumns}
        rows={f.pageItems}
        minWidth="min-w-[1200px]"
        noun="events"
        onRowClick={(l) => setOpenId(l.id)}
        renderActions={(l) => (
          <button
            type="button"
            onClick={() => setOpenId(l.id)}
            className="inline-flex items-center gap-2 rounded-xl border border-border-line02 px-4 py-2 text-sm font-medium text-brand-primary transition-colors hover:bg-sa-blue-soft"
          >
            <Eye size={14} aria-hidden /> View
          </button>
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

      {data && (
        <motion.div variants={fadeUp} className="grid items-start gap-6 xl:grid-cols-[1.7fr_1fr]">
          <ActivityTimeline logs={data.logs} />
          <SecurityInsights insights={data.insights} />
        </motion.div>
      )}

      <AnimatePresence>
        {openLog && <LogDrawer key={openLog.id} log={openLog} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}