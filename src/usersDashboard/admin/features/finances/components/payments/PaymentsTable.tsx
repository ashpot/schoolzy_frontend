import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Users, Search, Clock, Trash2, } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { useDeletePayment } from "../../hooks/useFinances";
import { formatNaira, formatDisplayDate } from "../../utils/feeUtils";
import { avatarColor, getInitials } from "../../data/mockData";
import FeeTypeBadge from "../shared/FeeTypeBadge";
import SectionBadge from "../shared/SectionBadge";
import BalanceBadge from "./BalanceBadge";
import type { Payment } from "../../types";
import Button from "@/shared/ui/Button";

interface PaymentsTableProps {
  items: Payment[];
  onDelete: (id: string) => void;
}

const PAGE_SIZE = 8;

export default function PaymentsTable({ items, onDelete }: PaymentsTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);
  const deleteMutation = useDeletePayment();

  const filtered = useMemo(
    () => items.filter((p) =>
      p.studentName.toLowerCase().includes(search.toLowerCase()) ||
      p.feeName.toLowerCase().includes(search.toLowerCase()) ||
      p.admissionNo.toLowerCase().includes(search.toLowerCase())
    ),
    [items, search]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const start = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end   = Math.min(page * PAGE_SIZE, filtered.length);

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, { onSuccess: () => onDelete(id) });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-brand-primary" />
          <span className="font-semibold text-text-primary">Payments List</span>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            {items.length}
          </span>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-8 pr-3 py-2 text-sm rounded-xl border border-border-line02 bg-bg-input text-text-primary placeholder:text-text-muted outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 w-44 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-line02 bg-gray-50/60">
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide w-12">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Student</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Fee</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Received By</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">Balance</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-text-muted uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <motion.tbody key={page} variants={staggerContainer} initial="hidden" animate="show">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <Clock size={22} className="text-brand-primary" />
                    </div>
                    <p className="font-medium text-text-primary">No payments recorded</p>
                    <p className="text-text-muted text-xs">Add a payment using the form on the left</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((payment, idx) => (
                <motion.tr
                  key={payment.id}
                  variants={rowVariant}
                  className="border-b border-border-line02 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-text-muted font-medium">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>

                  {/* Student */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex-center text-xs font-bold shrink-0 ${avatarColor(payment.studentName)}`}>
                        {getInitials(payment.studentName)}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{payment.studentName}</p>
                        <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                          <span className="text-xs text-text-muted">{payment.admissionNo}</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600">{payment.studentClass}</span>
                          <SectionBadge label={payment.sectionLabel} size="sm" />
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Fee */}
                  <td className="px-4 py-4">
                    <p className="font-medium text-text-primary">{payment.feeName}</p>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <FeeTypeBadge name={payment.feeTypeName} index={payment.feeTypeIndex} size="sm" />
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border
                        ${payment.term === "First Term"  ? "bg-blue-50 text-blue-700 border-blue-100" :
                          payment.term === "Second Term" ? "bg-purple-50 text-purple-700 border-purple-100" :
                          "bg-green-50 text-green-700 border-green-100"}`}>
                        {payment.term}
                      </span>
                    </div>
                  </td>

                  {/* Received By */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-text-secondary">
                      <Clock size={12} className="text-text-muted shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{payment.receivedBy}</p>
                        <p className="text-xs text-text-muted">{formatDisplayDate(payment.receivedDate)}</p>
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-4">
                    <p className="font-semibold text-text-primary">{formatNaira(payment.amount)}</p>
                    <p className="text-xs text-text-muted mt-0.5">of {formatNaira(payment.totalFeeAmount)}</p>
                  </td>

                  {/* Balance */}
                  <td className="px-4 py-4">
                    <BalanceBadge amount={payment.amount} totalFeeAmount={payment.totalFeeAmount} />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleDelete(payment.id); }}
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
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border-line02">
        <p className="text-xs text-text-muted">
          Showing <span className="font-semibold text-text-primary">{start}–{end}</span> of{" "}
          <span className="font-semibold text-text-primary">{filtered.length}</span> payments
        </p>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="w-7 h-7 flex-center rounded-lg border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm">‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => setPage(n)}
              className={`w-7 h-7 flex-center rounded-lg text-sm font-medium transition-all
                ${n === page ? "bg-brand-primary text-white" : "border border-border-line02 text-text-muted hover:border-brand-primary hover:text-brand-primary"}`}>
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