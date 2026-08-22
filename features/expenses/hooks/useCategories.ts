"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { apiClient } from "@/lib/api/client";
import { Category, Group } from "@/types/api";

const EMPTY_CATEGORIES: Category[] = [];
const EMPTY_GROUPS: Group[] = [];

export function useCategories() {
  const { isSignedIn, isLoaded } = useAuth();
  const isEnabled = isLoaded && !!isSignedIn;

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await apiClient.get<{ data: Category[] }>("/expenses/categories");
      return res.data.data ?? EMPTY_CATEGORIES;
    },
    enabled: isEnabled,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const groupsQuery = useQuery({
    queryKey: ["groups", "select-options"],
    queryFn: async () => {
      const res = await apiClient.get<{ data: Group[] }>("/expenses/groups");
      return res.data.data ?? EMPTY_GROUPS;
    },
    enabled: isEnabled,
  });

  return {
    categories: categoriesQuery.data ?? EMPTY_CATEGORIES,
    groups: groupsQuery.data ?? EMPTY_GROUPS,
    isLoading: categoriesQuery.isLoading,
  };
}
