import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/shared/ui/FormInput";
import Button from "@/shared/ui/Button";
import LocationFields from "./LocationFields";
import { schoolDetailsSchema, type SchoolDetailsFormData } from "../schema/signupSchema";
import { slugify } from "@/shared/utils/slugify";

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
  const form = useForm<SchoolDetailsFormData>({
    resolver: zodResolver(schoolDetailsSchema),
    defaultValues,
  });
  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;

  const [slugTouched, setSlugTouched] = useState(false);
  const schoolName = watch("schoolName");

  React.useEffect(() => {
    if (!slugTouched && schoolName) {
      const firstWord = schoolName.trim().split(/\s+/)[0] || "";
      setValue("schoolSlug", slugify(firstWord));
    }
  }, [schoolName, slugTouched, setValue]);

  return (
    <div className="w-full max-w-lg mx-auto px-4 md:px-0">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-[24px] font-semibold font-jakarta text-text-primary">
          School Details
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 md:space-y-5">
        <FormInput
          label="School Name"
          placeholder="Enter your school name"
          error={errors.schoolName?.message}
          isLoading={isLoading}
          {...register("schoolName")}
        />

        <div className="space-y-1">
          <FormInput
            label="School Web Address"
            placeholder="your-school-name"
            error={errors.schoolSlug?.message}
            isLoading={isLoading}
            {...register("schoolSlug", { onChange: () => setSlugTouched(true) })}
          />
          <p className="text-xs text-text-muted">
            yourschool.schoolzy.com.ng. You can change this later in settings
          </p>
        </div>

        <LocationFields form={form} isLoading={isLoading} />

        <FormInput
          label="Street Address"
          placeholder="Enter your school's street address"
          error={errors.streetAddress?.message}
          isLoading={isLoading}
          {...register("streetAddress")}
        />

        <FormInput
          label="School Size (number of students)"
          type="number"
          placeholder="Enter number of students"
          error={errors.schoolSize?.message}
          isLoading={isLoading}
          {...register("schoolSize")}
        />

        <p className="text-xs md:text-[13px] text-text-muted text-center font-lato">
          Join 50+ schools managing their operations smarter.
        </p>

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