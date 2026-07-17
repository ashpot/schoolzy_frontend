import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Wallet } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { feeStatusStyles } from "../../utils/feeUtils";
import type { PaymentHistoryRecord } from "../../types";

const PAGE_SIZE = 5;

export default function PaymentHistoryTable({ records }: { records: PaymentHistoryRecord[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return records.filter(
      (r) => r.term.toLowerCase().includes(q) || r.fee.toLowerCase().includes(q) || r.status.toLowerCase().includes(q)
    );
  }, [records, search]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const counts = {
    paid: records.filter((r) => r.status === "Paid").length,
    partial: records.filter((r) => r.status === "Partially Paid").length,
    outstanding: records.filter((r) => r.status === "Outstanding").length,
  };

  const exportCsv = () => {
    const header = "Term,Fee,Status,Amount Paid,Balance\n";
    const rows = filtered.map((r) => `${r.term},${r.fee},${r.status},${r.amountPaid},${r.balance}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payment-history.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (records.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between border-b border-border-line02">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by term, fee, or status..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-bg-input text-body-small text-text-primary outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 border border-transparent"
        />
        <button
          type="button"
          onClick={exportCsv}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border-line02 text-body-small text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex-center mb-3">
            <Wallet size={20} className="text-brand-primary" />
          </div>
          <p className="text-body text-text-primary">No records found</p>
          <p className="text-body-small text-text-muted">Try adjusting your search</p>
        </div>
      ) : (
        <>
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-text-muted uppercase bg-bg-input">
                <th className="px-6 py-3 font-medium">Term</th>
                <th className="px-6 py-3 font-medium">Fee</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Amount Paid</th>
                <th className="px-6 py-3 font-medium">Balance</th>
              </tr>
            </thead>
            <motion.tbody key={page} variants={staggerContainer} initial="hidden" animate="show">
              {paginated.map((r) => (
                <motion.tr key={r.id} variants={rowVariant} className="border-t border-border-line02 hover:bg-gray-50/50">
                  <td className="px-6 py-3 text-body text-text-primary">{r.term}</td>
                  <td className="px-6 py-3 text-body-small text-text-secondary">{r.fee}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs ${feeStatusStyles[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="px-6 py-3 text-body-small text-text-secondary">₦{r.amountPaid.toLocaleString()}</td>
                  <td className={`px-6 py-3 text-body-small ${r.balance > 0 ? "text-danger" : "text-text-muted"}`}>
                    ₦{r.balance.toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-6 py-4 border-t border-border-line02">
            <p className="text-xs text-text-muted">
              {filtered.length} records · {counts.paid} Paid · {counts.partial} Partially Paid · {counts.outstanding} Outstanding
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 rounded-lg border border-border-line02 text-xs disabled:opacity-40"
              >
                Prev
              </button>
              <span className="text-xs text-text-secondary">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 rounded-lg border border-border-line02 text-xs disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}