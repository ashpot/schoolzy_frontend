// const SchoolSettingsPage = () => {
//   return (
//     <div>
//       <h1 className="page-title">School</h1>
//       <p className="text-body mt-2">Manage school settings.</p>
//     </div>
//   );
// };

// export default SchoolSettingsPage;

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Phone, Globe, Sparkles, CheckCircle2 } from "lucide-react";
import { fadeUp } from "../animations/variants";
import { schoolSettingsSchema, type SchoolSettingsValues } from "../schemas";
import { useSaveSchoolSettings } from "../hooks/useSettings";
import { mockSchoolSettings } from "../data/mockData";
import SettingsSectionCard from "../components/shared/SettingsSectionCard";
import BasicInfoSection from "../components/school-settings/BasicInfoSection";
import SchoolLogoSection from "../components/school-settings/SchoolLogoSection";
import ContactSection from "../components/school-settings/ContactSection";
import SocialMediaSection from "../components/school-settings/SocialMediaSection";
import SubmitButton from "@/shared/ui/SubmitButton";

export default function SchoolSettingsPage() {
  const mutation = useSaveSchoolSettings();

  const { register, handleSubmit, control, watch, formState: { errors, isDirty } } =
    useForm<SchoolSettingsValues>({
      resolver: zodResolver(schoolSettingsSchema),
      defaultValues: mockSchoolSettings,
    });

  const aboutLen = (watch("about") ?? "").length;

  const onSubmit = (values: SchoolSettingsValues) => {
    mutation.mutate(values);
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="dashboard-p space-y-5">
      <div>
        <h1 className="page-title">School Settings</h1>
        <p className="text-body-small text-text-secondary mt-1">Manage your school's profile, contact details, and social presence</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <SettingsSectionCard icon={Building2} title="Basic Information" subtitle="Core identity details for your school">
          <BasicInfoSection register={register} errors={errors} isPending={mutation.isPending} aboutLen={aboutLen} />
        </SettingsSectionCard>

        <SettingsSectionCard icon={Building2} title="School Logo" subtitle="PNG or JPG recommended — max 5 MB">
          <SchoolLogoSection control={control} />
        </SettingsSectionCard>

        <SettingsSectionCard icon={Phone} title="Contact Details" subtitle="How parents and students can reach the school">
          <ContactSection register={register} errors={errors} isPending={mutation.isPending} />
        </SettingsSectionCard>

        <SettingsSectionCard icon={Globe} title="Social Media" subtitle="Optional links to the school's social presence">
          <SocialMediaSection register={register} isPending={mutation.isPending} />
        </SettingsSectionCard>

        {/* Sticky save footer */}
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