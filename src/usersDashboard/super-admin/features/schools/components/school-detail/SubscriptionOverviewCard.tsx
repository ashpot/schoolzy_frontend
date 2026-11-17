import type { ReactNode } from "react";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { formatDate } from "../../utils/format";
import { planTone, schoolStatusTone } from "../../utils/schoolTones";
import type { SchoolDetail } from "../../types/detail";

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-line02 bg-bg-input p-4">
      <p className="text-xs text-text-muted">{label}</p>
      <div className="mt-2 text-sm font-semibold text-text-primary">{children}</div>
    </div>
  );
}

export default function SubscriptionOverviewCard({ school }: { school: SchoolDetail }) {
  return (
    <SectionCard title="Subscription Overview">
      <div className="grid grid-cols-2 gap-4">
        <Cell label="Plan"><StatusBadge label={school.plan ?? "No plan"} tone={planTone(school.plan)} /></Cell>
        <Cell label="Status"><StatusBadge label={school.status} tone={schoolStatusTone[school.status]} /></Cell>
        <Cell label="Started On">{formatDate(school.startedOn)}</Cell>
        <Cell label="Renewal">{formatDate(school.renewalDate)}</Cell>
      </div>
    </SectionCard>
  );
}