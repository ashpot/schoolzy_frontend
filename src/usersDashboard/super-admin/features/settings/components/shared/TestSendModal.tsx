import { useId, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageSquare } from "lucide-react";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { testEmailSchema, testSmsSchema, type TestValues } from "../../schemas";
import { useTestSend } from "../../hooks/useComms";

interface TestSendModalProps {
  kind: "email" | "sms";
  defaultTo?: string;
  onClose: () => void;
  onSent: (to: string) => void;
}

export default function TestSendModal({ kind, defaultTo = "", onClose, onSent }: TestSendModalProps) {
  const titleId = useId();
  const mutation = useTestSend();
  const isEmail = kind === "email";
  const schema = useMemo(() => (isEmail ? testEmailSchema : testSmsSchema), [isEmail]);
  const Icon = isEmail ? Mail : MessageSquare;

  const { register, handleSubmit, formState: { errors } } = useForm<TestValues>({
    resolver: zodResolver(schema),
    defaultValues: { to: defaultTo },
  });

  const onSubmit = (v: TestValues) => {
    mutation.mutate({ kind, to: v.to }, { onSuccess: () => { onSent(v.to); onClose(); } });
  };

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8">
        <span className="flex-center h-14 w-14 rounded-2xl bg-sa-blue-soft text-sa-blue-icon"><Icon size={24} aria-hidden /></span>
        <h2 id={titleId} className="mt-5 font-jakarta text-xl font-semibold text-text-primary">{isEmail ? "Send test email" : "Send test SMS"}</h2>
        <p className="mt-2 text-sm text-text-secondary">Uses the saved configuration to send one test message.</p>
        <div className="mt-5">
          <FormInput
            label={isEmail ? "Recipient email *" : "Recipient phone *"}
            type={isEmail ? "email" : "tel"}
            placeholder={isEmail ? "you@schoolzy.com" : "+234 801 234 5678"}
            autoComplete="off"
            error={errors.to?.message}
            isLoading={mutation.isPending}
            {...register("to")}
          />
        </div>
        {mutation.isError && <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">{mutation.error.message}</p>}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
          <SubmitButton label="Send Test" isLoading={mutation.isPending} />
        </div>
      </form>
    </ModalShell>
  );
}