"use client";

import React, { useRef, useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

function UserDropdown() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    setOpen(false);
    await signOut({ redirectUrl: "/sign-in" });
  };

  if (!isLoaded) {
    return (
      <div className="w-8 h-8 rounded-xl bg-slate-800 animate-pulse" />
    );
  }

  const name = user?.fullName ?? user?.firstName ?? "Account";
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const imageUrl = user?.imageUrl;

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-all group"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/30 group-hover:ring-indigo-500/60 transition-all"
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
            <User className="w-4 h-4 text-indigo-400" />
          </div>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Info */}
          <div className="px-4 py-4 border-b border-slate-800/60 bg-slate-900/40">
            <div className="flex items-center gap-3">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/30"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{name}</p>
                <p className="text-[11px] text-slate-400 truncate">{email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              Account Settings
            </Link>
          </div>

          {/* Sign Out */}
          <div className="p-2 border-t border-slate-800/60">
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {signingOut ? "Signing out…" : "Sign Out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Topbar({
  onOpenCreateExpense,
  onOpenMobileMenu,
}: {
  onOpenCreateExpense?: () => void;
  onOpenMobileMenu?: () => void;
}) {
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

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right Actions */}
      <div className="flex items-center gap-2">
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

        {/* Notifications */}
        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/80 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-indigo-500 absolute top-2 right-2 ring-2 ring-slate-950" />
        </button>

        {/* User Dropdown */}
        <div className="pl-1 border-l border-slate-800/80">
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
