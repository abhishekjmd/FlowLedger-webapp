"use client";

import React from "react";
import Link from "next/link";
import { Group } from "@/types/api";
import { Users, Receipt, ArrowRight, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function GroupCard({ group, currentUserId }: { group: Group; currentUserId?: number }) {
  const memberCount = group.members?.length || 1;
  const expenseCount = group._count?.expenses || 0;
  const isOwner = currentUserId ? group.owner_id === currentUserId : false;

  return (
    <Card className="p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all duration-200 group">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                {group.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                {isOwner && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    <Shield className="w-2.5 h-2.5" />
                    Admin
                  </span>
                )}
                <span className="text-xs text-slate-400">{memberCount} {memberCount === 1 ? "member" : "members"}</span>
              </div>
            </div>
          </div>
        </div>

        {group.description && (
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {group.description}
          </p>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Receipt className="w-3.5 h-3.5 text-slate-500" />
          <span>{expenseCount} {expenseCount === 1 ? "expense" : "expenses"}</span>
        </div>

        <Link href={`/groups/${group.id}`}>
          <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}
