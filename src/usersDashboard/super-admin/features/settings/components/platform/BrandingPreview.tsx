import { useId } from "react";
import { X } from "lucide-react";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";

interface BrandingPreviewProps {
  primary: string;
  secondary: string;
  accent: string;
  onClose: () => void;
}

const VALID = /^#[0-9A-Fa-f]{6}$/;
const safe = (c: string, fallback: string) => (VALID.test(c) ? c : fallback);

export default function BrandingPreview({ primary, secondary, accent, onClose }: BrandingPreviewProps) {
  const titleId = useId();
  const p = safe(primary, "#1483D3");
  const s = safe(secondary, "#0F172A");
  const a = safe(accent, "#FFFFFF");

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-xl">
      <div className="p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-jakarta text-xl font-semibold text-text-primary">Branding preview</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-2 text-text-muted hover:bg-sa-gray-soft hover:text-text-primary"><X size={20} /></button>
        </div>
        <div className="mt-5 flex h-64 overflow-hidden rounded-2xl border border-border-line02">
          <div className="w-1/3 space-y-3 p-4" style={{ backgroundColor: s }}>
            <div className="h-3 w-2/3 rounded" style={{ backgroundColor: a, opacity: 0.9 }} />
            {[0, 1, 2].map((i) => <div key={i} className="h-2.5 rounded" style={{ backgroundColor: a, opacity: 0.35 }} />)}
          </div>
          <div className="flex-1 space-y-4 p-5" style={{ backgroundColor: a }}>
            <div className="h-3 w-1/2 rounded bg-black/20" />
            <div className="h-2.5 w-3/4 rounded bg-black/10" />
            <span className="inline-block rounded-xl px-5 py-2.5 text-sm font-medium text-white" style={{ backgroundColor: p }}>Primary button</span>
            <div className="rounded-xl border p-3 text-sm" style={{ borderColor: p, color: p }}>Highlighted card</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-text-muted">A rough preview only. Check contrast before saving.</p>
      </div>
    </ModalShell>
  );
}