import Link from "next/link";
import {
  Wallet,
  ArrowRight,
  ShieldCheck,
  Zap,
  PieChart,
  Users,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  Receipt,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <header className="h-20 px-6 md:px-12 max-w-7xl mx-auto w-full flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white block">
              {APP_NAME}
            </span>
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block -mt-1">
              Fintech Platform
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open App
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-12 pb-24 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for Modern Expense Tracking & Bill Splitting</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Track expenses effortlessly. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Split bills with zero friction.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {APP_TAGLINE}. Full cross-platform suite with automated recurring expenses, category intelligence, and group settlement algorithms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto px-8" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Launch Dashboard
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="max-w-6xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left z-10">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Receipt className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Smart Expense Logging</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Categorize, schedule recurring expenses, and inspect your monthly spending with precise multi-filter search.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Collaborative Groups</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Share trips, house expenses, and dinners. Real-time balance calculations ensure everyone knows who owes what.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Flow Intelligence</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Heuristic analytics, 6-month visual trends, and automated financial insights to keep your monthly budget in check.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 px-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} FlowLedger Suite. Connected to unified Express & PostgreSQL backend.</p>
      </footer>
    </div>
  );
}
