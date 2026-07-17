import { useQuery } from "@tanstack/react-query";
import {
  primaryStatsData,
  secondaryStatsData,
  monthlyIncomeData,
  attendanceData,
  recentStudentsData,
  inventoryData,
  recentSalesData,
} from "../data/mockData";

// TODO: replace each queryFn body with real API call e.g. api.get('/dashboard/primary-stats')

export const usePrimaryStats = () =>
  useQuery({
    queryKey: ["dashboard", "primary-stats"],
    queryFn: async () => primaryStatsData,
  });

export const useSecondaryStats = () =>
  useQuery({
    queryKey: ["dashboard", "secondary-stats"],
    queryFn: async () => secondaryStatsData,
  });

export const useMonthlyIncome = () =>
  useQuery({
    queryKey: ["dashboard", "monthly-income"],
    queryFn: async () => monthlyIncomeData,
  });

export const useAttendance = () =>
  useQuery({
    queryKey: ["dashboard", "attendance"],
    queryFn: async () => attendanceData,
  });

export const useRecentStudents = (page = 1, perPage = 6) =>
  useQuery({
    queryKey: ["dashboard", "recent-students", page],
    queryFn: async () => ({
      data: recentStudentsData.slice((page - 1) * perPage, page * perPage),
      total: recentStudentsData.length,
      page,
      perPage,
    }),
  });

export const useInventory = () =>
  useQuery({
    queryKey: ["dashboard", "inventory"],
    queryFn: async () => inventoryData,
  });

export const useRecentSales = () =>
  useQuery({
    queryKey: ["dashboard", "recent-sales"],
    queryFn: async () => recentSalesData,
  });