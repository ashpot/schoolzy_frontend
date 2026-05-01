import { DollarSign, GraduationCap, Users, Heart, CheckCircle, Clock, AlertCircle, UserPlus } from "lucide-react";

export const primaryStatsData = [
  {
    id: "earnings",
    label: "Monthly Earnings",
    value: "₦1,248,500",
    change: "+8.2% from last month",
    positive: true,
    bg: "brand-primary",
    Icon: DollarSign,
  },
  {
    id: "students",
    label: "Total Students",
    value: "3,847",
    change: "+12% from last month",
    positive: true,
    bg: "success",
    Icon: GraduationCap,
  },
  {
    id: "teachers",
    label: "Total Teachers",
    value: "142",
    change: "+3 new this month",
    positive: true,
    bg: "warning",
    Icon: Users,
  },
  {
    id: "parents",
    label: "Total Parents",
    value: "2,631",
    change: "-2.1% from last month",
    positive: false,
    bg: "danger",
    Icon: Heart,
  },
];

export const secondaryStatsData = [
  {
    id: "payments",
    label: "Payments Today",
    value: "₦184,500",
    iconBg: "bg-success/10",
    iconColor: "text-success",
    Icon: CheckCircle,
  },
  {
    id: "pending",
    label: "Pending Fees",
    value: "437",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    Icon: Clock,
  },
  {
    id: "late",
    label: "Late Attendance",
    value: "28",
    iconBg: "bg-danger/10",
    iconColor: "text-danger",
    Icon: AlertCircle,
  },
  {
    id: "enrollments",
    label: "New Enrollments",
    value: "14",
    iconBg: "bg-brand-primary/10",
    iconColor: "text-brand-primary",
    Icon: UserPlus,
  },
];

export const monthlyIncomeData = [
  { month: "Sep", income: 820000, expenses: 340000 },
  { month: "Oct", income: 950000, expenses: 410000 },
  { month: "Nov", income: 880000, expenses: 390000 },
  { month: "Dec", income: 1100000, expenses: 450000 },
  { month: "Jan", income: 184500, expenses: 120000 },
  { month: "Feb", income: 1200000, expenses: 480000 },
  { month: "Mar", income: 1248500, expenses: 510000 },
];

export const attendanceData = [
  { day: "Mon", present: 3500, absent: 347 },
  { day: "Tue", present: 3412, absent: 435 },
  { day: "Wed", present: 3390, absent: 457 },
  { day: "Thu", present: 3450, absent: 397 },
  { day: "Fri", present: 3300, absent: 547 },
];

export const recentStudentsData = [
  { id: "1", name: "Emma Johnson",  admNo: "SCH/2025/001", classLabel: "JSS 3A", status: "Active",    fees: "Paid",    gpa: 4.4, avatar: "" },
  { id: "2", name: "Lilian Smith",  admNo: "SCH/2025/002", classLabel: "JSS 2B", status: "Active",    fees: "Partial", gpa: 3.8, avatar: "" },
  { id: "3", name: "Olivia John",   admNo: "SCH/2025/003", classLabel: "PRI 5A", status: "Active",    fees: "Paid",    gpa: 4.2, avatar: "" },
  { id: "4", name: "David Ade",     admNo: "SCH/2025/004", classLabel: "SSS 2C", status: "Suspended", fees: "Unpaid",  gpa: 3.7, avatar: "" },
  { id: "5", name: "Ada Okeke",     admNo: "SCH/2025/005", classLabel: "JSS 1A", status: "Active",    fees: "Paid",    gpa: 4.8, avatar: "" },
  { id: "6", name: "Yusuf Hamza",   admNo: "SCH/2025/006", classLabel: "JSS 3B", status: "Active",    fees: "Partial", gpa: 4.5, avatar: "" },
];

export const inventoryData = [
  { id: "1", name: "School Uniforms",  sold: 342, total: 500, color: "bg-brand-primary" },
  { id: "2", name: "Textbooks (JSS)",  sold: 218, total: 300, color: "bg-success" },
  { id: "3", name: "Exercise Books",   sold: 480, total: 600, color: "bg-warning" },
  { id: "4", name: "School Bags",      sold: 95,  total: 200, color: "bg-danger" },
  { id: "5", name: "Stationery Sets",  sold: 156, total: 250, color: "bg-purple-500" },
];

export const recentSalesData = [
  { id: "1", name: "School Uniform (M)",    detail: "Qty: 12 · 2h ago",  amount: "₦72,000" },
  { id: "2", name: "Textbook Bundle JSS1",  detail: "Qty: 5 · 5h ago",   amount: "₦37,500" },
  { id: "3", name: "Exercise Books (×10)",  detail: "Qty: 30 · 1d ago",  amount: "₦15,000" },
  { id: "4", name: "School Bag (Blue)",     detail: "Qty: 8 · 2d ago",   amount: "₦64,000" },
];