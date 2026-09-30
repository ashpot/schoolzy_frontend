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

// TEMP DEBUG: remove after checking console output
// import { useEffect } from "react";

// const BASE = "https://api.schoolzy.com.ng/api/v1";
// const TENANT = "etihad"; // TODO: your real tenant slug

// export default function EditSchoolProbe() {
//   useEffect(() => {
//     (async () => {
//       console.log("PROBE edit-school running");
//       // No Content-Type here: the browser must set the multipart boundary itself
//       const headers = {
//         Authorization: `Token ${localStorage.getItem("schoolzy_token")}`,
//         "X-Tenant-Domain": `${TENANT}.schoolzy.com.ng`,
//       };

//       const show = async (label: string, res: Response) => {
//         const text = await res.text();
//         let body: unknown = text.slice(0, 800);
//         try { body = JSON.parse(text); } catch { /* keep raw text */ }
//         console.log(`${label} → ${res.status}`, body);
//         return body as Record<string, unknown>;
//       };

//       // 1. Read current settings (the doc lists PATCH only, so GET may 405)
//       const before = await show("GET /public/settings/", await fetch(`${BASE}/public/settings/`, { headers }));

//       // 2. PATCH one text field, no image, to isolate the basic behaviour
//       const fd = new FormData();
//       fd.append("motto", "PROBE MOTTO");
//       await show("PATCH text only", await fetch(`${BASE}/public/settings/`, { method: "PATCH", headers, body: fd }));

//       // 3. Restore the original motto if we managed to read it
//       if (before && typeof before.motto === "string") {
//         const restore = new FormData();
//         restore.append("motto", before.motto);
//         await show("PATCH restore", await fetch(`${BASE}/public/settings/`, { method: "PATCH", headers, body: restore }));
//       } else {
//         console.log("Could not read the original motto, restore it manually");
//       }
//     })();
//   }, []);

//   return <div className="p-6">Check console…</div>;
// }