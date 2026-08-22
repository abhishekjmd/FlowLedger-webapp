"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { apiClient } from "@/lib/api/client";
import {
  Expense,
  ExpenseListResponse,
  CreateExpensePayload,
  UpdateExpensePayload,
} from "@/types/api";

export interface ExpenseFilters {
  page?: number;
  limit?: number;
  category_id?: number;
  group_id?: number;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export function useExpenses(filters: ExpenseFilters = {}) {
  const queryClient = useQueryClient();
  const { isSignedIn, isLoaded } = useAuth();
  const isEnabled = isLoaded && !!isSignedIn;

  const {
    page = 1,
    limit = 10,
    category_id,
    group_id,
    startDate,
    endDate,
  } = filters;

  const listQuery = useQuery({
    queryKey: ["expenses", { page, limit, category_id, group_id, startDate, endDate }],
    queryFn: async () => {
      const params: Record<string, string | number | undefined> = { page, limit };
      if (category_id) params.category_id = category_id;
      if (group_id) params.group_id = group_id;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const res = await apiClient.get<{ data: ExpenseListResponse }>("/expenses", { params });
      return res.data.data;
    },
    enabled: isEnabled,
  });

  const createMutation = useMutation({
    mutationFn: async (payload: CreateExpensePayload) => {
      const res = await apiClient.post<{ data: Expense }>("/expenses", payload);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      queryClient.invalidateQueries({ queryKey: ["balances"] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: UpdateExpensePayload }) => {
      const res = await apiClient.patch<{ data: Expense }>(`/expenses/${id}`, payload);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      queryClient.invalidateQueries({ queryKey: ["balances"] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/expenses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      queryClient.invalidateQueries({ queryKey: ["balances"] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  return {
    expenses: listQuery.data?.expenses ?? [],
    pagination: listQuery.data?.pagination ?? { total: 0, page: 1, limit: 10, totalPages: 1 },
    isLoading: listQuery.isLoading,
    isError: listQuery.isError,
    error: listQuery.error,
    refetch: listQuery.refetch,
    createExpense: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateExpense: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteExpense: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
