import type { GrowthData, GrowthPeriod } from "../types/growth";
import { mockDelay } from "./mockAnalytics";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const JOINED: Record<GrowthPeriod, { labels: string[]; values: number[] }> = {
  month: { labels: ["W1", "W2", "W3", "W4"], values: [8, 12, 9, 13] },
  quarter: { labels: ["May", "Jun", "Jul"], values: [10, 14, 18] },
  year: { labels: MONTHS, values: [14, 18, 12, 20, 27, 16, 31, 24, 19, 38, 42, 35] },
};
const NEW_SCHOOLS: Record<GrowthPeriod, number> = { month: 12, quarter: 28, year: 42 };

const up = (text: string) => ({ text, good: true });

// TODO: Delete once the real endpoint is wired.
export async function mockFetchGrowth(period: GrowthPeriod): Promise<GrowthData> {
  await mockDelay(700);
  const j = JOINED[period];
  return {
    metrics: [
      { key: "new", value: NEW_SCHOOLS[period], delta: up("+8 vs last period") },
      { key: "total", value: 247, delta: up("+12 this month") },
      { key: "trial", value: 18, delta: up("+3 this month") },
      { key: "converted", value: 29, delta: up("69% trial→paid") },
    ],
    joined: j.labels.map((label, i) => ({ label, value: j.values[i] })),
    funnel: [
      { label: "Applications", value: 412 },
      { label: "Approved Schools", value: 318 },
      { label: "Trial Started", value: 247 },
      { label: "Subscribed", value: 198 },
      { label: "Active Schools", value: 158 },
    ],
    regions: [
      { code: "LAG", state: "Lagos", count: 62, x: 14, y: 74 },
      { code: "ABU", state: "Abuja", count: 38, x: 50, y: 58 },
      { code: "OGU", state: "Ogun", count: 30, x: 24, y: 66 },
      { code: "KAN", state: "Kano", count: 27, x: 60, y: 20 },
      { code: "RIV", state: "Rivers", count: 22, x: 36, y: 86 },
      { code: "KAD", state: "Kaduna", count: 14, x: 54, y: 36 },
      { code: "ENU", state: "Enugu", count: 12, x: 60, y: 76 },
      { code: "OYO", state: "Oyo", count: 11, x: 18, y: 56 },
      { code: "EDO", state: "Edo", count: 10, x: 42, y: 74 },
      { code: "PLA", state: "Plateau", count: 9, x: 68, y: 46 },
      { code: "OSU", state: "Osun", count: 9, x: 30, y: 62 },
      { code: "KWA", state: "Kwara", count: 8, x: 36, y: 50 },
      { code: "DEL", state: "Delta", count: 8, x: 42, y: 88 },
      { code: "SOK", state: "Sokoto", count: 5, x: 34, y: 10 },
      { code: "BOR", state: "Borno", count: 4, x: 90, y: 22 },
    ],
    fastest: [
      { id: "1", name: "Sunrise International", location: "Kano", students: 142, teachers: 18, growth: 34 },
      { id: "2", name: "New Horizon Academy", location: "Osun", students: 118, teachers: 14, growth: 28 },
      { id: "3", name: "Faith Academy", location: "Kogi", students: 96, teachers: 11, growth: 22 },
      { id: "4", name: "Oakwood Secondary", location: "Kaduna", students: 84, teachers: 10, growth: 19 },
      { id: "5", name: "Greenfield Academy", location: "Lagos", students: 72, teachers: 8, growth: 14 },
    ],
    health: [
      { id: "1", name: "Greenfield Academy", location: "Lagos", score: 98, plan: "Premium" },
      { id: "2", name: "Heritage High School", location: "Abuja", score: 94, plan: "Standard" },
      { id: "3", name: "Meadow Springs", location: "Rivers", score: 88, plan: "Enterprise" },
      { id: "4", name: "Crown Heights Acad.", location: "Ogun", score: 61, plan: "Premium" },
      { id: "5", name: "Sunrise International", location: "Kano", score: 55, plan: "Basic" },
      { id: "6", name: "Oakwood Secondary", location: "Kaduna", score: 32, plan: "Standard" },
    ],
    insights: [
      "School acquisition grew 28% quarter-over-quarter driven by referral growth.",
      "Trial-to-paid conversion rate improved to 69% — up from 61% last quarter.",
      "Lagos and Abuja account for 54% of all schools on the platform.",
      "6 schools show critical health scores and require immediate account management attention.",
    ],
  };
}