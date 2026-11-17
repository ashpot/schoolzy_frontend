import { useId } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { formatDate } from "../../utils/format";
import { avatarClass, getInitial, planTone } from "../../utils/schoolTones";
import type { School } from "../../types";
import type { QueueDecision } from "../../types/queues";
import ModalShell from "../all-schools/ModalShell";

interface PendingDetailsModalProps {
  school: School;
  onClose: () => void;
  onDecide: (a: QueueDecision, s: School) => void;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <dt className="text-sm text-text-secondary">{label}</dt>
      <dd className="text-right text-sm font-semibold text-text-primary">{children}</dd>
    </div>
  );
}

export default function PendingDetailsModal({ school, onClose, onDecide }: PendingDetailsModalProps) {
  const titleId = useId();

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <div className="p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className={cn("flex-center h-14 w-14 shrink-0 rounded-2xl text-2xl font-semibold text-white", avatarClass(school.name))}>
              {getInitial(school.name)}
            </span>
            <div>
              <h2 id={titleId} className="font-jakarta text-lg font-semibold text-text-primary">{school.name}</h2>
              <p className="text-sm text-text-muted">Location not provided</p>
            </div>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-2 text-text-muted hover:bg-sa-gray-soft hover:text-text-primary">
            <X size={20} />
          </button>
        </div>

        <dl className="mt-4 divide-y divide-border-line02">
          <Row label="Submitted By">{school.admin ?? "—"}</Row>
          <Row label="Email">—</Row>
          <Row label="Date Registered">{formatDate(school.createdAt)}</Row>
          <Row label="Requested Plan">
            <StatusBadge label={school.plan ?? "No plan"} tone={planTone(school.plan)} />
          </Row>
          <Row label="Documents">—</Row>
        </dl>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button type="button" onClick={() => onDecide("approve", school)} className="rounded-xl bg-sa-green-icon py-3 text-sm font-semibold text-white transition-[filter] hover:brightness-95">
            Approve
          </button>
          <button type="button" onClick={() => onDecide("reject", school)} className="rounded-xl bg-sa-red-icon py-3 text-sm font-semibold text-white transition-[filter] hover:brightness-95">
            Reject
          </button>
        </div>
      </div>
    </ModalShell>
  );
}