"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InviteMemberPayload, InviteMemberResponse } from "@/types/api";
import { CheckCircle2, Copy, Check } from "lucide-react";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (payload: InviteMemberPayload) => Promise<InviteMemberResponse>;
  loading?: boolean;
}

export function InviteMemberModal({
  isOpen,
  onClose,
  onInvite,
  loading = false,
}: InviteMemberModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [inviteResult, setInviteResult] = useState<InviteMemberResponse | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setEmail("");
    setError(null);
    setInviteResult(null);
    setCopied(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid email address");
      return;
    }
    setError(null);
    try {
      const res = await onInvite({ email: email.trim().toLowerCase() });
      setInviteResult(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to invite member");
    }
  };

  const copyInviteLink = () => {
    if (inviteResult?.inviteToken) {
      const inviteUrl = `${window.location.origin}/invite/${inviteResult.inviteToken}`;
      navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Invite Group Member"
      description="Add an existing FlowLedger user directly or generate an invitation link."
      maxWidth="md"
    >
      {inviteResult ? (
        <div className="space-y-4 py-2">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-emerald-300">
                {inviteResult.isNewUser ? "Invitation Created" : "Member Added!"}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                {inviteResult.isNewUser
                  ? `An invitation token was generated for ${inviteResult.email}. Share the link below to let them join.`
                  : "The member has been linked to this group ledger."}
              </p>
            </div>
          </div>

          {inviteResult.isNewUser && inviteResult.inviteToken && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Invite Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={`${typeof window !== "undefined" ? window.location.origin : ""}/invite/${inviteResult.inviteToken}`}
                  className="w-full h-10 px-3 bg-slate-950 text-xs text-slate-300 rounded-xl border border-slate-800 font-mono focus:outline-none"
                />
                <Button size="sm" variant="secondary" onClick={copyInviteLink} leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}>
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-3">
            <Button onClick={handleClose}>Done</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="User Email Address"
            type="email"
            placeholder="colleague@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            error={error || undefined}
            required
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Send Invitation
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
