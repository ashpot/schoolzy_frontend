import { useId, type FormEvent, type ReactNode } from "react";
import { KeyRound, LogIn, UserCheck, UserX, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import Button from "@/shared/ui/Button";
import SubmitButton from "@/shared/ui/SubmitButton";
import { toneIconTile, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { useUserAction } from "../../hooks/useUsers";
import type { ConfirmUserAction, PlatformUser } from "../../types";

interface Copy {
  title: string;
  confirmLabel: string;
  icon: LucideIcon;
  tone: Tone;
  destructive: boolean;
  body: (u: PlatformUser) => ReactNode;
}

const COPY: Record<ConfirmUserAction, Copy> = {
  login: {
    title: "Login as this user?",
    confirmLabel: "Continue",
    icon: LogIn,
    tone: "blue",
    destructive: false,
    body: (u) => <>You will sign in as <strong>{u.name}</strong> at {u.school}. This is logged and should only be used for support.</>,
  },
  reset: {
    title: "Reset password?",
    confirmLabel: "Send Reset Link",
    icon: KeyRound,
    tone: "amber",
    destructive: false,
    body: (u) => <>A password reset link will be emailed to <strong>{u.email}</strong>.</>,
  },
  deactivate: {
    title: "Deactivate account?",
    confirmLabel: "Deactivate",
    icon: UserX,
    tone: "red",
    destructive: true,
    body: (u) => <><strong>{u.name}</strong> will not be able to sign in until the account is activated again.</>,
  },
  activate: {
    title: "Activate account?",
    confirmLabel: "Activate",
    icon: UserCheck,
    tone: "green",
    destructive: false,
    body: (u) => <><strong>{u.name}</strong> will be able to sign in again.</>,
  },
};

interface UserActionModalProps {
  action: ConfirmUserAction;
  user: PlatformUser;
  onClose: () => void;
}

export default function UserActionModal({ action, user, onClose }: UserActionModalProps) {
  const titleId = useId();
  const copy = COPY[action];
  const Icon = copy.icon;
  const mutation = useUserAction(user.kind);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id: user.id, action }, { onSuccess: onClose });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <form onSubmit={onSubmit} noValidate className="p-8">
        <span className={cn("flex-center h-14 w-14 rounded-2xl", toneIconTile[copy.tone])}>
          <Icon size={24} aria-hidden />
        </span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">{copy.title}</h2>
        <p className="mt-2 text-sm text-text-secondary">{copy.body(user)}</p>

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