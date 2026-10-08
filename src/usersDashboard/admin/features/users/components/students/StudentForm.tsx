import React, { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { studentSchema, type StudentFormValues } from "../../schemas";
import { staggerContainer, fieldFadeUp } from "../../animations/variants";
import { useAddStudent, useClassGroupsList } from "../../hooks/useStudents";
import { generateUsername } from "@/shared/utils/generateUsername";
import PhotoUpload from "../shared/PhotoUpload";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import SubmitButton from "@/shared/ui/SubmitButton";
import UserCreatedModal from "../shared/UserCreatedModal";

const SEX_OPTIONS = [
  { value: "Male", label: "Male" }, { value: "Female", label: "Female" },
];

// Local date as YYYY-MM-DD (toISOString would use UTC and can be a day off)
const today = () => new Date().toLocaleDateString("en-CA");

const getDefaults = () => ({
  admission_number: "", firstName: "", middleName: "", lastName: "",
  sex: undefined, dob: "", email: "",
  address: "", city: "", state: "", country: "",
  classGroup: "" as unknown as number,
  dateOfAdmission: today(),
  username: "", password: "", confirmPassword: "",
  photo: undefined,
});

const StudentForm: React.FC = () => {
  const { mutate, isPending } = useAddStudent();
  const { data: classGroups, isLoading: classGroupsLoading } = useClassGroupsList();
  const [createdUser, setCreatedUser] =
    useState<{ fullName: string; username: string; password: string; admissionNumber: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: getDefaults(),
  });

  const firstName = useWatch({ control, name: "firstName" });
  const lastName = useWatch({ control, name: "lastName" });

  React.useEffect(() => {
    setValue("username", generateUsername(firstName, lastName));
  }, [firstName, lastName, setValue]);

  const classGroupOptions = (classGroups ?? []).map((cg) => ({
    value: String(cg.id),
    label: cg.name,
  }));

  const onSubmit = (values: StudentFormValues) => {
    mutate(
      {
        first_name: values.firstName,
        middle_name: values.middleName,
        last_name: values.lastName,
        username: values.username,
        password: values.password,
        email: values.email || undefined,
        sex: values.sex,
        date_of_birth: values.dob,
        address: values.address,
        city: values.city,
        state: values.state,
        country: values.country,
        date_of_admission: values.dateOfAdmission,
        class_group: values.classGroup,
        admission_number: values.admission_number,
        photo: values.photo,
      },
      {
        onSuccess: () => {
          setCreatedUser({
            fullName: `${values.firstName} ${values.lastName}`,
            username: values.username,
            password: values.password,
            admissionNumber: values.admission_number,
          });
          reset(getDefaults()); // admission date goes back to today
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        control={control}
        name="photo"
        render={({ field }) => (
          <PhotoUpload value={field.value} onChange={field.onChange} error={errors.photo?.message} />
        )}
      />
      <UserCreatedModal
        isOpen={!!createdUser}
        onClose={() => setCreatedUser(null)}
        fullName={createdUser?.fullName ?? ""}
        username={createdUser?.username ?? ""}
        password={createdUser?.password ?? ""}
        role="Student"
      />
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-3.5 mt-2">
        <motion.div variants={fieldFadeUp}>
          <FormInput label="Admission Number" placeholder="e.g. ADM/2024/013"
            isLoading={isPending} error={errors.admission_number?.message} {...register("admission_number")} />
        </motion.div>

        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormInput label="First Name" placeholder="First name"
            isLoading={isPending} error={errors.firstName?.message} {...register("firstName")} />
          <FormInput label="Last Name" placeholder="Last name"
            isLoading={isPending} error={errors.lastName?.message} {...register("lastName")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Middle Name" placeholder="Middle name"
            isLoading={isPending} error={errors.middleName?.message} {...register("middleName")} />
        </motion.div>

        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormSelect label="Sex" placeholder="Select..." options={SEX_OPTIONS}
            isLoading={isPending} error={errors.sex?.message} {...register("sex")} />
          <FormInput label="Date of Birth" type="date"
            isLoading={isPending} error={errors.dob?.message} {...register("dob")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Email Address (optional)" type="email" placeholder="student@example.com"
            isLoading={isPending} error={errors.email?.message} {...register("email")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Address" placeholder="Street address"
            isLoading={isPending} error={errors.address?.message} {...register("address")} />
        </motion.div>

        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormInput label="City" placeholder="City"
            isLoading={isPending} error={errors.city?.message} {...register("city")} />
          <FormInput label="State" placeholder="State"
            isLoading={isPending} error={errors.state?.message} {...register("state")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Country" placeholder="Country"
            isLoading={isPending} error={errors.country?.message} {...register("country")} />
        </motion.div>

        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormSelect
            label="Class Group"
            placeholder={classGroupsLoading ? "Loading..." : "Select class group"}
            options={classGroupOptions}
            isLoading={isPending || classGroupsLoading}
            error={errors.classGroup?.message}
            {...register("classGroup")}
          />
          <FormInput label="Date of Admission" type="date"
            isLoading={isPending} error={errors.dateOfAdmission?.message} {...register("dateOfAdmission")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Username" placeholder="Create username"
            isLoading={isPending} {...register("username")} />
        </motion.div>

        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormInput label="Password" type="password" placeholder="Create password"
            isLoading={isPending} error={errors.password?.message} {...register("password")} />
          <FormInput label="Confirm Password" type="password" placeholder="Re-enter password"
            isLoading={isPending} error={errors.confirmPassword?.message} {...register("confirmPassword")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <SubmitButton label="Add Student" isLoading={isPending} />
        </motion.div>
      </motion.div>
    </form>
  );
};

export default StudentForm;