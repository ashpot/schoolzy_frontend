import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { generalSchema, type GeneralValues } from "../../schemas";
import { useSaveGeneral } from "../../hooks/usePlatformSettings";
import { PLATFORM_LANGUAGES, TIMEZONES } from "../../utils/constants";
import SaveRow from "../shared/SaveRow";

export default function GeneralTab({ data }: { data: GeneralValues }) {
  const mutation = useSaveGeneral();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<GeneralValues>({
    resolver: zodResolver(generalSchema),
    defaultValues: data,
  });
  const busy = mutation.isPending;

  return (
    <form onSubmit={handleSubmit((v) => mutation.mutate(v, { onSuccess: () => reset(v) }))} noValidate>
      <SectionCard title="Platform Information" subtitle="Core identity and contact details for the platform.">
        <div className="grid gap-5 md:grid-cols-2">
          <FormInput label="Platform Name" autoComplete="off" error={errors.name?.message} isLoading={busy} {...register("name")} />
          <FormInput label="Platform URL" type="url" autoComplete="off" error={errors.url?.message} isLoading={busy} {...register("url")} />
          <FormInput label="Support Email" type="email" autoComplete="off" error={errors.supportEmail?.message} isLoading={busy} {...register("supportEmail")} />
          <FormInput label="Support Phone" type="tel" autoComplete="off" error={errors.supportPhone?.message} isLoading={busy} {...register("supportPhone")} />
          <FormSelect label="Timezone" options={TIMEZONES} error={errors.timezone?.message} {...register("timezone")} />
          <FormSelect label="Default Language" options={PLATFORM_LANGUAGES} error={errors.language?.message} {...register("language")} />
          <div className="md:col-span-2">
            <FormInput label="Company Address" autoComplete="off" error={errors.address?.message} isLoading={busy} {...register("address")} />
          </div>
        </div>
        <SaveRow label="Save Changes" isPending={busy} saved={mutation.isSuccess && !isDirty} error={mutation.isError ? mutation.error.message : null} />
      </SectionCard>
    </form>
  );
}