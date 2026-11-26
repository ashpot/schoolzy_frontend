import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye } from "lucide-react";
import Button from "@/shared/ui/Button";
import SectionCard from "@/usersDashboard/super-admin/shared/components/SectionCard";
import { AnimatePresence } from "framer-motion";
import { brandingSchema, type BrandingValues } from "../../schemas";
import { useSaveBranding } from "../../hooks/usePlatformSettings";
import type { BrandingSettings } from "../../types";
import SaveRow from "../shared/SaveRow";
import BrandingPreview from "./BrandingPreview";
import ColorField from "./ColorField";
import ImageUploadField from "./ImageUploadField";

const colors = (b: BrandingSettings): BrandingValues => ({
  primaryColor: b.primaryColor, secondaryColor: b.secondaryColor, accentColor: b.accentColor,
  logo: undefined, favicon: undefined, loginBg: undefined,
});

export default function BrandingTab({ data }: { data: BrandingSettings }) {
  const mutation = useSaveBranding();
  const [preview, setPreview] = useState(false);
  const { control, handleSubmit, reset, watch, formState: { isDirty } } = useForm<BrandingValues>({
    resolver: zodResolver(brandingSchema),
    defaultValues: colors(data),
  });

  const onSubmit = (v: BrandingValues) =>
    mutation.mutate(v, { onSuccess: () => reset({ ...v, logo: undefined, favicon: undefined, loginBg: undefined }) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <SectionCard title="Brand Identity" subtitle="Customize how Schoolzy looks to schools and users.">
        <div className="grid gap-6 md:grid-cols-2">
          <ImageUploadField control={control} name="logo" label="Platform Logo" hint="PNG, JPG or WebP, max 2MB" accept="image/png,image/jpeg,image/webp" currentUrl={data.logoUrl} />
          <ImageUploadField control={control} name="favicon" label="Favicon" hint="ICO or PNG, 32×32px" accept="image/png,image/x-icon,image/vnd.microsoft.icon" currentUrl={data.faviconUrl} />
          <ColorField control={control} name="primaryColor" label="Primary Color" />
          <ColorField control={control} name="secondaryColor" label="Secondary Color" />
          <ColorField control={control} name="accentColor" label="Accent Color" />
          <ImageUploadField control={control} name="loginBg" label="Login Background Image" hint="JPG or PNG, min 1920×1080px" accept="image/png,image/jpeg" currentUrl={data.loginBgUrl} />
        </div>
        <SaveRow
          label="Save Changes"
          isPending={mutation.isPending}
          saved={mutation.isSuccess && !isDirty}
          error={mutation.isError ? mutation.error.message : null}
          extra={<Button type="button" variant="outline" leftIcon={<Eye size={16} />} onClick={() => setPreview(true)}>Preview Branding</Button>}
        />
      </SectionCard>

      <AnimatePresence>
        {preview && (
          <BrandingPreview key="preview" primary={watch("primaryColor")} secondary={watch("secondaryColor")} accent={watch("accentColor")} onClose={() => setPreview(false)} />
        )}
      </AnimatePresence>
    </form>
  );
}