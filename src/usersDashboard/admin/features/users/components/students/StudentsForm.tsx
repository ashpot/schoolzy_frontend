import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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

const StudentForm: React.FC = () => {
  const { mutate, isPending } = useAddStudent();
  const { data: classGroups, isLoading: classGroupsLoading } = useClassGroupsList();
  const [createdUser, setCreatedUser] = useState<{ fullName: string; username: string; password: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: "", lastName: "", email: "", classGroup: "" as unknown as number,
      username: "", password: "", confirmPassword: "",
    },
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
        last_name: values.lastName,
        username: values.username,
        password: values.password,
        email: values.email,
        class_group: values.classGroup,
      },
      { onSuccess: () => {
        setCreatedUser({
          fullName: `${values.firstName} ${values.lastName}`,
          username: values.username,
          password: values.password,
        });
        reset()
      } }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <PhotoUpload />
      <UserCreatedModal
        isOpen={!!createdUser}
        onClose={() => setCreatedUser(null)}
        fullName={createdUser?.fullName ?? ""}
        username={createdUser?.username ?? ""}
        password={createdUser?.password ?? ""}
        role="Student"
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3.5 mt-2"
      >
        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormInput label="First Name" placeholder="First name"
            isLoading={isPending} error={errors.firstName?.message} {...register("firstName")} />
          <FormInput label="Last Name" placeholder="Last name"
            isLoading={isPending} error={errors.lastName?.message} {...register("lastName")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Email Address" type="email" placeholder="student@example.com"
            isLoading={isPending} error={errors.email?.message} {...register("email")} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormSelect
            label="Class Group"
            placeholder={classGroupsLoading ? "Loading class groups..." : "Select class group"}
            options={classGroupOptions}
            isLoading={isPending || classGroupsLoading}
            error={errors.classGroup?.message}
            {...register("classGroup")}
          />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Username" readOnly
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