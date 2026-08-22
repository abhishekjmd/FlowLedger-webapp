"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { apiClient } from "@/lib/api/client";
import { GlobalBalancesData } from "@/types/api";

export function useGlobalBalances(initialPage = 1, initialLimit = 10) {
  const { isSignedIn, isLoaded } = useAuth();
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const isEnabled = isLoaded && !!isSignedIn;

  const query = useQuery({
    queryKey: ["balances", page, limit],
    queryFn: async () => {
      const res = await apiClient.get<{ data: GlobalBalancesData }>("/expenses/balances", {
        params: { page, limit },
      });
      return res.data.data;
    },
    enabled: isEnabled,
  });

  return {
    balances: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    page,
    limit,
    setPage,
    setLimit,
  };
}
