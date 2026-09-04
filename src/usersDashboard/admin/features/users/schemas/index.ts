import { z } from "zod";

const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const basePersonFields = {
  firstName:  z.string().min(1, "First name is required"),
  lastName:   z.string().min(1, "Last name is required"),
  middleName: z.string().optional(),
  sex:        z.enum(["Male", "Female"], { message: "Please select a gender" }).optional(),
  dob:        z.string().min(1, "Date of birth is required").optional(),
  phone:      z.string().regex(phoneRegex, "Enter a valid phone number").optional(),
  address:    z.string().min(1, "Address is required").optional(),
  city:       z.string().min(1, "City is required").optional(),
  state:      z.string().min(1, "State is required").optional(),
  country:    z.string().min(1, "Country is required").optional(),
  email:      z.string().email("Enter a valid email address"),
};

const credentialFields = {
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .regex(passwordRegex, "Password must have at least 8 characters, alphanumeric with at least one capital letter & special character"),
  confirmPassword: z.string(),
};

// ── Student
export const studentSchema = z
  .object({
    ...credentialFields,
    firstName:  z.string().min(1, "First name is required"),
    lastName:   z.string().min(1, "Last name is required"),
    email:      z.string().email("Enter a valid email address"),
    classGroup: z.coerce.number().min(1, "Please select a class group"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type StudentFormValues = z.infer<typeof studentSchema>;

// ── Teacher
export const teacherSchema = z
  .object({
    ...basePersonFields,
    ...credentialFields,
    empNo:            z.string().min(1, "Employment number is required"),
    dateOfEmployment: z.string().min(1, "Date of employment is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type TeacherFormValues = z.infer<typeof teacherSchema>;

// ── Admin
export const adminSchema = z
  .object({
    ...basePersonFields,
    ...credentialFields,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type AdminFormValues = z.infer<typeof adminSchema>;

// ── Assigned Child (used in Parent form)
export const assignedChildSchema = z.object({
  id: z.string(),
  name: z.string(),
  classLabel: z.string(),
});
export type AssignedChild = z.infer<typeof assignedChildSchema>;

// ── Parent
export const parentSchema = z
  .object({
    ...basePersonFields,
    ...credentialFields,
    assignedChildren: z.array(assignedChildSchema),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type ParentFormValues = z.infer<typeof parentSchema>;