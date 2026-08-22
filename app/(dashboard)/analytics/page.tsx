import React from "react";
import { PieChart } from "lucide-react";
import { EmptyState } from "@/components/shared/api-state";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Deep Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Extended cash flow projections, category drilldowns, and annual comparisons.
        </p>
      </div>

      <EmptyState
        icon={PieChart}
        title="Extended Analytics Suite"
        description="Comprehensive category drilldowns, export to CSV, and budget limit tracking are queued for Phase 2."
      />
    </div>
  );
}
