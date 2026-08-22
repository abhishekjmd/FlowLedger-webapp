"use client";

import React from "react";
import { CounterpartyBalance } from "@/types/api";
import { formatCurrency } from "@/lib/utils";
import { UserCheck, UserMinus, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PeopleBalancesSectionProps {
  peopleYouOwe: CounterpartyBalance[];
  peopleWhoOweYou: CounterpartyBalance[];
  onSettleClick?: (counterparty: CounterpartyBalance, type: "owe" | "owed") => void;
}

export function PeopleBalancesSection({
  peopleYouOwe,
  peopleWhoOweYou,
  onSettleClick,
}: PeopleBalancesSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* People You Owe */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UserMinus className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-bold text-white">People You Owe</h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-rose-500/10 text-rose-400 rounded-full border border-rose-500/20">
            {peopleYouOwe.length} {peopleYouOwe.length === 1 ? "Person" : "People"}
          </span>
        </div>

        {peopleYouOwe.length === 0 ? (
          <div className="py-8 text-center border border-dashed border-slate-800/80 rounded-xl">
            <UserCheck className="w-8 h-8 text-emerald-400/60 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-300">You don&apos;t owe anyone!</p>
            <p className="text-xs text-slate-500 mt-1">All personal and group debts are clear.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {peopleYouOwe.map((person) => (
              <div
                key={person.userId}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">{person.name}</span>
                    <span className="text-xs text-slate-400">({person.email})</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {person.groups.map((g) => (
                      <span
                        key={g.groupId}
                        className="text-[11px] font-medium px-2 py-0.5 bg-slate-800/80 text-slate-300 rounded-md"
                      >
                        {g.groupName}: {formatCurrency(g.amount)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <div className="text-right">
                    <span className="block text-xs font-semibold text-rose-400 uppercase tracking-wider">
                      You Owe
                    </span>
                    <span className="text-lg font-extrabold text-rose-400">
                      {formatCurrency(person.amount)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* People Who Owe You */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">People Who Owe You</h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
            {peopleWhoOweYou.length} {peopleWhoOweYou.length === 1 ? "Person" : "People"}
          </span>
        </div>

        {peopleWhoOweYou.length === 0 ? (
          <div className="py-8 text-center border border-dashed border-slate-800/80 rounded-xl">
            <ShieldAlert className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-300">No one owes you right now</p>
            <p className="text-xs text-slate-500 mt-1">Expenses will reflect here as created.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {peopleWhoOweYou.map((person) => (
              <div
                key={person.userId}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">{person.name}</span>
                    <span className="text-xs text-slate-400">({person.email})</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {person.groups.map((g) => (
                      <span
                        key={g.groupId}
                        className="text-[11px] font-medium px-2 py-0.5 bg-slate-800/80 text-slate-300 rounded-md"
                      >
                        {g.groupName}: {formatCurrency(g.amount)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <div className="text-right">
                    <span className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Owes You
                    </span>
                    <span className="text-lg font-extrabold text-emerald-400">
                      {formatCurrency(person.amount)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
