"use client";

import React from "react";
import { UserProfile } from "@clerk/nextjs";
import { Settings } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your personal profile, security preferences, and Clerk identity.
        </p>
      </div>

      <div className="flex justify-center md:justify-start">
        <UserProfile
          appearance={{
            variables: {
              colorPrimary: "#4f46e5",
              colorBackground: "#0f172a",
            },
          }}
        />
      </div>
    </div>
  );
}
