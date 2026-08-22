"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  useGroupDetails,
  GroupDetailsHeader,
  GroupBalancesCard,
  GroupMembersList,
  GroupExpensesList,
  InviteMemberModal,
  SettleUpModal,
} from "@/features/groups";
import { ExpenseModal, useExpenses } from "@/features/expenses";
import { ApiErrorState } from "@/components/shared/api-state";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateExpensePayload, UpdateExpensePayload } from "@/types/api";

export default function GroupDetailsPage() {
  const params = useParams();
  const groupId = Number(params.id);

  const {
    group,
    isLoading,
    isError,
    error,
    refetch,
    inviteMember,
    isInviting,
    settleGroup,
    isSettling,
  } = useGroupDetails(groupId);

  const { createExpense, isCreating: isExpenseCreating } = useExpenses({ group_id: groupId });

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isSettleOpen, setIsSettleOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);

  const handleAddExpense = async (payload: CreateExpensePayload | UpdateExpensePayload) => {
    await createExpense({
      ...(payload as CreateExpensePayload),
      group_id: groupId,
    });
    refetch();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-16 w-1/3" />
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (isError || !group) {
    return (
      <ApiErrorState
        title="Could not load group details"
        error={error}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <GroupDetailsHeader
        group={group}
        onInvite={() => setIsInviteOpen(true)}
        onSettle={() => setIsSettleOpen(true)}
        onAddExpense={() => setIsExpenseOpen(true)}
      />

      {/* Balances summary */}
      <GroupBalancesCard balances={group.balances || []} />

      {/* Grid: Expenses & Members */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GroupExpensesList expenses={group.expenses || []} />
        </div>

        <div className="lg:col-span-1">
          <GroupMembersList
            members={group.members || []}
            ownerId={group.owner_id}
          />
        </div>
      </div>

      {/* Modals */}
      <InviteMemberModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onInvite={inviteMember}
        loading={isInviting}
      />

      <SettleUpModal
        isOpen={isSettleOpen}
        onClose={() => setIsSettleOpen(false)}
        members={group.members || []}
        onSettle={settleGroup}
        loading={isSettling}
      />

      <ExpenseModal
        isOpen={isExpenseOpen}
        onClose={() => setIsExpenseOpen(false)}
        onSubmit={handleAddExpense}
        loading={isExpenseCreating}
      />
    </div>
  );
}
