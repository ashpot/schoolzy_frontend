import { useState } from "react";
import { motion } from "framer-motion";
import { FileBarChart, Download, Loader2, AlertCircle } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { useInventoryReport, useInventoryItemsList } from "../hooks/useInventory";
import { LOW_STOCK_THRESHOLD } from "../utils/inventoryUtils";
import type { ReportPeriod, ReportBreakdownRow } from "../types";
import Button from "@/shared/ui/Button";
import StatPill from "../components/shared/StatPill";
import ReportFilterBar from "../components/inventory-report/ReportFilterBar";
import ReportStatCards from "../components/inventory-report/ReportStatCards";
import ReportCharts from "../components/inventory-report/ReportCharts";
import InventoryBreakdownTable from "../components/inventory-report/InventoryBreakdownTable";

export default function InventoryReportPage() {
  const [period, setPeriod] = useState<ReportPeriod>("current_month");

  const { data: report, isLoading, isFetching, isError, error, refetch } = useInventoryReport(period);
  const { data: items } = useInventoryItemsList();

  // Breakdown rows are derived, not a direct backend resource: qtyAvailable
  // comes from the live items list, qtySold/revenue come from this period's
  // sales log grouped by item. See disclaimer rendered in the table itself.
  const breakdownRows: ReportBreakdownRow[] = (items ?? []).map((item) => {
    const itemSales = (report?.sales ?? []).filter((s) => String(s.item) === item.id);
    const qtySold = itemSales.reduce((s, sale) => s + sale.quantity, 0);
    const revenue = itemSales.reduce((s, sale) => s + Number(sale.amount), 0);
    return {
      id: item.id,
      name: item.name,
      typeName: item.typeName,
      qtyAvailable: item.quantity,
      qtySold,
      revenue,
      isLow: item.quantity < LOW_STOCK_THRESHOLD,
    };
  });

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Inventory Report</h1>
          <p className="text-body-small text-text-secondary mt-1">Analyse stock movement and sales performance</p>
        </div>
        <div className="flex items-center gap-3">
          <StatPill icon={FileBarChart} label={`${report?.summary.low_stock_count ?? 0} low-stock items`} />
          <Button variant="primary" leftIcon={<Download size={16} />} size="md">
            Export
          </Button>
        </div>
      </div>

      <ReportFilterBar
        period={period}
        onPeriodChange={setPeriod}
        onRefresh={() => refetch()}
        isFetching={isFetching}
      />

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-text-muted">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Loading report…</span>
        </div>
      ) : isError ? (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-danger text-sm">
          <AlertCircle size={16} />
          {error instanceof Error ? error.message : "Failed to load inventory report."}
        </div>
      ) : (
        report && (
          <>
            <ReportStatCards summary={report.summary} />
            <ReportCharts salesQuantity={report.charts.sales_quantity} salesRevenue={report.charts.sales_revenue} />
            <InventoryBreakdownTable rows={breakdownRows} />
          </>
        )
      )}
    </motion.div>
  );
}