import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/shared/ui/FormInput";
import Button from "@/shared/ui/Button";
import {
  administratorDetailsSchema,
  type AdministratorDetailsFormData,
} from "../schema/signupSchema";

interface AdministratorDetailsStepProps {
  onNext: (data: AdministratorDetailsFormData) => void;
  defaultValues?: Partial<AdministratorDetailsFormData>;
  isLoading?: boolean;
}

const AdministratorDetailsStep: React.FC<AdministratorDetailsStepProps> = ({
  onNext,
  defaultValues,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdministratorDetailsFormData>({
    resolver: zodResolver(administratorDetailsSchema),
    defaultValues,
  });

  const onSubmit = (data: AdministratorDetailsFormData) => {
    onNext(data);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 md:px-0">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-[24px] font-semibold font-jakarta text-text-primary">
          Administrator Details
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
        {/* First Name */}
        <FormInput
          label="First Name"
          placeholder="Enter your first name"
          error={errors.first_name?.message}
          isLoading={isLoading}
          {...register("first_name")}
        />
        {/* Last Name */}
        <FormInput
          label="Last Name"
          placeholder="Enter your last name"
          error={errors.last_name?.message}
          isLoading={isLoading}
          {...register("last_name")}
        />
        {/* Email Address */}
        <FormInput
          label="Email Address"
          type="email"
          placeholder="Enter email"
          error={errors.email?.message}
          isLoading={isLoading}
          {...register("email")}
        />

        {/* Phone Number */}
        <FormInput
          label="Phone Number"
          type="tel"
          placeholder="Enter phone number"
          error={errors.phoneNumber?.message}
          isLoading={isLoading}
          {...register("phoneNumber")}
        />

        {/* Create Password */}
        <FormInput
          label="Create Password"
          type="password"
          placeholder="Enter password"
          error={errors.password?.message}
          isLoading={isLoading}
          {...register("password")}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          placeholder="Re-enter password"
          error={errors.confirm_password?.message}
          isLoading={isLoading}
          {...register("confirm_password")}
        />

        {/* Password Hint */}
        <p className="text-xs md:text-[13px] text-text-muted font-lato -mt-2">
          Password must have at least 8 characters, alphanumeric with at least one capital letter & special character.
        </p>

        {/* Next Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full rounded-2xl text-sm md:text-[13px] font-jakarta font-semibold py-3 md:py-4"
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default AdministratorDetailsStep;