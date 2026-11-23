import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "@/shared/ui/FormSelect";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { localizationSchema, type LocalizationValues } from "../../schemas";
import { useSaveLocalization } from "../../hooks/usePlatformSettings";
import { COUNTRIES, CURRENCIES, DATE_FORMATS, LANGUAGES, MEASUREMENTS, TIME_FORMATS } from "../../utils/constants";
import SaveRow from "../shared/SaveRow";

export default function LocalizationTab({ data }: { data: LocalizationValues }) {
  const mutation = useSaveLocalization();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<LocalizationValues>({
    resolver: zodResolver(localizationSchema),
    defaultValues: data,
  });

  return (
    <form onSubmit={handleSubmit((v) => mutation.mutate(v, { onSuccess: () => reset(v) }))} noValidate>
      <SectionCard title="Localization" subtitle="Regional defaults applied across the platform.">
        <div className="grid gap-5 md:grid-cols-2">
          <FormSelect label="Default Currency" options={CURRENCIES} error={errors.currency?.message} {...register("currency")} />
          <FormSelect label="Date Format" options={DATE_FORMATS} error={errors.dateFormat?.message} {...register("dateFormat")} />
          <FormSelect label="Time Format" options={TIME_FORMATS} error={errors.timeFormat?.message} {...register("timeFormat")} />
          <FormSelect label="Default Country" options={COUNTRIES} error={errors.country?.message} {...register("country")} />
          <FormSelect label="Language" options={LANGUAGES} error={errors.language?.message} {...register("language")} />
          <FormSelect label="Measurement System" options={MEASUREMENTS} error={errors.measurement?.message} {...register("measurement")} />
        </div>
        <SaveRow label="Save Localization" isPending={mutation.isPending} saved={mutation.isSuccess && !isDirty} error={mutation.isError ? mutation.error.message : null} />
      </SectionCard>
    </form>
  );
}