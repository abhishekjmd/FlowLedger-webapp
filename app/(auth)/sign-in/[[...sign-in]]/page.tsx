import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { Wallet, ArrowLeft } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-[#090d16] relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xs shadow-lg shadow-indigo-600/30">
            <Wallet className="w-4 h-4" />
          </div>
          <span className="font-bold text-base text-white">{APP_NAME}</span>
        </div>
      </div>

      {/* Real Native Clerk SignIn with Full Dark Styling */}
      <div className="z-10 w-full max-w-md flex justify-center">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard"
          forceRedirectUrl="/dashboard"
          appearance={{
            baseTheme: dark,
            elements: {
              rootBox: "w-full",
              cardBox: "w-full shadow-2xl rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900/90 backdrop-blur-xl",
              card: "w-full bg-slate-900/90 border-0 p-8 text-slate-100",
              headerTitle: "text-white font-extrabold text-2xl tracking-tight text-center",
              headerSubtitle: "text-slate-400 text-xs text-center mt-1.5",
              socialButtonsBlockButton: "bg-slate-800/90 border border-slate-700/80 hover:bg-slate-800 text-slate-100 rounded-2xl h-11 text-xs font-semibold transition-all",
              socialButtonsBlockButtonText: "text-slate-200 font-semibold text-xs",
              dividerLine: "bg-slate-800",
              dividerText: "text-slate-500 text-[11px] font-semibold uppercase tracking-wider bg-slate-900 px-3",
              formFieldLabel: "text-slate-300 text-xs font-semibold mb-1.5",
              formFieldInput: "bg-slate-800/80 border border-slate-700/80 text-white text-xs rounded-xl h-11 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all",
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-2xl h-11 shadow-lg shadow-indigo-600/25 transition-all mt-2",
              footerActionText: "text-slate-400 text-xs",
              footerActionLink: "text-indigo-400 hover:text-indigo-300 font-semibold text-xs transition-colors",
              identityPreviewText: "text-slate-200 font-medium text-xs",
              identityPreviewEditButtonIcon: "text-indigo-400",
              formResendCodeLink: "text-indigo-400 hover:text-indigo-300 text-xs font-semibold",
              otpCodeFieldInput: "bg-slate-800/80 border border-slate-700/80 text-white text-base rounded-xl font-mono",
            },
          } as any}
        />
      </div>
    </div>
  );
}
