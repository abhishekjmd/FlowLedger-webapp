"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Info } from "lucide-react";
import { BudgetStatus } from "../types";

interface AnalyticsBudgetTrackingProps {
  budgets: BudgetStatus;
}

export function AnalyticsBudgetTracking({ budgets }: AnalyticsBudgetTrackingProps) {
  return (
    <Card variant="default" className="space-y-4">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            Budget Limit Tracking
          </CardTitle>
          <CardDescription>Monthly spending threshold monitoring</CardDescription>
        </div>
        <Badge variant="outline" className="text-[10px] text-slate-400 border-slate-700">
          Not Configured
        </Badge>
      </CardHeader>

      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-200">Budget System Notice</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            {budgets.message} You can set target category budgets once database persistence for limits is configured.
          </p>
        </div>
      </div>
    </Card>
  );
}
