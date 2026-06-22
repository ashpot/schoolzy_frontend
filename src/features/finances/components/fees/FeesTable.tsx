import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Receipt, Search, ChevronDown, ReceiptText, Trash2 } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { useDeleteFee } from "../../hooks/useFinances";
import { formatNaira, formatDisplayDate, termColor } from "../../utils/feeUtils";
import FeeTypeBadge from "../shared/FeeTypeBadge";
import FeeStatusBadge from "./FeeStatusBadge";
import type { Fee } from "../../types";
import Button from "@/shared/ui/Button";

interface FeesTableProps {
  items: Fee[];
  onDelete: (id: string) => void;
}

const PAGE_SIZE = 8;

export default function FeesTable({ items, onDelete }: FeesTableProps) {
  const [search, setSearch] = useState("");
  const [feeTypeFilter, setFeeTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const deleteMutation = useDeleteFee();

  const feeTypeNames = useMemo(
    () => Array.from(new Set(items.map((f) => f.feeTypeName))),
    [items]
  );

  const feeTypeColorMap = useMemo(() => {
    const uniqueIds = Array.from(new Set(items.map((f) => f.feeTypeId)));
    const map = new Map<string, number>();
    uniqueIds.forEach((id, i) => map.set(id, i));
    return map;
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((f) => {
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
      const matchType = feeTypeFilter ? f.feeTypeName === feeTypeFilter : true;
      return matchSearch && matchType;
    });
  }, [items, search, feeTypeFilter]);

  const grandTotal = useMemo(() => filtered.reduce((sum, f) => sum + f.amount, 0), [filtered]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const start = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, filtered.length);

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, { onSuccess: () => onDelete(id) });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Receipt size={16} className="text-brand-primary" />
          <span className="font-semibold text-text-primary">Fees List</span>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            {items.length}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <select
              value={feeTypeFilter}
              onChange={(e) => { setFeeTypeFilter(e.target.value); setPage(1); }}
              className="appearance-none pl-3 pr-8 py-2 text-sm rounded-xl border border-border-line02 bg-bg-input text-text-secondary outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="">All types</option>
              {feeTypeNames.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search fees…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-8 pr-3 py-2 text-sm rounded-xl border border-border-line02 bg-bg-input text-text-primary placeholder:text-text-muted outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 w-44 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-line02 bg-gray-50/60">
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide w-12">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Term</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Date Due</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-text-muted uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <motion.tbody key={page} variants={staggerContainer} initial="hidden" animate="show">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex-center">
                      <ReceiptText size={22} className="text-brand-primary" />
                    </div>
                    <p className="font-medium text-text-primary">No fees found</p>
                    <p className="text-text-muted text-xs">Add a fee using the form on the left</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((fee, idx) => (
                <motion.tr
                  key={fee.id}
                  variants={rowVariant}
                  className="border-b border-border-line02 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-text-muted font-medium">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-text-primary">{fee.name}</p>
                    <div className="mt-1">
                      <FeeTypeBadge name={fee.feeTypeName} index={feeTypeColorMap.get(fee.feeTypeId) ?? 0} size="sm" />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${termColor(fee.term)}`}>
                      {fee.term}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-semibold text-text-primary">
                    {formatNaira(fee.amount)}
                  </td>
                  <td className="px-4 py-4 text-text-secondary">
                    <span>{formatDisplayDate(fee.dateDue)}</span>
                    <FeeStatusBadge dateDue={fee.dateDue} />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleDelete(fee.id); }}
                          className="px-2! py-2!"
                          leftIcon={<Trash2 size={15} />}
                        >
                          {""}
                        </Button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </motion.tbody>
          {filtered.length > 0 && (
            <tfoot>
              <tr className="border-t-2 border-border-line02 bg-gray-50/60">
                <td colSpan={3} className="px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">
                  Grand Total
                </td>
                <td className="px-4 py-3 font-bold text-text-primary text-base">
                  {formatNaira(grandTotal)}
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-border-line02">
        <p className="text-xs text-text-muted">
          Showing <span className="font-semibold text-text-primary">{start}–{end}</span> of{" "}
          <span className="font-semibold text-text-primary">{filtered.length}</span> fees
        </p>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="w-7 h-7 flex-center rounded-lg border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm">‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => setPage(n)}
              className={`w-7 h-7 flex-center rounded-lg text-sm font-medium transition-all ${n === page ? "bg-brand-primary text-white" : "border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary"}`}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="w-7 h-7 flex-center rounded-lg border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm">›</button>
        </div>
      </div>
    </div>
  );
}