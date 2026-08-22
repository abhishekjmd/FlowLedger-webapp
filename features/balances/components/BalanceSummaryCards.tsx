"use client";

import React from "react";
import { MetricCard } from "@/features/dashboard";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft, Scale } from "lucide-react";

interface BalanceSummaryCardsProps {
  totalYouOwe: string;
  totalOwedToYou: string;
  netBalance: string;
}

export function BalanceSummaryCards({
  totalYouOwe,
  totalOwedToYou,
  netBalance,
}: BalanceSummaryCardsProps) {
  const oweVal = parseFloat(totalYouOwe || "0");
  const owedVal = parseFloat(totalOwedToYou || "0");
  const netVal = parseFloat(netBalance || "0");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <MetricCard
        title="Total You Owe"
        value={formatCurrency(oweVal)}
        subtitle="Outstanding liabilities"
        icon={<ArrowDownLeft className="w-4 h-4 text-rose-400" />}
      />

      <MetricCard
        title="Total Owed to You"
        value={formatCurrency(owedVal)}
        subtitle="Expected receivables"
        icon={<ArrowUpRight className="w-4 h-4 text-emerald-400" />}
      />

      <MetricCard
        title="Net Balance"
        value={formatCurrency(netVal)}
        subtitle={
          netVal > 0
            ? "Overall net creditor"
            : netVal < 0
            ? "Overall net debtor"
            : "Fully settled up"
        }
        icon={<Scale className="w-4 h-4 text-indigo-400" />}
      />
    </div>
  );
}
