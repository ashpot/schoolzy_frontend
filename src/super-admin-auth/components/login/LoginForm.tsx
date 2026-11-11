import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/shared/ui/FormInput";
import SubmitButton from "@/shared/ui/SubmitButton";
import { loginSchema, type LoginValues } from "../../schemas";
import { useSuperAdminLogin } from "../../hooks/useSuperAdminAuth";
import { useCountdown } from "../../hooks/useCountdown";
import { tokenStorage } from "../../utils/tokenStorage";
import { SA_ROUTES, MAX_ATTEMPTS, LOCKOUT_SECONDS } from "../../utils/constants";

export default function LoginForm() {
  const navigate = useNavigate();
  const [failed, setFailed] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);
  const lock = useCountdown();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const mutation = useSuperAdminLogin();

  const onSubmit = (values: LoginValues) => {
    if (lock.isActive) return;
    setFormError(null);
    mutation.mutate(values, {
      onSuccess: (res) => {
        tokenStorage.save(res.token, values.remember);
        navigate(SA_ROUTES.dashboard, { replace: true });
      },
      onError: () => {
        // Generic message: never reveal which field was wrong.
        reset({ email: values.email, password: "", remember: values.remember });
        setFormError("Invalid email or password.");
        const next = failed + 1;
        if (next >= MAX_ATTEMPTS) {
          lock.start(LOCKOUT_SECONDS);
          setFailed(0);
        } else {
          setFailed(next);
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset disabled={lock.isActive} className="m-0 min-w-0 space-y-5 border-0 p-0">
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter email"
          autoComplete="username"
          error={errors.email?.message}
          isLoading={mutation.isPending}
          {...register("email")}
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="Enter password"
          autoComplete="current-password"
          error={errors.password?.message}
          isLoading={mutation.isPending}
          {...register("password")}
        />

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-3 text-base text-text-primary">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-border-line03 accent-brand-primary"
              {...register("remember")}
            />
            Remember me
          </label>
          <Link to={SA_ROUTES.forgotPassword} className="text-base text-brand-primary hover:underline">
            Forgot Password?
          </Link>
        </div>

        {(formError || lock.isActive) && (
          <p role="alert" className="text-sm text-danger">
            {lock.isActive
              ? `Too many attempts. Try again in ${lock.seconds}s.`
              : formError}
          </p>
        )}

        <SubmitButton
          label="Login"
          isLoading={mutation.isPending}
          className="bg-bg-dark hover:bg-bg-dark/90"
        />
      </fieldset>
    </form>
  );
}