import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm",
      elevated: "bg-slate-900 border border-slate-700/60 shadow-xl shadow-black/40",
      interactive:
        "bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40 transition-all duration-200 cursor-pointer",
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-2xl p-6 text-slate-100", variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base font-semibold text-slate-100 tracking-tight", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-slate-400 font-normal", className)} {...props} />;
}
