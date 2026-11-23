import { useId, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { useSchools } from "@/usersDashboard/super-admin/features/schools/hooks/useSchools";
import { inviteAdminSchema, type InviteAdminValues } from "../../schemas";
import { useInviteAdmin } from "../../hooks/useUsers";

export default function InviteAdminModal({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const { data } = useSchools();
  const mutation = useInviteAdmin();

  // Only schools that can take a new administrator
  const schools = useMemo(
    () => (data?.schools ?? []).filter((s) => s.status === "Active" || s.status === "Trial"),
    [data]
  );
  const options = useMemo(() => schools.map((s) => ({ value: s.id, label: s.name })), [schools]);

  const { register, handleSubmit, formState: { errors } } = useForm<InviteAdminValues>({
    resolver: zodResolver(inviteAdminSchema),
    defaultValues: { fullName: "", email: "", schoolId: "" },
  });

  const onSubmit = (values: InviteAdminValues) => {
    const schoolName = schools.find((s) => s.id === values.schoolId)?.name ?? "";
    mutation.mutate({ ...values, schoolName }, { onSuccess: onClose });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-jakarta text-xl font-semibold text-text-primary">Invite School Admin</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-2 text-text-muted hover:bg-sa-gray-soft hover:text-text-primary">
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <FormInput label="Full Name" placeholder="e.g. Adebayo Okafor" autoComplete="off" error={errors.fullName?.message} isLoading={mutation.isPending} {...register("fullName")} />
          <FormInput label="Email Address" type="email" placeholder="admin@school.edu.ng" autoComplete="off" error={errors.email?.message} isLoading={mutation.isPending} {...register("email")} />
          <FormSelect label="School" options={options} placeholder="Select school" error={errors.schoolId?.message} {...register("schoolId")} />
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-sa-blue-line bg-sa-blue-soft p-4 text-sm text-sa-blue-text">
          <Check size={16} className="mt-0.5 shrink-0" aria-hidden />
          <p>The invitee will receive a secure email link to set up their password and activate their account.</p>
        </div>

        {mutation.isError && (
          <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">
            {mutation.error.message}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
          <SubmitButton label="Send Invitation" isLoading={mutation.isPending} />
        </div>
      </form>
    </ModalShell>
  );
}