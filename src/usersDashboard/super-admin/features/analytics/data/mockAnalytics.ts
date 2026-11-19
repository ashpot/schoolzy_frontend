import type { Period, AnalyticsData } from "../types";

export const mockDelay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Only the usage numbers scale with the period here. The real endpoint filters everything.
const FACTOR: Record<Period, number> = { today: 0.03, "7d": 0.25, "30d": 1, "90d": 2.6, year: 9 };

const up = (text: string) => ({ text, good: true });

// TODO: Delete once the real endpoint is wired.
export async function mockFetchAnalytics(period: Period): Promise<AnalyticsData> {
  await mockDelay(700);
  const k = FACTOR[period];
  const s = (n: number) => Math.round(n * k);
  const dau = [2900, 3050, 3000, 3200, 3300, 3250, 3400, 3450, 3420, 3500, 3480, 3621];
  const logins = [940, 1100, 1050, 1300, 1450, 1300, 1700, 1900, 1750, 2100, 1950, 2300];

  return {
    metrics: [
      { key: "schools", value: 247, delta: up("+12 this month") },
      { key: "users", value: 48312, delta: up("+1,842 this month") },
      { key: "dau", value: 3621, delta: up("+8.4% vs last week") },
      { key: "mau", value: 31480, delta: up("+6.2% vs last mo.") },
      { key: "uptime", value: "99.98%", delta: up("+0.01% vs last mo.") },
      { key: "session", value: "18m 42s", delta: up("+2m vs last month") },
    ],
    dailyActive: MONTHS.map((label, i) => ({ label, value: dau[i] })),
    logins: MONTHS.map((label, i) => ({ label, value: logins[i] })),
    roles: [
      { label: "Students", value: 38166 },
      { label: "Parents", value: 5314 },
      { label: "Teachers", value: 3865 },
      { label: "School Admins", value: 967 },
    ],
    usage: {
      lessonNotes: s(28412),
      results: s(14820),
      attendance: s(91340),
      onlineTests: s(6218),
      feesPaid: s(42_800_000),
      inventorySales: s(3914),
    },
    topSchools: [
      { id: "1", name: "Greenfield Academy", location: "Lagos", score: 98, activeUsers: 1840, attendanceRate: 97, results: 342 },
      { id: "2", name: "Heritage High School", location: "Abuja", score: 95, activeUsers: 1620, attendanceRate: 95, results: 298 },
      { id: "3", name: "Meadow Springs School", location: "Rivers", score: 93, activeUsers: 1510, attendanceRate: 94, results: 276 },
      { id: "4", name: "Valley View College", location: "Enugu", score: 91, activeUsers: 1380, attendanceRate: 92, results: 254 },
      { id: "5", name: "Royal Palm Academy", location: "Imo", score: 89, activeUsers: 1240, attendanceRate: 91, results: 231 },
      { id: "6", name: "Bright Minds School", location: "Delta", score: 87, activeUsers: 1190, attendanceRate: 89, results: 218 },
      { id: "7", name: "Crown Heights Academy", location: "Ogun", score: 85, activeUsers: 1050, attendanceRate: 88, results: 197 },
    ],
    health: [
      { key: "api", value: "124ms", progress: 92, warn: false },
      { key: "db", value: "Healthy", progress: 100, warn: false },
      { key: "load", value: "42%", progress: 42, warn: false },
      { key: "storage", value: "68%", progress: 68, warn: true },
      { key: "email", value: "98.4%", progress: 98.4, warn: false },
      { key: "sms", value: "96.1%", progress: 96.1, warn: false },
    ],
    insights: [
      "Platform activity increased by 18% compared to last month.",
      "12 schools have subscriptions expiring within the next 14 days.",
      "Attendance submissions increased by 9% — highest in 6 months.",
      "3 schools have shown low activity for over 30 days and may need follow-up.",
      "Daily active users peaked on Tuesdays and Wednesdays this period.",
      "Storage usage crossed 65% — consider reviewing media upload policies.",
    ],
  };
}