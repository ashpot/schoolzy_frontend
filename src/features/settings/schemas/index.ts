import { z } from "zod";

export const schoolSettingsSchema = z.object({
  name:      z.string().min(1, "School name is required"),
  motto:     z.string().optional(),
  address:   z.string().optional(),
  about:     z.string().optional(),
  phone:     z.string().optional(),
  email:     z.string().email("Invalid email").min(1, "Email is required"),
  facebook:  z.string().optional(),
  twitter:   z.string().optional(),
  whatsapp:  z.string().optional(),
  logo: z.instanceof(File).optional()
});
export type SchoolSettingsValues = z.infer<typeof schoolSettingsSchema>;

export const testimonialSchema = z.object({
  fullName:  z.string().min(1, "Full name is required"),
  portfolio: z.enum(["Parent","Alumni","Student","Staff","Guardian","Community"], {
    error: "Portfolio is required",
  }),
  comment: z.string().min(1, "Comment is required").max(500, "Max 500 characters"),
});
export type TestimonialValues = z.infer<typeof testimonialSchema>;

export const newsPostSchema = z.object({
  title:    z.string().min(1, "Title is required"),
  author:   z.string().min(1, "Author is required"),
  category: z.enum(["News", "Events", "Announcements", "Sports", "Academic"], {
    error: "Category is required",
  }),
  content:  z.string().min(1, "Content is required"),
  featured: z.boolean().default(false),
});
export type NewsPostValues = z.infer<typeof newsPostSchema>;