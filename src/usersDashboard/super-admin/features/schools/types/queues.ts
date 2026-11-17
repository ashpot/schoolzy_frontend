export type QueueDecision = "approve" | "reject";

export interface DecisionVars {
  id: string;
  reason?: string;
}