"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface AnalyticsInsightsProps {
  insights: string[];
}

export function AnalyticsInsights({ insights }: AnalyticsInsightsProps) {
  const hasInsights = insights && insights.length > 0;

  return (
    <Card variant="default" className="space-y-4">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Spending Insights
          </CardTitle>
          <CardDescription>Automated observation heuristics from your transaction data</CardDescription>
        </div>
      </CardHeader>

      {!hasInsights ? (
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 text-center">
          Add a few more expenses to unlock spending insights.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3 hover:border-slate-700 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">{insight}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
