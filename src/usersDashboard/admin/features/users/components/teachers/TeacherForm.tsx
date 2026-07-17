import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { teacherSchema, type TeacherFormValues } from "../../schemas";
import { staggerContainer, fieldFadeUp } from "../../animations/variants";
import { useAddTeacher } from "../../hooks/useTeachers";
import PhotoUpload  from "../shared/PhotoUpload";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";

const SEX_OPTIONS = [
  { value: "Male", label: "Male" }, { value: "Female", label: "Female" },
];

const TeacherForm: React.FC = () => {
  const { mutate, isPending } = useAddTeacher();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      empNo: "", firstName: "", lastName: "", middleName: "",
      sex: undefined, dob: "", phone: "", address: "", city: "",
      state: "", country: "", email: "", dateOfEmployment: "",
    },
  });

  const onSubmit = (values: TeacherFormValues) => {
    // TODO: replace mock logic with real API in useAddTeacher queryFn
    mutate({
      ...values,
      classLabel: "TBD",
      username: `@${values.firstName.toLowerCase()}.${values.lastName.toLowerCase()}`,
    },
    { onSuccess: () => reset() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <PhotoUpload />

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-3.5 mt-2">
        <motion.div variants={fieldFadeUp}>
          <FormInput label="Employment Number" placeholder="e.g. TCH/2024/013"
            isLoading={isPending} error={errors.empNo?.message} {...register("empNo")} />
        </motion.div>

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
          <FormInput label="Email Address" type="email" placeholder="teacher@example.com"
            isLoading={isPending} error={errors.email?.message} {...register("email")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Date of Employment" type="date"
            isLoading={isPending} error={errors.dateOfEmployment?.message}
            {...register("dateOfEmployment")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <SubmitButton label="Add Teacher" isLoading={isPending} />
        </motion.div>
      </motion.div>
    </form>
  );
};

export default TeacherForm;