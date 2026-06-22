import { useState } from "react";
import { motion } from "framer-motion";
import { Search, LayoutList, AlertTriangle } from "lucide-react";
import { mockReportRows, TYPE_COLORS } from "../../data/mockData";
import { formatNaira } from "../../utils/inventoryUtils";
import { staggerContainer, rowVariant } from "../../animations/variants";

export default function InventoryBreakdownTable() {
  const [search, setSearch]       = useState("");
  const [showLowOnly, setShowLowOnly] = useState(false);

  const filtered = mockReportRows.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                        r.typeName.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (showLowOnly ? r.isLow : true);
  });

  const totalQtyAvailable = mockReportRows.reduce((s, r) => s + r.qtyAvailable, 0);
  const totalQtySold      = mockReportRows.reduce((s, r) => s + r.qtySold, 0);
  const totalRevenue      = mockReportRows.reduce((s, r) => s + r.revenue, 0);
  const lowCount          = mockReportRows.filter((r) => r.isLow).length;

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-line02 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <LayoutList size={16} className="text-brand-primary" />
          <span className="font-semibold text-text-primary text-sm">Inventory Breakdown</span>
          <span className="ml-1 text-xs font-semibold bg-blue-50 text-brand-primary rounded-full px-2 py-0.5">
            {mockReportRows.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Low-stock pill toggle */}
          <button
            type="button"
            onClick={() => setShowLowOnly((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
              showLowOnly
                ? "bg-amber-100 text-amber-700 border-amber-300"
                : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100"
            }`}
          >
            <AlertTriangle size={12} />
            {lowCount} low-stock items
          </button>
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items…"
              className="pl-8 pr-3 py-2 text-sm rounded-xl border border-border-line02 bg-bg-input text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 w-44"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-line02 bg-bg-input">
            <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3 w-10">#</th>
            <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3">Item Name</th>
            <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3 w-32">Type</th>
            <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3 w-28">Qty Available</th>
            <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3 w-24">Qty Sold</th>
            <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3 w-36">Revenue Generated</th>
          </tr>
        </thead>
        <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
          {filtered.map((row, idx) => (
            <motion.tr
              key={row.id}
              variants={rowVariant}
              className={`border-b border-border-line02 transition-colors ${row.isLow ? "bg-amber-50/30 hover:bg-amber-50/60" : "hover:bg-gray-50/50"}`}
            >
              <td className="px-5 py-3.5 text-text-muted text-xs">{idx + 1}</td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex-center shrink-0 ${TYPE_COLORS[row.typeName]?.split(" ")[0] ?? "bg-gray-50"}`}>
                    <LayoutList size={12} className={TYPE_COLORS[row.typeName]?.split(" ")[1] ?? "text-gray-500"} />
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium leading-tight">{row.name}</p>
                    {row.isLow && (
                      <span className="inline-flex items-center gap-1 mt-0.5 px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">
                        <AlertTriangle size={9} />
                        LOW STOCK
                      </span>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3.5">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${TYPE_COLORS[row.typeName] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                  {row.typeName}
                </span>
              </td>
              <td className="px-4 py-3.5 text-right text-text-primary font-semibold text-sm">{row.qtyAvailable}</td>
              <td className="px-4 py-3.5 text-right text-text-secondary text-sm">{row.qtySold}</td>
              <td className={`px-5 py-3.5 text-right font-semibold text-sm ${row.revenue === 0 ? "text-text-muted" : "text-text-primary"}`}>
                {formatNaira(row.revenue)}
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>

      {/* Totals footer */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-border-line02 bg-bg-input/60">
        <span className="text-xs font-semibold text-text-primary">Totals ({mockReportRows.length} items)</span>
        <div className="flex items-center gap-8">
          <span className="text-xs font-bold text-text-primary">{totalQtyAvailable}</span>
          <span className="text-xs font-bold text-text-primary">{totalQtySold}</span>
          <span className="text-xs font-bold text-text-primary">{formatNaira(totalRevenue)}</span>
        </div>
      </div>
    </div>
  );
}