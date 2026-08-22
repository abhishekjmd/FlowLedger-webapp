import {
  LayoutDashboard,
  Receipt,
  Users,
  Scale,
  PieChart,
  Settings,
  Utensils,
  Car,
  ShoppingBag,
  HeartPulse,
  Film,
  FileText,
  Plane,
  GraduationCap,
} from "lucide-react";

export const APP_NAME = "FlowLedger";
export const APP_TAGLINE = "Intelligent Expense Management & Bill Splitting";

export const NAV_ITEMS = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: Receipt,
  },
  {
    title: "Groups",
    href: "/groups",
    icon: Users,
    badge: "Soon",
  },
  {
    title: "Balances",
    href: "/balances",
    icon: Scale,
    badge: "Soon",
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: PieChart,
    badge: "Soon",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    badge: "Soon",
  },
];

export const CATEGORY_META: Record<
  string,
  { icon: any; color: string; bgColor: string }
> = {
  Food: {
    icon: Utensils,
    color: "#F59E0B",
    bgColor: "rgba(245, 158, 11, 0.12)",
  },
  Transport: {
    icon: Car,
    color: "#8B5CF6",
    bgColor: "rgba(139, 92, 246, 0.12)",
  },
  Shopping: {
    icon: ShoppingBag,
    color: "#F43F5E",
    bgColor: "rgba(244, 63, 94, 0.12)",
  },
  Health: {
    icon: HeartPulse,
    color: "#10B981",
    bgColor: "rgba(16, 185, 129, 0.12)",
  },
  Entertainment: {
    icon: Film,
    color: "#EC4899",
    bgColor: "rgba(236, 72, 153, 0.12)",
  },
  Bills: {
    icon: FileText,
    color: "#6366F1",
    bgColor: "rgba(99, 102, 241, 0.12)",
  },
  Travel: {
    icon: Plane,
    color: "#0EA5E9",
    bgColor: "rgba(14, 165, 233, 0.12)",
  },
  Education: {
    icon: GraduationCap,
    color: "#14B8A6",
    bgColor: "rgba(20, 184, 166, 0.12)",
  },
};

export const DEFAULT_CATEGORY_META = {
  icon: Receipt,
  color: "#6366F1",
  bgColor: "rgba(99, 102, 241, 0.12)",
};
