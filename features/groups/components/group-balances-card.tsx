"use client";

import React from "react";
import { GroupBalance } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Scale, ArrowUpRight, ArrowDownLeft, CheckCircle2 } from "lucide-react";

export function GroupBalancesCard({ balances }: { balances: GroupBalance[] }) {
  if (!balances || balances.length === 0) {
    return null;
  }

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-sm text-white">Group Net Balances</h3>
        </div>
        <span className="text-[11px] text-slate-500">Pairwise simplified</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {balances.map((b) => {
          const isPositive = b.netBalance > 0.01;
          const isNegative = b.netBalance < -0.01;
          const isSettled = !isPositive && !isNegative;

          return (
            <div
              key={b.userId}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-slate-200 block truncate max-w-[130px]">
                  {b.name}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isPositive ? "Gets back" : isNegative ? "Owes group" : "Fully settled"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 font-mono">
                {isPositive ? (
                  <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-0.5">
                    <ArrowDownLeft className="w-3.5 h-3.5" />
                    +{formatCurrency(b.netBalance)}
                  </span>
                ) : isNegative ? (
                  <span className="text-xs font-extrabold text-rose-400 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    -{formatCurrency(Math.abs(b.netBalance))}
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                    ₹0.00
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
