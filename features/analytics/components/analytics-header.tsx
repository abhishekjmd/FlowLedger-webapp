"use client";

import React, { useState } from "react";
import { Download, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { DateRangePreset } from "../types";

interface AnalyticsHeaderProps {
  range: DateRangePreset;
  onRangeChange: (range: DateRangePreset) => void;
  onCustomRange: (start: string, end: string) => void;
  onExportCSV: () => void;
  isExporting: boolean;
}

const PRESETS: { label: string; value: DateRangePreset }[] = [
  { label: "This Week", value: "this-week" },
  { label: "This Month", value: "this-month" },
  { label: "Last 3 Months", value: "last-3-months" },
  { label: "This Year", value: "this-year" },
  { label: "Custom Range", value: "custom" },
];

export function AnalyticsHeader({
  range,
  onRangeChange,
  onCustomRange,
  onExportCSV,
  isExporting,
}: AnalyticsHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSelectPreset = (preset: DateRangePreset) => {
    if (preset === "custom") {
      setIsModalOpen(true);
    } else {
      onRangeChange(preset);
    }
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      onCustomRange(startDate, endDate);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Deep Analytics
          </h1>
          <Badge variant="primary" className="uppercase text-[10px] font-bold">
            Live Feed
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Understand your spending patterns, cash flow, categories, and financial trends.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-sm">
          {PRESETS.map((preset) => {
            const isActive = range === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => handleSelectPreset(preset.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onExportCSV}
          disabled={isExporting}
          leftIcon={
            isExporting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5 text-indigo-400" />
            )
          }
        >
          {isExporting ? "Exporting..." : "Export CSV"}
        </Button>
      </div>

      {/* Custom Date Range Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Custom Date Range"
      >
        <form onSubmit={handleApplyCustom} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Apply Range
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
