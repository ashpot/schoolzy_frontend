// import { z } from "zod";

// export const administratorDetailsSchema = z.object({
//   first_name: z
//     .string()
//     .min(2, "first name must be at least 2 characters")
//     .max(100, "first name must be under 100 characters"),
//   last_name: z
//     .string()
//     .min(2, "last name must be at least 2 characters")
//     .max(100, "last name must be under 100 characters"),
//   email: z
//     .string()
//     .email("Please enter a valid email address"),
//   phoneNumber: z
//     .string()
//     .min(10, "Phone number must be at least 10 digits")
//     .max(15, "Phone number must be under 15 digits")
//     .regex(/^[0-9+\-\s()]*$/, "Please enter a valid phone number"),
//   password: z
//     .string()
//     .min(8, "Password must have at least 8 characters")
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
//       "Password must have at least 8 characters, alphanumeric with at least one capital letter & special character"
//     ),
//     confirm_password: z.string(),
// }).refine((data)=>data.password === data.confirm_password,
//   {message: "Passwords does not match", path: ["confirm_password"]});

// export const schoolDetailsSchema = z.object({
//   schoolName: z
//     .string()
//     .min(2, "School name must be at least 2 characters")
//     .max(100, "School name must be under 100 characters"),
//   state: z
//     .string()
//     .min(1, "Please select a state"),
//   city: z
//     .string()
//     .min(1, "Please select a city"),
//   streetAddress: z
//     .string()
//     .min(5, "Street address must be at least 5 characters")
//     .max(200, "Street address must be under 200 characters"),
//   schoolSize: z
//     .string()
//     .min(1, "Please enter number of students")
//     .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
//       message: "Must be a valid number greater than 0",
//     }),
// });

// // Combined for final submission
// export const signupSchema = z.object({
//   ...administratorDetailsSchema.shape,
//   ...schoolDetailsSchema.shape,
// });

// export type AdministratorDetailsFormData = z.infer<typeof administratorDetailsSchema>;
// export type SchoolDetailsFormData = z.infer<typeof schoolDetailsSchema>;
// export type SignupFormData = z.infer<typeof signupSchema>;

import { z } from "zod";

export const administratorDetailsSchema = z.object({
  first_name: z
    .string()
    .min(2, "first name must be at least 2 characters")
    .max(100, "first name must be under 100 characters"),
  last_name: z
    .string()
    .min(2, "last name must be at least 2 characters")
    .max(100, "last name must be under 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be under 15 digits")
    .regex(/^[0-9+\-\s()]*$/, "Please enter a valid phone number"),
  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Password must have at least 8 characters, alphanumeric with at least one capital letter & special character"
    ),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password,
  { message: "Passwords does not match", path: ["confirm_password"] });

export const schoolDetailsSchema = z.object({
  schoolName: z
    .string()
    .min(2, "School name must be at least 2 characters")
    .max(100, "School name must be under 100 characters"),
  schoolSlug: z
    .string()
    .min(2, "Subdomain must be at least 2 characters")
    .max(50, "Subdomain must be under 50 characters")
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens allowed"),
  state: z
    .string()
    .min(1, "Please select a state"),
  city: z
    .string()
    .min(1, "Please select a city"),
  streetAddress: z
    .string()
    .min(5, "Street address must be at least 5 characters")
    .max(200, "Street address must be under 200 characters"),
  schoolSize: z
    .string()
    .min(1, "Please enter number of students")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a valid number greater than 0",
    }),
});

// Combined for final submission
export const signupSchema = z.object({
  ...administratorDetailsSchema.shape,
  ...schoolDetailsSchema.shape,
});

export type AdministratorDetailsFormData = z.infer<typeof administratorDetailsSchema>;
export type SchoolDetailsFormData = z.infer<typeof schoolDetailsSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;