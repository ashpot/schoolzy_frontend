import { useEffect, useId, useState, type ReactNode } from "react";
import { Copy, Download, Shield } from "lucide-react";
import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";
import StatusBadge from "@/usersDashboard/super-admin/shared/components/StatusBadge";
import { toneIconTile } from "@/usersDashboard/super-admin/shared/utils/tones";
import { DrawerSection } from "@/usersDashboard/super-admin/features/subscriptions/components/shared/DrawerParts";
import SideDrawer from "@/usersDashboard/super-admin/features/subscriptions/components/shared/SideDrawer";
import { initials2 } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { schoolTileClass } from "@/usersDashboard/super-admin/features/subscriptions/utils/tones";
import type { AuditLog } from "../types";
import { downloadJson, stamp } from "../utils/format";
import { actionIcon, categoryTone, statusTone } from "../utils/tones";

function Row({ label, children, mono }: { label: string; children: ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
      <dt className="text-text-secondary">{label}</dt>
      <dd className={cn("text-right font-medium text-text-primary", mono && "font-mono text-xs")}>{children}</dd>
    </div>
  );
}

export default function LogDrawer({ log, onClose }: { log: AuditLog; onClose: () => void }) {
  const titleId = useId();
  const [copied, setCopied] = useState(false);
  const Icon = actionIcon[log.action];

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(log.code);
      setCopied(true);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <SideDrawer
      title={`${log.action} — ${log.category}`}
      subtitle={stamp(log.at)}
      titleId={titleId}
      onClose={onClose}
      footer={
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" leftIcon={<Copy size={16} />} onClick={copy}>{copied ? "Copied" : "Copy Log ID"}</Button>
          <Button type="button" variant="primary" leftIcon={<Download size={16} />} onClick={() => downloadJson(`audit-${log.code}.json`, log)}>Download Log</Button>
        </div>
      }
    >
      <div className="px-8 pt-6">
        <div className="flex gap-2">
          <StatusBadge label={log.status} tone={statusTone[log.status]} />
          <StatusBadge label={log.category} tone={categoryTone[log.category]} />
        </div>
      </div>

      <DrawerSection title="Performed By">
        <div className="flex items-center gap-4 rounded-2xl border border-border-line02 p-4">
          <span className={cn("flex-center h-11 w-11 rounded-xl text-sm font-semibold", log.user === "Unknown" ? toneIconTile.red : schoolTileClass(log.user))}>
            {log.user === "Unknown" ? "??" : initials2(log.user)}
          </span>
          <div>
            <p className="font-semibold text-text-primary">{log.user}</p>
            <p className="text-sm text-text-secondary">{log.role}</p>
          </div>
        </div>
      </DrawerSection>

      <DrawerSection title="Activity Details">
        <dl className="rounded-2xl border border-border-line02 px-5 py-2">
          <Row label="Event Category"><StatusBadge label={log.category} tone={categoryTone[log.category]} /></Row>
          <Row label="Action"><span className="inline-flex items-center gap-2"><Icon size={15} className="text-sa-purple-icon" aria-hidden /> {log.action}</span></Row>
          {log.school && <Row label="School">{log.school}</Row>}
          <div className="border-t border-border-line02 py-3">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Description</dt>
            <dd className="mt-1.5 text-sm text-text-primary">{log.description}</dd>
          </div>
        </dl>
      </DrawerSection>

      {log.change && (
        <DrawerSection title="Changes Made">
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border-line02">
            <div className="bg-sa-red-soft p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-sa-red-text">Before</p>
              <p className="mt-1 text-xs text-text-secondary">{log.change.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-sa-red-text">{log.change.before}</p>
            </div>
            <div className="bg-sa-green-soft p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-sa-green-text">After</p>
              <p className="mt-1 text-xs text-text-secondary">{log.change.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-sa-green-text">{log.change.after}</p>
            </div>
          </div>
        </DrawerSection>
      )}

      <DrawerSection title="Technical Information">
        <dl className="rounded-2xl border border-border-line02 px-5 py-2">
          <Row label="IP Address" mono>{log.ip}</Row>
          <Row label="Browser">{log.browser}</Row>
          <Row label="OS">{log.os}</Row>
          <Row label="Device">{log.device}</Row>
          <Row label="Location">{log.location}</Row>
          <Row label="Session ID" mono>{log.sessionId}</Row>
        </dl>
      </DrawerSection>

      {log.resource && (
        <DrawerSection title="Related Resource">
          <div className="flex items-center gap-4 rounded-2xl border border-border-line02 p-4">
            <span className="flex-center h-11 w-11 rounded-xl bg-sa-blue-soft text-sa-blue-icon"><Shield size={18} aria-hidden /></span>
            <div>
              <p className="font-semibold text-text-primary">{log.resource.name}</p>
              <p className="text-xs text-text-muted">{log.resource.sub}</p>
            </div>
          </div>
        </DrawerSection>
      )}

      <DrawerSection title="Log ID">
        <p className="rounded-2xl bg-bg-input px-5 py-4 font-mono text-sm text-text-secondary">{log.code}</p>
      </DrawerSection>
    </SideDrawer>
  );
}