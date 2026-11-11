import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import { forgotPasswordSchema, type ForgotPasswordValues } from "../../schemas";
import { useForgotPassword } from "../../hooks/useSuperAdminAuth";
import { resetFlow } from "../../utils/resetFlow";
import { SA_ROUTES } from "../../utils/constants";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const mutation = useForgotPassword();

  const onSubmit = (values: ForgotPasswordValues) => {
    mutation.mutate(values, {
      // onSettled on purpose: success and failure look identical to the user,
      // so the screen can never reveal whether an email is registered.
      onSettled: () => {
        resetFlow.setEmail(values.email);
        navigate(SA_ROUTES.verifyCode);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <FormInput
        label="Email"
        type="email"
        placeholder="Enter email"
        autoComplete="username"
        error={errors.email?.message}
        isLoading={mutation.isPending}
        {...register("email")}
      />
      <SubmitButton
        label="Submit"
        isLoading={mutation.isPending}
        className="bg-bg-dark hover:bg-bg-dark/90"
      />
    </form>
  );
}