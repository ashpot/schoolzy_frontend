import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Phone, Palette, Sparkles, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { schoolSettingsSchema, type SchoolSettingsValues } from "../schemas";
import { useSchoolSettings, useSaveSchoolSettings } from "../hooks/useSettings";
import SettingsSectionCard from "../components/shared/SettingsSectionCard";
import BasicInfoSection from "../components/school-settings/BasicInfoSection";
import SchoolLogoSection from "../components/school-settings/SchoolLogoSection";
import ContactSection from "../components/school-settings/ContactSection";
import SubmitButton from "@/shared/ui/SubmitButton";
import BrandColorsSection from "../components/school-settings/BrandColorSection";

export default function SchoolSettingsPage() {
  const { data, isLoading, isError, error } = useSchoolSettings();
  const mutation = useSaveSchoolSettings();

  const { register, handleSubmit, control, formState: { errors, isDirty } } =
    useForm<SchoolSettingsValues>({
      resolver: zodResolver(schoolSettingsSchema),
      values: data
        ? {
            motto: data.motto ?? "",
            timezone: data.timezone ?? "",
            email: data.email,
            phone: data.phone ?? "",
            alternate_phone: data.alternate_phone ?? "",
            address: data.address ?? "",
            city: data.city ?? "",
            state: data.state ?? "",
            website: data.website ?? "",
            primary_color: data.primary_color ?? "",
            secondary_color: data.secondary_color ?? "",
          }
        : undefined,
    });

  const onSubmit = (values: SchoolSettingsValues) => {
    mutation.mutate(values);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-text-muted">
        <Loader2 size={18} className="animate-spin" />
        <span className="text-sm">Loading settings…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-danger text-sm">
        <AlertCircle size={16} />
        {error instanceof Error ? error.message : "Failed to load school settings."}
      </div>
    );
  }

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-5">
      <div>
        <h1 className="page-title">School Settings</h1>
        <p className="text-body-small text-text-secondary mt-1">Manage your school's profile, contact details, and branding</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <SettingsSectionCard icon={Building2} title="Basic Information" subtitle="Core identity details for your school">
          <BasicInfoSection register={register} errors={errors} isPending={mutation.isPending} />
        </SettingsSectionCard>

        <SettingsSectionCard icon={Building2} title="School Logo" subtitle="PNG or JPG recommended — max 5 MB">
          <SchoolLogoSection control={control} fieldName="logo" label="Click or drag to upload logo" hint="PNG, JPG, SVG — max 5 MB" />
        </SettingsSectionCard>

        <SettingsSectionCard icon={Building2} title="Favicon" subtitle="Small icon shown in the browser tab">
          <SchoolLogoSection control={control} fieldName="favicon" label="Click or drag to upload favicon" hint="PNG, ICO — max 1 MB" />
        </SettingsSectionCard>

        <SettingsSectionCard icon={Phone} title="Contact Details" subtitle="How parents and students can reach the school">
          <ContactSection register={register} errors={errors} isPending={mutation.isPending} />
        </SettingsSectionCard>

        <SettingsSectionCard icon={Palette} title="Brand Colors" subtitle="Primary and secondary colors used across the school's portal">
          <BrandColorsSection register={register} isPending={mutation.isPending} />
        </SettingsSectionCard>

        <div className="bg-white rounded-2xl card-shadow px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            {mutation.isSuccess && !isDirty && (
              <>
                <CheckCircle2 size={15} className="text-success" />
                <span className="text-success font-medium">All changes are saved.</span>
              </>
            )}
            {isDirty && (
              <>
                <Sparkles size={15} className="text-warning" />
                <span>You have unsaved changes.</span>
              </>
            )}
          </div>
          <SubmitButton label="Save Changes" isLoading={mutation.isPending} />
        </div>
      </form>
    </motion.div>
  );
}