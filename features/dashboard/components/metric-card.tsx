import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface MetricCardProps {
  title: string;
  value: string;
  changeText?: string;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "accent";
}

export function MetricCard({
  title,
  value,
  changeText,
  trend = "neutral",
  subtitle,
  icon,
  variant = "default",
}: MetricCardProps) {
  const isSpendingCard = title.toLowerCase().includes("spending");

  // In spending, 'up' is negative for user wallet (red), 'down' is positive (emerald)
  const isNegativeImpact = isSpendingCard ? trend === "up" : trend === "down";

  return (
    <Card className="relative overflow-hidden group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {icon && (
          <div className="w-8 h-8 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-300">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          {value}
        </div>

        {(changeText || subtitle) && (
          <div className="flex items-center gap-2 text-xs">
            {changeText && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md",
                  isNegativeImpact
                    ? "bg-rose-500/10 text-rose-400"
                    : trend === "neutral"
                    ? "bg-slate-800 text-slate-400"
                    : "bg-emerald-500/10 text-emerald-400"
                )}
              >
                {trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : trend === "down" ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <Minus className="w-3 h-3" />
                )}
                {changeText}
              </span>
            )}
            {subtitle && <span className="text-slate-400 truncate">{subtitle}</span>}
          </div>
        )}
      </div>
    </Card>
  );
}
