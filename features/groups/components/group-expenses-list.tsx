"use client";

import React from "react";
import { Expense } from "@/types/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CATEGORY_META, DEFAULT_CATEGORY_META } from "@/lib/constants";
import { Receipt, Calendar, User } from "lucide-react";
import { Card } from "@/components/ui/card";

export function GroupExpensesList({ expenses }: { expenses: Expense[] }) {
  if (!expenses || expenses.length === 0) {
    return (
      <Card className="p-8 text-center space-y-3">
        <Receipt className="w-8 h-8 text-slate-600 mx-auto" />
        <h4 className="font-semibold text-sm text-slate-300">No Group Expenses Yet</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Add an expense tagged to this group to start splitting bills and calculating balances.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-sm text-white">Group Transactions ({expenses.length})</h3>
        </div>
      </div>

      <div className="divide-y divide-slate-800/60">
        {expenses.map((expense) => {
          const categoryName = expense.category?.name || "General";
          const meta = CATEGORY_META[categoryName] || DEFAULT_CATEGORY_META;
          const Icon = meta.icon;

          return (
            <div key={expense.id} className="py-3.5 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: meta.bgColor, color: meta.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-100 text-xs sm:text-sm block">
                    {expense.title}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-500" />
                      Paid by {expense.user?.name || "Member"}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {formatDate(expense.date)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="font-extrabold text-white text-xs sm:text-sm block font-mono">
                  {formatCurrency(expense.amount)}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {expense.splits && expense.splits.length > 0
                    ? `Split with ${expense.splits.length}`
                    : "Equal split"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
