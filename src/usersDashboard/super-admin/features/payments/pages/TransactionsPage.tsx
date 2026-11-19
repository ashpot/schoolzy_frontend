import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Clock, DollarSign } from "lucide-react";
import MetricGrid from "@/usersDashboard/super-admin/shared/components/MetricGrid";
import type { MetricItem } from "@/usersDashboard/super-admin/shared/components/MetricCard";
import ActionMenu from "@/usersDashboard/super-admin/features/subscriptions/components/shared/ActionMenu";
import SubTable from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SubTable";
import SubToolbar from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SubToolbar";
import { useListFilters } from "@/usersDashboard/super-admin/features/subscriptions/hooks/useListFilters";
import { exportCsv } from "@/usersDashboard/super-admin/features/subscriptions/utils/exportCsv";
import { formatCompactNaira, formatDate } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { FilterOption } from "@/usersDashboard/super-admin/features/subscriptions/types";
import { fadeUp, staggerContainer } from "../animations/variants";
import { useTransactions } from "../hooks/usePayments";
import type { Transaction, TxnMenuKey } from "../types";
import { METHODS, PAGE_SIZE, TXN_STATUSES } from "../utils/constants";
import { methodShares, monthlyRevenue, planRevenue } from "../utils/derive";
import { openReceipt } from "../utils/documents";
import { txnMenu } from "../utils/menus";
import RevenueByMonthChart from "../components/shared/RevenueByMonthChart";
import PaymentMethodsCard from "../components/transactions/PaymentMethodsCard";
import RevenueByPlanChart from "../components/transactions/RevenueByPlanChart";
import TransactionDialogs, { type TxnTarget } from "../components/transactions/TransactionDialogs";
import TransactionDrawer from "../components/transactions/TransactionDrawer";
import { transactionColumns } from "../components/transactions/transactionColumns";

const NONE: Transaction[] = [];

const FILTER_CONFIG = {
  pageSize: PAGE_SIZE,
  text: (t: Transaction) => [t.ref, t.school, t.invoiceNo, t.gatewayRef, t.location],
  predicates: {
    method: (t: Transaction, v: string) => t.method === v,
    plan: (t: Transaction, v: string) => t.plan === v,
    status: (t: Transaction, v: string) => t.status === v,
  },
};

export default function TransactionsPage() {
  const { data, isLoading, isError, refetch } = useTransactions();
  const txns = data?.transactions ?? NONE;
  const f = useListFilters(txns, FILTER_CONFIG);

  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<TxnTarget | null>(null);
  const drawerTxn = txns.find((t) => t.id === drawerId) ?? null;

  const filters = useMemo<FilterOption[]>(
    () => [
      { key: "method", label: "Method", options: METHODS },
      { key: "plan", label: "Plans", options: Array.from(new Set(txns.map((t) => t.plan))).sort() },
      { key: "status", label: "Status", options: TXN_STATUSES },
    ],
    [txns]
  );

  const stats = useMemo<MetricItem[]>(() => {
    if (!data) return [];
    const count = (s: Transaction["status"]) => txns.filter((t) => t.status === s).length;
    const revenue = txns.filter((t) => t.status === "Successful").reduce((sum, t) => sum + t.amount, 0);
    const d = data.deltas;
    return [
      { key: "revenue", icon: DollarSign, tone: "amber", value: formatCompactNaira(revenue), label: "Total Revenue", delta: d.revenue },
      { key: "ok", icon: Check, tone: "green", value: count("Successful"), label: "Successful Payments", delta: d.successful },
      { key: "pending", icon: Clock, tone: "amber", value: count("Pending"), label: "Pending Payments", delta: d.pending },
      { key: "failed", icon: AlertCircle, tone: "red", value: count("Failed"), label: "Failed Payments", delta: d.failed },
    ];
  }, [data, txns]);

  const monthly = useMemo(
    () => monthlyRevenue(txns, (t) => (t.status === "Successful" ? { date: t.date, amount: t.amount } : null)),
    [txns]
  );
  const byPlan = useMemo(() => planRevenue(txns), [txns]);
  const shares = useMemo(() => methodShares(txns), [txns]);

  const run = (key: TxnMenuKey, txn: Transaction) => {
    if (key === "view") return setDrawerId(txn.id);
    if (key === "receipt") return openReceipt(txn);
    setDialog({ key, txn });
  };

  const handleExport = () =>
    exportCsv(
      "transactions",
      ["Transaction ID", "School", "Plan", "Method", "Amount (NGN)", "Date", "Invoice No.", "Status"],
      f.filtered.map((t) => [t.ref, t.school, t.plan, t.method, t.amount, formatDate(t.date), t.invoiceNo, t.status])
    );

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <MetricGrid items={stats} isLoading={isLoading} />

      <SubToolbar
        searchPlaceholder="Search by school, invoice or reference..."
        search={f.search}
        onSearch={f.setSearch}
        filters={filters}
        values={f.values}
        onFilter={f.setFilter}
        onExport={handleExport}
        exportDisabled={f.filtered.length === 0}
      />

      <SubTable
        columns={transactionColumns}
        rows={f.pageItems}
        minWidth="min-w-[1100px]"
        noun="transactions"
        onRowClick={(t) => setDrawerId(t.id)}
        renderActions={(t) => (
          <ActionMenu variant="bordered" label={`Actions for ${t.ref}`} items={txnMenu(t)} onSelect={(k) => run(k, t)} />
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

      {!isLoading && !isError && (
        <motion.div variants={fadeUp} className="grid items-start gap-6 xl:grid-cols-[1.4fr_1fr_1fr]">
          <RevenueByMonthChart data={monthly} />
          <RevenueByPlanChart data={byPlan} />
          <PaymentMethodsCard shares={shares} />
        </motion.div>
      )}

      <AnimatePresence>
        {drawerTxn && <TransactionDrawer key={drawerTxn.id} txn={drawerTxn} onClose={() => setDrawerId(null)} onAction={run} />}
      </AnimatePresence>
      <TransactionDialogs target={dialog} onClose={() => setDialog(null)} />
    </motion.div>
  );
}