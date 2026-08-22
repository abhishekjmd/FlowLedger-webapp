"use client";

import React from "react";
import { SettlementSummary } from "@/types/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettlementHistoryTableProps {
  settlements: SettlementSummary[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

export function SettlementHistoryTable({
  settlements,
  pagination,
  onPageChange,
}: SettlementHistoryTableProps) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Settlement History</h2>
        </div>
        <span className="text-xs text-slate-400">
          Showing page {pagination.page} of {Math.max(1, pagination.totalPages)}
        </span>
      </div>

      {settlements.length === 0 ? (
        <div className="py-8 text-center border border-dashed border-slate-800/80 rounded-xl">
          <p className="text-sm font-medium text-slate-300">No recorded settlements yet</p>
          <p className="text-xs text-slate-500 mt-1">
            Settling balances inside a group will record historical proof here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Payer (Who Paid)</th>
                <th className="py-3 px-4">Receiver (Paid To)</th>
                <th className="py-3 px-4">Group</th>
                <th className="py-3 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {settlements.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 text-slate-400 text-xs">{formatDate(s.date)}</td>
                  <td className="py-3 px-4 font-medium text-white">{s.payer.name}</td>
                  <td className="py-3 px-4 font-medium text-white">{s.receiver.name}</td>
                  <td className="py-3 px-4 text-xs text-slate-400">
                    {s.group ? s.group.name : "Personal"}
                  </td>
                  <td className="py-3 px-4 text-right font-extrabold text-emerald-400">
                    {formatCurrency(s.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <span className="text-xs text-slate-400">
            Total {pagination.total} settlements recorded
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => onPageChange(pagination.page - 1)}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => onPageChange(pagination.page + 1)}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
