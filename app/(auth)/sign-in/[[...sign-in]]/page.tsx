import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Wallet, ArrowLeft } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-[#090d16] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs">
            <Wallet className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm text-white">{APP_NAME}</span>
        </div>
      </div>

      <div className="z-10 w-full max-w-md flex justify-center">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard"
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
