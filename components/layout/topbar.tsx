"use client";

import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus, Bell, Search, Menu } from "lucide-react";

export function Topbar({
  onOpenCreateExpense,
  onOpenMobileMenu,
}: {
  onOpenCreateExpense?: () => void;
  onOpenMobileMenu?: () => void;
}) {
  const { user, isLoaded } = useUser();

  return (
    <header className="h-16 px-4 md:px-8 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between gap-4">
      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-bold text-sm text-white">FlowLedger</span>
      </div>

      {/* Global Search Bar Placeholder */}
      <div className="hidden md:flex items-center flex-1 max-w-md relative">
        <Search className="w-4 h-4 absolute left-3.5 text-slate-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search transactions, groups, members... (Ctrl + K)"
          className="w-full h-9 pl-9 pr-4 bg-slate-900/80 text-xs text-slate-200 placeholder:text-slate-500 rounded-xl border border-slate-800/80 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {onOpenCreateExpense && (
          <Button
            size="sm"
            onClick={onOpenCreateExpense}
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-sm"
          >
            <span className="hidden sm:inline">Add Expense</span>
            <span className="sm:hidden">Add</span>
          </Button>
        )}

        {/* Notifications Icon */}
        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/80 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-indigo-500 absolute top-2 right-2 ring-2 ring-slate-950" />
        </button>

        {/* User Profile */}
        <div className="flex items-center pl-2 border-l border-slate-800/80">
          {isLoaded && (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-xl border border-slate-700/60",
                },
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
}
