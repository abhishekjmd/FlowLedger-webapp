"use client";

import React, { useState, useMemo } from "react";
import {
  ExpenseTable,
  ExpenseFilterBar,
  ExpenseModal,
  DeleteConfirmDialog,
  useExpenses,
  useCategories,
} from "@/features/expenses";
import { ApiErrorState, EmptyState } from "@/components/shared/api-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus, Receipt } from "lucide-react";
import { Expense, CreateExpensePayload, UpdateExpensePayload } from "@/types/api";
import { formatCurrency } from "@/lib/utils";

export default function ExpensesPage() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);

  const {
    expenses,
    pagination,
    isLoading,
    isError,
    error,
    refetch,
    createExpense,
    isCreating,
    updateExpense,
    isUpdating,
    deleteExpense,
    isDeleting,
  } = useExpenses({
    page,
    limit: 10,
    category_id: selectedCategoryId,
  });

  const { categories } = useCategories();

  // Client-side title / notes filter on current page
  const filteredExpenses = useMemo(() => {
    if (!search.trim()) return expenses;
    const q = search.toLowerCase();
    return expenses.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        (e.description && e.description.toLowerCase().includes(q))
    );
  }, [expenses, search]);

  const totalPageAmount = filteredExpenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const handleOpenCreate = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data: CreateExpensePayload | UpdateExpensePayload) => {
    if (editingExpense) {
      await updateExpense({ id: editingExpense.id, payload: data as UpdateExpensePayload });
    } else {
      await createExpense(data as CreateExpensePayload);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingExpense) return;
    await deleteExpense(deletingExpense.id);
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategoryId(undefined);
    setPage(1);
  };

  const hasActiveFilters = Boolean(search || selectedCategoryId);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Expenses
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage, filter, and inspect personal and shared ledger transactions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="md"
            onClick={handleOpenCreate}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Expense
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <ExpenseFilterBar
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        categoryId={selectedCategoryId}
        onCategoryChange={(id) => {
          setSelectedCategoryId(id);
          setPage(1);
        }}
        categories={categories}
        onReset={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Summary KPI pill */}
      {!isLoading && !isError && filteredExpenses.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400">
          <span>
            Showing <strong className="text-slate-200">{filteredExpenses.length}</strong> items
          </span>
          <span>
            Page Subtotal:{" "}
            <strong className="text-indigo-400 font-bold">
              {formatCurrency(totalPageAmount)}
            </strong>
          </span>
        </div>
      )}

      {/* Content State */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : isError ? (
        <ApiErrorState
          title="Could not load expenses"
          error={error}
          onRetry={refetch}
        />
      ) : filteredExpenses.length === 0 ? (
        <EmptyState
          title={hasActiveFilters ? "No matching expenses" : "No expenses recorded yet"}
          description={
            hasActiveFilters
              ? "Try adjusting your search query or category filters."
              : "Log your first expense to begin tracking your cash flow."
          }
          icon={Receipt}
          action={
            hasActiveFilters ? (
              <Button variant="secondary" size="sm" onClick={handleResetFilters}>
                Clear Filters
              </Button>
            ) : (
              <Button size="sm" onClick={handleOpenCreate} leftIcon={<Plus className="w-4 h-4" />}>
                Add Expense
              </Button>
            )
          }
        />
      ) : (
        <ExpenseTable
          expenses={filteredExpenses}
          pagination={pagination}
          onPageChange={(newPage) => setPage(newPage)}
          onEdit={handleOpenEdit}
          onDelete={(exp) => setDeletingExpense(exp)}
        />
      )}

      {/* Create / Edit Modal */}
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingExpense}
        loading={isCreating || isUpdating}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmDialog
        isOpen={Boolean(deletingExpense)}
        onClose={() => setDeletingExpense(null)}
        onConfirm={handleConfirmDelete}
        expense={deletingExpense}
        loading={isDeleting}
      />
    </div>
  );
}
