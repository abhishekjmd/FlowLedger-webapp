"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MonthlyComparisonItem } from "../types";
import { CalendarDays } from "lucide-react";

interface AnalyticsMonthlyCompareProps {
  data: MonthlyComparisonItem[];
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="p-3 bg-slate-900 border border-slate-700/80 rounded-xl shadow-xl backdrop-blur-md text-xs space-y-1">
        <p className="text-white font-bold">{item.month} {item.year}</p>
        <p className="text-indigo-400 font-extrabold">₹{item.amount.toLocaleString("en-IN")}</p>
        {item.isHighest && <p className="text-rose-400 text-[10px] font-semibold">★ Peak Month</p>}
        {item.isLowest && <p className="text-emerald-400 text-[10px] font-semibold">★ Lowest Month</p>}
      </div>
    );
  }
  return null;
}

export function AnalyticsMonthlyCompare({ data }: AnalyticsMonthlyCompareProps) {
  const hasData = data && data.some((d) => d.amount > 0);

  return (
    <Card variant="default" className="space-y-4">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-indigo-400" />
            Annual Monthly Comparison
          </CardTitle>
          <CardDescription>Monthly spending across the current year (Jan – Dec)</CardDescription>
        </div>
      </CardHeader>

      {!hasData ? (
        <div className="py-12 text-center text-slate-400 text-xs">No annual data recorded</div>
      ) : (
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => (v >= 1000 ? `₹${(v / 1000).toFixed(0)}k` : `₹${v}`)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => {
                  let fill = "#6366F1";
                  if (entry.isHighest) fill = "#F43F5E"; // Rose for peak
                  else if (entry.isLowest) fill = "#10B981"; // Emerald for lowest
                  return <Cell key={`cell-${index}`} fill={fill} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
