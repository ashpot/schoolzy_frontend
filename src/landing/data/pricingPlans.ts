export interface PlanFeature {
  label: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  note: string | null;
  popular: boolean;
  dark: boolean;
  path: string;
  cta: string;
  features: PlanFeature[];
}

const PATH = "/auth/signup"

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "₦0",
    period: "/forever",
    note: null,
    popular: false,
    dark: false,
    path: PATH,
    cta: "Start for Free",
    features: [
      { label: "Up to 100 students", included: true },
      { label: "Student management", included: true },
      { label: "Staff management (max. of 5)", included: true },
      { label: "Results and grading", included: true },
    ],
  },
  {
    name: "Basic",
    price: "₦25,000",
    period: "/month",
    note: "Up to 200 students.",
    popular: false,
    dark: false,
    path: PATH,
    cta: "Get Started",
    features: [
      { label: "Student & staff management", included: true },
      { label: "Attendance tracking", included: true },
      { label: "Results & grading", included: true },
      { label: "Fee payment tracking", included: true },
      { label: "CBT module", included: false },
      { label: "Parent portal", included: false },
    ],
  },
  {
    name: "Standard",
    price: "₦55,000",
    period: "/month",
    note: null,
    popular: true,
    dark: true,
    path: PATH,
    cta: "Get Started",
    features: [
      { label: "All Basic features", included: true },
      { label: "Up to 500 students", included: true },
      { label: "CBT module (unlimited tests)", included: true },
      { label: "Parent portal access", included: true },
      { label: "Expense & finance tracking", included: true },
      { label: "SMS & email notifications", included: true },
      { label: "Priority support", included: true },
    ],
  },
  {
    name: "Premium",
    price: "₦95,000",
    period: "/month",
    note: null,
    popular: false,
    dark: false,
    path: PATH,
    cta: "Get Started",
    features: [
      { label: "All Standard features", included: true },
      { label: "Unlimited students", included: true },
      { label: "Multi-branch management", included: true },
      { label: "Custom domain", included: true },
      { label: "API access & integrations", included: true },
      { label: "Dedicated account manager", included: true },
      { label: "24/7 phone support", included: true },
    ],
  },
];