import type { DashboardData } from "../types";

export const mockDashboard: DashboardData = {
  stats: [
    { id: "totalSchools", label: "Total Schools", value: "247", delta: "+12 this month", tone: "blue" },
    { id: "activeSchools", label: "Active Schools", value: "231", delta: "+3 today", tone: "green" },
    { id: "totalStudents", label: "Total Students", value: "184,320", delta: "+2,450 this week", tone: "purple" },
    { id: "monthlyRevenue", label: "Monthly Revenue", value: "₦12.4M", delta: "+8.2% vs last month", tone: "amber" },
  ],
  revenue: [
    { label: "Jan", value: 7.9 }, { label: "Feb", value: 8.7 }, { label: "Mar", value: 7.8 },
    { label: "Apr", value: 9.9 }, { label: "May", value: 10.5 }, { label: "Jun", value: 12.1 },
    { label: "Jul", value: 13.1 },
  ],
  growth: [
    { label: "Jan", value: 172 }, { label: "Feb", value: 182 }, { label: "Mar", value: 195 },
    { label: "Apr", value: 208 }, { label: "May", value: 222 }, { label: "Jun", value: 235 },
    { label: "Jul", value: 247 },
  ],
  schools: [
    { id: "1", name: "Greenfield Academy", location: "Lagos", plan: "Premium", status: "Active", students: 1240 },
    { id: "2", name: "Sunlight International", location: "Abuja", plan: "Standard", status: "Active", students: 890 },
    { id: "3", name: "Heritage High School", location: "Port Harcourt", plan: "Premium", status: "Trial", students: 450 },
    { id: "4", name: "Rosebud College", location: "Kano", plan: "Basic", status: "Active", students: 320 },
    { id: "5", name: "Sunrise Academy", location: "Ibadan", plan: "Standard", status: "Suspended", students: 680 },
  ],
  payments: [
    { id: "1", school: "Greenfield Academy", amount: 450000, plan: "Premium Annual", date: "2026-07-12", status: "Paid" },
    { id: "2", school: "Sunlight International", amount: 180000, plan: "Standard Annual", date: "2026-07-11", status: "Paid" },
    { id: "3", school: "Heritage High", amount: 85000, plan: "Basic Monthly", date: "2026-07-09", status: "Pending" },
    { id: "4", school: "Westgate College", amount: 450000, plan: "Premium Annual", date: "2026-07-07", status: "Paid" },
    { id: "5", school: "Bright Minds School", amount: 180000, plan: "Standard Annual", date: "2026-07-06", status: "Failed" },
  ],
  activity: [
    { id: "1", type: "school", title: "New school registered", detail: "Greenfield Academy · Lagos", time: "2 min ago" },
    { id: "2", type: "payment", title: "Payment received", detail: "₦450,000 · Sunlight International", time: "15 min ago" },
    { id: "3", type: "user", title: "User role updated", detail: "Admin role assigned · Heritage High", time: "1 hr ago" },
    { id: "4", type: "subscription", title: "Subscription upgraded", detail: "Basic → Premium · Rosebud College", time: "3 hrs ago" },
    { id: "5", type: "support", title: "Support ticket opened", detail: "#TKT-2847 · Sunrise Academy", time: "5 hrs ago" },
  ],
  renewals: [
    { id: "1", school: "Pioneer Academy", plan: "Premium", amount: 450000, daysLeft: 3 },
    { id: "2", school: "Crown Heights School", plan: "Standard", amount: 180000, daysLeft: 7 },
    { id: "3", school: "Excel International", plan: "Premium", amount: 450000, daysLeft: 14 },
    { id: "4", school: "Bright Future Academy", plan: "Basic", amount: 85000, daysLeft: 21 },
  ],
  health: [
    { id: "uptime", label: "API Uptime", value: "99.98%", progress: 99.98, tone: "green" },
    { id: "response", label: "Response Time", value: "124ms", progress: 85, tone: "green" },
    { id: "storage", label: "Storage Usage", value: "68%", progress: 68, tone: "amber" },
    { id: "sessions", label: "Active Sessions", value: "1,247", progress: 40, tone: "blue" },
  ],
};