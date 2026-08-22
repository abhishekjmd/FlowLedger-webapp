"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  MetricCard,
  SpendingTrendChart,
  CategoryBreakdownList,
  InsightsCard,
  RecentExpensesList,
  useDashboard,
} from "@/features/dashboard";
import { useGlobalBalances } from "@/features/balances";
import { ExpenseModal, useExpenses } from "@/features/expenses";
import { ApiErrorState } from "@/components/shared/api-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import {
  CreditCard,
  Users,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Scale,
} from "lucide-react";
import { CreateExpensePayload, UpdateExpensePayload } from "@/types/api";

export default function DashboardPage() {
  const { user } = useUser();
  const {
    summary,
    breakdown,
    trends,
    insights,
    recentExpenses,
    groups,
    isLoading: isDashboardLoading,
    isError,
    error,
    refetch,
  } = useDashboard();

  const { balances, isLoading: isBalancesLoading } = useGlobalBalances();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createExpense, isCreating } = useExpenses();

  const firstName = user?.firstName || user?.fullName?.split(" ")[0] || "User";

  // Compute month-over-month growth
  const growthPercentage = summary?.lastMonth
    ? (((summary.currentMonth - summary.lastMonth) / summary.lastMonth) * 100).toFixed(1)
    : null;
  const isSpendingIncreased = (summary?.difference ?? 0) > 0;

  const currentMonthName = new Date().toLocaleString("default", { month: "long" });

  const handleCreateExpense = async (data: CreateExpensePayload | UpdateExpensePayload) => {
    await createExpense(data as CreateExpensePayload);
  };

  const isLoading = isDashboardLoading || isBalancesLoading;

  if (isError) {
    return (
      <div className="py-8">
        <ApiErrorState
          title="Could not load dashboard data"
          error={error}
          onRetry={refetch}
        />
      </div>
    );
  }

  const youOweVal = parseFloat(balances?.summary?.totalYouOwe || "0");
  const owedToYouVal = parseFloat(balances?.summary?.totalOwedToYou || "0");
  const netBalanceVal = parseFloat(balances?.summary?.netBalance || "0");

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Here is your financial pulse and net balance summary for {currentMonthName}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="md"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Expense
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Monthly Spending"
            value={formatCurrency(summary?.currentMonth ?? 0)}
            changeText={
              growthPercentage ? `${isSpendingIncreased ? "+" : ""}${growthPercentage}%` : undefined
            }
            trend={isSpendingIncreased ? "up" : "down"}
            subtitle={`vs ${formatCurrency(summary?.lastMonth ?? 0, 0)} last mo`}
            icon={<CreditCard className="w-4 h-4 text-indigo-400" />}
          />

          <MetricCard
            title="You Owe"
            value={formatCurrency(youOweVal)}
            subtitle="Outstanding liabilities"
            icon={<ArrowDownLeft className="w-4 h-4 text-rose-400" />}
          />

          <MetricCard
            title="Owed to You"
            value={formatCurrency(owedToYouVal)}
            subtitle="Expected receivables"
            icon={<ArrowUpRight className="w-4 h-4 text-emerald-400" />}
          />

          <MetricCard
            title="Net Balance"
            value={formatCurrency(netBalanceVal)}
            subtitle={`${groups.length} active group ledgers`}
            icon={<Scale className="w-4 h-4 text-purple-400" />}
          />
        </div>
      )}

      {/* AI Insights Banner */}
      {!isLoading && insights.length > 0 && <InsightsCard insights={insights} />}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {isLoading ? (
            <Skeleton className="h-[360px]" />
          ) : (
            <SpendingTrendChart data={trends} />
          )}
        </div>

        <div className="lg:col-span-1">
          {isLoading ? (
            <Skeleton className="h-[360px]" />
          ) : (
            <CategoryBreakdownList data={breakdown} />
          )}
        </div>
      </div>

      {/* Recent Transactions List */}
      <div>
        {isLoading ? (
          <Skeleton className="h-64" />
        ) : (
          <RecentExpensesList expenses={recentExpenses} />
        )}
      </div>

      {/* Modal */}
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateExpense}
        loading={isCreating}
      />
    </div>
  );
}
