import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Eye, Mail, MessageSquare, Pencil } from "lucide-react";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import { rowVariant, staggerContainer } from "../../animations/variants";
import { useDuplicateTemplate } from "../../hooks/useComms";
import type { Channel, Notice, Template } from "../../types";
import { shortDate } from "../../utils/format";
import NoticeBanner from "../shared/NoticeBanner";
import TemplateFormModal from "./TemplateFormModal";
import TemplatePreviewModal from "./TemplatePreviewModal";

const CHANNEL_TONE: Record<Channel, Tone> = { Email: "blue", SMS: "green", Both: "purple" };
const th = "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted first:px-6";
const iconBtn = "rounded-lg p-2 text-text-muted transition-colors hover:bg-sa-gray-soft hover:text-text-primary disabled:opacity-40";

export default function TemplatesTab({ templates }: { templates: Template[] }) {
  const duplicate = useDuplicateTemplate();
  const [editing, setEditing] = useState<Template | null>(null);
  const [previewing, setPreviewing] = useState<Template | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);

  const onDuplicate = (t: Template) =>
    duplicate.mutate(t.id, {
      onSuccess: () => setNotice({ tone: "green", text: `Created "${t.name} (Copy)" as a draft.` }),
      onError: (e) => setNotice({ tone: "red", text: e.message }),
    });

  return (
    <div className="space-y-4">
      <NoticeBanner notice={notice} onDismiss={() => setNotice(null)} />
      <SectionCard title="Email & SMS Templates" subtitle="Manage automated message templates.">
        <div className="-mx-6 overflow-x-auto lg:-mx-8">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-bg-input">
                <th className={th}>Template Name</th><th className={th}>Channel</th><th className={th}>Status</th>
                <th className={th}>Last Updated</th><th className={th}>Actions</th>
              </tr>
            </thead>
            <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
              {templates.map((t) => (
                <motion.tr key={t.id} variants={rowVariant} className="border-t border-border-line02">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex-center h-9 w-9 rounded-lg bg-sa-blue-soft text-sa-blue-icon">
                        {t.channel === "SMS" ? <MessageSquare size={16} aria-hidden /> : <Mail size={16} aria-hidden />}
                      </span>
                      <span className="text-sm font-semibold text-text-primary">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><StatusBadge label={t.channel} tone={CHANNEL_TONE[t.channel]} /></td>
                  <td className="px-4 py-3.5"><StatusBadge label={t.status} tone={t.status === "Active" ? "green" : "gray"} /></td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">{shortDate(t.updatedAt)}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button type="button" aria-label={`Edit ${t.name}`} onClick={() => setEditing(t)} className={iconBtn}><Pencil size={16} /></button>
                      <button type="button" aria-label={`Preview ${t.name}`} onClick={() => setPreviewing(t)} className={iconBtn}><Eye size={16} /></button>
                      <button type="button" aria-label={`Duplicate ${t.name}`} disabled={duplicate.isPending} onClick={() => onDuplicate(t)} className={iconBtn}><Copy size={16} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </SectionCard>

      <AnimatePresence>{editing && <TemplateFormModal key={editing.id} template={editing} onClose={() => setEditing(null)} />}</AnimatePresence>
      <AnimatePresence>{previewing && <TemplatePreviewModal key={previewing.id} template={previewing} onClose={() => setPreviewing(null)} />}</AnimatePresence>
    </div>
  );
}