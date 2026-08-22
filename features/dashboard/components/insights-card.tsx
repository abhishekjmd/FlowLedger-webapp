import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Lightbulb } from "lucide-react";

export function InsightsCard({ insights }: { insights: string[] }) {
  if (!insights || insights.length === 0) return null;

  return (
    <Card className="bg-gradient-to-br from-indigo-950/30 via-slate-900 to-slate-900 border-indigo-500/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <CardTitle className="text-sm text-indigo-300">Flow Intelligence</CardTitle>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
            AI Heuristics
          </span>
        </div>
        <CardDescription>Automated behavioral insights derived from your monthly cash flow</CardDescription>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
        {insights.slice(0, 3).map((insight, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed"
          >
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <span>{insight}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
