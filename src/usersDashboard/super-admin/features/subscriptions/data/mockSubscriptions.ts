import type { BillingCycle, Plan, SubStatus, Subscription, SubscriptionDetail } from "../types";
import { periodMonths } from "../utils/derive";
import { addMonthsIso, isoFromOffset } from "../utils/format";

export const mockDelay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// TODO: Delete once the real endpoints are wired.
const BASE_FEATURES = ["Attendance", "Results", "Finance", "Parent Portal", "Student Portal", "Teacher Portal", "Email Notifications"];

const PLAN_SEED: Plan[] = [
  { id: "plan-basic", name: "Basic", description: "Perfect for small schools getting started with digital management.", monthlyPrice: 25000, yearlyPrice: 240000, maxStudents: 300, maxTeachers: 20, storageGb: 5, support: "Basic", features: BASE_FEATURES, recommended: false, active: true, schools: 42 },
  { id: "plan-standard", name: "Standard", description: "Ideal for secondary schools with growing academic and administrative needs.", monthlyPrice: 55000, yearlyPrice: 528000, maxStudents: 800, maxTeachers: 50, storageGb: 20, support: "Priority", features: [...BASE_FEATURES, "Online Tests", "SMS Notifications"], recommended: true, active: true, schools: 128 },
  { id: "plan-premium", name: "Premium", description: "Full-featured solution for large schools and high-volume institutions.", monthlyPrice: 95000, yearlyPrice: 912000, maxStudents: 2000, maxTeachers: 200, storageGb: 100, support: "Dedicated", features: [...BASE_FEATURES, "Inventory", "Online Tests", "API Access", "Custom Branding", "SMS Notifications"], recommended: false, active: true, schools: 64 },
  { id: "plan-starter", name: "Starter Trial", description: "Short evaluation plan for schools exploring the platform.", monthlyPrice: 10000, yearlyPrice: 96000, maxStudents: 100, maxTeachers: 10, storageGb: 2, support: "Basic", features: ["Attendance", "Results"], recommended: false, active: false, schools: 0 },
];

interface Seed {
  school: string;
  location: string;
  plan: string;
  billing: BillingCycle;
  expiresIn: number; // days from today (negative = past)
  autoRenew: boolean;
  status: SubStatus;
}

const SUB_SEEDS: Seed[] = [
  { school: "Greenfield Academy", location: "Lagos", plan: "Premium", billing: "Annual", expiresIn: 90, autoRenew: true, status: "Active" },
  { school: "Sunlight International", location: "FCT", plan: "Standard", billing: "Annual", expiresIn: 300, autoRenew: true, status: "Active" },
  { school: "Heritage High School", location: "Rivers", plan: "Premium", billing: "Annual", expiresIn: -45, autoRenew: false, status: "Expired" },
  { school: "Rosebud College", location: "Kano", plan: "Basic", billing: "Monthly", expiresIn: 20, autoRenew: true, status: "Trial" },
  { school: "Pioneer Academy", location: "Enugu", plan: "Standard", billing: "Annual", expiresIn: -58, autoRenew: true, status: "Expired" },
  { school: "Crown Heights School", location: "Edo", plan: "Standard", billing: "Monthly", expiresIn: 0, autoRenew: false, status: "Active" },
  { school: "Westgate College", location: "Kaduna", plan: "Basic", billing: "Monthly", expiresIn: 3, autoRenew: true, status: "Active" },
  { school: "Bright Minds School", location: "Plateau", plan: "Basic", billing: "Monthly", expiresIn: -1, autoRenew: false, status: "Expired" },
  { school: "Valley Heights School", location: "Borno", plan: "Standard", billing: "Monthly", expiresIn: 7, autoRenew: true, status: "Active" },
  { school: "Westfield Grammar", location: "Ogun", plan: "Premium", billing: "Annual", expiresIn: 200, autoRenew: true, status: "Active" },
];

function buildSubscriptions(): Subscription[] {
  return SUB_SEEDS.map((s, i): Subscription => {
    const plan = PLAN_SEED.find((p) => p.name === s.plan);
    const expires = isoFromOffset(s.expiresIn);
    return {
      id: `sub-${i + 1}`,
      school: s.school,
      location: s.location,
      plan: s.plan,
      billing: s.billing,
      started: addMonthsIso(expires, -periodMonths(s.billing)),
      expires,
      amount: plan ? (s.billing === "Annual" ? plan.yearlyPrice : plan.monthlyPrice) : 0,
      autoRenew: s.autoRenew,
      status: s.status,
      invoiceGeneratedAt: null,
    };
  });
}

export async function mockFetchPlans(): Promise<Plan[]> {
  await mockDelay(600);
  return PLAN_SEED.map((p) => ({ ...p, features: [...p.features] }));
}

export async function mockFetchSubscriptions(): Promise<Subscription[]> {
  await mockDelay(700);
  return buildSubscriptions();
}

const hash = (s: string) => Array.from(s).reduce((a, c) => a + c.charCodeAt(0), 0);

export async function mockFetchDetail(sub: Subscription): Promise<SubscriptionDetail> {
  await mockDelay(500);
  const plan = PLAN_SEED.find((p) => p.name === sub.plan);
  const h = hash(sub.id + sub.school);
  const ratio = (n: number) => (15 + ((h * n) % 55)) / 100;
  const limits = { students: plan?.maxStudents ?? 300, teachers: plan?.maxTeachers ?? 20, storage: plan?.storageGb ?? 5 };
  const months = periodMonths(sub.billing);

  return {
    usage: {
      students: { used: Math.round(limits.students * ratio(3)), limit: limits.students },
      teachers: { used: Math.round(limits.teachers * ratio(5)), limit: limits.teachers },
      storage: { used: Math.round(limits.storage * ratio(7)), limit: limits.storage },
    },
    payments: [0, 1, 2].map((k) => ({
      id: `${sub.id}-pay-${k}`,
      date: addMonthsIso(sub.started, -months * k),
      amount: sub.amount,
      label: `${sub.billing} · ${sub.plan}`,
      status: "Paid" as const,
    })),
  };
}