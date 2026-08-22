import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/query-provider";
import { AuthSyncProvider } from "@/providers/auth-sync-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowLedger — Next-Gen Expense & Bill Splitting Platform",
  description:
    "Enterprise-grade expense management, group bill splitting, and financial intelligence for individuals and teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
      appearance={{
        variables: {
          colorPrimary: "#4f46e5",
          colorBackground: "#0f172a",
        },
      }}
    >
      <html lang="en" className="dark">
        <body className="bg-[#090d16] text-slate-100 min-h-screen antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
          <QueryProvider>
            <AuthSyncProvider>{children}</AuthSyncProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
