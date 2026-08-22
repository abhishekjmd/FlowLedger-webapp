"use client";

import React from "react";
import { Expense } from "@/types/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CATEGORY_META, DEFAULT_CATEGORY_META } from "@/lib/constants";
import { Edit2, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExpenseRowProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export function ExpenseDesktopRow({ expense, onEdit, onDelete }: ExpenseRowProps) {
  const categoryName = expense.category?.name || "General";
  const meta = CATEGORY_META[categoryName] || DEFAULT_CATEGORY_META;
  const Icon = meta.icon;

  return (
    <tr className="hover:bg-slate-800/30 transition-colors group">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: meta.bgColor, color: meta.color }}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-100 text-sm block">
              {expense.title}
            </span>
            {expense.description && (
              <span className="text-[11px] text-slate-400 block truncate max-w-xs">
                {expense.description}
              </span>
            )}
          </div>
        </div>
      </td>

      <td className="py-4 px-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800/80 border border-slate-700/50 text-slate-200">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: meta.color }}
          />
          {categoryName}
        </span>
      </td>

      <td className="py-4 px-4 text-slate-400 font-mono">
        {formatDate(expense.date)}
      </td>

      <td className="py-4 px-4">
        {expense.group_id ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
            <Users className="w-3 h-3" />
            Group Bill
          </span>
        ) : (
          <span className="text-slate-400 text-[11px]">Personal</span>
        )}
      </td>

      <td className="py-4 px-6 text-right">
        <span className="font-extrabold text-slate-100 text-sm block">
          {formatCurrency(expense.amount)}
        </span>
        {expense.is_recurring && (
          <span className="text-[10px] text-indigo-400 font-semibold block">
            Recurring
          </span>
        )}
      </td>

      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(expense)}
            title="Edit Expense"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(expense)}
            title="Delete Expense"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function ExpenseMobileCard({ expense, onEdit, onDelete }: ExpenseRowProps) {
  const categoryName = expense.category?.name || "General";
  const meta = CATEGORY_META[categoryName] || DEFAULT_CATEGORY_META;
  const Icon = meta.icon;

  return (
    <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: meta.bgColor, color: meta.color }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-100 text-sm block">
              {expense.title}
            </span>
            <span className="text-xs text-slate-400">
              {formatDate(expense.date)} • {categoryName}
            </span>
          </div>
        </div>

        <span className="font-extrabold text-slate-100 text-sm">
          {formatCurrency(expense.amount)}
        </span>
      </div>

      {expense.description && (
        <p className="text-xs text-slate-400 bg-slate-950/60 p-2 rounded-xl">
          {expense.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
        <div>
          {expense.group_id && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
              <Users className="w-3 h-3" />
              Group
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(expense)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(expense)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
