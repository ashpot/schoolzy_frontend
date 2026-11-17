import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Button from "@/shared/ui/Button";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { rowVariant, staggerContainer } from "../../animations/variants";
import { paymentTone } from "../../utils/detailTones";
import { exportRowsCsv } from "../../utils/exportRows";
import { formatDate, formatNaira } from "../../utils/format";
import type { FinanceExpense } from "../../types/detail";

const th = "pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wider text-text-muted";

export default function ExpensesTable({ expenses }: { expenses: FinanceExpense[] }) {
  const handleExport = () =>
    exportRowsCsv("recent-expenses", ["Description", "Category", "Amount", "Date", "Status"],
      expenses.map((e) => [e.description, e.category, e.amount, e.date, e.status]));

  return (
    <SectionCard
      title="Recent Expenses"
      subtitle="Latest operational expenses"
      action={<Button type="button" variant="outline" size="sm" leftIcon={<Download size={14} />} onClick={handleExport}>Export</Button>}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] text-left">
          <thead>
            <tr><th className={th}>Description</th><th className={th}>Category</th><th className={th}>Amount</th><th className={th}>Date</th><th className={`${th} pr-0`}>Status</th></tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {expenses.map((e) => (
              <motion.tr key={e.id} variants={rowVariant} className="border-t border-border-line02">
                <td className="py-3.5 pr-4 text-sm font-medium text-text-primary">{e.description}</td>
                <td className="py-3.5 pr-4"><StatusBadge label={e.category} tone="gray" /></td>
                <td className="py-3.5 pr-4 text-sm font-semibold text-text-primary">{formatNaira(e.amount)}</td>
                <td className="py-3.5 pr-4 text-sm text-text-secondary">{formatDate(e.date)}</td>
                <td className="py-3.5"><StatusBadge label={e.status} tone={paymentTone[e.status]} /></td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </SectionCard>
  );
}