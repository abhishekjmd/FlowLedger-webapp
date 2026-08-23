"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryBreakdownItem } from "../types";
import { PieChart as PieIcon, Filter } from "lucide-react";

interface AnalyticsCategoryBreakdownProps {
  categories: CategoryBreakdownItem[];
  selectedCategory: string | null;
  onSelectCategory: (name: string | null) => void;
}

const DEFAULT_COLORS = [
  "#6366F1", // Indigo
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#F43F5E", // Rose
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#0EA5E9", // Sky
  "#14B8A6", // Teal
];

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="p-3 bg-slate-900 border border-slate-700/80 rounded-xl shadow-xl backdrop-blur-md text-xs space-y-1">
        <p className="text-white font-bold">{item.name}</p>
        <p className="text-indigo-400 font-extrabold">₹{item.amount.toLocaleString("en-IN")}</p>
        <p className="text-slate-400 text-[11px]">{item.percentage}% ({item.count} transactions)</p>
      </div>
    );
  }
  return null;
}

export function AnalyticsCategoryBreakdown({
  categories,
  selectedCategory,
  onSelectCategory,
}: AnalyticsCategoryBreakdownProps) {
  const hasData = categories && categories.length > 0;

  return (
    <Card variant="default" className="space-y-4">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-purple-400" />
            Category Breakdown
          </CardTitle>
          <CardDescription>Distribution of expenses by category</CardDescription>
        </div>

        {selectedCategory && (
          <Badge
            variant="secondary"
            className="cursor-pointer flex items-center gap-1"
            onClick={() => onSelectCategory(null)}
          >
            <Filter className="w-3 h-3" />
            Clear Filter: {selectedCategory} ✕
          </Badge>
        )}
      </CardHeader>

      {!hasData ? (
        <div className="py-12 text-center text-slate-400 text-xs">No category data available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Donut Chart */}
          <div className="md:col-span-5 h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="amount"
                >
                  {categories.map((cat, idx) => (
                    <Cell
                      key={cat.id}
                      fill={cat.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
                      stroke="#0F172A"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category List */}
          <div className="md:col-span-7 space-y-2.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
            {categories.map((cat, idx) => {
              const color = cat.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
              const isSelected = selectedCategory === cat.name;

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(isSelected ? null : cat.name)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-purple-500/10 border-purple-500/40 shadow-sm"
                      : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs font-semibold text-white truncate">{cat.name}</span>
                    <span className="text-[10px] text-slate-500">({cat.count} tx)</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-medium">
                    <span className="text-slate-300 font-bold">
                      ₹{cat.amount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-slate-400 w-10 text-right">
                      {cat.percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
