"use client";

import React from "react";
import { GroupBalanceSummary } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { Users } from "lucide-react";
import Link from "next/link";

interface GroupBalancesGridProps {
  groupBalances: GroupBalanceSummary[];
}

export function GroupBalancesGrid({ groupBalances }: GroupBalancesGridProps) {
  if (groupBalances.length === 0) return null;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-bold text-white">Group Net Balances</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {groupBalances.map((group) => {
          const val = parseFloat(group.amount || "0");
          const isPositive = val > 0;
          const isNegative = val < 0;

          return (
            <Link
              key={group.groupId}
              href={`/groups/${group.groupId}`}
              className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 hover:border-indigo-500/50 transition-all group"
            >
              <span className="font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                {group.groupName}
              </span>

              <span
                className={`text-sm font-extrabold px-2.5 py-1 rounded-lg ${
                  isPositive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : isNegative
                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {isPositive ? `+${formatCurrency(val)}` : formatCurrency(val)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
