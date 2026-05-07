import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { adminSchema, type AdminFormValues } from "../../schemas";
import { staggerContainer, fieldFadeUp } from "../../animations/variants";
import { useAddAdmin } from "../../hooks/useAdmins";
import PhotoUpload     from "../shared/PhotoUpload";
import SignatureUpload from "../shared/SignatureUpload";
import SubmitButton    from "../shared/SubmitButton";
import FormInput from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";

const SEX_OPTIONS = [
  { value: "Male", label: "Male" }, { value: "Female", label: "Female" },
];

const AdminForm: React.FC = () => {
  const { mutate, isPending } = useAddAdmin();
  // Signature is a File — not part of zod, managed separately
  const [_signatureFile, setSignatureFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      firstName: "", lastName: "", middleName: "", sex: undefined,
      dob: "", phone: "", address: "", city: "", state: "", country: "", email: "",
    },
  });

  const onSubmit = (values: AdminFormValues) => {
    // TODO: include signatureFile in FormData when wiring to real API
    mutate({
      ...values,
      adminId:  `ADM-${Date.now()}`,
      username: `@${values.firstName.toLowerCase()}.${values.lastName.toLowerCase()}`,
    },
    { onSuccess: () => { reset(); setSignatureFile(null); } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <PhotoUpload />

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-3.5 mt-2">
        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormInput label="First Name" placeholder="First name"
            isLoading={isPending} error={errors.firstName?.message} {...register("firstName")} />
          <FormInput label="Last Name"   placeholder="Last name"
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
          <FormInput label="Email Address" type="email" placeholder="admin@example.com"
            isLoading={isPending} error={errors.email?.message} {...register("email")} />
        </motion.div>

        {/* Signature — outside RHF, handled manually */}
        <motion.div variants={fieldFadeUp}>
          <SignatureUpload onChange={(f) => setSignatureFile(f)} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <SubmitButton label="Add Admin" isLoading={isPending} />
        </motion.div>
      </motion.div>
    </form>
  );
};

export default AdminForm;