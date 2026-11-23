import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Clock, FileText, Plus } from "lucide-react";
import Button from "@/shared/ui/Button";
import MetricGrid from "@/usersDashboard/super-admin/shared/components/MetricGrid";
import type { MetricItem } from "@/usersDashboard/super-admin/shared/components/MetricCard";
import ActionMenu from "@/usersDashboard/super-admin/features/subscriptions/components/shared/ActionMenu";
import SubTable from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SubTable";
import SubToolbar from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SubToolbar";
import { useListFilters } from "@/usersDashboard/super-admin/features/subscriptions/hooks/useListFilters";
import { exportCsv } from "@/usersDashboard/super-admin/features/subscriptions/utils/exportCsv";
import { formatDate } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { FilterOption } from "@/usersDashboard/super-admin/features/subscriptions/types";
import { fadeUp, staggerContainer } from "../animations/variants";
import { useInvoices } from "../hooks/usePayments";
import type { Invoice, InvoiceMenuKey } from "../types";
import { INVOICE_STATUSES, PAGE_SIZE } from "../utils/constants";
import { invoiceDisplay, monthlyRevenue } from "../utils/derive";
import { openInvoice } from "../utils/documents";
import { invoiceMenu } from "../utils/menus";
import GenerateInvoiceModal from "../components/invoices/GenerateInvoiceModal";
import InvoiceDialogs, { type InvoiceTarget } from "../components/invoices/InvoiceDialogs";
import InvoiceDrawer from "../components/invoices/InvoiceDrawer";
import OverdueTrendChart from "../components/invoices/OverdueTrendChart";
import { invoiceColumns } from "../components/invoices/invoiceColumns";
import RevenueByMonthChart from "../components/shared/RevenueByMonthChart";

const NONE: Invoice[] = [];

const FILTER_CONFIG = {
  pageSize: PAGE_SIZE,
  text: (i: Invoice) => [i.invoiceNo, i.school, i.location, i.plan],
  predicates: {
    plan: (i: Invoice, v: string) => i.plan === v,
    status: (i: Invoice, v: string) => invoiceDisplay(i) === v,
  },
};

export default function InvoicesPage() {
  const { data, isLoading, isError, refetch } = useInvoices();
  const invoices = data?.invoices ?? NONE;
  const f = useListFilters(invoices, FILTER_CONFIG);

  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<InvoiceTarget | null>(null);
  const [genOpen, setGenOpen] = useState(false);
  const drawerInvoice = invoices.find((i) => i.id === drawerId) ?? null;

  const filters = useMemo<FilterOption[]>(
    () => [
      { key: "plan", label: "Plans", options: Array.from(new Set(invoices.map((i) => i.plan))).sort() },
      { key: "status", label: "Status", options: INVOICE_STATUSES },
    ],
    [invoices]
  );

  const stats = useMemo<MetricItem[]>(() => {
    if (!data) return [];
    const d = data.deltas;
    return [
      { key: "gen", icon: FileText, tone: "blue", value: invoices.length, label: "Invoices Generated", delta: d.generated },
      { key: "paid", icon: Check, tone: "green", value: invoices.filter((i) => i.status === "Paid").length, label: "Paid Invoices", delta: d.paid },
      { key: "out", icon: Clock, tone: "amber", value: invoices.filter((i) => i.status === "Pending").length, label: "Outstanding Invoices", delta: d.outstanding },
      { key: "over", icon: AlertCircle, tone: "red", value: invoices.filter((i) => invoiceDisplay(i) === "Overdue").length, label: "Overdue Invoices", delta: d.overdue },
    ];
  }, [data, invoices]);

  const monthly = useMemo(
    () => monthlyRevenue(invoices, (i) => (i.status === "Paid" ? { date: i.invoiceDate, amount: i.amount } : null)),
    [invoices]
  );

  const run = (key: InvoiceMenuKey, invoice: Invoice) => {
    if (key === "view") return setDrawerId(invoice.id);
    if (key === "pdf") return openInvoice(invoice);
    setDialog({ key, invoice });
  };

  const handleExport = () =>
    exportCsv(
      "invoices",
      ["Invoice No.", "School", "Plan", "Invoice Date", "Due Date", "Amount (NGN)", "Status"],
      f.filtered.map((i) => [i.invoiceNo, i.school, i.plan, formatDate(i.invoiceDate), formatDate(i.dueDate), i.amount, invoiceDisplay(i)])
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
        action={
          <Button type="button" variant="primary" leftIcon={<Plus size={16} />} onClick={() => setGenOpen(true)}>
            Generate Invoice
          </Button>
        }
      />

      <SubTable
        columns={invoiceColumns}
        rows={f.pageItems}
        minWidth="min-w-[1000px]"
        noun="invoices"
        onRowClick={(i) => setDrawerId(i.id)}
        renderActions={(i) => (
          <ActionMenu variant="bordered" label={`Actions for ${i.invoiceNo}`} items={invoiceMenu(i)} onSelect={(k) => run(k, i)} />
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

      {!isLoading && !isError && data && (
        <motion.div variants={fadeUp} className="grid items-start gap-6 xl:grid-cols-2">
          <RevenueByMonthChart data={monthly} />
          <OverdueTrendChart data={data.overdueTrend} />
        </motion.div>
      )}

      <AnimatePresence>
        {drawerInvoice && <InvoiceDrawer key={drawerInvoice.id} invoice={drawerInvoice} onClose={() => setDrawerId(null)} onAction={run} />}
      </AnimatePresence>
      <AnimatePresence>
        {genOpen && <GenerateInvoiceModal key="generate" onClose={() => setGenOpen(false)} />}
      </AnimatePresence>
      <InvoiceDialogs target={dialog} onClose={() => setDialog(null)} />
    </motion.div>
  );
}