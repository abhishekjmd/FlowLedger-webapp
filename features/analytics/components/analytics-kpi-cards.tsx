"use client";

import React from "react";
import { TrendingUp, TrendingDown, Wallet, Calendar, PieChart, CreditCard, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiSummary } from "../types";

interface AnalyticsKpiCardsProps {
  summary: KpiSummary;
}

export function AnalyticsKpiCards({ summary }: AnalyticsKpiCardsProps) {
  const { totalSpent, avgDailySpend, highestCategory, largestExpense, transactionCount, previousPeriod } = summary;
  const pctChange = previousPeriod.percentageChange;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Spent */}
      <Card variant="default" className="relative overflow-hidden space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Spent</span>
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Wallet className="w-4 h-4" />
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ₹{totalSpent.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60 text-xs">
          {pctChange !== null ? (
            <div className={`inline-flex items-center gap-1 font-semibold ${pctChange >= 0 ? "text-rose-400" : "text-emerald-400"}`}>
              {pctChange >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{Math.abs(pctChange)}% vs prev period</span>
            </div>
          ) : (
            <span className="text-slate-400 text-[11px] font-medium">
              {transactionCount} transaction{transactionCount !== 1 ? "s" : ""} logged
            </span>
          )}
        </div>
      </Card>

      {/* 2. Average Daily Spend */}
      <Card variant="default" className="relative overflow-hidden space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Avg Daily Spend</span>
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ₹{avgDailySpend.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60 text-xs text-slate-400">
          <span className="text-[11px]">Calculated over selected period</span>
        </div>
      </Card>

      {/* 3. Highest Category */}
      <Card variant="default" className="relative overflow-hidden space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Top Category</span>
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <PieChart className="w-4 h-4" />
          </div>
        </div>

        <div>
          <div className="text-xl sm:text-2xl font-extrabold text-white truncate tracking-tight">
            {highestCategory ? highestCategory.name : "None"}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs">
          <span className="text-amber-400 font-semibold">
            {highestCategory ? `₹${highestCategory.amount.toLocaleString("en-IN")}` : "₹0"}
          </span>
          <span className="text-slate-500 text-[11px]">Highest Total</span>
        </div>
      </Card>

      {/* 4. Largest Expense */}
      <Card variant="default" className="relative overflow-hidden space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Largest Expense</span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CreditCard className="w-4 h-4" />
          </div>
        </div>

        <div>
          <div className="text-xl sm:text-2xl font-extrabold text-white truncate tracking-tight">
            {largestExpense ? largestExpense.title : "None"}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs">
          <span className="text-emerald-400 font-semibold">
            {largestExpense ? `₹${largestExpense.amount.toLocaleString("en-IN")}` : "₹0"}
          </span>
          <span className="text-slate-500 text-[11px]">Single Max</span>
        </div>
      </Card>
    </div>
  );
}
