// src/features/auth/schema/signupSchema.ts
import { z } from 'zod'

export const schoolDetailsSchema = z.object({
  schoolName: z.string().min(3, 'School name must be at least 3 characters'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(1, 'Please select a state'),
  citySelect: z.string().min(1, 'Please select a city'),
  streetAddress: z.string().min(5, 'Street address must be at least 5 characters'),
  schoolSize: z
    .string()
    .min(1, 'Number of students is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Must be a valid number greater than 0',
    }),
})

export const administratorDetailsSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one capital letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
})

export type SchoolDetailsFormData = z.infer<typeof schoolDetailsSchema>
export type AdministratorDetailsFormData = z.infer<typeof administratorDetailsSchema>

export interface SignupPayload {
  schoolDetails: SchoolDetailsFormData
  administratorDetails: AdministratorDetailsFormData
}