"use client";

import React from "react";
import { Search, X, Filter } from "lucide-react";
import { Category } from "@/types/api";

export function ExpenseFilterBar({
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  categories,
  onReset,
  hasActiveFilters,
}: {
  search: string;
  onSearchChange: (val: string) => void;
  categoryId?: number;
  onCategoryChange: (id?: number) => void;
  categories: Category[];
  onReset: () => void;
  hasActiveFilters: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter by title or notes..."
          className="w-full h-10 pl-9 pr-9 bg-slate-950 text-xs text-slate-200 placeholder:text-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Dropdown */}
      <div className="flex items-center gap-2">
        <div className="relative min-w-[160px]">
          <select
            value={categoryId || ""}
            onChange={(e) =>
              onCategoryChange(e.target.value ? Number(e.target.value) : undefined)
            }
            className="w-full h-10 px-3 bg-slate-950 text-xs text-slate-300 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="h-10 px-3 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/60 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
