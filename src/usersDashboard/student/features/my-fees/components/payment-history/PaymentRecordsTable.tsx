import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
// import { staggerContainer, rowVariant } from "../../animations/variants";
import { feeStatusStyles } from "../../utils/colors";
import type { FeeRecord } from "../../types";
import { staggerContainer } from "@/shared/utils/animations";
import { rowVariant } from "@/usersDashboard/admin/features/learning/animations/variants";

const PAGE_SIZE = 5;

export default function PaymentRecordsTable({ records }: { records: FeeRecord[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => records.filter((r) => `${r.term} ${r.fee}`.toLowerCase().includes(search.toLowerCase())),
    [records, search]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-2">
          <CreditCard size={16} className="text-brand-primary" />
          <h3 className="section-title">Payment Records</h3>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs">
            {records.length} records
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search records..."
            className="px-3 py-2 text-sm rounded-lg border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary"
          />
          <button className="px-3 py-2 text-sm rounded-lg border border-border-line02 flex items-center gap-1.5 hover:bg-bg-input">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {pageItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex-center mb-3">
            <CreditCard size={20} className="text-brand-primary" />
          </div>
          <p className="font-medium text-text-primary">No payment records found</p>
          <p className="text-body-small text-text-secondary">Try adjusting your search</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-text-muted uppercase border-b border-border-line02">
                <th className="py-3 px-6">Term</th>
                <th className="py-3 px-6">Fee</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Amount Paid</th>
                <th className="py-3 px-6">Balance</th>
              </tr>
            </thead>
            <motion.tbody key={page} variants={staggerContainer} initial="hidden" animate="show">
              {pageItems.map((r) => (
                <motion.tr key={r.id} variants={rowVariant} className="border-b border-border-line02 last:border-0 hover:bg-gray-50/50">
                  <td className="py-3 px-6 font-medium text-text-primary">{r.term}</td>
                  <td className="py-3 px-6 text-text-secondary">{r.fee}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${feeStatusStyles[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="py-3 px-6">₦{r.amount.toLocaleString()}</td>
                  <td className="py-3 px-6 text-green-600">₦{r.amountPaid.toLocaleString()}</td>
                  <td className={`py-3 px-6 ${r.balance > 0 ? "text-danger" : "text-green-600"}`}>
                    ₦{r.balance.toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between px-6 py-4 text-body-small text-text-secondary">
        <span>
          Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
          {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
        </span>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-border-line02 disabled:opacity-40">
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => setPage(n)} className={`w-7 h-7 rounded-lg text-xs ${n === page ? "bg-brand-primary text-white" : "border border-border-line02 hover:bg-bg-input"}`}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg border border-border-line02 disabled:opacity-40">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}