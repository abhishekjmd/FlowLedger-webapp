"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TransactionStats } from "../types";
import { Activity, Hash, ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";

interface AnalyticsStatsGridProps {
  stats: TransactionStats;
}

export function AnalyticsStatsGrid({ stats }: AnalyticsStatsGridProps) {
  const items = [
    {
      label: "Total Transactions",
      value: stats.totalTransactions.toString(),
      icon: Hash,
      color: "text-indigo-400",
    },
    {
      label: "Avg Transaction",
      value: `₹${stats.avgTransaction.toLocaleString("en-IN")}`,
      icon: Activity,
      color: "text-purple-400",
    },
    {
      label: "Largest Transaction",
      value: `₹${stats.largestTransaction.toLocaleString("en-IN")}`,
      icon: ArrowUpRight,
      color: "text-rose-400",
    },
    {
      label: "Smallest Transaction",
      value: `₹${stats.smallestTransaction.toLocaleString("en-IN")}`,
      icon: ArrowDownRight,
      color: "text-emerald-400",
    },
    {
      label: "Active Spending Days",
      value: stats.activeDaysCount.toString(),
      icon: Calendar,
      color: "text-amber-400",
    },
  ];

  return (
    <Card variant="default" className="space-y-4">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            Transaction Statistics
          </CardTitle>
          <CardDescription>Granular performance metrics for selected date range</CardDescription>
        </div>
      </CardHeader>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1.5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">{item.label}</span>
                <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              </div>
              <p className="text-base sm:text-lg font-extrabold text-white tracking-tight">{item.value}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
