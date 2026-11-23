import type { Tone } from "@/usersDashboard/super-admin/shared/utils/tones";

export interface Risk {
  risk: "Low" | "Medium" | "High";
  status: "Healthy" | "Needs Attention" | "Critical";
  tone: Tone;
}

export function riskOf(score: number): Risk {
  if (score >= 80) return { risk: "Low", status: "Healthy", tone: "green" };
  if (score >= 50) return { risk: "Medium", status: "Needs Attention", tone: "amber" };
  return { risk: "High", status: "Critical", tone: "red" };
}