import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { templateSchema, type TemplateValues } from "../../schemas";
import { useSaveTemplate } from "../../hooks/useComms";
import type { Template } from "../../types";
import { CHANNELS, PLACEHOLDERS, TEMPLATE_STATUSES } from "../../utils/constants";

export default function TemplateFormModal({ template, onClose }: { template: Template; onClose: () => void }) {
  const titleId = useId();
  const mutation = useSaveTemplate();
  const { register, handleSubmit, formState: { errors } } = useForm<TemplateValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: { name: template.name, channel: template.channel, status: template.status, subject: template.subject, body: template.body },
  });
  const busy = mutation.isPending;

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-xl" closeOnBackdrop={false}>
      <form onSubmit={handleSubmit((values) => mutation.mutate({ id: template.id, values }, { onSuccess: onClose }))} noValidate className="p-8">
        <h2 id={titleId} className="font-jakarta text-xl font-semibold text-text-primary">Edit template</h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2"><FormInput label="Template Name *" autoComplete="off" error={errors.name?.message} isLoading={busy} {...register("name")} /></div>
          <FormSelect label="Channel" options={CHANNELS} error={errors.channel?.message} {...register("channel")} />
          <FormSelect label="Status" options={TEMPLATE_STATUSES} error={errors.status?.message} {...register("status")} />
          <div className="sm:col-span-2"><FormInput label="Subject (email)" autoComplete="off" error={errors.subject?.message} isLoading={busy} {...register("subject")} /></div>
          <div className="sm:col-span-2">
            <label htmlFor="sa-tpl-body" className="mb-1.5 block text-sm font-medium text-label">Message *</label>
            <textarea
              id="sa-tpl-body"
              rows={6}
              disabled={busy}
              aria-invalid={Boolean(errors.body)}
              className="w-full resize-none rounded-xl border border-border-line02 bg-bg-input px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60"
              {...register("body")}
            />
            {errors.body && <p role="alert" className="mt-1 text-xs text-danger">{errors.body.message}</p>}
            <p className="mt-1.5 text-xs text-text-muted">Available placeholders: {PLACEHOLDERS.join("  ")}</p>
          </div>
        </div>

        {mutation.isError && <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">{mutation.error.message}</p>}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={busy}>Cancel</Button>
          <SubmitButton label="Save Template" isLoading={busy} />
        </div>
      </form>
    </ModalShell>
  );
}