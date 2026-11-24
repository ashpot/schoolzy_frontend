import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { roleSchema, type RoleValues } from "../schemas";
import { useSaveRole } from "../hooks/useRoles";
import type { Role } from "../types";

interface RoleFormModalProps {
  role: Role | null; // null = create
  onClose: () => void;
  onSaved: (role: Role) => void;
}

export default function RoleFormModal({ role, onClose, onSaved }: RoleFormModalProps) {
  const titleId = useId();
  const mutation = useSaveRole();
  const { register, handleSubmit, formState: { errors } } = useForm<RoleValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: { name: role?.name ?? "", description: role?.description ?? "" },
  });
  const busy = mutation.isPending;

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md" closeOnBackdrop={false}>
      <form onSubmit={handleSubmit((values) => mutation.mutate({ id: role?.id, values }, { onSuccess: onSaved }))} noValidate className="p-8">
        <span className="flex-center h-14 w-14 rounded-2xl bg-sa-blue-soft text-sa-blue-icon"><ShieldCheck size={24} aria-hidden /></span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">{role ? "Edit role" : "Create role"}</h2>
        {!role && <p className="mt-1 text-sm text-text-secondary">New roles start with no permissions. Grant them after creating.</p>}

        <div className="mt-5 space-y-5">
          <FormInput label="Role Name *" placeholder="e.g. Billing Analyst" autoComplete="off" error={errors.name?.message} isLoading={busy} {...register("name")} />
          <div>
            <label htmlFor="sa-role-desc" className="mb-1.5 block text-sm font-medium text-label">Description *</label>
            <textarea
              id="sa-role-desc"
              rows={3}
              disabled={busy}
              aria-invalid={Boolean(errors.description)}
              className="w-full resize-none rounded-xl border border-border-line02 bg-bg-input px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60"
              {...register("description")}
            />
            {errors.description && <p role="alert" className="mt-1 text-xs text-danger">{errors.description.message}</p>}
          </div>
        </div>

        {mutation.isError && <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">{mutation.error.message}</p>}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={busy}>Cancel</Button>
          <SubmitButton label={role ? "Save Changes" : "Create Role"} isLoading={busy} />
        </div>
      </form>
    </ModalShell>
  );
}