import { z } from "zod";

const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;

// ── Reusable field groups
const basePersonFields = {
  firstName:  z.string().min(1, "First name is required"),
  lastName:   z.string().min(1, "Last name is required"),
  middleName: z.string().optional(),
  // FIX: Changed { required_error: ... } to { message: ... }
  sex:        z.enum(["Male", "Female"], { message: "Please select a gender" }),
  dob:        z.string().min(1, "Date of birth is required"),
  phone:      z.string().regex(phoneRegex, "Enter a valid phone number"),
  address:    z.string().min(1, "Address is required"),
  city:       z.string().min(1, "City is required"),
  state:      z.string().min(1, "State is required"),
  country:    z.string().min(1, "Country is required"),
  email:      z.string().email("Enter a valid email address"),
};

// ── Student
export const studentSchema = z.object({
  ...basePersonFields,
  admNo:           z.string().min(1, "Admission number is required"),
  classGroup:      z.string().min(1, "Class group is required"),
  dateOfAdmission: z.string().min(1, "Date of admission is required"),
});
export type StudentFormValues = z.infer<typeof studentSchema>;

// ── Teacher
export const teacherSchema = z.object({
  ...basePersonFields,
  empNo:            z.string().min(1, "Employment number is required"),
  dateOfEmployment: z.string().min(1, "Date of employment is required"),
});
export type TeacherFormValues = z.infer<typeof teacherSchema>;

// ── Admin
export const adminSchema = z.object({
  ...basePersonFields,
  // signature is a file — validated separately, not in zod
});
export type AdminFormValues = z.infer<typeof adminSchema>;

// ── Parent
export const parentSchema = z.object({
  ...basePersonFields,
});
export type ParentFormValues = z.infer<typeof parentSchema>;