"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Layers } from "lucide-react";

interface AnalyticsCategoryTrendsProps {
  data: Record<string, number | string>[];
  categories: Array<{ name: string; color?: string | null }>;
}

const DEFAULT_COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F43F5E", "#F59E0B", "#64748B"];

export function AnalyticsCategoryTrends({ data, categories }: AnalyticsCategoryTrendsProps) {
  const topCategories = categories.slice(0, 5);
  const hasData = data && data.length > 0;

  return (
    <Card variant="default" className="space-y-4">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            Spending by Category Over Time
          </CardTitle>
          <CardDescription>Track category expenditure shifts across period timeline</CardDescription>
        </div>
      </CardHeader>

      {!hasData ? (
        <div className="py-12 text-center text-slate-400 text-xs">No trend data available</div>
      ) : (
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="label" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => (v >= 1000 ? `₹${(v / 1000).toFixed(0)}k` : `₹${v}`)}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155", borderRadius: "12px" }}
                itemStyle={{ fontSize: "12px", color: "#F8FAFC" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
              {topCategories.map((cat, idx) => (
                <Bar
                  key={cat.name}
                  dataKey={cat.name}
                  stackId="a"
                  fill={cat.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
                  radius={idx === topCategories.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
