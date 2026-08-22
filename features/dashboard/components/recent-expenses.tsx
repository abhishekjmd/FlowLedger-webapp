import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Expense } from "@/types/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CATEGORY_META, DEFAULT_CATEGORY_META } from "@/lib/constants";
import { ArrowRight, Receipt, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function RecentExpensesList({ expenses }: { expenses: Expense[] }) {
  return (
    <Card>
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest recorded expenses</CardDescription>
        </div>
        <Link
          href="/expenses"
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-2.5">
        {expenses.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-500">
            No recent transactions found
          </div>
        ) : (
          expenses.map((expense) => {
            const categoryName = expense.category?.name || "Other";
            const meta = CATEGORY_META[categoryName] || DEFAULT_CATEGORY_META;
            const Icon = meta.icon;

            return (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 hover:bg-slate-800/40 border border-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: meta.bgColor, color: meta.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-100 truncate">
                      {expense.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                      <span>{formatDate(expense.date)}</span>
                      <span>•</span>
                      <span className="truncate">{categoryName}</span>
                      {expense.group_id && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded font-medium">
                          <Users className="w-2.5 h-2.5" />
                          Group
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 pl-3">
                  <span className="text-sm font-bold text-slate-100 block">
                    {formatCurrency(expense.amount)}
                  </span>
                  {expense.is_recurring && (
                    <Badge variant="outline" size="sm" className="text-[9px] py-0 px-1 mt-0.5">
                      Recurring
                    </Badge>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
