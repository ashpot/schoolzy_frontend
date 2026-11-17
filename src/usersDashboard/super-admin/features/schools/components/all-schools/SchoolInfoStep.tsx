import { useFormContext } from "react-hook-form";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import type { CreateSchoolInput } from "../../schemas";
import { COUNTRY_OPTIONS } from "../../utils/constants";
import LogoUploadField from "./LogoUploadField";

export default function SchoolInfoStep({ isLoading }: { isLoading: boolean }) {
  const { register, formState: { errors } } = useFormContext<CreateSchoolInput>();

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <FormInput label="School Name *" placeholder="e.g. Greenfield Academy" error={errors.name?.message} isLoading={isLoading} {...register("name")} />
      </div>
      <FormInput label="School Code *" placeholder="e.g. GFA-001" autoCapitalize="characters" error={errors.code?.message} isLoading={isLoading} {...register("code")} />
      <FormInput label="Email Address *" type="email" placeholder="info@school.edu.ng" error={errors.email?.message} isLoading={isLoading} {...register("email")} />
      <FormInput label="Phone Number" type="tel" placeholder="+234 801 234 5678" error={errors.phone?.message} isLoading={isLoading} {...register("phone")} />
      <FormInput label="Website" placeholder="school.edu.ng" error={errors.website?.message} isLoading={isLoading} {...register("website")} />
      <div className="sm:col-span-2">
        <FormInput label="Street Address" placeholder="Street address" error={errors.address?.message} isLoading={isLoading} {...register("address")} />
      </div>
      <FormSelect label="Country *" options={COUNTRY_OPTIONS} placeholder="Select country" error={errors.country?.message} {...register("country")} />
      <FormInput label="State *" placeholder="e.g. Lagos" error={errors.state?.message} isLoading={isLoading} {...register("state")} />
      <FormInput label="City *" placeholder="e.g. Ikeja" error={errors.city?.message} isLoading={isLoading} {...register("city")} />
      <LogoUploadField />
    </div>
  );
}