import { useState } from "react";
import { motion } from "framer-motion";
import { Percent, Search } from "lucide-react";
import { staggerContainer, rowVariant } from "../../animations/variants";
import { getClassBadgeColor } from "../../utils/colors";
import type { Denominator } from "../../types";
import NumberSpan from "../shared/NumberSpan";

interface Props { denominators: Denominator[]; onDelete: (id: string) => void; }

const PAGE_SIZE = 10;

export default function DenominatorTable({ denominators, /*onDelete*/ }: Props) {
  const [search, setSearch] = useState("");
  const [page,   setPage]   = useState(1);
  // const deleteDenominator = useDeleteDenominator();

  const filtered   = denominators.filter((d) => d.className.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-line02">
        <div className="flex items-center gap-2">
          <Percent size={16} className="text-brand-primary" />
          <h2 className="section-title">Class Average Denominators</h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-primary text-xs font-semibold">{denominators.length}</span>
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" placeholder="Search..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-border-line02 bg-bg-input outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-40 transition-all" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80 border-b border-border-line02">
              {["#", "Denominator", "Class", "Actions"].map((h) => (
                <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show" key={page}>
            {paginated.map((d, i) => (
              <motion.tr key={d.id} variants={rowVariant} className="border-b border-border-line02 hover:bg-gray-50/50">
                <td className="py-3.5 px-4 text-sm text-text-muted">
                  <NumberSpan number={(page - 1) * PAGE_SIZE + i + 1}/>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Percent size={16} className="text-brand-primary" />
                    <span className="text-2xl font-bold text-text-primary">{d.denominator}</span>
                    <span className="text-sm text-text-muted font-medium">pts</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getClassBadgeColor(d.className)}`}>
                    {d.className}
                  </span>
                </td>
                <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                  {/* <DeleteButton onDelete={() => deleteDenominator.mutate(d.id, { onSuccess: () => onDelete(d.id) })} /> */}
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-border-line02">
        <p className="text-xs text-text-muted">Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} entries</p>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-7 h-7 flex-center rounded-lg text-sm hover:bg-gray-100 disabled:opacity-30">‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 flex-center rounded-lg text-sm font-medium transition-colors ${page === p ? "bg-brand-primary text-white" : "hover:bg-gray-100 text-text-secondary"}`}>{p}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-7 h-7 flex-center rounded-lg text-sm hover:bg-gray-100 disabled:opacity-30">›</button>
          </div>
        )}
      </div>
    </div>
  );
}