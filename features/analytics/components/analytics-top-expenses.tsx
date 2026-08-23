"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TopExpenseItem } from "../types";
import { CreditCard, Users, ArrowUpRight } from "lucide-react";

interface AnalyticsTopExpensesProps {
  expenses: TopExpenseItem[];
}

export function AnalyticsTopExpenses({ expenses }: AnalyticsTopExpensesProps) {
  const hasData = expenses && expenses.length > 0;

  return (
    <Card variant="default" className="space-y-4">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            Top Expenses
          </CardTitle>
          <CardDescription>Largest individual transactions in the selected period</CardDescription>
        </div>
      </CardHeader>

      {!hasData ? (
        <div className="py-8 text-center text-slate-400 text-xs">No transactions in this period</div>
      ) : (
        <div className="space-y-2 pt-2">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-white truncate">{exp.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-slate-400">
                      {new Date(exp.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-slate-700">
                      {exp.categoryName}
                    </Badge>
                    {exp.groupName && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-indigo-400 font-medium">
                        <Users className="w-3 h-3" />
                        {exp.groupName}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-xs sm:text-sm font-extrabold text-white">
                  ₹{exp.amount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
