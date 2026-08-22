import React from "react";
import { AlertCircle, FolderOpen, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ApiErrorState({
  title = "Failed to load data",
  error,
  onRetry,
}: {
  title?: string;
  error?: unknown;
  onRetry?: () => void;
}) {
  const errorMessage =
    error instanceof Error ? error.message : "Something went wrong while communicating with the server.";

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-rose-500/5 border border-rose-500/20 rounded-2xl">
      <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-slate-100 mb-1">{title}</h4>
      <p className="text-xs text-rose-300/80 max-w-sm mb-4 leading-relaxed">{errorMessage}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          Try Again
        </Button>
      )}
    </div>
  );
}

export function EmptyState({
  title = "No data available",
  description = "Get started by adding your first transaction.",
  action,
  icon: Icon = FolderOpen,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: any;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/30">
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-base font-semibold text-slate-100 mb-1">{title}</h4>
      <p className="text-xs text-slate-400 max-w-xs mb-5 leading-relaxed">{description}</p>
      {action}
    </div>
  );
}
