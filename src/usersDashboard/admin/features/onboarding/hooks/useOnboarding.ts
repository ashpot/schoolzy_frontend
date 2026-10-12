import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import type { OnboardingHealth } from "../types";

// TODO: swap for your shared API base constant if you have one
const API_BASE = "https://api.schoolzy.com.ng/api/v1";
export const ONBOARDING_ENDPOINT = `${API_BASE}/configurations/health/`;

export const fetchOnboardingHealth = () =>
  apiRequest<OnboardingHealth>(ONBOARDING_ENDPOINT);

export const useOnboarding = () =>
  useQuery({
    queryKey: ["onboarding-health"],
    queryFn: fetchOnboardingHealth,
    refetchOnWindowFocus: true, // progress updates when they come back from a task
    refetchOnMount: "always",
  });