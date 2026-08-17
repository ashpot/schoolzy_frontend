import { z } from "zod";

export const sectionSchema = z.object({
  title:        z.string().min(1, "Title is required"),
  code:         z.string().min(1, "Code is required").max(8, "Max 8 characters"),
  // showPosition: z.boolean().default(false),
});
export type SectionValues = z.infer<typeof sectionSchema>;

export const classSchema = z.object({
  name:    z.string().min(1, "Name is required"),
  code:    z.string().min(1, "Code is required").max(8, "Max 8 characters"),
  section: z.string().min(1, "Section is required"),
});
export type ClassValues = z.infer<typeof classSchema>;

export const classGroupSchema = z.object({
  name:        z.string().min(1, "Name is required"),
  code:        z.string().min(1, "Code is required").max(8, "Max 8 characters"),
  parentClass: z.string().min(1, "Parent class is required"),
});
export type ClassGroupValues = z.infer<typeof classGroupSchema>;

export const formTeacherSchema = z.object({
  classValue: z.string().min(1, "Class is required"),
  teacherId:  z.string().min(1, "Teacher is required"),
});
export type FormTeacherValues = z.infer<typeof formTeacherSchema>;

export const denominatorSchema = z.object({
  denominator: z.coerce.number()
    .min(1, "Must be at least 1").max(1000, "Max 1000"),
  classValue:  z.string().min(1, "Target class is required"),
});
export type DenominatorValues = z.infer<typeof denominatorSchema>;