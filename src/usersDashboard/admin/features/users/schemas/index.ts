// import { z } from "zod";

// const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;

// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

// const basePersonFields = {
//   firstName:  z.string().min(1, "First name is required"),
//   lastName:   z.string().min(1, "Last name is required"),
//   middleName: z.string().optional(),
//   sex:        z.enum(["Male", "Female"], { message: "Please select a gender" }),
//   dob:        z.string().min(1, "Date of birth is required"),
//   phone:      z.string().regex(phoneRegex, "Enter a valid phone number"),
//   address:    z.string().min(1, "Address is required"),
//   city:       z.string().min(1, "City is required"),
//   state:      z.string().min(1, "State is required"),
//   country:    z.string().min(1, "Country is required"),
//   email:      z.string().email("Enter a valid email address"),
// };

// const credentialFields = {
//   username: z.string().min(1, "Username is required"),
//   password: z
//     .string()
//     .min(8, "Password must have at least 8 characters")
//     .regex(passwordRegex, "Password must have at least 8 characters, alphanumeric with at least one capital letter & special character"),
//   confirmPassword: z.string(),
// };

// const withPasswordMatch = <T extends z.ZodRawShape>(shape: T) =>
//   z.object(shape).refine((data: any) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// // ── Student
// export const studentSchema = withPasswordMatch({
//   ...basePersonFields,
//   ...credentialFields,
//   admNo:           z.string().min(1, "Admission number is required"),
//   classGroup:      z.coerce.number({ message: "Please select a class group" }).min(1, "Please select a class group"),
//   dateOfAdmission: z.string().min(1, "Date of admission is required"),
// });
// export type StudentFormValues = z.infer<typeof studentSchema>;

// // ── Teacher
// export const teacherSchema = withPasswordMatch({
//   ...basePersonFields,
//   ...credentialFields,
//   empNo:            z.string().min(1, "Employment number is required"),
//   dateOfEmployment: z.string().min(1, "Date of employment is required"),
// });
// export type TeacherFormValues = z.infer<typeof teacherSchema>;

// // ── Admin
// export const adminSchema = withPasswordMatch({
//   ...basePersonFields,
//   ...credentialFields,
// });
// export type AdminFormValues = z.infer<typeof adminSchema>;

// // ── Parent
// export const parentSchema = withPasswordMatch({
//   ...basePersonFields,
//   ...credentialFields,
// });
// export type ParentFormValues = z.infer<typeof parentSchema>;

// src/usersDashboard/admin/features/users/schemas/index.ts
// src/usersDashboard/admin/features/users/schemas/index.ts
import { z } from "zod";

const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const basePersonFields = {
  firstName:  z.string().min(1, "First name is required"),
  lastName:   z.string().min(1, "Last name is required"),
  middleName: z.string().optional(),
  sex:        z.enum(["Male", "Female"], { message: "Please select a gender" }),
  dob:        z.string().min(1, "Date of birth is required"),
  phone:      z.string().regex(phoneRegex, "Enter a valid phone number"),
  address:    z.string().min(1, "Address is required"),
  city:       z.string().min(1, "City is required"),
  state:      z.string().min(1, "State is required"),
  country:    z.string().min(1, "Country is required"),
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
    ...basePersonFields,
    ...credentialFields,
    admNo:           z.string().min(1, "Admission number is required"),
    classGroup:      z.coerce.number().min(1, "Please select a class group"),
    dateOfAdmission: z.string().min(1, "Date of admission is required"),
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

// ── Parent
export const parentSchema = z
  .object({
    ...basePersonFields,
    ...credentialFields,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type ParentFormValues = z.infer<typeof parentSchema>;