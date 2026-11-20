import { useId } from "react";
import { motion } from "framer-motion";
import { Bell, Check, Clock, FileText } from "lucide-react";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { rowVariant, staggerContainer } from "../../animations/variants";
import type { MenuKey, RenewalRow } from "../../types";
import { periodMonths } from "../../utils/derive";
import { addMonthsIso, daysLabelLong, formatDate, formatNaira, initials2 } from "../../utils/format";
import { planTone, renewalTone, schoolTileClass } from "../../utils/tones";
import { DrawerSection, InfoCell } from "../shared/DrawerParts";
import SideDrawer from "../shared/SideDrawer";

interface RenewalDrawerProps {
  row: RenewalRow;
  onClose: () => void;
  onAction: (key: Exclude<MenuKey, "view">, sub: RenewalRow) => void;
}

export default function RenewalDrawer({ row, onClose, onAction }: RenewalDrawerProps) {
  const titleId = useId();
  const overdue = row.days < 0;

  const timeline = [
    { id: "last", label: "Last Renewal", date: formatDate(addMonthsIso(row.expires, -periodMonths(row.billing))), done: true },
    { id: "due", label: "Renewal Due", date: formatDate(row.expires), done: row.days <= 0 },
    { id: "invoice", label: "Invoice Generated", date: row.invoiceGeneratedAt ? formatDate(row.invoiceGeneratedAt) : "Pending", done: Boolean(row.invoiceGeneratedAt) },
    { id: "paid", label: "Payment Confirmed", date: "Pending", done: false },
  ];

  return (
    <SideDrawer
      title="Renewal Details"
      subtitle={row.school}
      titleId={titleId}
      onClose={onClose}
      footer={
        <>
          <Button type="button" variant="primary" className="w-full" onClick={() => onAction("renew", row)}>
            Renew Now
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" leftIcon={<FileText size={16} />} onClick={() => onAction("invoice", row)}>
              Generate Invoice
            </Button>
            <Button type="button" variant="outline" leftIcon={<Bell size={16} />} onClick={() => onAction("reminder", row)}>
              Send Reminder
            </Button>
          </div>
        </>
      }
    >
      <div className="px-8 py-6">
        <div className="flex items-center gap-4">
          <span className={cn("flex-center h-16 w-16 shrink-0 rounded-2xl text-xl font-semibold", schoolTileClass(row.school))}>
            {initials2(row.school)}
          </span>
          <div>
            <p className="font-jakarta text-lg font-semibold text-text-primary">{row.school}</p>
            <p className="text-sm text-text-muted">{row.location}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <InfoCell label="Current Plan">{row.plan}</InfoCell>
          <InfoCell label="Amount Due">{formatNaira(row.amount)}</InfoCell>
          <InfoCell label="Renewal Date">{formatDate(row.expires)}</InfoCell>
          <InfoCell label="Days Remaining" className={overdue ? "text-sa-red-text" : row.days <= 7 ? "text-sa-amber-text" : undefined}>
            {daysLabelLong(row.days)}
          </InfoCell>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-text-secondary">Status</span>
          <StatusBadge label={row.renewalStatus} tone={renewalTone[row.renewalStatus]} />
        </div>
      </div>

      <DrawerSection title="Renewal Timeline">
        <motion.ol variants={staggerContainer} initial="hidden" animate="show">
          {timeline.map((t, i) => (
            <motion.li key={t.id} variants={rowVariant} className="relative flex gap-4 pb-6 last:pb-0">
              {i < timeline.length - 1 && <span aria-hidden className="absolute bottom-0 left-5 top-10 w-px bg-sa-green-line" />}
              <span
                className={cn(
                  "flex-center h-10 w-10 shrink-0 rounded-full border-2",
                  t.done ? "border-sa-green-icon bg-sa-green-soft text-sa-green-icon" : "border-sa-gray-line bg-sa-gray-soft text-sa-gray-icon"
                )}
              >
                {t.done ? <Check size={18} aria-hidden /> : <Clock size={18} aria-hidden />}
              </span>
              <div>
                <p className="font-semibold text-text-primary">{t.label}</p>
                <p className="text-sm text-text-muted">{t.date}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </DrawerSection>

      <DrawerSection title="Upcoming Invoice">
        <div className="rounded-2xl bg-bg-input p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-text-secondary">Invoice for {row.plan} Plan</span>
            <span className="text-lg font-semibold text-text-primary">{formatNaira(row.amount)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4">
            <span className="text-sm text-text-muted">Due: {formatDate(row.expires)}</span>
            <StatusBadge label={row.renewalStatus} tone={renewalTone[row.renewalStatus]} />
          </div>
        </div>
        <span className="sr-only">{planTone(row.plan)}</span>
      </DrawerSection>
    </SideDrawer>
  );
}