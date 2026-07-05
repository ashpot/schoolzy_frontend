import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Calendar, Trash2 } from "lucide-react";
import type { SaleRecord } from "../../types";
import { TYPE_COLORS } from "../../data/mockData";
import { formatNaira, formatDisplayDate, isToday } from "../../utils/inventoryUtils";
import { useDeleteSale } from "../../hooks/useInventory";
import { staggerContainer, rowVariant } from "../../animations/variants";

const PAGE_SIZE = 8;

interface Props {
  sales: SaleRecord[];
  onDelete: (id: string) => void;
}

export default function SalesTable({ sales, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);
  const deleteMutation      = useDeleteSale();

  const filtered = sales.filter((s) =>
    s.itemName.toLowerCase().includes(search.toLowerCase()) ||
    s.typeName.toLowerCase().includes(search.toLowerCase())
  );
  const total      = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const slice      = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const pageUnits  = slice.reduce((s, r) => s + r.quantity, 0);
  const pageAmount = slice.reduce((s, r) => s + r.amount, 0);
  const grandTotal = sales.reduce((s, r) => s + r.amount, 0);

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, { onSuccess: () => onDelete(id) });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <ShoppingCart size={16} className="text-brand-primary" />
          <span className="font-semibold text-text-primary text-sm">Sales List</span>
          <span className="ml-1 text-xs font-semibold bg-blue-50 text-brand-primary rounded-full px-2 py-0.5">
            {sales.length}
          </span>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search…"
            className="pl-8 pr-3 py-2 text-sm rounded-xl border border-border-line02 bg-bg-input text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 w-44"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-line02 bg-bg-input">
            <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3 w-10">#</th>
            <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3">Item</th>
            <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3 w-16">Qty</th>
            <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3 w-32">Amount</th>
            <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3 w-32">Date</th>
            <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3 w-16">Actions</th>
          </tr>
        </thead>
        <motion.tbody key={safePage} variants={staggerContainer} initial="hidden" animate="show">
          {slice.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex-center">
                    <ShoppingCart size={22} className="text-brand-primary" />
                  </div>
                  <p className="text-sm font-medium text-text-primary">No sales recorded yet</p>
                  <p className="text-xs text-text-muted">Log a sale using the form on the left</p>
                </div>
              </td>
            </tr>
          ) : (
            slice.map((sale, idx) => {
              const todayEntry = isToday(sale.date);
              return (
                <motion.tr
                  key={sale.id}
                  variants={rowVariant}
                  className={`border-b border-border-line02 transition-colors ${todayEntry ? "bg-green-50/30 hover:bg-green-50/50" : "hover:bg-gray-50/50"}`}
                >
                  <td className="px-5 py-3.5 text-text-muted text-xs">{(safePage - 1) * PAGE_SIZE + idx + 1}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 flex-center shrink-0">
                        <ShoppingCart size={13} className="text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-text-primary text-sm font-medium leading-tight">{sale.itemName}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${TYPE_COLORS[sale.typeName] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                            {sale.typeName}
                          </span>
                          {todayEntry && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold border border-green-200">
                              ✦ NEW
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right text-text-primary font-medium text-sm">{sale.quantity}</td>
                  <td className="px-4 py-3.5 text-right font-semibold text-success text-sm">{formatNaira(sale.amount)}</td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-text-muted text-xs">
                      <Calendar size={12} />
                      {formatDisplayDate(sale.date)}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleDelete(sale.id)}
                      disabled={deleteMutation.isPending}
                      className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-red-50 transition-colors disabled:opacity-40"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </motion.tr>
              );
            })
          )}
        </motion.tbody>
      </table>

      {/* Page subtotal */}
      {slice.length > 0 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-border-line02 bg-bg-input/50">
          <span className="text-xs text-text-muted font-medium">Page subtotal ({slice.length} sales)</span>
          <div className="flex items-center gap-6">
            <span className="text-xs font-semibold text-text-primary">{pageUnits} units</span>
            <span className="text-xs font-semibold text-success">{formatNaira(pageAmount)}</span>
            <span className="text-xs text-text-muted">Grand total: <span className="font-semibold text-text-primary">{formatNaira(grandTotal)}</span></span>
          </div>
        </div>
      )}

      {/* Pagination */}
      {total > 0 && (
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-border-line02">
          <span className="text-xs text-text-muted">
            Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, total)} of {total} sales
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1}
              className="w-7 h-7 rounded-lg border border-border-line02 flex-center text-text-muted hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition text-xs">‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition ${p === safePage ? "bg-brand-primary text-white" : "border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary"}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
              className="w-7 h-7 rounded-lg border border-border-line02 flex-center text-text-muted hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition text-xs">›</button>
          </div>
        </div>
      )}
    </div>
  );
}