"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MonthlyTrend } from "@/types/api";
import { formatCurrency, formatCurrencyCompact } from "@/lib/utils";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export function SpendingTrendChart({ data }: { data: MonthlyTrend[] }) {
  const chartData = data.map((item) => ({
    name: item.month,
    amount: Number(item.amount || 0),
    fullLabel: `${item.month} ${item.year}`,
  }));

  const hasData = chartData.some((d) => d.amount > 0);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Spending Trends</CardTitle>
        <CardDescription>Historical overview over the past 6 months</CardDescription>
      </CardHeader>

      <div className="flex-1 w-full min-h-[260px] pt-4">
        {!hasData ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-500">
            No spending history recorded for the selected period
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#1e293b" }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrencyCompact(value)}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-3 shadow-xl">
                        <p className="text-[11px] font-semibold text-slate-400">{item.fullLabel}</p>
                        <p className="text-sm font-extrabold text-indigo-400 mt-0.5">
                          {formatCurrency(item.amount)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#6366f1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#spendGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
