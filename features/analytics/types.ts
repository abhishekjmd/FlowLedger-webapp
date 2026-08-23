export type DateRangePreset = "this-week" | "this-month" | "last-3-months" | "this-year" | "custom";

export interface AnalyticsQueryOptions {
  range: DateRangePreset;
  startDate?: string;
  endDate?: string;
}

export interface KpiSummary {
  totalSpent: number;
  avgDailySpend: number;
  highestCategory: {
    id: number;
    name: string;
    amount: number;
  } | null;
  largestExpense: {
    id: number;
    title: string;
    amount: number;
    date: string;
    categoryName: string;
  } | null;
  transactionCount: number;
  previousPeriod: {
    totalSpent: number;
    transactionCount: number;
    percentageChange: number | null;
  };
}

export interface TrendDataPoint {
  date: string;
  label: string;
  amount: number;
}

export interface CategoryBreakdownItem {
  id: number;
  name: string;
  icon?: string | null;
  color?: string | null;
  amount: number;
  count: number;
  percentage: number;
}

export interface TopExpenseItem {
  id: number;
  title: string;
  amount: number;
  date: string;
  categoryName: string;
  categoryColor?: string | null;
  groupName?: string | null;
}

export interface MonthlyComparisonItem {
  month: string;
  year: number;
  amount: number;
  isHighest: boolean;
  isLowest: boolean;
}

export interface GroupAnalyticsItem {
  groupId: number;
  groupName: string;
  totalSpending: number;
  myShare: number;
  expenseCount: number;
}

export interface TransactionStats {
  totalTransactions: number;
  avgTransaction: number;
  largestTransaction: number;
  smallestTransaction: number;
  activeDaysCount: number;
}

export interface BudgetStatus {
  isConfigured: boolean;
  message: string;
}

export interface AnalyticsOverviewData {
  summary: KpiSummary;
  spendingTrend: TrendDataPoint[];
  categoryBreakdown: CategoryBreakdownItem[];
  categoryTrends: Record<string, number | string>[];
  topExpenses: TopExpenseItem[];
  monthlyComparison: MonthlyComparisonItem[];
  groupAnalytics: GroupAnalyticsItem[];
  transactionStats: TransactionStats;
  insights: string[];
  budgets: BudgetStatus;
}
