import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 12;
const MAX_LOGO_BYTES = 2 * 1024 * 1024;
const LOGO_TYPES = ["image/png", "image/jpeg", "image/webp"]; // no SVG: it can carry scripts

const optionalPhone = z
  .string()
  .trim()
  .regex(/^$|^\+?[0-9\s-]{7,20}$/, "Enter a valid phone number");

const optionalWebsite = z
  .string()
  .trim()
  .max(200, "Website is too long")
  .regex(/^$|^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i, "Enter a valid website");

export const createSchoolSchema = z
  .object({
    // Step 1: school info
    name: z.string().trim().min(2, "School name is required").max(120, "Name is too long"),
    code: z
      .string()
      .trim()
      .min(3, "Code must be at least 3 characters")
      .max(12, "Code can be at most 12 characters")
      .regex(/^[A-Za-z0-9-]+$/, "Letters, numbers and hyphens only"),
    email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
    phone: optionalPhone,
    website: optionalWebsite,
    address: z.string().trim().max(200, "Address is too long"),
    country: z.string().min(1, "Select a country"),
    state: z.string().trim().min(1, "State is required").max(80),
    city: z.string().trim().min(1, "City is required").max(80),
    logo: z
      .instanceof(File)
      .refine((f) => LOGO_TYPES.includes(f.type), "Use a PNG, JPG or WebP image")
      .refine((f) => f.size <= MAX_LOGO_BYTES, "Logo must be 2MB or smaller")
      .optional(),

    // Step 2: administrator
    firstName: z.string().trim().min(1, "First name is required").max(60),
    lastName: z.string().trim().min(1, "Last name is required").max(60),
    adminEmail: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
    adminPhone: optionalPhone,
    username: z
      .string()
      .trim()
      .min(3, "At least 3 characters")
      .max(40, "At most 40 characters")
      .regex(/^[a-zA-Z0-9._-]+$/, "Letters, numbers, dots, dashes and underscores only"),
    temporaryPassword: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `Use at least ${PASSWORD_MIN_LENGTH} characters`)
      .max(128, "Password is too long")
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/\d/, "Include a number")
      .regex(/[^A-Za-z0-9]/, "Include a special character"),

    // Step 3: subscription
    plan: z.string().min(1, "Select a plan"),
    trialMode: z.boolean(),
    startDate: z.string().min(1, "Start date is required"),
    renewalDate: z.string().min(1, "Renewal date is required"),
    maxStudents: z.coerce.number().int("Whole numbers only").min(1, "Minimum is 1").max(100000),
    maxTeachers: z.coerce.number().int("Whole numbers only").min(1, "Minimum is 1").max(10000),
  })
  .refine((v) => !v.startDate || !v.renewalDate || v.renewalDate > v.startDate, {
    message: "Renewal must be after the start date",
    path: ["renewalDate"],
  });

// What the form holds while typing (coerced number fields are still raw input)
export type CreateSchoolInput = z.input<typeof createSchoolSchema>;
// What the submit handler receives after validation
export type CreateSchoolValues = z.output<typeof createSchoolSchema>;