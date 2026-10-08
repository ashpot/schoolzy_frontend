import { z } from "zod";

const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const MAX_PHOTO_BYTES = 2 * 1024 * 1024; // 2 MB

const photoField = z
  .instanceof(File)
  .refine((f) => f.type.startsWith("image/"), "Photo must be an image")
  .refine((f) => f.size <= MAX_PHOTO_BYTES, "Photo must be 2MB or smaller")
  .optional();

const optionalEmail = z.string().email("Enter a valid email address").optional().or(z.literal(""));

const basePersonFields = {
  firstName:  z.string().min(1, "First name is required"),
  lastName:   z.string().min(1, "Last name is required"),
  middleName: z.string().optional(),
  sex:        z.enum(["Male", "Female"], { message: "Please select a gender" }).optional().or(z.literal("")),
  dob:        z.string().optional(),
  phone:      z.string().regex(phoneRegex, "Enter a valid phone number").optional().or(z.literal("")),
  address:    z.string().optional(),
  city:       z.string().optional(),
  state:      z.string().optional(),
  country:    z.string().optional(),
  email:      optionalEmail,
  photo:      photoField,
};

const credentialFields = {
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .regex(passwordRegex, "Password must have at least 8 characters, alphanumeric with at least one capital letter & special character"),
  confirmPassword: z.string(),
};

// ── Student (everything required except email)
export const studentSchema = z
  .object({
    ...credentialFields,
    admission_number: z.string().min(1, "Admission number is required"),
    firstName:        z.string().min(1, "First name is required"),
    middleName:       z.string().min(1, "Middle name is required"),
    lastName:         z.string().min(1, "Last name is required"),
    sex:        z.enum(["Male", "Female"], { message: "Please select a gender" }).optional().or(z.literal("")),
    dob:              z.string().min(1, "Date of birth is required"),
    email:            optionalEmail,
    address:          z.string().min(1, "Address is required"),
    city:             z.string().min(1, "City is required"),
    state:            z.string().min(1, "State is required"),
    country:          z.string().min(1, "Country is required"),
    classGroup:       z.coerce.number().min(1, "Please select a class group"),
    dateOfAdmission:  z.string().min(1, "Date of admission is required"),
    photo:            photoField,
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
    employment_number: z.string().min(1, "Employment number is required"),
    dateOfEmployment:  z.string().min(1, "Date of employment is required"),
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