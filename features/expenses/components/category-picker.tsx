"use client";

import React from "react";
import { Category } from "@/types/api";
import { CATEGORY_META, DEFAULT_CATEGORY_META } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CategoryPickerProps {
  categories: Category[];
  selectedCategoryId: number;
  onSelect: (id: number) => void;
}

export function CategoryPicker({
  categories,
  selectedCategoryId,
  onSelect,
}: CategoryPickerProps) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
        Category
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {categories.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          const meta = CATEGORY_META[cat.name] || DEFAULT_CATEGORY_META;
          const Icon = meta.icon;

          return (
            <button
              type="button"
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={cn(
                "flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all text-left",
                isSelected
                  ? "bg-indigo-600/15 border-indigo-500 text-indigo-300 shadow-sm"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              )}
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: meta.bgColor, color: meta.color }}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
