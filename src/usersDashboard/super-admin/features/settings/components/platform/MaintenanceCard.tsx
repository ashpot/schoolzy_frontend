import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Wrench } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/shared/ui/SubmitButton";
import { cn } from "@/shared/utils/cn";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import ConfirmModal from "@/usersDashboard/super-admin/features/payments/components/shared/ConfirmModal";
import { maintenanceSchema, type MaintenanceValues } from "../../schemas";
import { useSetMaintenance } from "../../hooks/usePlatformSettings";
import { Switch } from "../shared/ToggleControls";

export default function MaintenanceCard({ enabled, message }: { enabled: boolean; message: string }) {
  const mutation = useSetMaintenance();
  const [target, setTarget] = useState<boolean | null>(null); // the state being confirmed
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<MaintenanceValues>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: { message },
  });

  return (
    <SectionCard title="Maintenance Mode" subtitle="Take the platform offline for scheduled maintenance.">
      <div className={cn("flex items-center justify-between gap-4 rounded-2xl border px-5 py-4", enabled ? "border-sa-red-line bg-sa-red-soft" : "border-border-line02")}>
        <div>
          <p className={cn("flex items-center gap-2 text-sm font-semibold", enabled ? "text-sa-red-text" : "text-text-primary")}>
            {enabled && <AlertTriangle size={16} aria-hidden />}
            {enabled ? "Maintenance Mode is ON" : "Enable Maintenance Mode"}
          </p>
          <p className="mt-0.5 text-xs text-text-muted">All schools will see the maintenance message until this is turned off</p>
        </div>
        <Switch checked={enabled} label="Maintenance mode" disabled={mutation.isPending} onChange={setTarget} />
      </div>

      <AnimatePresence initial={false}>
        {enabled && (
          <motion.form
            key="msg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleSubmit((v) => mutation.mutate({ enabled: true, message: v.message }, { onSuccess: () => reset(v) }))}
            noValidate
            className="overflow-hidden"
          >
            <label htmlFor="sa-maint-msg" className="mb-2 mt-5 block text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Maintenance Message</label>
            <textarea
              id="sa-maint-msg"
              rows={3}
              aria-invalid={Boolean(errors.message)}
              className="w-full resize-none rounded-xl border border-border-line02 bg-bg-input px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              {...register("message")}
            />
            {errors.message && <p role="alert" className="mt-1 text-xs text-danger">{errors.message.message}</p>}
            {isDirty && <div className="mt-3 w-48"><SubmitButton label="Save Message" isLoading={mutation.isPending} /></div>}
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {target !== null && (
          <ConfirmModal
            key="confirm"
            title={target ? "Turn on maintenance mode?" : "Turn off maintenance mode?"}
            body={target ? <>Every school will see the maintenance message and lose access until you turn this off.</> : <>Schools will be able to use the platform again.</>}
            icon={Wrench}
            tone={target ? "red" : "green"}
            confirmLabel={target ? "Turn On" : "Turn Off"}
            destructive={target}
            isPending={mutation.isPending}
            error={mutation.isError ? mutation.error.message : null}
            onConfirm={() => mutation.mutate({ enabled: target, message }, { onSuccess: () => setTarget(null) })}
            onClose={() => setTarget(null)}
          />
        )}
      </AnimatePresence>
    </SectionCard>
  );
}