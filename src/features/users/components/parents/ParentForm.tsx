import React, { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fieldFadeUp } from "../../animations/variants";
import PhotoUpload   from "../shared/PhotoUpload";
import SubmitButton  from "../shared/SubmitButton";
import FormInput      from "@/shared/ui/FormInput";
import FormSelect from "@/shared/ui/FormSelect";
import { useAddParent } from "../../hooks/useParents";

const SEX_OPTIONS = [
  { value: "Male", label: "Male" }, { value: "Female", label: "Female" },
];

const ParentForm: React.FC = () => {
  const { mutate, isPending } = useAddParent();
  const [form, setForm] = useState({
    firstName: "", lastName: "", middleName: "", sex: "",
    dob: "", phone: "", address: "", city: "", state: "", country: "", email: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to real API
    mutate({
      ...form,
      sex: form.sex as "Male" | "Female",
      parentId: `PAR-${Date.now()}`,
      username: `@${form.firstName.toLowerCase()}.${form.lastName[0].toLowerCase()}`,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <PhotoUpload />
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-3.5 mt-2">
        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormInput label="First Name" name="firstName" placeholder="First name" value={form.firstName} onChange={set("firstName")} isLoading={isPending} />
          <FormInput label="Last Name"  name="lastName"  placeholder="Last name"  value={form.lastName}  onChange={set("lastName")}  isLoading={isPending} />
        </motion.div>
        <motion.div variants={fieldFadeUp}>
          <FormInput label="Middle Name" name="middleName" placeholder="Middle name" value={form.middleName} onChange={set("middleName")} isLoading={isPending} />
        </motion.div>
        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormSelect label="Sex" name="sex" placeholder="Select..." options={SEX_OPTIONS} value={form.sex} onChange={set("sex")} isLoading={isPending} />
          <FormInput  label="Date of Birth" name="dob" type="date" value={form.dob} onChange={set("dob")} isLoading={isPending} />
        </motion.div>
        <motion.div variants={fieldFadeUp}>
          <FormInput label="Phone" name="phone" placeholder="+234 800 000 0000" value={form.phone} onChange={set("phone")} isLoading={isPending} />
        </motion.div>
        <motion.div variants={fieldFadeUp}>
          <FormInput label="Address" name="address" placeholder="Street address" value={form.address} onChange={set("address")} isLoading={isPending} />
        </motion.div>
        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormInput label="City"  name="city"  placeholder="City"  value={form.city}  onChange={set("city")}  isLoading={isPending} />
          <FormInput label="State" name="state" placeholder="State" value={form.state} onChange={set("state")} isLoading={isPending} />
        </motion.div>
        <motion.div variants={fieldFadeUp}>
          <FormInput label="Country" name="country" placeholder="Country" value={form.country} onChange={set("country")} isLoading={isPending} />
        </motion.div>
        <motion.div variants={fieldFadeUp}>
          <FormInput label="Email Address" name="email" type="email" placeholder="parent@example.com" value={form.email} onChange={set("email")} isLoading={isPending} />
        </motion.div>
        <motion.div variants={fieldFadeUp}>
          <SubmitButton label="Add Parent" isLoading={isPending} />
        </motion.div>
      </motion.div>
    </form>
  );
};

export default ParentForm;