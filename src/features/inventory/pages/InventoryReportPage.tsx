import { useState } from "react";
import { motion } from "framer-motion";
import { FileBarChart, Download } from "lucide-react";
import { mockItemTypes, mockReportRows, timeRangeOptions } from "../data/mockData";
import { fadeUp } from "../animations/variants";
import Button from "@/shared/ui/Button";
import StatPill from "../components/shared/StatPill";
import ReportFilterBar from "../components/inventory-report/ReportFilterBar";
import ReportStatCards from "../components/inventory-report/ReportStatCards";
import ReportCharts from "../components/inventory-report/ReportCharts";
import InventoryBreakdownTable from "../components/inventory-report/InventoryBreakdownTable";


export default function InventoryReportPage() {
  const [timeRange, setTimeRange] = useState("month");
  const [typeFilter, setTypeFilter] = useState("");

  const itemsInStock   = mockReportRows.reduce((s, r) => s + r.qtyAvailable, 0);
  const itemsSold      = mockReportRows.reduce((s, r) => s + r.qtySold, 0);
  const revenueFromSales = mockReportRows.reduce((s, r) => s + r.revenue, 0);
  const lowStockItems  = mockReportRows.filter((r) => r.isLow).length;

  const activeLabel     = timeRangeOptions.find((o) => o.value === timeRange)?.label ?? "This Month";
  const activeTypeLabel = typeFilter
    ? mockItemTypes.find((t) => t.id === typeFilter)?.name ?? "All Types"
    : "All Types";

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Inventory Report</h1>
          <p className="text-body-small text-text-secondary mt-1">Analyse stock movement and sales performance</p>
        </div>
        <div className="flex items-center gap-3">
          <StatPill icon={FileBarChart} label={`${lowStockItems} low-stock items`} />
          <Button variant="primary" leftIcon={<Download size={16} />} size="md">
            Export
          </Button>
        </div>
      </div>

      <ReportFilterBar
        timeRange={timeRange}
        typeFilter={typeFilter}
        itemTypes={mockItemTypes}
        onTimeRangeChange={setTimeRange}
        onTypeFilterChange={setTypeFilter}
        onGenerate={() => { /* TODO: trigger filtered report fetch */ }}
        activeLabel={activeLabel}
        activeTypeLabel={activeTypeLabel}
      />

      <ReportStatCards
        itemsInStock={itemsInStock}
        itemsSold={itemsSold}
        revenueFromSales={revenueFromSales}
        lowStockItems={lowStockItems}
      />

      <ReportCharts />

      <InventoryBreakdownTable />
    </motion.div>
  );
}