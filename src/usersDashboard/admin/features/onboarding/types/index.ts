export interface OnboardingAction {
  type: string;
  label: string;
  route: string;
}

export interface OnboardingItem {
  title: string;
  completed: boolean;
  action: OnboardingAction;
  icon: string;
  priority: number;
}

export interface OnboardingStep {
  slug: string;
  title: string;
  description: string;
  route: string;
  icon: string;
  completed: boolean;
  items: Record<string, OnboardingItem>;
}

export interface OnboardingRecommendation {
  step: string;
  title: string;
  priority: number;
  action: OnboardingAction;
}

export interface OnboardingHealth {
  health_score: number;
  status: string;
  recommendations: OnboardingRecommendation[];
  onboarding: {
    completed: boolean;
    current_step: string;
    next_action: OnboardingAction | null;
    progress: {
      completed_items: number;
      total_items: number;
      percentage: number;
    };
    steps: OnboardingStep[];
  };
}