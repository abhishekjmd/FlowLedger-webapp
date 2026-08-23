"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Wallet, ArrowLeft, Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle, KeyRound } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp() as any;
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignUp = async () => {
    if (!isLoaded || !signUp) return;
    try {
      setGoogleLoading(true);
      setError(null);
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: any) {
      console.error("Google sign up error:", err);
      setError(err?.errors?.[0]?.message || "Failed to sign up with Google.");
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    if (!email || !password || !firstName) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      // Send verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err?.errors?.[0]?.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    if (!code) {
      setError("Please enter the verification code.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      } else {
        console.log("Verification status:", completeSignUp.status);
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err?.errors?.[0]?.message || "Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

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

      {/* Auth Card */}
      <div className="z-10 w-full max-w-md bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-black/80">
        {!pendingVerification ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                Create an Account
              </h1>
              <p className="text-xs text-slate-400 mt-1.5">
                Join FlowLedger to track expenses and manage shared finances
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={googleLoading || loading}
              className="w-full h-11 px-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-slate-200 text-xs font-semibold flex items-center justify-center gap-3 transition-all disabled:opacity-50"
            >
              {googleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <span className="relative px-3 bg-slate-900 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Or with email
              </span>
            </div>

            {/* Email & Details Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3.5 text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Alex"
                      className="w-full h-11 pl-9 pr-3 bg-slate-800/80 border border-slate-700/80 focus:border-indigo-500 text-slate-100 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Morgan"
                    className="w-full h-11 px-3 bg-slate-800/80 border border-slate-700/80 focus:border-indigo-500 text-slate-100 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-11 pl-10 pr-4 bg-slate-800/80 border border-slate-700/80 focus:border-indigo-500 text-slate-100 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-10 bg-slate-800/80 border border-slate-700/80 focus:border-indigo-500 text-slate-100 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full h-11 mt-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Create Account</span>
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-8 text-center text-xs text-slate-400">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors ml-1"
              >
                Sign in
              </Link>
            </div>
          </>
        ) : (
          /* Email Verification Step */
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold text-white">Verify your email</h1>
              <p className="text-xs text-slate-400 mt-1">
                We sent a 6-digit verification code to{" "}
                <span className="text-slate-200 font-semibold">{email}</span>
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Verification Code
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full h-11 px-4 text-center tracking-widest text-base font-mono bg-slate-800/80 border border-slate-700/80 focus:border-indigo-500 text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:tracking-normal placeholder:font-sans placeholder:text-xs placeholder:text-slate-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>Verify & Continue</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
