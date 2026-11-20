import { useId } from "react";
import { FileText, TrendingUp } from "lucide-react";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { useSubscriptionDetail } from "../../hooks/useSubscriptions";
import type { MenuKey, Subscription } from "../../types";
import { formatDate, formatNaira } from "../../utils/format";
import { planTone, schoolTileClass, subStatusTone } from "../../utils/tones";
import { initials2 } from "../../utils/format";
import { DrawerSection, DrawerUsage, InfoCell } from "../shared/DrawerParts";
import SideDrawer from "../shared/SideDrawer";

interface SubscriptionDrawerProps {
  sub: Subscription;
  onClose: () => void;
  onAction: (key: Exclude<MenuKey, "view">, sub: Subscription) => void;
}

export default function SubscriptionDrawer({ sub, onClose, onAction }: SubscriptionDrawerProps) {
  const titleId = useId();
  const { data, isLoading, isError } = useSubscriptionDetail(sub);

  return (
    <SideDrawer
      title="Subscription Details"
      subtitle={sub.school}
      titleId={titleId}
      onClose={onClose}
      footer={
        <>
          <Button type="button" variant="primary" className="w-full" onClick={() => onAction("renew", sub)}>
            Renew Subscription
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" leftIcon={<TrendingUp size={16} />} onClick={() => onAction("upgrade", sub)}>
              Upgrade Plan
            </Button>
            <Button type="button" variant="outline" leftIcon={<FileText size={16} />} onClick={() => onAction("invoice", sub)}>
              Generate Invoice
            </Button>
          </div>
        </>
      }
    >
      <div className="px-8 py-6">
        <div className="flex items-center gap-4">
          <span className={cn("flex-center h-16 w-16 shrink-0 rounded-2xl text-xl font-semibold", schoolTileClass(sub.school))}>
            {initials2(sub.school)}
          </span>
          <div>
            <p className="font-jakarta text-lg font-semibold text-text-primary">{sub.school}</p>
            <div className="mt-1.5 flex gap-2">
              <StatusBadge label={sub.plan} tone={planTone(sub.plan)} />
              <StatusBadge label={sub.status} tone={subStatusTone[sub.status]} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <InfoCell label="Billing Cycle">{sub.billing}</InfoCell>
          <InfoCell label="Amount">{formatNaira(sub.amount)}</InfoCell>
          <InfoCell label="Start Date">{formatDate(sub.started)}</InfoCell>
          <InfoCell label="Expiry Date">{formatDate(sub.expires)}</InfoCell>
          <InfoCell label="Auto Renewal">{sub.autoRenew ? "Enabled" : "Disabled"}</InfoCell>
          <InfoCell label="State">{sub.location}</InfoCell>
        </div>
      </div>

      <DrawerSection title="Usage Overview">
        {isLoading ? (
          <div className="space-y-4" aria-busy="true">
            {[0, 1, 2].map((i) => <div key={i} className="h-10 animate-pulse rounded-lg bg-sa-gray-soft" />)}
          </div>
        ) : isError || !data ? (
          <p className="text-sm text-text-muted">Usage isn&apos;t available right now.</p>
        ) : (
          <div className="space-y-5">
            <DrawerUsage label="Students" entry={data.usage.students} />
            <DrawerUsage label="Teachers" entry={data.usage.teachers} />
            <DrawerUsage label="Storage" entry={data.usage.storage} suffix=" GB" />
          </div>
        )}
      </DrawerSection>

      <DrawerSection title="Payment History">
        {isLoading ? (
          <div className="space-y-3" aria-busy="true">
            {[0, 1, 2].map((i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-sa-gray-soft" />)}
          </div>
        ) : !data || data.payments.length === 0 ? (
          <p className="text-sm text-text-muted">No payments recorded yet.</p>
        ) : (
          <ul className="divide-y divide-border-line02">
            {data.payments.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-4 py-3.5">
                <div>
                  <p className="text-sm font-semibold text-text-primary">{formatDate(p.date)}</p>
                  <p className="text-xs text-text-muted">{p.label}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-text-primary">{formatNaira(p.amount)}</span>
                  <StatusBadge label={p.status} tone={p.status === "Paid" ? "green" : "amber"} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </DrawerSection>
    </SideDrawer>
  );
}