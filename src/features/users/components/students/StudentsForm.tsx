import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { studentSchema, type StudentFormValues } from "../../schemas";
import { staggerContainer, fieldFadeUp } from "../../animations/variants";
import { useAddStudent } from "../../hooks/useStudents";
import PhotoUpload  from "../shared/PhotoUpload";
import SubmitButton from "../shared/SubmitButton";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";

const CLASS_GROUP_OPTIONS = [
  { value: "JSS", label: "Junior Secondary (JSS)" },
  { value: "SS",  label: "Senior Secondary (SS)"  },
  { value: "PRI", label: "Primary"                 },
];

const SEX_OPTIONS = [
  { value: "Male",   label: "Male"   },
  { value: "Female", label: "Female" },
];

const StudentForm: React.FC = () => {
  const { mutate, isPending } = useAddStudent();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      admNo: "", firstName: "", lastName: "", middleName: "",
      sex: undefined, dob: "", phone: "", address: "", city: "",
      state: "", country: "", email: "", classGroup: "", dateOfAdmission: "",
    },
  });

  const onSubmit = (values: StudentFormValues) => {
    // TODO: replace mock logic with real API in useAddStudent queryFn
    mutate({
      ...values,
      section:   values.classGroup === "SS" ? "Snr Sec" : "Jnr Sec",
      classLabel:`${values.classGroup} 1A`,
      username:  `@${values.firstName.toLowerCase()}.${values.lastName.toLowerCase()}`,
    },
    { onSuccess: () => reset() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <PhotoUpload />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3.5 mt-2"
      >
        <motion.div variants={fieldFadeUp}>
          <FormInput
            label="Admission Number"
            placeholder="e.g. SCH/2024/009"
            isLoading={isPending}
            error={errors.admNo?.message}
            {...register("admNo")}
          />
        </motion.div>

        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormInput label="First Name"  placeholder="First name"
            isLoading={isPending} error={errors.firstName?.message} {...register("firstName")} />
          <FormInput label="Last Name"  placeholder="Last name"
            isLoading={isPending} error={errors.lastName?.message}  {...register("lastName")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Middle Name" placeholder="Middle name"
            isLoading={isPending} {...register("middleName")} />
        </motion.div>

        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormSelect
            label="Sex" placeholder="Select..."
            options={SEX_OPTIONS} isLoading={isPending}
            error={errors.sex?.message} {...register("sex")}
          />
          <FormInput
            label="Date of Birth" type="date"
            isLoading={isPending} error={errors.dob?.message} {...register("dob")}
          />
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
          <FormInput label="City" placeholder="City"
            isLoading={isPending} error={errors.city?.message}  {...register("city")} />
          <FormInput label="State" placeholder="State"
            isLoading={isPending} error={errors.state?.message} {...register("state")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Country" placeholder="Country"
            isLoading={isPending} error={errors.country?.message} {...register("country")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Email Address" type="email" placeholder="student@example.com"
            isLoading={isPending} error={errors.email?.message} {...register("email")} />
        </motion.div>

        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormSelect
            label="Class Group" placeholder="Select group"
            options={CLASS_GROUP_OPTIONS} isLoading={isPending}
            error={errors.classGroup?.message} {...register("classGroup")}
          />
          <FormInput
            label="Date of Admission" type="date"
            isLoading={isPending} error={errors.dateOfAdmission?.message}
            {...register("dateOfAdmission")}
          />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <SubmitButton label="Add Student" isLoading={isPending} />
        </motion.div>
      </motion.div>
    </form>
  );
};

export default StudentForm;