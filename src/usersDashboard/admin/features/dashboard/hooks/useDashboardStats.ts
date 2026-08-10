import { useQuery } from "@tanstack/react-query";
import { DollarSign, GraduationCap, Users, Heart, CheckCircle, Clock, AlertCircle, UserPlus } from "lucide-react";
import { apiRequest } from "@/shared/lib/apiClient";
import { DASHBOARD_ENDPOINTS } from "../api";
import type { AdminDashboardResponse } from "../types";

const DASHBOARD_QUERY_KEY = ["dashboard", "admin"];

const useAdminDashboard = () =>
  useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: () => apiRequest<AdminDashboardResponse>(DASHBOARD_ENDPOINTS.ADMIN),
  });

const formatNaira = (value: number) => `₦${value.toLocaleString()}`;

export const usePrimaryStats = () => {
  const query = useAdminDashboard();
  const data = query.data
    ? [
        { id: "earnings", label: "Monthly Earnings", value: formatNaira(query.data.cards.term_earning.value), change: `${query.data.cards.term_earning.subtext}% from last month`, positive: query.data.cards.term_earning.subtext >= 0, bg: "brand-primary", Icon: DollarSign },
        { id: "students", label: "Total Students", value: query.data.cards.students.value.toLocaleString(), change: `${query.data.cards.students.subtext}% from last month`, positive: query.data.cards.students.subtext >= 0, bg: "success", Icon: GraduationCap },
        { id: "teachers", label: "Total Teachers", value: query.data.cards.teachers.value.toLocaleString(), change: `${query.data.cards.teachers.subtext} new this month`, positive: query.data.cards.teachers.subtext >= 0, bg: "warning", Icon: Users },
        { id: "parents", label: "Total Parents", value: query.data.cards.parents.value.toLocaleString(), change: `${query.data.cards.parents.subtext}% from last month`, positive: query.data.cards.parents.subtext >= 0, bg: "danger", Icon: Heart },
      ]
    : undefined;
  return { ...query, data };
};

export const useSecondaryStats = () => {
  const query = useAdminDashboard();
  const data = query.data
    ? [
        { id: "payments", label: "Payments Today", value: formatNaira(query.data.cards.today_income), iconBg: "bg-success/10", iconColor: "text-success", Icon: CheckCircle },
        { id: "pending", label: "Pending Fees", value: String(query.data.cards.pending_fee_payments), iconBg: "bg-warning/10", iconColor: "text-warning", Icon: Clock },
        { id: "late", label: "Late Attendance", value: String(query.data.cards.absence_today), iconBg: "bg-danger/10", iconColor: "text-danger", Icon: AlertCircle },
        { id: "enrollments", label: "New Enrollments", value: String(query.data.cards.new_enrolment), iconBg: "bg-brand-primary/10", iconColor: "text-brand-primary", Icon: UserPlus },
      ]
    : undefined;
  return { ...query, data };
};

export const useMonthlyIncome = () => {
  const query = useAdminDashboard();
  const data = query.data
    ? query.data.charts.income_expense.labels.map((month, i) => ({
        month,
        income: query.data!.charts.income_expense.income[i],
        expenses: query.data!.charts.income_expense.expense[i],
      }))
    : undefined;
  return { ...query, data };
};

export const useAttendance = () => {
  const query = useAdminDashboard();
  const data = query.data
    ? query.data.charts.attendance.map((a) => ({ day: a.date, present: a.present, absent: a.absent }))
    : undefined;
  return { ...query, data };
};

// --- Live, but backend hasn't defined item shapes yet — these will just be empty arrays ---

export const useRecentStudents = (page = 1, perPage = 6) => {
  const query = useAdminDashboard();
  return {
    ...query,
    data: query.data
      ? {
          data: query.data.recent_students.slice((page - 1) * perPage, page * perPage),
          total: query.data.recent_students.length,
          page,
          perPage,
        }
      : undefined,
  };
};

export const useInventory = () => {
  const query = useAdminDashboard();
  return { ...query, data: query.data?.inventory };
};

export const useRecentSales = () => {
  const query = useAdminDashboard();
  return { ...query, data: query.data?.recent_sales };
};