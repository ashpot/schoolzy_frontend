import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Check, KeyRound } from "lucide-react";
import FormInput from "@/shared/ui/FormInput";
import type { CreateSchoolInput } from "../../schemas";
import { generatePassword } from "../../utils/password";

export default function AdministratorStep({ isLoading }: { isLoading: boolean }) {
  const { register, setValue, formState: { errors } } = useFormContext<CreateSchoolInput>();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(id);
  }, [copied]);

  const handleGenerate = async () => {
    const password = generatePassword();
    setValue("temporaryPassword", password, { shouldValidate: true, shouldDirty: true });
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
    } catch {
      /* clipboard blocked: the password is still in the field (use the eye icon to read it) */
    }
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <FormInput label="First Name *" placeholder="Adebayo" autoComplete="off" error={errors.firstName?.message} isLoading={isLoading} {...register("firstName")} />
      <FormInput label="Last Name *" placeholder="Okafor" autoComplete="off" error={errors.lastName?.message} isLoading={isLoading} {...register("lastName")} />
      <FormInput label="Email Address *" type="email" placeholder="admin@school.edu.ng" autoComplete="off" error={errors.adminEmail?.message} isLoading={isLoading} {...register("adminEmail")} />
      <FormInput label="Phone Number" type="tel" placeholder="+234 801 234 5678" autoComplete="off" error={errors.adminPhone?.message} isLoading={isLoading} {...register("adminPhone")} />
      <FormInput label="Username *" placeholder="adebayo.okafor" autoComplete="off" error={errors.username?.message} isLoading={isLoading} {...register("username")} />
      <div>
        <FormInput label="Temporary Password *" type="password" placeholder="••••••••" autoComplete="new-password" error={errors.temporaryPassword?.message} isLoading={isLoading} {...register("temporaryPassword")} />
        <button
          type="button"
          onClick={handleGenerate}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-brand-primary hover:underline"
        >
          {copied ? <Check size={14} aria-hidden /> : <KeyRound size={14} aria-hidden />}
          {copied ? "Generated & copied to clipboard" : "Generate secure password"}
        </button>
      </div>
      <p className="text-xs text-text-muted sm:col-span-2">
        The administrator will use these details to sign in. Share the temporary password securely and ask them to change it after their first login.
      </p>
    </div>
  );
}