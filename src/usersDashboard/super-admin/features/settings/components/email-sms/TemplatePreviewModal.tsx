import { useId } from "react";
import { X } from "lucide-react";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import type { Template } from "../../types";
import { SAMPLE_VARS } from "../../utils/constants";
import { fillSample } from "../../utils/format";

export default function TemplatePreviewModal({ template: t, onClose }: { template: Template; onClose: () => void }) {
  const titleId = useId();

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-lg">
      <div className="p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="font-jakarta text-xl font-semibold text-text-primary">{t.name}</h2>
            <p className="mt-1 text-sm text-text-secondary">Preview with sample data</p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-2 text-text-muted hover:bg-sa-gray-soft hover:text-text-primary"><X size={20} /></button>
        </div>
        <div className="mt-5 flex gap-2">
          <StatusBadge label={t.channel} tone="blue" />
          <StatusBadge label={t.status} tone={t.status === "Active" ? "green" : "gray"} />
        </div>
        {t.channel !== "SMS" && (
          <p className="mt-5 text-sm"><span className="text-text-muted">Subject: </span><strong className="text-text-primary">{fillSample(t.subject, SAMPLE_VARS)}</strong></p>
        )}
        {/* Rendered as plain text, never as HTML */}
        <p className="mt-3 whitespace-pre-wrap rounded-2xl bg-bg-input p-5 text-sm text-text-primary">{fillSample(t.body, SAMPLE_VARS)}</p>
      </div>
    </ModalShell>
  );
}