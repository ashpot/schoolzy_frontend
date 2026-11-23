import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { makeSmsSchema, type SmsValues } from "../../schemas";
import { useSaveSms } from "../../hooks/useComms";
import type { Notice, SmsConfig } from "../../types";
import { SMS_PROVIDERS } from "../../utils/constants";
import NoticeBanner from "../shared/NoticeBanner";
import SaveRow from "../shared/SaveRow";
import TestSendModal from "../shared/TestSendModal";

export default function SmsTab({ data }: { data: SmsConfig }) {
  const mutation = useSaveSms();
  const [testing, setTesting] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const schema = useMemo(() => makeSmsSchema(data.hasApiKey), [data.hasApiKey]);

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<SmsValues>({
    resolver: zodResolver(schema),
    defaultValues: { provider: data.provider, senderId: data.senderId, countryCode: data.countryCode, apiKey: "" },
  });
  const busy = mutation.isPending;

  return (
    <form onSubmit={handleSubmit((v) => mutation.mutate(v, { onSuccess: () => reset({ ...v, apiKey: "" }) }))} noValidate className="space-y-4">
      <NoticeBanner notice={notice} onDismiss={() => setNotice(null)} />
      <SectionCard title="SMS Provider" subtitle="Configure the SMS service used for notifications.">
        <div className="grid gap-5 md:grid-cols-2">
          <FormSelect label="SMS Provider" options={SMS_PROVIDERS} error={errors.provider?.message} {...register("provider")} />
          <FormInput
            label="API Key *"
            type="password"
            autoComplete="new-password"
            placeholder={data.hasApiKey ? "Leave blank to keep the current key" : "Enter API key"}
            error={errors.apiKey?.message}
            isLoading={busy}
            {...register("apiKey")}
          />
          <FormInput label="Sender ID" autoComplete="off" error={errors.senderId?.message} isLoading={busy} {...register("senderId")} />
          <FormInput label="Default Country Code" autoComplete="off" error={errors.countryCode?.message} isLoading={busy} {...register("countryCode")} />
        </div>
        <SaveRow
          label="Save Configuration"
          isPending={busy}
          saved={mutation.isSuccess && !isDirty}
          error={mutation.isError ? mutation.error.message : null}
          extra={<Button type="button" variant="outline" leftIcon={<MessageSquare size={16} />} onClick={() => setTesting(true)}>Test SMS</Button>}
        />
      </SectionCard>

      <AnimatePresence>
        {testing && <TestSendModal key="test" kind="sms" onClose={() => setTesting(false)} onSent={(to) => setNotice({ tone: "green", text: `Test SMS sent to ${to}.` })} />}
      </AnimatePresence>
    </form>
  );
}