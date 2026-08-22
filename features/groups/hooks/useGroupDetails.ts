"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { apiClient } from "@/lib/api/client";
import { GroupDetails, InviteMemberPayload, InviteMemberResponse, SettleGroupPayload } from "@/types/api";

export function useGroupDetails(groupId: number) {
  const queryClient = useQueryClient();
  const { isSignedIn, isLoaded } = useAuth();
  const isEnabled = isLoaded && !!isSignedIn && !isNaN(groupId) && groupId > 0;

  const detailsQuery = useQuery({
    queryKey: ["groups", groupId],
    queryFn: async () => {
      const res = await apiClient.get<{ data: GroupDetails }>(`/expenses/groups/${groupId}`);
      return res.data.data;
    },
    enabled: isEnabled,
  });

  const inviteMutation = useMutation({
    mutationFn: async (payload: InviteMemberPayload) => {
      const res = await apiClient.post<{ data: InviteMemberResponse }>(
        `/expenses/groups/${groupId}/invite`,
        payload
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const settleMutation = useMutation({
    mutationFn: async (payload: SettleGroupPayload) => {
      const res = await apiClient.post(`/expenses/groups/${groupId}/settle`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      queryClient.invalidateQueries({ queryKey: ["balances"] });
    },
  });

  return {
    group: detailsQuery.data,
    isLoading: detailsQuery.isLoading,
    isError: detailsQuery.isError,
    error: detailsQuery.error,
    refetch: detailsQuery.refetch,
    inviteMember: inviteMutation.mutateAsync,
    isInviting: inviteMutation.isPending,
    settleGroup: settleMutation.mutateAsync,
    isSettling: settleMutation.isPending,
  };
}
