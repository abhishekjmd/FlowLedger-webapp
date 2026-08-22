"use client";

import React, { useState, useMemo } from "react";
import { useGroups, GroupCard, CreateGroupModal } from "@/features/groups";
import { ApiErrorState, EmptyState } from "@/components/shared/api-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus, Users, Search } from "lucide-react";
import { CreateGroupPayload } from "@/types/api";

export default function GroupsPage() {
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { groups, isLoading, isError, error, refetch, createGroup, isCreating } = useGroups();

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return groups;
    const q = search.toLowerCase();
    return groups.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        (g.description && g.description.toLowerCase().includes(q))
    );
  }, [groups, search]);

  const handleCreateGroup = async (data: CreateGroupPayload) => {
    await createGroup(data);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Groups & Ledgers
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Collaborate on shared bills, trips, room-mate expenses, and peer settlements.
          </p>
        </div>

        <Button
          size="md"
          onClick={() => setIsCreateOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create Group
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search groups by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-slate-900/80 text-xs text-slate-200 placeholder:text-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Content State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <ApiErrorState
          title="Could not load groups"
          error={error}
          onRetry={refetch}
        />
      ) : filteredGroups.length === 0 ? (
        <EmptyState
          icon={Users}
          title={search ? "No matching groups" : "No groups created yet"}
          description={
            search
              ? "Try adjusting your search query to find your group."
              : "Create your first collaborative group to split bills and track pairwise debts."
          }
          action={
            search ? (
              <Button variant="secondary" size="sm" onClick={() => setSearch("")}>
                Clear Search
              </Button>
            ) : (
              <Button size="sm" onClick={() => setIsCreateOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
                Create First Group
              </Button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateGroup}
        loading={isCreating}
      />
    </div>
  );
}
