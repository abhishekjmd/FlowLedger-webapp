"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { GroupMember, SettleGroupPayload } from "@/types/api";

interface SettleUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: GroupMember[];
  onSettle: (payload: SettleGroupPayload) => Promise<void>;
  loading?: boolean;
}

export function SettleUpModal({
  isOpen,
  onClose,
  members,
  onSettle,
  loading = false,
}: SettleUpModalProps) {
  const [payerId, setPayerId] = useState<number>(members[0]?.user_id || 0);
  const [receiverId, setReceiverId] = useState<number>(members[1]?.user_id || members[0]?.user_id || 0);
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen && members.length > 0) {
      if (!payerId || !members.some((m) => m.user_id === payerId)) {
        setPayerId(members[0]?.user_id || 0);
      }
      if (!receiverId || !members.some((m) => m.user_id === receiverId) || receiverId === (members[0]?.user_id || 0)) {
        setReceiverId(members[1]?.user_id || members[0]?.user_id || 0);
      }
    }
  }, [isOpen, members]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      setError("Please enter a valid positive amount");
      return;
    }
    if (payerId === receiverId) {
      setError("Payer and receiver must be different members");
      return;
    }

    setError(null);
    await onSettle({
      payer_id: payerId,
      receiver_id: receiverId,
      amount: num,
    });
    setAmount("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Peer Settlement"
      description="Record a cash or direct payment between group members to settle debts."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Who Paid? (Payer)
          </label>
          <select
            value={payerId}
            onChange={(e) => setPayerId(Number(e.target.value))}
            className="w-full h-11 px-3.5 bg-slate-950 text-slate-200 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-indigo-500"
          >
            {members.map((m) => (
              <option key={m.user_id} value={m.user_id}>
                {m.user.name} ({m.user.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Who Received? (Receiver)
          </label>
          <select
            value={receiverId}
            onChange={(e) => setReceiverId(Number(e.target.value))}
            className="w-full h-11 px-3.5 bg-slate-950 text-slate-200 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-indigo-500"
          >
            {members.map((m) => (
              <option key={m.user_id} value={m.user_id}>
                {m.user.name} ({m.user.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Amount Paid (INR)
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-lg font-bold text-slate-400 pointer-events-none">
              ₹
            </span>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (error) setError(null);
              }}
              required
              className="w-full h-12 pl-10 pr-4 bg-slate-950 text-xl font-bold text-white placeholder:text-slate-600 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Confirm Settlement
          </Button>
        </div>
      </form>
    </Modal>
  );
}
