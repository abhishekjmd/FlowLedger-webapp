"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Expense,
  CreateExpensePayload,
  UpdateExpensePayload,
  SplitType,
  ExpensePayerItem,
  ExpenseSplitItem,
} from "@/types/api";
import { useCategories } from "../hooks/useCategories";
import { CategoryPicker } from "./category-picker";
import { Users, PieChart, Calculator, Sliders, ChevronDown } from "lucide-react";


interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateExpensePayload | UpdateExpensePayload) => Promise<void>;
  initialData?: Expense | null;
  loading?: boolean;
}

interface FormValues {
  title: string;
  amount: string;
  category_id: number;
  group_id?: number | null;
  date: string;
  description?: string;
  split_type: SplitType;
}

export function ExpenseModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  loading = false,
}: ExpenseModalProps) {
  const { categories, groups } = useCategories();
  const [splitType, setSplitType] = useState<SplitType>("EQUAL");
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      amount: "",
      category_id: 1,
      group_id: null,
      date: new Date().toISOString().split("T")[0],
      description: "",
      split_type: "EQUAL",
    },
  });

  const selectedCategoryId = watch("category_id");
  const selectedGroupId = watch("group_id");
  const currentAmountStr = watch("amount");

  // Selected Group details if available
  const selectedGroup = groups.find((g) => g.id === Number(selectedGroupId));
  const groupMembers = selectedGroup?.members ?? [];

  useEffect(() => {
    if (!isOpen) return;
    setValidationError(null);

    if (initialData) {
      reset({
        title: initialData.title,
        amount: String(initialData.amount),
        category_id: initialData.category_id,
        group_id: initialData.group_id ?? null,
        date: initialData.date ? initialData.date.split("T")[0] : new Date().toISOString().split("T")[0],
        description: initialData.description || "",
        split_type: "EQUAL",
      });
      setSplitType("EQUAL");
    } else {
      reset({
        title: "",
        amount: "",
        category_id: categories[0]?.id || 1,
        group_id: null,
        date: new Date().toISOString().split("T")[0],
        description: "",
        split_type: "EQUAL",
      });
      setSplitType("EQUAL");
    }
  }, [isOpen, initialData, reset, categories]);

  const handleFormSubmit = async (values: FormValues) => {
    const numericAmount = parseFloat(values.amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setValidationError("Amount must be a valid positive number");
      return;
    }

    setValidationError(null);

    const payload: CreateExpensePayload = {
      title: values.title.trim(),
      amount: numericAmount,
      category_id: Number(values.category_id),
      group_id: values.group_id ? Number(values.group_id) : null,
      date: values.date ? new Date(values.date).toISOString() : new Date().toISOString(),
      description: values.description?.trim() || undefined,
      split_type: splitType,
    };

    await onSubmit(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Transaction" : "Record New Expense"}
      description={
        initialData
          ? "Update transaction details."
          : "Log personal or group expenses with flexible split modes."
      }
      maxWidth="4xl"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {validationError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-medium">
            {validationError}
          </div>
        )}

        {/* Row 1: Title & Amount (Side-by-side on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start">
          <div className="sm:col-span-7">
            <Input
              label="Title / Description"
              placeholder="e.g. Team Dinner, Groceries, Cloud Hosting"
              {...register("title", { required: "Title is required" })}
              error={errors.title?.message}
            />
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Amount (INR)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-lg font-bold text-slate-400 pointer-events-none">
                ₹
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("amount", {
                  required: "Amount is required",
                  min: { value: 0.01, message: "Amount must be greater than 0" },
                })}
                className="w-full h-11 pl-8 pr-3.5 bg-slate-950 text-lg font-bold text-white placeholder:text-slate-600 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-rose-400 mt-1 font-medium">{errors.amount.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: Date & Group (Side-by-side) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Date
            </label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full h-11 px-3.5 bg-slate-950 text-slate-200 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Group (Optional)
            </label>
            <div className="relative">
              <select
                value={selectedGroupId || ""}
                onChange={(e) =>
                  setValue("group_id", e.target.value ? Number(e.target.value) : null)
                }
                className="w-full h-11 pl-3.5 pr-10 bg-slate-950 text-slate-200 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer transition-colors hover:border-slate-700"
              >
                <option value="">Personal Expense (No Group)</option>
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 3: Category Picker */}
        <CategoryPicker
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelect={(id) => setValue("category_id", id)}
        />

        {/* Row 4: Split Type Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Split Mode
          </label>
          <div className="grid grid-cols-4 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {[
              { type: "EQUAL", label: "Equal", icon: Users },
              { type: "EXACT", label: "Exact", icon: Calculator },
              { type: "PERCENTAGE", label: "%", icon: PieChart },
              { type: "SHARES", label: "Shares", icon: Sliders },
            ].map((mode) => {
              const Icon = mode.icon;
              const isSelected = splitType === mode.type;
              return (
                <button
                  key={mode.type}
                  type="button"
                  onClick={() => setSplitType(mode.type as SplitType)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all ${isSelected
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Group Member Split Preview Panel */}
        {selectedGroup && groupMembers.length > 0 && (
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Group Ledger Members ({groupMembers.length})</span>
              <span className="text-[11px] text-indigo-400">
                Mode: {splitType} Split
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {groupMembers.map((member) => (
                <div
                  key={member.user_id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80 text-xs"
                >
                  <span className="font-semibold text-slate-200 truncate">
                    {member.user.name || member.user.email}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {splitType === "EQUAL" && currentAmountStr
                      ? `₹${(parseFloat(currentAmountStr) / groupMembers.length || 0).toFixed(2)}`
                      : "Member"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Row 5: Notes / Description Input */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Notes / Receipt Details
          </label>
          <textarea
            rows={2}
            placeholder="Add any receipts or additional transaction context..."
            {...register("description")}
            className="w-full p-3 bg-slate-950 text-slate-200 placeholder:text-slate-600 rounded-xl border border-slate-800 text-xs focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        {/* Row 6: Actions Footer */}
        <div className="flex items-center justify-end gap-3 pt-3.5 border-t border-slate-800/80">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {initialData ? "Save Changes" : "Create Expense"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
