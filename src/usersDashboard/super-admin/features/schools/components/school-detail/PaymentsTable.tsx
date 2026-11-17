import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Button from "@/shared/ui/Button";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { rowVariant, staggerContainer } from "../../animations/variants";
import { paymentTone } from "../../utils/detailTones";
import { exportRowsCsv } from "../../utils/exportRows";
import { formatDate, formatNaira } from "../../utils/format";
import type { FinancePayment } from "../../types/detail";

const th = "pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wider text-text-muted";

export default function PaymentsTable({ payments }: { payments: FinancePayment[] }) {
  const handleExport = () =>
    exportRowsCsv("recent-payments", ["Student", "Amount", "Type", "Date", "Status"],
      payments.map((p) => [p.student, p.amount, p.type, p.date, p.status]));

  return (
    <SectionCard
      title="Recent Payments"
      subtitle="Latest fee payments from students"
      action={<Button type="button" variant="outline" size="sm" leftIcon={<Download size={14} />} onClick={handleExport}>Export</Button>}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[460px] text-left">
          <thead>
            <tr><th className={th}>Student</th><th className={th}>Amount</th><th className={th}>Type</th><th className={th}>Date</th><th className={`${th} pr-0`}>Status</th></tr>
          </thead>
          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {payments.map((p) => (
              <motion.tr key={p.id} variants={rowVariant} className="border-t border-border-line02">
                <td className="py-3.5 pr-4 text-sm font-medium text-text-primary">{p.student}</td>
                <td className="py-3.5 pr-4 text-sm font-semibold text-text-primary">{formatNaira(p.amount)}</td>
                <td className="py-3.5 pr-4 text-sm text-text-secondary">{p.type}</td>
                <td className="py-3.5 pr-4 text-sm text-text-secondary">{formatDate(p.date)}</td>
                <td className="py-3.5"><StatusBadge label={p.status} tone={paymentTone[p.status]} /></td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </SectionCard>
  );
}