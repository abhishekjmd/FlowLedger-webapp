"use client";

import React, { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  User,
  Mail,
  Shield,
  LogOut,
  Edit3,
  Check,
  Key,
  Calendar,
  Clock,
  Lock,
  Smartphone,
} from "lucide-react";

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-200 truncate">{value}</span>
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-slate-900/60 border border-slate-800 rounded-xl ${className}`}>
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-800/60">
        <Icon className="w-4 h-4 text-indigo-400" />
        <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          {title}
        </h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut({ redirectUrl: "/sign-in" });
  };

  const primaryEmail = user?.primaryEmailAddress?.emailAddress ?? "—";
  const fullName = user?.fullName ?? user?.firstName ?? "—";
  const username = user?.username ?? "—";
  const createdAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";
  const lastSignIn = user?.lastSignInAt
    ? new Date(user.lastSignInAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  const connectedAccounts = user?.externalAccounts ?? [];
  const hasPassword = user?.passwordEnabled;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          Account Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your profile, security, and preferences.
        </p>
      </div>

      {/* Profile Hero */}
      <div className="bg-gradient-to-r from-slate-900/80 to-indigo-950/30 border border-slate-800 rounded-xl p-5">
        {isLoaded ? (
          <div className="flex items-center gap-4">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={fullName}
                className="w-14 h-14 rounded-full ring-2 ring-indigo-500/40 object-cover shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-indigo-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-white truncate">{fullName}</p>
              <p className="text-xs text-slate-400 truncate">{primaryEmail}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Member since {createdAt}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 animate-pulse">
            <div className="w-14 h-14 rounded-full bg-slate-800 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-36 bg-slate-800 rounded" />
              <div className="h-3 w-48 bg-slate-800 rounded" />
            </div>
          </div>
        )}
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Profile Details */}
        <SectionCard title="Profile" icon={User}>
          <div className="space-y-4">
            <InfoItem label="Full Name" value={fullName} />
            <InfoItem label="Username" value={username} />
          </div>
        </SectionCard>

        {/* Email */}
        <SectionCard title="Email" icon={Mail}>
          <div className="space-y-2">
            <InfoItem label="Primary Email" value={primaryEmail} />
            {connectedAccounts.some((a) => a.emailAddress === primaryEmail) && (
              <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                <Check className="w-3 h-3 text-emerald-400" />
                Verified via connected account
              </p>
            )}
          </div>
        </SectionCard>

        {/* Security */}
        <SectionCard title="Security" icon={Shield}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-300">Password</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {hasPassword
                    ? "Password authentication enabled"
                    : "No password set — using social login"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <Smartphone className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-300">
                  Two-Factor Authentication
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {user?.twoFactorEnabled
                    ? "2FA is enabled on your account"
                    : "2FA is not enabled"}
                </p>
              </div>
              {user?.twoFactorEnabled && (
                <span className="ml-auto text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                  Active
                </span>
              )}
            </div>
          </div>
        </SectionCard>

        {/* Account Info */}
        <SectionCard title="Account Info" icon={Calendar}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <InfoItem label="Member Since" value={createdAt} />
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <InfoItem label="Last Sign In" value={lastSignIn} />
            </div>
          </div>
        </SectionCard>

        {/* Connected Accounts */}
        {connectedAccounts.length > 0 && (
          <SectionCard title="Connected Accounts" icon={Key} className="md:col-span-2">
            <div className="flex flex-wrap gap-3">
              {connectedAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-lg"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300 uppercase">
                    {account.provider?.charAt(0) ?? "?"}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-200 capitalize">
                      {account.provider}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[150px]">
                      {account.emailAddress ?? "Connected"}
                    </p>
                  </div>
                  <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
                </div>
              ))}
            </div>
          </SectionCard>
        )}
      </div>

      {/* Sign Out */}
      <div className="flex items-center justify-between bg-rose-950/20 border border-rose-900/40 rounded-xl px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-slate-200">Sign Out</p>
          <p className="text-xs text-slate-500">
            Sign out from FlowLedger on this device.
          </p>
        </div>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600/20 border border-rose-500/30 text-rose-400 hover:bg-rose-600/30 hover:text-rose-300 transition-all text-xs font-semibold disabled:opacity-50"
        >
          <LogOut className="w-3.5 h-3.5" />
          {signingOut ? "Signing out…" : "Sign Out"}
        </button>
      </div>
    </div>
  );
}
