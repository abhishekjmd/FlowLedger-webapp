"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CategoryBreakdown } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { CATEGORY_META, DEFAULT_CATEGORY_META } from "@/lib/constants";

export function CategoryBreakdownList({ data }: { data: CategoryBreakdown[] }) {
  const totalAmount = data.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Top spending categories for this month</CardDescription>
      </CardHeader>

      <div className="flex-1 flex flex-col justify-center space-y-4 pt-2">
        {data.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No category transactions recorded this month
          </div>
        ) : (
          data.slice(0, 5).map((category) => {
            const meta = CATEGORY_META[category.name] || DEFAULT_CATEGORY_META;
            const Icon = meta.icon;
            const percentage = totalAmount > 0 ? (Number(category.amount) / totalAmount) * 100 : 0;

            return (
              <div key={category.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: meta.bgColor, color: meta.color }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-slate-200">{category.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ({category.count} {category.count === 1 ? "txn" : "txns"})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium text-[11px]">
                      {percentage.toFixed(0)}%
                    </span>
                    <span className="font-bold text-slate-100">
                      {formatCurrency(category.amount)}
                    </span>
                  </div>
                </div>

                {/* Progress bar track */}
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(percentage, 2)}%`,
                      backgroundColor: meta.color,
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
