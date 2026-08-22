"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { apiClient } from "@/lib/api/client";
import {
  AnalyticsSummary,
  CategoryBreakdown,
  MonthlyTrend,
  Expense,
  Group,
} from "@/types/api";

export function useDashboard() {
  const { isSignedIn, isLoaded } = useAuth();
  const isEnabled = isLoaded && !!isSignedIn;

  // 1. Monthly Summary (Current vs Last Month)
  const summaryQuery = useQuery({
    queryKey: ["analytics", "monthly"],
    queryFn: async () => {
      const res = await apiClient.get<{ data: AnalyticsSummary }>("/analytics/monthly");
      return res.data.data;
    },
    enabled: isEnabled,
  });

  // 2. Category Breakdown
  const breakdownQuery = useQuery({
    queryKey: ["analytics", "categories"],
    queryFn: async () => {
      const res = await apiClient.get<{ data: CategoryBreakdown[] }>("/analytics/categories");
      return res.data.data ?? [];
    },
    enabled: isEnabled,
  });

  // 3. Trends (Last 6 Months)
  const trendsQuery = useQuery({
    queryKey: ["analytics", "trends"],
    queryFn: async () => {
      const res = await apiClient.get<{ data: MonthlyTrend[] }>("/analytics/trends");
      return res.data.data ?? [];
    },
    enabled: isEnabled,
  });

  // 4. Insights
  const insightsQuery = useQuery({
    queryKey: ["analytics", "insights"],
    queryFn: async () => {
      const res = await apiClient.get<{ data: string[] }>("/analytics/insights");
      return res.data.data ?? [];
    },
    enabled: isEnabled,
  });

  // 5. Recent Expenses (limit 5)
  const recentExpensesQuery = useQuery({
    queryKey: ["expenses", "recent"],
    queryFn: async () => {
      const res = await apiClient.get<{ data: { expenses: Expense[] } }>("/expenses", {
        params: { limit: 5 },
      });
      return res.data.data?.expenses ?? [];
    },
    enabled: isEnabled,
  });

  // 6. Groups overview
  const groupsQuery = useQuery({
    queryKey: ["groups", "overview"],
    queryFn: async () => {
      const res = await apiClient.get<{ data: Group[] }>("/expenses/groups");
      return res.data.data ?? [];
    },
    enabled: isEnabled,
  });

  const isLoading =
    summaryQuery.isLoading ||
    breakdownQuery.isLoading ||
    trendsQuery.isLoading ||
    recentExpensesQuery.isLoading;

  const isError =
    summaryQuery.isError ||
    breakdownQuery.isError ||
    trendsQuery.isError ||
    recentExpensesQuery.isError;

  const refetch = () => {
    summaryQuery.refetch();
    breakdownQuery.refetch();
    trendsQuery.refetch();
    insightsQuery.refetch();
    recentExpensesQuery.refetch();
    groupsQuery.refetch();
  };

  return {
    summary: summaryQuery.data,
    breakdown: breakdownQuery.data ?? [],
    trends: trendsQuery.data ?? [],
    insights: insightsQuery.data ?? [],
    recentExpenses: recentExpensesQuery.data ?? [],
    groups: groupsQuery.data ?? [],
    isLoading,
    isError,
    error: summaryQuery.error || breakdownQuery.error || recentExpensesQuery.error,
    refetch,
  };
}
