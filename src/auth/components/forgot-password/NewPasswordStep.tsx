import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Check } from "lucide-react";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import { newPasswordSchema, type NewPasswordValues } from "@/auth/schema/forgotPasswordSchema";
import { useResetPassword } from "@/auth/hooks/useForgotPassword";
import { cn } from "@/shared/utils/cn";

interface NewPasswordStepProps {
  onSuccess: () => void;
}

const REQUIREMENTS = [
  { label: "Minimum 8 characters", test: (v: string) => v.length >= 8 },
  { label: "At least one uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "At least one lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "At least one number", test: (v: string) => /[0-9]/.test(v) },
  { label: "At least one special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

export default function NewPasswordStep({ onSuccess }: NewPasswordStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPasswordValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const mutation = useResetPassword();
  const password = watch("password") ?? "";

  const onSubmit = (values: NewPasswordValues) => {
    mutation.mutate(values, { onSuccess });
  };

  return (
    <>
      <div className="w-14 h-14 rounded-2xl bg-brand-primary flex-center mx-auto mb-5">
        <Lock size={24} className="text-white" />
      </div>
      <h1 className="page-title text-center">Create New Password</h1>
      <p className="text-body-small text-text-secondary text-center mt-2 mb-6">
        Your verification was successful. Please create a new password for your account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormInput
          label="New Password"
          type="password"
          placeholder="Enter new password"
          error={errors.password?.message}
          isLoading={mutation.isPending}
          {...register("password")}
        />
        <FormInput
          label="Confirm New Password"
          type="password"
          placeholder="Confirm your new password"
          error={errors.confirmPassword?.message}
          isLoading={mutation.isPending}
          {...register("confirmPassword")}
        />

        <ul className="space-y-2">
          {REQUIREMENTS.map((req) => {
            const met = req.test(password);
            return (
              <li key={req.label} className="flex items-center gap-2 text-sm">
                <span
                  className={cn(
                    "w-4 h-4 rounded-full flex-center border transition-colors",
                    met ? "bg-success border-success" : "border-border-line02"
                  )}
                >
                  {met && <Check size={10} className="text-white" strokeWidth={3} />}
                </span>
                <span className={met ? "text-text-primary" : "text-text-muted"}>{req.label}</span>
              </li>
            );
          })}
        </ul>

        <SubmitButton label="Reset Password" isLoading={mutation.isPending} />
      </form>
    </>
  );
}