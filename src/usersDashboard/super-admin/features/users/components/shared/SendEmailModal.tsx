import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { sendEmailSchema, type SendEmailValues } from "../../schemas";
import { useSendUserEmail } from "../../hooks/useUsers";
import type { PlatformUser } from "../../types";

export default function SendEmailModal({ user, onClose }: { user: PlatformUser; onClose: () => void }) {
  const titleId = useId();
  const { register, handleSubmit, formState: { errors } } = useForm<SendEmailValues>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: { subject: "", message: "" },
  });
  const mutation = useSendUserEmail();

  const onSubmit = (values: SendEmailValues) => {
    mutation.mutate({ id: user.id, ...values }, { onSuccess: onClose });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8">
        <span className="flex-center h-14 w-14 rounded-2xl bg-sa-blue-soft text-sa-blue-icon">
          <Mail size={24} aria-hidden />
        </span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">Send email</h2>
        <p className="mt-2 text-sm text-text-secondary">
          To <strong className="text-text-primary">{user.name}</strong> ({user.email})
        </p>

        <div className="mt-5 space-y-5">
          <FormInput
            label="Subject *"
            placeholder="e.g. Action needed on your account"
            autoComplete="off"
            error={errors.subject?.message}
            isLoading={mutation.isPending}
            {...register("subject")}
          />
          <div>
            <label htmlFor="sa-email-message" className="mb-1.5 block text-sm font-medium text-label">Message *</label>
            <textarea
              id="sa-email-message"
              rows={6}
              disabled={mutation.isPending}
              placeholder="Write your message..."
              aria-invalid={Boolean(errors.message)}
              className="w-full resize-none rounded-xl border border-border-line02 bg-bg-input px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60"
              {...register("message")}
            />
            {errors.message && <p role="alert" className="mt-1 text-xs text-danger">{errors.message.message}</p>}
          </div>
        </div>

        {mutation.isError && (
          <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">
            {mutation.error.message}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
          <SubmitButton label="Send Email" isLoading={mutation.isPending} />
        </div>
      </form>
    </ModalShell>
  );
}