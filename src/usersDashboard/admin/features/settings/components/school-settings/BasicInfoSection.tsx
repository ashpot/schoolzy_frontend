import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { School, Quote, MapPin, Clock } from "lucide-react";
import IconInput from "../shared/IconInput";
import type { SchoolSettingsValues } from "../../schemas";

interface Props {
  register: UseFormRegister<SchoolSettingsValues>;
  errors: FieldErrors<SchoolSettingsValues>;
  isPending: boolean;
}

export default function BasicInfoSection({ register, isPending }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IconInput
          label="School Motto"
          hint="— tagline or slogan"
          placeholder="Excellence Through Discipline"
          icon={<Quote size={15} />}
          isLoading={isPending}
          {...register("motto")}
        />
        <IconInput
          label="Timezone"
          placeholder="Africa/Lagos"
          icon={<Clock size={15} />}
          isLoading={isPending}
          {...register("timezone")}
        />
      </div>
      <IconInput
        label="Address"
        placeholder="14 Adewale Close, Ikeja, Lagos State"
        icon={<MapPin size={15} />}
        isLoading={isPending}
        {...register("address")}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IconInput
          label="City"
          placeholder="Aba"
          icon={<School size={15} />}
          isLoading={isPending}
          {...register("city")}
        />
        <IconInput
          label="State"
          placeholder="Abia"
          icon={<School size={15} />}
          isLoading={isPending}
          {...register("state")}
        />
      </div>
    </div>
  );
}