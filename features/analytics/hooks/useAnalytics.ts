"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { DateRangePreset } from "../types";
import { fetchAnalyticsOverview, exportAnalyticsCSV } from "../services/analytics.service";

export function useAnalytics() {
  const { isSignedIn, isLoaded } = useAuth();
  const [range, setRange] = useState<DateRangePreset>("this-month");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const isEnabled = isLoaded && !!isSignedIn;

  const query = useQuery({
    queryKey: ["analytics", "overview", range, startDate, endDate],
    queryFn: () => fetchAnalyticsOverview({ range, startDate, endDate }),
    enabled: isEnabled,
  });

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      await exportAnalyticsCSV({ range, startDate, endDate });
    } catch (err) {
      console.error("Export CSV failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const setCustomRange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    setRange("custom");
  };

  return {
    range,
    setRange,
    startDate,
    endDate,
    setCustomRange,
    selectedCategory,
    setSelectedCategory,
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isExporting,
    handleExportCSV,
  };
}
