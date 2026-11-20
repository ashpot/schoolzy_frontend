import { isoFromOffset } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import type { RevenueData, RevenuePeriod, RevenuePoint } from "../types/revenue";
import { mockDelay } from "./mockAnalytics";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const M = [7.9, 8.2, 8.6, 8.9, 9.1, 9.4, 9.6, 9.8, 10, 10.1, 10.3, 10.4].map((v) => v * 1_000_000);
const FACTOR: Record<RevenuePeriod, number> = { monthly: 1, quarterly: 3, yearly: 12 };

function series(period: RevenuePeriod): RevenuePoint[] {
  if (period === "monthly") {
    return M.map((v, i) => ({ label: MONTHS[i], current: v, previous: Math.round(v * 0.93) }));
  }
  if (period === "quarterly") {
    return [0, 1, 2, 3].map((q) => {
      const sum = M.slice(q * 3, q * 3 + 3).reduce((a, b) => a + b, 0);
      return { label: `Q${q + 1}`, current: sum, previous: Math.round(sum * 0.9) };
    });
  }
  const year = new Date().getFullYear();
  const values = [48, 64, 81, 98, 124.8].map((v) => v * 1_000_000);
  return values.map((v, i) => ({ label: String(year - 4 + i), current: v, previous: i === 0 ? Math.round(v * 0.8) : values[i - 1] }));
}

const up = (text: string) => ({ text, good: true });
const down = (text: string) => ({ text, good: false });

// TODO: Delete once the real endpoint is wired.
export async function mockFetchRevenue(period: RevenuePeriod): Promise<RevenueData> {
  await mockDelay(700);
  const k = FACTOR[period];
  return {
    metrics: [
      { key: "mrr", value: 10_400_000, delta: up("+7.2% vs last mo.") },
      { key: "arr", value: 124_800_000, delta: up("+14.6% YoY") },
      { key: "avg", value: 42_100, delta: up("+3.8% vs last mo.") },
      { key: "ltv", value: 318_000, delta: up("+5.1% YoY") },
    ],
    trend: series(period),
    byPlan: [
      { name: "Basic", value: 847_000 * k },
      { name: "Standard", value: 1_920_000 * k },
      { name: "Premium", value: 2_432_000 * k },
      { name: "Enterprise", value: 975_000 * k },
    ],
    byMethod: [
      { method: "Paystack", pct: 48 },
      { method: "Flutterwave", pct: 27 },
      { method: "Bank Transfer", pct: 14 },
      { method: "Manual", pct: 11 },
    ],
    rates: [
      { key: "renewal", value: "87.4%", tone: "green", delta: up("+2.1") },
      { key: "success", value: "94.2%", tone: "blue", delta: up("+0.8") },
      { key: "outstanding", value: "₦2.18M", tone: "red", delta: down("+₦210K") },
      { key: "refund", value: "1.8%", tone: "amber", delta: up("-0.3") },
    ],
    topSchools: [
      { id: "1", name: "Meadow Springs School", location: "Rivers", plan: "Enterprise", amountPaid: 963_000, renewalDate: isoFromOffset(300), lifetime: 3_200_000 },
      { id: "2", name: "Royal Palm Academy", location: "Imo", plan: "Enterprise", amountPaid: 963_000, renewalDate: isoFromOffset(305), lifetime: 2_800_000 },
      { id: "3", name: "Greenfield Academy", location: "Lagos", plan: "Premium", amountPaid: 456_000, renewalDate: isoFromOffset(330), lifetime: 1_900_000 },
      { id: "4", name: "Valley View College", location: "Enugu", plan: "Standard", amountPaid: 173_340, renewalDate: isoFromOffset(310), lifetime: 980_000 },
      { id: "5", name: "Heritage High School", location: "Abuja", plan: "Standard", amountPaid: 162_000, renewalDate: isoFromOffset(360), lifetime: 840_000 },
    ],
    insights: [
      "Premium plan generates 38% of total MRR despite having only 26% of subscribers.",
      "Annual billing adoption increased to 34% — reducing monthly churn risk.",
      "3 Enterprise schools account for ₦2.9M ARR — high retention priority.",
      "Paystack is the dominant payment gateway at 48% of all successful transactions.",
    ],
  };
}