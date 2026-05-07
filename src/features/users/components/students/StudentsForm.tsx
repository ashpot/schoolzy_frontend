import React, { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fieldFadeUp } from "../../animations/variants";
import PhotoUpload from "../shared/PhotoUpload";
import SubmitButton from "../shared/SubmitButton";
import FormInput        from "@/shared/ui/FormInput";
import FormSelect       from "@/shared/ui/FormSelect";
import { useAddStudent } from "../../hooks/useStudents";

const CLASS_GROUPS = [
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
  const [photo, setPhoto] = useState<File | null>(null);
  const [form, setForm] = useState({
    admNo: "", firstName: "", lastName: "", middleName: "",
    sex: "", dob: "", phone: "", address: "", city: "", state: "",
    country: "", email: "", classGroup: "", dateOfAdmission: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to real API via mutation
    mutate({
      ...form,
      sex: form.sex as "Male" | "Female",
      section: form.classGroup === "SS" ? "Snr Sec" : "Jnr Sec",
      classLabel: `${form.classGroup} 1A`,
      username: `@${form.firstName.toLowerCase()}.${form.lastName.toLowerCase()}`,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <PhotoUpload onChange={(f) => setPhoto(f)} />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3.5 mt-2"
      >
        <motion.div variants={fieldFadeUp}>
          <FormInput label="Admission Number" name="admNo" placeholder="e.g. SCH/2024/009" value={form.admNo} onChange={set("admNo")} isLoading={isPending} />
        </motion.div>

        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormInput label="First Name" name="firstName" placeholder="First name" value={form.firstName} onChange={set("firstName")} isLoading={isPending} />
          <FormInput label="Last Name"  name="lastName"  placeholder="Last name"  value={form.lastName}  onChange={set("lastName")}  isLoading={isPending} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <FormInput label="Middle Name" name="middleName" placeholder="Middle name" value={form.middleName} onChange={set("middleName")} isLoading={isPending} />
        </motion.div>

        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormSelect label="Sex" name="sex" placeholder="Select..." options={SEX_OPTIONS} value={form.sex} onChange={set("sex")} isLoading={isPending} />
          <FormInput  label="Date of Birth" name="dob" type="date" placeholder="dd/mm/yyyy" value={form.dob} onChange={set("dob")} isLoading={isPending} />
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
          <FormInput label="Email Address" name="email" type="email" placeholder="student@example.com" value={form.email} onChange={set("email")} isLoading={isPending} />
        </motion.div>

        <motion.div variants={fieldFadeUp} className="grid grid-cols-2 gap-3">
          <FormSelect label="Class Group" name="classGroup" placeholder="Select group" options={CLASS_GROUPS} value={form.classGroup} onChange={set("classGroup")} isLoading={isPending} />
          <FormInput  label="Date of Admission" name="dateOfAdmission" type="date" placeholder="dd/mm/yyyy" value={form.dateOfAdmission} onChange={set("dateOfAdmission")} isLoading={isPending} />
        </motion.div>

        <motion.div variants={fieldFadeUp}>
          <SubmitButton label="Add Student" isLoading={isPending} />
        </motion.div>
      </motion.div>
    </form>
  );
};

export default StudentForm;