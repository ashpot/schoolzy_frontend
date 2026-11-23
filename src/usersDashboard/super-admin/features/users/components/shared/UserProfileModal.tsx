import { useId, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import type { PlatformUser } from "../../types";
import { KIND_LABEL, avatarClass, formatDate, formatDateTime, initials, statusTone } from "../../utils/userFormat";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <dt className="text-sm text-text-secondary">{label}</dt>
      <dd className="text-right text-sm font-semibold text-text-primary">{children}</dd>
    </div>
  );
}

export default function UserProfileModal({ user, onClose }: { user: PlatformUser; onClose: () => void }) {
  const titleId = useId();

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <div className="p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className={cn("flex-center h-14 w-14 shrink-0 rounded-full text-lg font-semibold text-white", avatarClass(user.name))}>
              {initials(user.name)}
            </span>
            <div>
              <h2 id={titleId} className="font-jakarta text-lg font-semibold text-text-primary">{user.name}</h2>
              <p className="text-sm text-text-muted">{KIND_LABEL[user.kind]}</p>
            </div>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-2 text-text-muted hover:bg-sa-gray-soft hover:text-text-primary">
            <X size={20} />
          </button>
        </div>

        <dl className="mt-4 divide-y divide-border-line02">
          <Row label="Email">{user.email}</Row>
          <Row label="Phone">{user.phone ?? "—"}</Row>
          <Row label="School">{user.school}</Row>
          <Row label="Location">{user.location ?? "—"}</Row>
          {user.plan !== undefined && <Row label="Plan">{user.plan ?? "No plan"}</Row>}
          {user.subject !== undefined && <Row label="Subject">{user.subject ?? "—"}</Row>}
          {user.classes && <Row label="Classes">{user.classes.join(", ") || "—"}</Row>}
          {user.children !== undefined && <Row label="Children">{user.children}</Row>}
          {user.className !== undefined && <Row label="Class">{user.className ?? "—"}</Row>}
          {user.admissionNo !== undefined && <Row label="Admission No.">{user.admissionNo ?? "—"}</Row>}
          {user.parentName !== undefined && <Row label="Parent">{user.parentName ?? "—"}</Row>}
          <Row label="Status"><StatusBadge label={user.status} tone={statusTone[user.status]} /></Row>
          <Row label="Last Login">{formatDateTime(user.lastLogin)}</Row>
          <Row label="Joined">{formatDate(user.createdAt)}</Row>
        </dl>
      </div>
    </ModalShell>
  );
}