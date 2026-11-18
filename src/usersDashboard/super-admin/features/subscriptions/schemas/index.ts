import { z } from "zod";

const wholeNumber = z
  .string()
  .trim()
  .regex(/^\d+$/, "Whole numbers only")
  .refine((v) => Number(v) > 0, "Must be above 0");

export const planSchema = z
  .object({
    name: z.string().trim().min(2, "Plan name is required").max(40, "Name is too long"),
    description: z.string().trim().max(200, "Keep it under 200 characters"),
    monthlyPrice: wholeNumber,
    yearlyPrice: wholeNumber,
    maxStudents: wholeNumber,
    maxTeachers: wholeNumber,
    storageGb: wholeNumber,
    support: z.enum(["Basic", "Priority", "Dedicated"]),
    features: z.array(z.string()).min(1, "Select at least one feature"),
    recommended: z.boolean(),
    active: z.boolean(),
  })
  .refine(
    (v) => {
      const m = Number(v.monthlyPrice);
      const y = Number(v.yearlyPrice);
      return !(Number.isFinite(m) && Number.isFinite(y)) || y <= m * 12;
    },
    { message: "Yearly price can't exceed 12 months of the monthly price", path: ["yearlyPrice"] }
  );

export type PlanValues = z.infer<typeof planSchema>;

export const changePlanSchema = z.object({
  plan: z.string().min(1, "Select a plan"),
});
export type ChangePlanValues = z.infer<typeof changePlanSchema>;