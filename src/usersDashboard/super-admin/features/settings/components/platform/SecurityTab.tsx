import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/shared/ui/FormInput";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { securitySchema, type SecurityValues } from "../../schemas";
import { useSaveSecurity } from "../../hooks/usePlatformSettings";
import SaveRow from "../shared/SaveRow";
import { ToggleRow } from "../shared/ToggleControls";

export default function SecurityTab({ data }: { data: SecurityValues }) {
  const mutation = useSaveSecurity();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<SecurityValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: data,
  });
  const busy = mutation.isPending;

  return (
    <form onSubmit={handleSubmit((v) => mutation.mutate(v, { onSuccess: () => reset(v) }))} noValidate className="space-y-6">
      <SectionCard title="Authentication" subtitle="Password and session security policies.">
        <div className="grid gap-5 md:grid-cols-2">
          <FormInput label="Minimum Password Length" inputMode="numeric" error={errors.minPasswordLength?.message} isLoading={busy} {...register("minPasswordLength")} />
          <FormInput label="Password Expiry (Days, 0 = never)" inputMode="numeric" error={errors.passwordExpiryDays?.message} isLoading={busy} {...register("passwordExpiryDays")} />
          <FormInput label="Max Login Attempts" inputMode="numeric" error={errors.maxLoginAttempts?.message} isLoading={busy} {...register("maxLoginAttempts")} />
          <FormInput label="Session Timeout (Minutes)" inputMode="numeric" error={errors.sessionTimeoutMinutes?.message} isLoading={busy} {...register("sessionTimeoutMinutes")} />
        </div>
      </SectionCard>

      <SectionCard title="Password Requirements">
        <div className="space-y-3">
          <ToggleRow heading="Require Uppercase Letters" description="At least one uppercase character" {...register("requireUppercase")} />
          <ToggleRow heading="Require Numbers" description="At least one numeric digit" {...register("requireNumbers")} />
          <ToggleRow heading="Require Special Characters" description="At least one symbol (!, @, #...)" {...register("requireSpecial")} />
        </div>
      </SectionCard>

      <SectionCard title="Advanced Security">
        <div className="space-y-3">
          <ToggleRow heading="Two-Factor Authentication" description="Require 2FA for all admin users" {...register("twoFactor")} />
          <ToggleRow heading="Device Verification" description="Verify new login devices via email" {...register("deviceVerification")} />
          <ToggleRow heading="Allow Multiple Sessions" description="Let users stay logged in on multiple devices" {...register("multipleSessions")} />
        </div>
        <p className="mt-4 text-xs text-text-muted">These settings are enforced by the server. Changes apply to new sessions.</p>
        <SaveRow label="Save Security Settings" isPending={busy} saved={mutation.isSuccess && !isDirty} error={mutation.isError ? mutation.error.message : null} />
      </SectionCard>
    </form>
  );
}