import { useId, useMemo, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Ban, LogIn, RotateCcw, Trash2, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import { toneIconTile, type Tone } from "@/usersDashboard/super-admin/shared/utils/tones";
import {
  useDeleteSchool,
  useImpersonateSchoolAdmin,
  useReactivateSchool,
  useSuspendSchool,
} from "../../hooks/useSchools";
import type { ConfirmAction, School } from "../../types";
import ModalShell from "./ModalShell";

interface Copy {
  title: string;
  confirmLabel: string;
  icon: LucideIcon;
  tone: Tone;
  destructive: boolean;
  requireName: boolean;
  body: (name: string) => ReactNode;
}

const COPY: Record<ConfirmAction, Copy> = {
  suspend: {
    title: "Suspend school?",
    confirmLabel: "Suspend School",
    icon: Ban,
    tone: "amber",
    destructive: true,
    requireName: false,
    body: (n) => <>Everyone at <strong>{n}</strong> will lose access immediately until the school is reactivated.</>,
  },
  reactivate: {
    title: "Reactivate school?",
    confirmLabel: "Reactivate School",
    icon: RotateCcw,
    tone: "green",
    destructive: false,
    requireName: false,
    body: (n) => <>Access will be restored for everyone at <strong>{n}</strong>.</>,
  },
  delete: {
    title: "Delete school?",
    confirmLabel: "Delete School",
    icon: Trash2,
    tone: "red",
    destructive: true,
    requireName: true,
    body: (n) => <>This permanently removes <strong>{n}</strong> and all of its data. This cannot be undone.</>,
  },
  impersonate: {
    title: "Login as school admin?",
    confirmLabel: "Continue",
    icon: LogIn,
    tone: "blue",
    destructive: false,
    requireName: false,
    body: (n) => <>You will sign in as the administrator of <strong>{n}</strong>. This is logged and should only be used for support.</>,
  },
};

interface FormValues {
  confirmName: string;
}

interface SchoolActionModalProps {
  action: ConfirmAction;
  school: School;
  onClose: () => void;
}

export default function SchoolActionModal({ action, school, onClose }: SchoolActionModalProps) {
  const titleId = useId();
  const copy = COPY[action];
  const Icon = copy.icon;

  const mutations = {
    suspend: useSuspendSchool(),
    reactivate: useReactivateSchool(),
    delete: useDeleteSchool(),
    impersonate: useImpersonateSchoolAdmin(),
  };
  const mutation = mutations[action];

  // Deleting requires typing the school's exact name. One schema shape for every action,
  // so the form type (confirmName: string) always matches what the resolver returns.
  const schema = useMemo(
    () =>
      z.object({
        confirmName: z
          .string()
          .refine((v) => !copy.requireName || v.trim() === school.name, "Type the school name exactly to confirm"),
      }),
    [copy.requireName, school.name]
  );

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { confirmName: "" },
  });

  const onSubmit = () => {
    mutation.mutate(school.id, { onSuccess: onClose });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8">
        <span className={cn("flex-center h-14 w-14 rounded-2xl", toneIconTile[copy.tone])}>
          <Icon size={24} aria-hidden />
        </span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">{copy.title}</h2>
        <p className="mt-2 text-sm text-text-secondary">{copy.body(school.name)}</p>

        {copy.requireName && (
          <div className="mt-5">
            <FormInput
              label={`Type "${school.name}" to confirm`}
              autoComplete="off"
              error={errors.confirmName?.message}
              isLoading={mutation.isPending}
              {...register("confirmName")}
            />
          </div>
        )}

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