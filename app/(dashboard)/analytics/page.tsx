"use client";

import React from "react";
import {
  useAnalytics,
  AnalyticsHeader,
  AnalyticsKpiCards,
  AnalyticsCashflowChart,
  AnalyticsCategoryBreakdown,
  AnalyticsCategoryTrends,
  AnalyticsTopExpenses,
  AnalyticsInsights,
  AnalyticsMonthlyCompare,
  AnalyticsBudgetTracking,
  AnalyticsGroupSummary,
  AnalyticsStatsGrid,
} from "@/features/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiErrorState } from "@/components/shared/api-state";

export default function AnalyticsDashboardPage() {
  const {
    range,
    setRange,
    setCustomRange,
    selectedCategory,
    setSelectedCategory,
    data,
    isLoading,
    isError,
    error,
    refetch,
    isExporting,
    handleExportCSV,
  } = useAnalytics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-16 w-full rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
        <Skeleton className="h-80 w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-6">
        <AnalyticsHeader
          range={range}
          onRangeChange={setRange}
          onCustomRange={setCustomRange}
          onExportCSV={handleExportCSV}
          isExporting={isExporting}
        />
        <ApiErrorState
          title="Could not load analytics overview"
          error={error}
          onRetry={refetch}
        />
      </div>
    );
  }

  // Filter category trends / breakdown if selectedCategory is active
  const displayedCategories = selectedCategory
    ? data.categoryBreakdown.filter((c) => c.name === selectedCategory)
    : data.categoryBreakdown;

  return (
    <div className="space-y-6">
      {/* 1. Header with Range Selector & CSV Export */}
      <AnalyticsHeader
        range={range}
        onRangeChange={setRange}
        onCustomRange={setCustomRange}
        onExportCSV={handleExportCSV}
        isExporting={isExporting}
      />

      {/* 2. KPI Summary Cards */}
      <AnalyticsKpiCards summary={data.summary} />

      {/* 3. Main Cash Flow / Spending Trend Chart */}
      <AnalyticsCashflowChart data={data.spendingTrend} />

      {/* 4. Category Breakdown & Category Trends Over Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCategoryBreakdown
          categories={displayedCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <AnalyticsCategoryTrends
          data={data.categoryTrends}
          categories={data.categoryBreakdown}
        />
      </div>

      {/* 5. Top Expenses & Spending Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsTopExpenses expenses={data.topExpenses} />
        <AnalyticsInsights insights={data.insights} />
      </div>

      {/* 6. Annual Monthly Comparison & Group Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsMonthlyCompare data={data.monthlyComparison} />
        <AnalyticsGroupSummary groups={data.groupAnalytics} />
      </div>

      {/* 7. Transaction Statistics & Budget Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsStatsGrid stats={data.transactionStats} />
        <AnalyticsBudgetTracking budgets={data.budgets} />
      </div>
    </div>
  );
}
