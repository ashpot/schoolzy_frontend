import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import { setPasswordSchema, type SetPasswordValues } from "../../schemas";
import { useSetNewPassword } from "../../hooks/useSuperAdminAuth";
import { resetFlow } from "../../utils/resetFlow";
import { SA_ROUTES } from "../../utils/constants";

export default function SetPasswordForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SetPasswordValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const mutation = useSetNewPassword();

  const onSubmit = (values: SetPasswordValues) => {
    const resetToken = resetFlow.get().resetToken;
    if (!resetToken) return navigate(SA_ROUTES.forgotPassword, { replace: true });

    mutation.mutate(
      { password: values.password, resetToken },
      {
        onSuccess: () => {
          resetFlow.clear();
          navigate(SA_ROUTES.login, { replace: true });
        },
        onError: () => {
          reset({ password: "", confirmPassword: "" });
          setError("password", { message: "Could not set password. Please try again." });
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <FormInput
        label="Password"
        type="password"
        placeholder="Enter password"
        autoComplete="new-password"
        error={errors.password?.message}
        isLoading={mutation.isPending}
        {...register("password")}
      />
      <FormInput
        label="Confirm Password"
        type="password"
        placeholder="Re-enter password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        isLoading={mutation.isPending}
        {...register("confirmPassword")}
      />
      <SubmitButton
        label="Set Password"
        isLoading={mutation.isPending}
        className="bg-bg-dark hover:bg-bg-dark/90"
      />
    </form>
  );
}