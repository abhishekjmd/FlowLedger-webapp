"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GroupAnalyticsItem } from "../types";
import { Users, Receipt } from "lucide-react";

interface AnalyticsGroupSummaryProps {
  groups: GroupAnalyticsItem[];
}

export function AnalyticsGroupSummary({ groups }: AnalyticsGroupSummaryProps) {
  const hasGroups = groups && groups.length > 0;

  return (
    <Card variant="default" className="space-y-4">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Group Analytics
          </CardTitle>
          <CardDescription>Collaborative spending & personal shares across groups</CardDescription>
        </div>
      </CardHeader>

      {!hasGroups ? (
        <div className="py-8 text-center text-slate-400 text-xs">No active groups in this period</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {groups.map((group) => (
            <div
              key={group.groupId}
              className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{group.groupName}</span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Receipt className="w-3 h-3" />
                  {group.expenseCount} tx
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Total Group Spend</p>
                  <p className="font-extrabold text-white">₹{group.totalSpending.toLocaleString("en-IN")}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Your Share</p>
                  <p className="font-extrabold text-indigo-400">₹{group.myShare.toLocaleString("en-IN")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
