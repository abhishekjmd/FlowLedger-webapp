"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { apiClient } from "@/lib/api/client";
import { Group, CreateGroupPayload } from "@/types/api";

const EMPTY_GROUPS: Group[] = [];

export function useGroups() {
  const queryClient = useQueryClient();
  const { isSignedIn, isLoaded } = useAuth();
  const isEnabled = isLoaded && !!isSignedIn;

  const groupsQuery = useQuery({
    queryKey: ["groups", "list"],
    queryFn: async () => {
      const res = await apiClient.get<{ data: Group[] }>("/expenses/groups");
      return res.data.data ?? EMPTY_GROUPS;
    },
    enabled: isEnabled,
  });

  const createGroupMutation = useMutation({
    mutationFn: async (payload: CreateGroupPayload) => {
      const res = await apiClient.post<{ data: Group }>("/expenses/groups", payload);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });

  return {
    groups: groupsQuery.data ?? EMPTY_GROUPS,
    isLoading: groupsQuery.isLoading,
    isError: groupsQuery.isError,
    error: groupsQuery.error,
    refetch: groupsQuery.refetch,
    createGroup: createGroupMutation.mutateAsync,
    isCreating: createGroupMutation.isPending,
  };
}
