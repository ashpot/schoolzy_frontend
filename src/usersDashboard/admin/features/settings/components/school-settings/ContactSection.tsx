import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { Phone, Mail, Globe } from "lucide-react";
import IconInput from "../shared/IconInput";
import type { SchoolSettingsValues } from "../../schemas";

interface Props {
  register: UseFormRegister<SchoolSettingsValues>;
  errors: FieldErrors<SchoolSettingsValues>;
  isPending: boolean;
}

export default function ContactSection({ register, errors, isPending }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <IconInput
        label="Phone Number"
        placeholder="+234 803 456 7890"
        icon={<Phone size={15} />}
        isLoading={isPending}
        {...register("phone")}
      />
      <IconInput
        label="Alternate Phone"
        placeholder="+234 809 876 5432"
        icon={<Phone size={15} />}
        isLoading={isPending}
        {...register("alternate_phone")}
      />
      <IconInput
        label="Email Address *"
        type="email"
        placeholder="info@myschool.edu.ng"
        icon={<Mail size={15} />}
        error={errors.email?.message}
        isLoading={isPending}
        {...register("email")}
      />
      <IconInput
        label="Website"
        placeholder="https://myschool.edu.ng"
        icon={<Globe size={15} />}
        isLoading={isPending}
        {...register("website")}
      />
    </div>
  );
}