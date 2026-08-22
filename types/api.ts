export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

export interface UserProfile {
  id: number;
  user_id: number;
  avatar_url: string | null;
  avatar_filename: string | null;
  avatar_color: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  clerk_id: string | null;
  email: string;
  name: string;
  username: string;
  verified: boolean;
  profile?: UserProfile | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  icon?: string | null;
  color?: string | null;
}

export interface ExpenseSplit {
  id: number;
  expense_id: number;
  user_id: number;
  amount: string | number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface Expense {
  id: number;
  title: string;
  amount: string | number;
  date: string;
  user_id: number;
  category_id: number;
  group_id?: number | null;
  description?: string | null;
  is_recurring?: boolean;
  recurrence?: string | null;
  category?: Category;
  user?: {
    name: string;
    email: string;
  };
  splits?: ExpenseSplit[];
  created_at: string;
  updated_at: string;
}

export interface ExpensePagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ExpenseListResponse {
  expenses: Expense[];
  pagination: ExpensePagination;
}

export interface GroupMember {
  id: number;
  group_id: number;
  user_id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface Group {
  id: number;
  name: string;
  description?: string | null;
  owner_id: number;
  members?: GroupMember[];
  _count?: {
    expenses: number;
  };
  created_at: string;
  updated_at: string;
}

export interface GroupBalance {
  userId: number;
  name: string;
  netBalance: number;
}

export interface GroupDetails extends Group {
  expenses: Expense[];
  settlements: Array<{
    id: number;
    payer_id: number;
    receiver_id: number;
    amount: string | number;
    date: string;
    payer?: { name: string };
    receiver?: { name: string };
  }>;
  balances: GroupBalance[];
}

export interface AnalyticsSummary {
  currentMonth: number;
  lastMonth: number;
  difference: number;
}

export interface CategoryBreakdown {
  id: number;
  name: string;
  amount: number;
  count: number;
}

export interface MonthlyTrend {
  month: string;
  year: number;
  amount: number;
}

export type SplitType = "EQUAL" | "EXACT" | "PERCENTAGE" | "SHARES";

export interface ExpensePayerItem {
  user_id: number;
  amount: number;
}

export interface ExpenseSplitItem {
  user_id: number;
  amount?: number;
  percentage?: number;
  shares?: number;
}

export interface CreateExpensePayload {
  title: string;
  amount: number;
  date?: string;
  category_id: number;
  group_id?: number | null;
  description?: string;
  split_type?: SplitType;
  is_recurring?: boolean;
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  payers?: ExpensePayerItem[];
  splits?: ExpenseSplitItem[];
}

export interface UpdateExpensePayload {
  title?: string;
  amount?: number;
  category_id?: number;
  description?: string;
  split_type?: SplitType;
  payers?: ExpensePayerItem[];
  splits?: ExpenseSplitItem[];
}

export interface PersonGroupBreakdown {
  groupId: number;
  groupName: string;
  amount: string;
}

export interface CounterpartyBalance {
  userId: number;
  name: string;
  email: string;
  amount: string;
  groups: PersonGroupBreakdown[];
}

export interface GroupBalanceSummary {
  groupId: number;
  groupName: string;
  amount: string;
}

export interface SettlementSummary {
  id: number;
  date: string;
  payer: { id: number; name: string };
  receiver: { id: number; name: string };
  amount: string;
  group: { id: number; name: string } | null;
  note?: string | null;
}

export interface GlobalBalancesData {
  summary: {
    totalYouOwe: string;
    totalOwedToYou: string;
    netBalance: string;
  };
  peopleYouOwe: CounterpartyBalance[];
  peopleWhoOweYou: CounterpartyBalance[];
  groupBalances: GroupBalanceSummary[];
  settlements: SettlementSummary[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateGroupPayload {
  name: string;
  description?: string;
  member_ids?: number[];
}

export interface InviteMemberPayload {
  email: string;
}

export interface InviteMemberResponse {
  isNewUser?: boolean;
  inviteToken?: string;
  groupName?: string;
  email?: string;
  id?: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface SettleGroupPayload {
  payer_id: number;
  receiver_id: number;
  amount: number;
}

