"use client";

import React from "react";
import Link from "next/link";
import { GroupDetails } from "@/types/api";
import { ChevronLeft, UserPlus, Scale, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GroupDetailsHeaderProps {
  group: GroupDetails;
  onInvite: () => void;
  onSettle: () => void;
  onAddExpense: () => void;
}

export function GroupDetailsHeader({
  group,
  onInvite,
  onSettle,
  onAddExpense,
}: GroupDetailsHeaderProps) {
  const memberCount = group.members?.length || 0;
  const expenseCount = group.expenses?.length || 0;

  return (
    <div className="space-y-4">
      <Link
        href="/groups"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Groups
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {group.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {group.description || "Shared ledger and expense group"} • {memberCount} {memberCount === 1 ? "member" : "members"} • {expenseCount} {expenseCount === 1 ? "expense" : "expenses"}
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={onInvite}
            leftIcon={<UserPlus className="w-4 h-4" />}
          >
            Invite Member
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onSettle}
            leftIcon={<Scale className="w-4 h-4" />}
          >
            Settle Up
          </Button>

          <Button
            size="sm"
            onClick={onAddExpense}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Group Expense
          </Button>
        </div>
      </div>
    </div>
  );
}
