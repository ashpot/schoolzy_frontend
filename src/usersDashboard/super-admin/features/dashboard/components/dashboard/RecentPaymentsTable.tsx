import { motion } from "framer-motion";
import { Banknote } from "lucide-react";
import EmptyPanel from "@/usersDashboard/super-admin/shared/components/EmptyPanel";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import ViewAllLink from "@/usersDashboard/super-admin/shared/components/ViewAllLink";
import { SA_PATHS } from "@/usersDashboard/super-admin/shared/config/saPaths";
import { rowVariant, staggerContainer } from "../../animations/variants";
import { formatDate, formatNaira } from "../../utils/format";
import { paymentStatusTone } from "../../utils/statusTones";
import type { RecentPayment } from "../../types";

const th = "pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wider text-text-muted";

export default function RecentPaymentsTable({ payments }: { payments: RecentPayment[] }) {
  return (
    <SectionCard
      title="Recent Payments"
      subtitle="Latest subscription payments"
      action={<ViewAllLink to={SA_PATHS.payments} />}
    >
      {payments.length === 0 ? (
        <EmptyPanel icon={Banknote} title="No payments yet" hint="Subscription payments will appear here." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr>
                <th className={th}>School</th>
                <th className={th}>Amount</th>
                <th className={th}>Plan</th>
                <th className={th}>Date</th>
                <th className={`${th} pr-0`}>Status</th>
              </tr>
            </thead>
            <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
              {payments.map((p) => (
                <motion.tr key={p.id} variants={rowVariant} className="border-t border-border-line02">
                  <td className="py-4 pr-4 text-sm font-medium text-text-primary">{p.school}</td>
                  <td className="py-4 pr-4 text-sm font-semibold text-text-primary">
                    {p.amount == null ? "—" : formatNaira(p.amount)}
                  </td>
                  <td className="py-4 pr-4 text-sm text-text-secondary">{p.plan}</td>
                  <td className="py-4 pr-4 text-sm text-text-secondary">{formatDate(p.date)}</td>
                  <td className="py-4">
                    <StatusBadge label={p.status} tone={paymentStatusTone(p.status)} />
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}