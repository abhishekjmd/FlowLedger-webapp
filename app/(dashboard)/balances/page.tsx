"use client";

import React from "react";
import { Scale } from "lucide-react";
import {
  useGlobalBalances,
  BalanceSummaryCards,
  PeopleBalancesSection,
  GroupBalancesGrid,
  SettlementHistoryTable,
} from "@/features/balances";
import { ApiErrorState } from "@/components/shared/api-state";
import { Skeleton } from "@/components/ui/skeleton";

export default function BalancesPage() {
  const { balances, isLoading, isError, error, refetch, page, setPage } =
    useGlobalBalances();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Scale className="w-7 h-7 text-indigo-400" />
            Balances & Settlements
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time pairwise debt map and historical settlement records.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6 py-8">
        <ApiErrorState
          title="Could not load global balances"
          error={error}
          onRetry={refetch}
        />
      </div>
    );
  }

  const summary = balances?.summary ?? {
    totalYouOwe: "0.00",
    totalOwedToYou: "0.00",
    netBalance: "0.00",
  };
  const peopleYouOwe = balances?.peopleYouOwe ?? [];
  const peopleWhoOweYou = balances?.peopleWhoOweYou ?? [];
  const groupBalances = balances?.groupBalances ?? [];
  const settlements = balances?.settlements ?? [];
  const pagination = balances?.pagination ?? {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Scale className="w-7 h-7 text-indigo-400" />
          Balances & Settlements
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Aggregated pairwise ledger balances across personal expenses and collaborative groups.
        </p>
      </div>

      {/* Summary Cards */}
      <BalanceSummaryCards
        totalYouOwe={summary.totalYouOwe}
        totalOwedToYou={summary.totalOwedToYou}
        netBalance={summary.netBalance}
      />

      {/* Group Balances */}
      <GroupBalancesGrid groupBalances={groupBalances} />

      {/* Pairwise Debt Breakdown */}
      <PeopleBalancesSection
        peopleYouOwe={peopleYouOwe}
        peopleWhoOweYou={peopleWhoOweYou}
      />

      {/* Settlement History */}
      <SettlementHistoryTable
        settlements={settlements}
        pagination={pagination}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}
