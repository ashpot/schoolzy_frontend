import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import {
  forgotPasswordEmailSchema,
  type ForgotPasswordEmailValues,
} from "@/auth/schema/forgotPasswordSchema";
import { useSendResetCode } from "@/auth/hooks/useForgotPassword";

interface EmailStepProps {
  onSuccess: (email: string) => void;
}

export default function EmailStep({ onSuccess }: EmailStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordEmailValues>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    defaultValues: { email: "" },
  });

  const mutation = useSendResetCode();

  const onSubmit = (values: ForgotPasswordEmailValues) => {
    mutation.mutate(values, { onSuccess: () => onSuccess(values.email) });
  };

  return (
    <>
      <div className="w-14 h-14 rounded-2xl bg-brand-primary flex-center mx-auto mb-5">
        <Mail size={24} className="text-white" />
      </div>
      <h1 className="page-title text-center">Forgot Password?</h1>
      <p className="text-body-small text-text-secondary text-center mt-2 mb-6">
        Enter the email address associated with your Schoolzy account and we'll send you a verification code.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormInput
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          error={errors.email?.message}
          isLoading={mutation.isPending}
          {...register("email")}
        />
        <SubmitButton label="Send Verification Code" isLoading={mutation.isPending} />
      </form>

      <Link
        to="/auth/signin"
        className="block text-center text-sm text-brand-primary font-medium mt-5 hover:underline"
      >
        ← Back to Login
      </Link>
    </>
  );
}