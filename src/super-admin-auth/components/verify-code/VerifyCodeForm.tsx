import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import { verifyCodeSchema, CODE_LENGTH, type VerifyCodeValues } from "../../schemas";
import { useVerifyResetCode } from "../../hooks/useSuperAdminAuth";
import { resetFlow } from "../../utils/resetFlow";
import { SA_ROUTES, MAX_ATTEMPTS } from "../../utils/constants";
import ResendCode from "./ResendCode";

export default function VerifyCodeForm() {
  const navigate = useNavigate();
  const email = resetFlow.get().email ?? "";
  const [failed, setFailed] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<VerifyCodeValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { code: "" },
  });

  const mutation = useVerifyResetCode();

  const onSubmit = (values: VerifyCodeValues) => {
    mutation.mutate(
      { ...values, email },
      {
        onSuccess: (res) => {
          resetFlow.setToken(res.resetToken);
          navigate(SA_ROUTES.setPassword, { replace: true });
        },
        onError: () => {
          const next = failed + 1;
          if (next >= MAX_ATTEMPTS) {
            // Too many wrong codes: kill the flow and start over.
            resetFlow.clear();
            navigate(SA_ROUTES.forgotPassword, { replace: true });
            return;
          }
          setFailed(next);
          reset({ code: "" });
          setError("code", { message: "Invalid or expired code." });
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <FormInput
        label="Code"
        type="password"
        inputMode="numeric"
        maxLength={CODE_LENGTH}
        placeholder="Enter code"
        autoComplete="one-time-code"
        error={errors.code?.message}
        isLoading={mutation.isPending}
        {...register("code")}
      />
      <ResendCode email={email} />
      <SubmitButton
        label="Verify"
        isLoading={mutation.isPending}
        className="bg-bg-dark hover:bg-bg-dark/90"
      />
    </form>
  );
}