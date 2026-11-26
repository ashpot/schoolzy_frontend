import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { userStorage } from "@/super-admin-auth";
import { makeEmailSchema, type EmailValues } from "../../schemas";
import { useSaveEmail } from "../../hooks/useComms";
import type { EmailConfig, Notice } from "../../types";
import { ENCRYPTIONS } from "../../utils/constants";
import NoticeBanner from "../shared/NoticeBanner";
import SaveRow from "../shared/SaveRow";
import TestSendModal from "../shared/TestSendModal";

export default function EmailTab({ data }: { data: EmailConfig }) {
  const mutation = useSaveEmail();
  const [testing, setTesting] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const schema = useMemo(() => makeEmailSchema(data.hasPassword), [data.hasPassword]);
  const { password: _unused, ...rest } = { ...data, password: "" };
  void _unused;

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<EmailValues>({
    resolver: zodResolver(schema),
    defaultValues: { ...rest, password: "" },
  });
  const busy = mutation.isPending;

  return (
    <form onSubmit={handleSubmit((v) => mutation.mutate(v, { onSuccess: () => reset({ ...v, password: "" }) }))} noValidate className="space-y-4">
      <NoticeBanner notice={notice} onDismiss={() => setNotice(null)} />
      <SectionCard title="SMTP Configuration" subtitle="Configure the email server used to send all platform emails.">
        <div className="grid gap-5 md:grid-cols-2">
          <FormInput label="SMTP Host *" autoComplete="off" error={errors.host?.message} isLoading={busy} {...register("host")} />
          <FormInput label="Port" inputMode="numeric" error={errors.port?.message} isLoading={busy} {...register("port")} />
          <FormInput label="Username" autoComplete="off" error={errors.username?.message} isLoading={busy} {...register("username")} />
          <FormInput
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder={data.hasPassword ? "Leave blank to keep the current password" : "Enter password"}
            error={errors.password?.message}
            isLoading={busy}
            {...register("password")}
          />
          <FormSelect label="Encryption" options={ENCRYPTIONS} error={errors.encryption?.message} {...register("encryption")} />
          <FormInput label="Sender Name" autoComplete="off" error={errors.senderName?.message} isLoading={busy} {...register("senderName")} />
          <div className="md:col-span-2">
            <FormInput label="Sender Email" type="email" autoComplete="off" error={errors.senderEmail?.message} isLoading={busy} {...register("senderEmail")} />
          </div>
        </div>
        <SaveRow
          label="Save Configuration"
          isPending={busy}
          saved={mutation.isSuccess && !isDirty}
          error={mutation.isError ? mutation.error.message : null}
          extra={<Button type="button" variant="outline" leftIcon={<Mail size={16} />} onClick={() => setTesting(true)}>Test Email</Button>}
        />
      </SectionCard>

      <AnimatePresence>
        {testing && (
          <TestSendModal key="test" kind="email" defaultTo={userStorage.get()?.email ?? ""} onClose={() => setTesting(false)} onSent={(to) => setNotice({ tone: "green", text: `Test email sent to ${to}.` })} />
        )}
      </AnimatePresence>
    </form>
  );
}