import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Expense } from "@/types/api";
import { formatCurrency } from "@/lib/utils";

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  expense,
  loading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  expense: Expense | null;
  loading?: boolean;
}) {
  if (!expense) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Transaction"
      maxWidth="sm"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p className="text-xs font-medium leading-relaxed">
            Are you sure you want to permanently delete this expense? This action cannot be undone.
          </p>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
          <p className="text-slate-400">Transaction:</p>
          <p className="font-bold text-slate-100 text-sm">{expense.title}</p>
          <p className="font-semibold text-rose-400">{formatCurrency(expense.amount)}</p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            loading={loading}
            onClick={async () => {
              await onConfirm();
              onClose();
            }}
          >
            Delete Expense
          </Button>
        </div>
      </div>
    </Modal>
  );
}
