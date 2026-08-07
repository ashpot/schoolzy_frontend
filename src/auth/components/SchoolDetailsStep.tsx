import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import Button from "@/shared/ui/Button";
import { schoolDetailsSchema, type SchoolDetailsFormData } from "../schema/signupSchema";
import { slugify } from "@/shared/utils/slugify";

const states = [
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
  { value: "rivers", label: "Rivers" },
  { value: "kano", label: "Kano" },
];

const cities: Record<string, { value: string; label: string }[]> = {
  lagos: [
    { value: "ikeja", label: "Ikeja" },
    { value: "surulere", label: "Surulere" },
    { value: "lekki", label: "Lekki" },
  ],
  abuja: [
    { value: "garki", label: "Garki" },
    { value: "wuse", label: "Wuse" },
    { value: "maitama", label: "Maitama" },
  ],
  rivers: [
    { value: "ph-city", label: "Port Harcourt City" },
    { value: "obio-akpor", label: "Obio-Akpor" },
  ],
  kano: [
    { value: "nassarawa", label: "Nassarawa" },
    { value: "kumbotso", label: "Kumbotso" },
  ],
};

interface SchoolDetailsStepProps {
  onSubmit: (data: SchoolDetailsFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<SchoolDetailsFormData>;
  isLoading?: boolean;
}

const SchoolDetailsStep: React.FC<SchoolDetailsStepProps> = ({
  onSubmit,
  onBack,
  defaultValues,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SchoolDetailsFormData>({
    resolver: zodResolver(schoolDetailsSchema),
    defaultValues,
  });

  const [slugTouched, setSlugTouched] = useState(false);
  const selectedState = watch("state");
  const schoolName = watch("schoolName");

  React.useEffect(() => {
  if (!slugTouched && schoolName) {
    const firstWord = schoolName.trim().split(/\s+/)[0] || "";
    setValue("schoolSlug", slugify(firstWord));
  }
}, [schoolName, slugTouched, setValue]);

  return (
    <div className="w-full max-w-lg mx-auto px-4 md:px-0">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-[24px] font-semibold font-jakarta text-text-primary">
          School Details
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 md:space-y-5">
        {/* School Name */}
        <FormInput
          label="School Name"
          placeholder="Enter your school name"
          error={errors.schoolName?.message}
          isLoading={isLoading}
          {...register("schoolName")}
        />

        {/* School Subdomain (slug) */}
        <div className="space-y-1">
          <FormInput
            label="School Web Address"
            placeholder="your-school-name"
            error={errors.schoolSlug?.message}
            isLoading={isLoading}
            {...register("schoolSlug", {
              onChange: () => setSlugTouched(true),
            })}
          />
          <p className="text-xs text-text-muted">
            yourschool.schoolzy.com.ng — you can change this later in settings
          </p>
        </div>

        {/* School Location */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-label tracking-wide">
            School Location
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <FormSelect
                label=""
                placeholder="Select state"
                options={states}
                error={errors.state?.message}
                isLoading={isLoading}
                {...register("state")}
              />
            </div>
            <div className="flex-1">
              <FormSelect
                label=""
                placeholder="Select city"
                options={selectedState ? cities[selectedState] || [] : []}
                error={errors.city?.message}
                isLoading={isLoading || !selectedState}
                disabled={!selectedState || isLoading}
                {...register("city")}
              />
            </div>
          </div>
        </div>

        {/* Street Address */}
        <FormInput
          label="Street Address"
          placeholder="Enter your school's street address"
          error={errors.streetAddress?.message}
          isLoading={isLoading}
          {...register("streetAddress")}
        />

        {/* School Size */}
        <FormInput
          label="School Size (number of students)"
          type="number"
          placeholder="Enter number of students"
          error={errors.schoolSize?.message}
          isLoading={isLoading}
          {...register("schoolSize")}
        />

        {/* Social Proof */}
        <p className="text-xs md:text-[13px] text-text-muted text-center font-lato">
          Join 50+ schools managing their operations smarter.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 rounded-2xl text-sm md:text-[13px] font-jakarta font-semibold py-3 md:py-4 order-2 sm:order-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="flex-1 rounded-2xl text-sm md:text-[13px] font-jakarta font-semibold py-3 md:py-4 order-1 sm:order-2"
          >
            Complete Registration
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SchoolDetailsStep;