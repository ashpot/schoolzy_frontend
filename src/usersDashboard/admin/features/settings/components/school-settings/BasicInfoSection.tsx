import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { AlignLeft, School, Quote, MapPin } from "lucide-react";
import IconInput from "../shared/IconInput";
import type { SchoolSettingsValues } from "../../schemas";

interface Props {
  register: UseFormRegister<SchoolSettingsValues>;
  errors: FieldErrors<SchoolSettingsValues>;
  isPending: boolean;
  aboutLen: number;
}

export default function BasicInfoSection({ register, errors, isPending, aboutLen }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IconInput
          label="School Name *"
          placeholder="My School"
          icon={<School size={15} />}
          error={errors.name?.message}
          isLoading={isPending}
          {...register("name")}
        />
        <IconInput
          label="School Motto"
          hint="— tagline or slogan"
          placeholder="Excellence Through Discipline"
          icon={<Quote size={15} />}
          isLoading={isPending}
          {...register("motto")}
        />
      </div>
      <IconInput
        label="Address"
        placeholder="14 Adewale Close, Ikeja, Lagos State"
        icon={<MapPin size={15} />}
        isLoading={isPending}
        {...register("address")}
      />
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-label leading-4.5 tracking-wide">
            About the School{" "}
            <span className="text-text-muted font-normal">— brief description</span>
          </label>
          <span className="text-xs text-text-muted">{aboutLen} characters</span>
        </div>
        <div className="relative">
          <AlignLeft size={14} className="absolute left-3 top-3.5 text-text-muted pointer-events-none" />
          <textarea
            rows={4}
            placeholder="Write a short description of the school…"
            className="w-full pl-9 pr-3 py-4 text-sm bg-bg-input border border-border-line02 rounded-2xl text-text-primary placeholder:text-text-muted placeholder:text-[13px] resize-none focus:outline-none focus:ring-1 focus:border-brand-primary focus:ring-brand-hover transition"
            {...register("about")}
          />
        </div>
      </div>
    </div>
  );
}