import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layers } from "lucide-react";
import { sessionSchema, type SessionValues } from "../../schemas";
import { useCreateSession } from "../../hooks/useSessions";
import type { Session } from "../../types";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";

interface Props {
  onSuccess: (session: Session) => void;
}

export default function SessionForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SessionValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: { name: "", startDate: "", endDate: "", isActive: false },
  });

  const mutation = useCreateSession();

  const onSubmit = (values: SessionValues) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        onSuccess({
          id: String(data.id),
          name: data.name,
          startDate: data.start_date,
          endDate: data.end_date,
          isActive: data.is_active,
        });
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl card-shadow p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Layers size={16} className="text-brand-primary" />
        </div>
        <h2 className="section-title">Add Session</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <FormInput
          label="Session Name *"
          placeholder="e.g. 2025/2026"
          error={errors.name?.message}
          isLoading={mutation.isPending}
          {...register("name")}
        />

        <FormInput
          label="Start Date *"
          type="date"
          error={errors.startDate?.message}
          isLoading={mutation.isPending}
          {...register("startDate")}
        />

        <FormInput
          label="End Date *"
          type="date"
          error={errors.endDate?.message}
          isLoading={mutation.isPending}
          {...register("endDate")}
        />

        {/* Active toggle — TODO: currently cosmetic, backend doesn't accept is_active on create */}
        <label className="flex items-start gap-3 p-4 rounded-xl border border-border-line02 bg-bg-input cursor-pointer hover:border-brand-primary transition-colors">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded accent-[hsl(205,83%,45%)]"
            {...register("isActive")}
          />
          <div>
            <p className="text-sm font-medium text-text-primary">Set as Active Session</p>
            <p className="text-xs text-text-muted mt-0.5">Not yet wired to backend — new sessions always start inactive</p>
          </div>
        </label>

        <SubmitButton label="Create Session" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}