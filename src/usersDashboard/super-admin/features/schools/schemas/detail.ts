import { z } from "zod";

// The new renewal date must be later than the current one.
export const makeRenewSchema = (currentRenewal: string) =>
  z.object({
    renewalDate: z
      .string()
      .min(1, "Pick a new renewal date")
      .refine((v) => v > currentRenewal, "Must be after the current renewal date"),
  });

export type RenewValues = z.infer<ReturnType<typeof makeRenewSchema>>;