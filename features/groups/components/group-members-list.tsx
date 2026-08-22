"use client";

import React from "react";
import { GroupMember } from "@/types/api";
import { Card } from "@/components/ui/card";
import { Users, Shield, Mail } from "lucide-react";

interface GroupMembersListProps {
  members: GroupMember[];
  ownerId: number;
}

export function GroupMembersList({ members, ownerId }: GroupMembersListProps) {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-sm text-white">Members ({members.length})</h3>
        </div>
      </div>

      <div className="divide-y divide-slate-800/60">
        {members.map((m) => {
          const isOwner = m.user_id === ownerId;
          const initials = m.user.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

          return (
            <div key={m.id} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-300 flex-shrink-0">
                  {initials || "U"}
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-200 block truncate max-w-[150px]">
                    {m.user.name}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-600" />
                    {m.user.email}
                  </span>
                </div>
              </div>

              {isOwner && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <Shield className="w-2.5 h-2.5" />
                  Owner
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
