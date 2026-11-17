import { z } from "zod";

// Rejecting needs a reason; approving doesn't.
export const makeDecisionSchema = (requireReason: boolean) =>
  z.object({
    reason: requireReason
      ? z.string().trim().min(5, "Give a short reason (at least 5 characters)").max(300, "Keep it under 300 characters")
      : z.string().trim().max(300, "Keep it under 300 characters"),
  });

export type DecisionValues = { reason: string };