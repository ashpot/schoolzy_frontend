import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import SubmitButton from "@/shared/ui/SubmitButton";
import { otpSchema, type OtpValues } from "@/auth/schema/forgotPasswordSchema";
import { useVerifyResetCode, useSendResetCode } from "@/auth/hooks/useForgotPassword";

interface OtpStepProps {
  email: string;
  onSuccess: () => void;
}

const RESEND_SECONDS = 18;

export default function OtpStep({ email, onSuccess }: OtpStepProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  const verifyMutation = useVerifyResetCode();
  const resendMutation = useSendResetCode();
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleDigitChange = (index: number, value: string) => {
    const clean = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    setValue("code", next.join(""), { shouldValidate: true });

    if (clean && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = (values: OtpValues) => {
    verifyMutation.mutate(values, { onSuccess });
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    resendMutation.mutate(
      { email },
      { onSuccess: () => setSecondsLeft(RESEND_SECONDS) }
    );
  };

  return (
    <>
      <div className="w-14 h-14 rounded-2xl bg-brand-primary flex-center mx-auto mb-5">
        <Mail size={24} className="text-white" />
      </div>
      <h1 className="page-title text-center">Verify Your Email</h1>
      <p className="text-body-small text-text-secondary text-center mt-2 mb-6">
        We've sent a 4-digit verification code to your email address.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <Controller
          name="code"
          control={control}
          render={() => (
            <div>
              <div className="flex items-center justify-center gap-3">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-16 h-16 text-center text-xl font-semibold rounded-xl border border-border-line02 bg-bg-input focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  />
                ))}
              </div>
              {errors.code?.message && (
                <p className="text-xs text-danger text-center mt-2">{errors.code.message}</p>
              )}
            </div>
          )}
        />

        <p className="text-center text-body-small text-text-secondary">
          Didn't receive the code?{" "}
          {secondsLeft > 0 ? (
            <span className="text-text-muted">Resend in {secondsLeft}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendMutation.isPending}
              className="text-brand-primary font-medium hover:underline disabled:opacity-50"
            >
              Resend code
            </button>
          )}
        </p>

        <SubmitButton label="Verify Code" isLoading={verifyMutation.isPending} />
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