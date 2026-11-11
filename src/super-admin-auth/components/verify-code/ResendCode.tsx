import { cn } from "@/shared/utils/cn";
import { useCountdown } from "../../hooks/useCountdown";
import { useForgotPassword } from "../../hooks/useSuperAdminAuth";
import { RESEND_SECONDS } from "../../utils/constants";

export default function ResendCode({ email }: { email: string }) {
  const cooldown = useCountdown(RESEND_SECONDS);
  const resend = useForgotPassword();
  const blocked = cooldown.isActive || resend.isPending;

  const handleResend = () => {
    if (blocked) return;
    resend.mutate({ email }, { onSettled: () => cooldown.start(RESEND_SECONDS) });
  };

  return (
    <p className="text-base text-text-secondary" aria-live="polite">
      Didn&apos;t receive the code?{" "}
      <button
        type="button"
        onClick={handleResend}
        disabled={blocked}
        className={cn(
          "font-semibold",
          cooldown.isActive ? "text-danger" : "text-brand-primary hover:underline"
        )}
      >
        {cooldown.isActive ? `Resend in ${cooldown.seconds}s` : "Resend"}
      </button>
    </p>
  );
}