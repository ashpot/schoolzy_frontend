import { useId, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import ModalShell from "@/usersDashboard/super-admin/features/schools/components/all-schools/ModalShell";
import { makeGatewaySchema, type GatewayValues } from "../../schemas";
import { useSaveGateway } from "../../hooks/useGateways";
import type { Gateway } from "../../types";
import { CURRENCIES, GATEWAY_MODES } from "../../utils/constants";

export default function GatewayConfigModal({ gateway: g, onClose }: { gateway: Gateway; onClose: () => void }) {
  const titleId = useId();
  const mutation = useSaveGateway();
  const schema = useMemo(() => makeGatewaySchema(g.needsKeys, g.hasSecret), [g.needsKeys, g.hasSecret]);
  const { register, handleSubmit, formState: { errors } } = useForm<GatewayValues>({
    resolver: zodResolver(schema),
    defaultValues: { publicKey: g.publicKey, secretKey: "", mode: g.mode, currency: g.currency },
  });
  const busy = mutation.isPending;

  return (
    <ModalShell onClose={onClose} labelledBy={titleId} widthClass="max-w-lg" closeOnBackdrop={false}>
      <form onSubmit={handleSubmit((values) => mutation.mutate({ id: g.id, values }, { onSuccess: onClose }))} noValidate className="p-8">
        <h2 id={titleId} className="font-jakarta text-xl font-semibold text-text-primary">Configure {g.name}</h2>
        <p className="mt-1 text-sm text-text-secondary">
          {g.needsKeys ? "Keys are stored securely and the secret key is never shown again." : "Manual payments need no API keys."}
        </p>

        <div className="mt-5 space-y-5">
          {g.needsKeys && (
            <>
              <FormInput label="Public Key" autoComplete="off" error={errors.publicKey?.message} isLoading={busy} {...register("publicKey")} />
              <FormInput
                label="Secret Key"
                type="password"
                autoComplete="new-password"
                placeholder={g.hasSecret ? "Leave blank to keep the current key" : "Enter secret key"}
                error={errors.secretKey?.message}
                isLoading={busy}
                {...register("secretKey")}
              />
            </>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <FormSelect label="Mode" options={GATEWAY_MODES} error={errors.mode?.message} {...register("mode")} />
            <FormSelect label="Currency" options={CURRENCIES} error={errors.currency?.message} {...register("currency")} />
          </div>
        </div>

        {mutation.isError && <p role="alert" className="mt-4 rounded-xl bg-sa-red-soft px-4 py-3 text-sm text-sa-red-text">{mutation.error.message}</p>}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={busy}>Cancel</Button>
          <SubmitButton label="Save" isLoading={busy} />
        </div>
      </form>
    </ModalShell>
  );
}