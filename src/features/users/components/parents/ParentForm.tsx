import FormInput      from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { parentSchema, type ParentFormValues } from "../../schemas";
import { staggerContainer, fieldFadeUp } from "../../animations/variants";
import { useAddParent } from "../../hooks/useParents";
import PhotoUpload  from "../shared/PhotoUpload";
import SubmitButton from "../../../../shared/ui/SubmitButton";


const SEX_OPTIONS = [
  { value: "Male", label: "Male" }, { value: "Female", label: "Female" },
];

const ParentForm: React.FC = () => {
  const { mutate, isPending } = useAddParent();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParentFormValues>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      firstName: "", lastName: "", middleName: "", sex: undefined,
      dob: "", phone: "", address: "", city: "", state: "", country: "", email: "",
    },
  });

  const onSubmit = (values: ParentFormValues) => {
    // TODO: replace mock logic with real API in useAddParent queryFn
    mutate({
      ...values,
      parentId: `PAR-${Date.now()}`,
      username: `@${values.firstName.toLowerCase()}.${values.lastName[0]?.toLowerCase()}`,
    },
    { onSuccess: () => reset() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <PhotoUpload />

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-3.5 mt-2">
        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormInput label="First Name" placeholder="First name"
            isLoading={isPending} error={errors.firstName?.message} {...register("firstName")} />
          <FormInput label="Last Name"  placeholder="Last name"
            isLoading={isPending} error={errors.lastName?.message}  {...register("lastName")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Middle Name" placeholder="Middle name"
            isLoading={isPending} {...register("middleName")} />
        </motion.div>

        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormSelect label="Sex" placeholder="Select..." options={SEX_OPTIONS}
            isLoading={isPending} error={errors.sex?.message} {...register("sex")} />
          <FormInput label="Date of Birth" type="date"
            isLoading={isPending} error={errors.dob?.message} {...register("dob")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Phone" placeholder="+234 800 000 0000"
            isLoading={isPending} error={errors.phone?.message} {...register("phone")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Address" placeholder="Street address"
            isLoading={isPending} error={errors.address?.message} {...register("address")} />
        </motion.div>

        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormInput label="City"  placeholder="City"
            isLoading={isPending} error={errors.city?.message}  {...register("city")} />
          <FormInput label="State" placeholder="State"
            isLoading={isPending} error={errors.state?.message} {...register("state")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Country" placeholder="Country"
            isLoading={isPending} error={errors.country?.message} {...register("country")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Email Address" type="email" placeholder="parent@example.com"
            isLoading={isPending} error={errors.email?.message} {...register("email")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <SubmitButton label="Add Parent" isLoading={isPending} />
        </motion.div>
      </motion.div>
    </form>
  );
};

export default ParentForm;