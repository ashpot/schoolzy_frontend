import { useId, type FormEvent, type ReactNode } from "react";
import { AlertCircle, Bell, FileText, RefreshCw, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import Button from "@/shared/ui/Button";
import SubmitButton from "@/shared/ui/SubmitButton";
import { toneIconTile, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { useSubscriptionAction } from "../../hooks/useSubscriptions";
import type { SubAction, Subscription } from "../../types";
import { formatNaira } from "../../utils/format";

interface Copy {
  title: string;
  confirmLabel: string;
  icon: LucideIcon;
  tone: Tone;
  destructive: boolean;
  body: (s: Subscription) => ReactNode;
}

const COPY: Record<SubAction, Copy> = {
  renew: {
    title: "Renew subscription?",
    confirmLabel: "Renew",
    icon: RefreshCw,
    tone: "green",
    destructive: false,
    body: (s) => <>The subscription for <strong>{s.school}</strong> will be extended by one {s.billing === "Annual" ? "year" : "month"}.</>,
  },
  invoice: {
    title: "Generate invoice?",
    confirmLabel: "Generate",
    icon: FileText,
    tone: "blue",
    destructive: false,
    body: (s) => <>An invoice for the <strong>{s.plan}</strong> plan ({formatNaira(s.amount)}) will be generated for <strong>{s.school}</strong>.</>,
  },
  reminder: {
    title: "Send reminder?",
    confirmLabel: "Send Reminder",
    icon: Bell,
    tone: "amber",
    destructive: false,
    body: (s) => <>A renewal reminder will be emailed to the administrator of <strong>{s.school}</strong>.</>,
  },
  suspend: {
    title: "Suspend subscription?",
    confirmLabel: "Suspend",
    icon: AlertCircle,
    tone: "red",
    destructive: true,
    body: (s) => <>The subscription for <strong>{s.school}</strong> will be suspended and the school may lose access.</>,
  },
};

interface SubActionModalProps {
  action: SubAction;
  sub: Subscription;
  onClose: () => void;
}

export default function SubActionModal({ action, sub, onClose }: SubActionModalProps) {
  const titleId = useId();
  const copy = COPY[action];
  const Icon = copy.icon;
  const mutation = useSubscriptionAction();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id: sub.id, action }, { onSuccess: onClose });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <form onSubmit={onSubmit} noValidate className="p-8">
        <span className={cn("flex-center h-14 w-14 rounded-2xl", toneIconTile[copy.tone])}>
          <Icon size={24} aria-hidden />
        </span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">{copy.title}</h2>
        <p className="mt-2 text-sm text-text-secondary">{copy.body(sub)}</p>

        {mutation.isError && (
          <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">
            {mutation.error.message}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
          <SubmitButton
            label={copy.confirmLabel}
            isLoading={mutation.isPending}
            className={copy.destructive ? "bg-danger hover:bg-danger/90" : undefined}
          />
        </div>
      </form>
    </ModalShell>
  );
}