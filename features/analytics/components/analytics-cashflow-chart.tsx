"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/api-state";
import { TrendDataPoint } from "../types";
import { TrendingUp } from "lucide-react";

interface AnalyticsCashflowChartProps {
  data: TrendDataPoint[];
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div className="p-3 bg-slate-900 border border-slate-700/80 rounded-xl shadow-xl backdrop-blur-md text-xs space-y-1">
        <p className="text-slate-400 font-medium">{label}</p>
        <p className="text-sm font-extrabold text-white">
          ₹{Number(val).toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
}

export function AnalyticsCashflowChart({ data }: AnalyticsCashflowChartProps) {
  const hasData = data && data.some((d) => d.amount > 0);

  return (
    <Card variant="default" className="space-y-4">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Spending Trend & Cash Flow
          </CardTitle>
          <CardDescription>
            Daily and period expenditure tracking over time
          </CardDescription>
        </div>
      </CardHeader>

      {!hasData ? (
        <EmptyState
          title="No spending recorded"
          description="There are no expenses logged in the selected date range to chart."
        />
      ) : (
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => (v >= 1000 ? `₹${(v / 1000).toFixed(0)}k` : `₹${v}`)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#6366F1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#spendingGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
