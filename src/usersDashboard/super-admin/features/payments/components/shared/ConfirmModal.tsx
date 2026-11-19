import { useId, type FormEvent, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import Button from "@/shared/ui/Button";
import SubmitButton from "@/shared/ui/SubmitButton";
import { toneIconTile, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";

interface ConfirmModalProps {
  title: string;
  body: ReactNode;
  icon: LucideIcon;
  tone: Tone;
  confirmLabel: string;
  destructive?: boolean;
  isPending: boolean;
  error?: string | null;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal(p: ConfirmModalProps) {
  const titleId = useId();
  const Icon = p.icon;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    p.onConfirm();
  };

  return (
    <ModalShell onClose={p.onClose} labelledBy={titleId} widthClass="max-w-md">
      <form onSubmit={onSubmit} noValidate className="p-8">
        <span className={cn("flex-center h-14 w-14 rounded-2xl", toneIconTile[p.tone])}>
          <Icon size={24} aria-hidden />
        </span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">{p.title}</h2>
        <p className="mt-2 text-sm text-text-secondary">{p.body}</p>

        {p.error && (
          <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">{p.error}</p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={p.onClose} disabled={p.isPending}>Cancel</Button>
          <SubmitButton
            label={p.confirmLabel}
            isLoading={p.isPending}
            className={p.destructive ? "bg-danger hover:bg-danger/90" : undefined}
          />
        </div>
      </form>
    </ModalShell>
  );
}