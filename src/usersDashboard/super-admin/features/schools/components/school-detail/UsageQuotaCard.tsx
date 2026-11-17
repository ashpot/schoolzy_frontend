import { FileText, RotateCcw, TrendingUp } from "lucide-react";
import Button from "@/shared/ui/Button";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import type { SchoolSubscription } from "../../types/detail";
import UsageBar from "./UsageBar";

interface UsageQuotaCardProps {
  usage: SchoolSubscription["usage"];
  onRenew: () => void;
}

export default function UsageQuotaCard({ usage, onRenew }: UsageQuotaCardProps) {
  return (
    <SectionCard title="Usage vs Quota" subtitle="Current resource utilization">
      <div className="space-y-6">
        <UsageBar label="Students" used={usage.students.used} limit={usage.students.limit} percentInline />
        <UsageBar label="Teachers" used={usage.teachers.used} limit={usage.teachers.limit} percentInline />
        <UsageBar label="Storage" used={usage.storage.used} limit={usage.storage.limit} suffix=" GB" percentInline />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="primary"
          leftIcon={<TrendingUp size={16} />}
          onClick={() => {
            // TODO: open the upgrade-plan flow once the plans API exists
          }}
        >
          Upgrade Plan
        </Button>
        <button
          type="button"
          onClick={onRenew}
          className="inline-flex items-center gap-2 rounded-xl border border-sa-green-line bg-sa-green-soft px-5 py-2.5 text-sm font-medium text-sa-green-text transition-[filter] hover:brightness-95"
        >
          <RotateCcw size={16} aria-hidden /> Renew Subscription
        </button>
        <Button
          type="button"
          variant="outline"
          leftIcon={<FileText size={16} />}
          onClick={() => {
            // TODO: call the generate-invoice endpoint
          }}
        >
          Generate Invoice
        </Button>
      </div>
    </SectionCard>
  );
}