import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { parentSchema, type ParentFormValues } from "../../schemas";
import { staggerContainer, fieldFadeUp } from "../../animations/variants";
import { useAddParent } from "../../hooks/useParents";
import { generateUsername } from "@/shared/utils/generateUsername";
import PhotoUpload from "../shared/PhotoUpload";
import AssignChildField from "../shared/AssignChildField";
import SubmitButton from "@/shared/ui/SubmitButton";
import UserCreatedModal from "../shared/UserCreatedModal";

const SEX_OPTIONS = [
  { value: "Male", label: "Male" }, { value: "Female", label: "Female" },
];

const ParentForm: React.FC = () => {
  const { mutate, isPending } = useAddParent();
  const [createdUser, setCreatedUser] = useState<{ fullName: string; username: string; password: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<ParentFormValues>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      firstName: "", lastName: "", middleName: "", sex: undefined,
      dob: "", phone: "", address: "", city: "", state: "", country: "", email: "",
      username: "", password: "", confirmPassword: "",
      assignedChildren: [],
    },
  });

  const firstName = useWatch({ control, name: "firstName" });
  const lastName = useWatch({ control, name: "lastName" });

  React.useEffect(() => {
    setValue("username", generateUsername(firstName, lastName));
  }, [firstName, lastName, setValue]);

  const onSubmit = (values: ParentFormValues) => {
    // NOTE: values.assignedChildren is captured in form state but intentionally
    // left out of the payload below — backend child-assignment endpoint
    // (POST /student-parents/) isn't wired yet. Will loop-assign post-creation later.
    mutate(
      {
        first_name: values.firstName,
        last_name: values.lastName,
        username: values.username,
        password: values.password,
        email: values.email,
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
        role="Parent"
      />
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
          <AssignChildField control={control} error={errors.assignedChildren?.message} />
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
          <SubmitButton label="Add Parent" isLoading={isPending} />
        </motion.div>
      </motion.div>
    </form>
  );
};

export default ParentForm;