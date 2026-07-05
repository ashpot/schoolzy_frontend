import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layers } from "lucide-react";
import { sessionSchema, type SessionValues } from "../../schemas";
import { useCreateSession } from "../../hooks/useSessions";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";

interface Props {
  onSuccess: (values: SessionValues) => void;
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
      onSuccess: () => {
        onSuccess(values);
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

        {/* Active toggle */}
        <label className="flex items-start gap-3 p-4 rounded-xl border border-border-line02 bg-bg-input cursor-pointer hover:border-brand-primary transition-colors">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded accent-[hsl(205,83%,45%)]"
            {...register("isActive")}
          />
          <div>
            <p className="text-sm font-medium text-text-primary">Set as Active Session</p>
            <p className="text-xs text-text-muted mt-0.5">Marking this active will deactivate any current session</p>
          </div>
        </label>

        <SubmitButton label="Create Session" isLoading={mutation.isPending} />
      </form>
    </div>
  );
}