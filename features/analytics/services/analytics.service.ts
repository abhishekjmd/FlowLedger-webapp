import { apiClient } from "@/lib/api/client";
import { AnalyticsOverviewData, AnalyticsQueryOptions } from "../types";
import { Expense } from "@/types/api";

export async function fetchAnalyticsOverview(options: AnalyticsQueryOptions): Promise<AnalyticsOverviewData> {
  const res = await apiClient.get<{ data: AnalyticsOverviewData }>("/analytics/overview", {
    params: {
      range: options.range,
      startDate: options.startDate,
      endDate: options.endDate,
    },
  });
  return res.data.data;
}

export async function exportAnalyticsCSV(options: AnalyticsQueryOptions): Promise<void> {
  // Fetch actual expenses for the selected range to construct CSV
  const res = await apiClient.get<{ data: { expenses: Expense[] } }>("/expenses", {
    params: {
      startDate: options.startDate,
      endDate: options.endDate,
      limit: 1000,
    },
  });

  const expenses = res.data.data?.expenses ?? [];
  if (expenses.length === 0) {
    alert("No expenses found in the selected range to export.");
    return;
  }

  // Generate CSV rows
  const headers = ["Date", "Title", "Amount (INR)", "Category", "Group", "Description", "Recurring"];
  const rows = expenses.map((exp) => [
    `"${new Date(exp.date).toLocaleDateString("en-IN")}"`,
    `"${(exp.title || "").replace(/"/g, '""')}"`,
    exp.amount,
    `"${exp.category?.name || "Uncategorized"}"`,
    `"${(exp as { group?: { name?: string } }).group?.name || "Personal"}"`,
    `"${(exp.description || "").replace(/"/g, '""')}"`,
    exp.is_recurring ? "Yes" : "No",
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `FlowLedger_Expenses_${options.range}_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
