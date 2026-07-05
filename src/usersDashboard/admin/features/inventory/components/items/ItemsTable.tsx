import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, AlertTriangle, ChevronDown, Trash2 } from "lucide-react";
import type { InventoryItem, ItemType } from "../../types";
import { TYPE_COLORS } from "../../data/mockData";
import { LOW_STOCK_THRESHOLD } from "../../utils/inventoryUtils";
import { formatNaira } from "../../utils/inventoryUtils";
import { useDeleteInventoryItem } from "../../hooks/useInventory";
import { staggerContainer, rowVariant } from "../../animations/variants";
import Button from "@/shared/ui/Button";

const PAGE_SIZE = 8;

interface Props {
  items: InventoryItem[];
  itemTypes: ItemType[];
  onDelete: (id: string) => void;
}

export default function ItemsTable({ items, itemTypes, onDelete }: Props) {
  const [search, setSearch]     = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage]         = useState(1);
  const deleteMutation          = useDeleteInventoryItem();

  const lowStockCount = items.filter((i) => i.quantity < LOW_STOCK_THRESHOLD).length;

  const filtered = items.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) ||
                        i.typeName.toLowerCase().includes(search.toLowerCase());
    const matchType   = typeFilter ? i.typeId === typeFilter : true;
    return matchSearch && matchType;
  });

  const total      = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const slice      = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // Page footer totals
  const pageUnits  = slice.reduce((s, i) => s + i.quantity, 0);
  const pageValue  = slice.reduce((s, i) => s + i.quantity * i.unitPrice, 0);

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, { onSuccess: () => onDelete(id) });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-line02 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Package size={16} className="text-brand-primary" />
          <span className="font-semibold text-text-primary text-sm">Inventory List</span>
          <span className="ml-1 text-xs font-semibold bg-blue-50 text-brand-primary rounded-full px-2 py-0.5">
            {items.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Type filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
              className="appearance-none pl-3 pr-8 py-2 text-sm rounded-xl border border-border-line02 bg-bg-input text-text-secondary focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="">All Types</option>
              {itemTypes.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
          {/* Search */}
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
      </div>

      {/* Low-stock warning banner */}
      {lowStockCount > 0 && (
        <div className="mx-5 mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">
          <AlertTriangle size={15} className="text-warning shrink-0" />
          <p className="text-xs text-amber-800 font-medium">
            {lowStockCount} item{lowStockCount > 1 ? "s" : ""} below low-stock threshold ({LOW_STOCK_THRESHOLD} units) — review and restock
          </p>
        </div>
      )}

      {/* Table */}
      <div className="mt-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-line02 bg-bg-input">
              <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3 w-10">#</th>
              <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3">Name</th>
              <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3 w-32">Type</th>
              <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3 w-28">Qty Available</th>
              <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wide px-4 py-3 w-32">Unit Price</th>
              <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3 w-20">Actions</th>
            </tr>
          </thead>
          <motion.tbody key={safePage} variants={staggerContainer} initial="hidden" animate="show">
            {slice.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex-center">
                      <Package size={22} className="text-brand-primary" />
                    </div>
                    <p className="text-sm font-medium text-text-primary">No items found</p>
                    <p className="text-xs text-text-muted">Add inventory items using the form on the left</p>
                  </div>
                </td>
              </tr>
            ) : (
              slice.map((item, idx) => {
                const isLow = item.quantity < LOW_STOCK_THRESHOLD;
                return (
                  <motion.tr
                    key={item.id}
                    variants={rowVariant}
                    className={`border-b border-border-line02 transition-colors ${isLow ? "bg-amber-50/40 hover:bg-amber-50/70" : "hover:bg-gray-50/50"}`}
                  >
                    <td className="px-5 py-3.5 text-text-muted text-xs">{(safePage - 1) * PAGE_SIZE + idx + 1}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex-center shrink-0">
                          <Package size={13} className="text-brand-primary" />
                        </div>
                        <span className="text-text-primary text-sm font-medium leading-tight">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${TYPE_COLORS[item.typeName] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                        {item.typeName}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isLow && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">
                            <AlertTriangle size={10} />
                            LOW
                          </span>
                        )}
                        <span className={`text-sm font-semibold ${isLow ? "text-amber-700" : "text-text-primary"}`}>
                          {item.quantity}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-text-primary text-sm">
                      {formatNaira(item.unitPrice)}
                    </td>
                    <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                          className="px-2! py-2!"
                          leftIcon={<Trash2 size={15} />}
                        >
                          {""}
                        </Button>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </motion.tbody>
        </table>

        {/* Page footer totals row */}
        {slice.length > 0 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-border-line02 bg-bg-input/50">
            <span className="text-xs text-text-muted font-medium">Page — {slice.length} items</span>
            <div className="flex items-center gap-6">
              <span className="text-xs font-semibold text-text-primary">{pageUnits} units</span>
              <span className="text-xs font-semibold text-text-primary">{formatNaira(pageValue)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > 0 && (
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-border-line02">
          <span className="text-xs text-text-muted">
            Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, total)} of {total} items
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="w-7 h-7 rounded-lg border border-border-line02 flex-center text-text-muted hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition text-xs"
            >‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition ${
                  p === safePage
                    ? "bg-brand-primary text-white"
                    : "border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary"
                }`}
              >{p}</button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="w-7 h-7 rounded-lg border border-border-line02 flex-center text-text-muted hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition text-xs"
            >›</button>
          </div>
        </div>
      )}
    </div>
  );
}