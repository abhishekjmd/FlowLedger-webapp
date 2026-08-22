"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { setApiTokenGetter, apiClient } from "@/lib/api/client";

export function AuthSyncProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const syncedRef = useRef<boolean>(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setApiTokenGetter(async () => {
        try {
          return await getToken();
        } catch {
          return null;
        }
      });

      if (!syncedRef.current) {
        syncedRef.current = true;
        apiClient.post("/auth/sync").catch((err) => {
          console.warn("[AuthSync] Syncing user profile note:", err.message);
        });
      }
    } else if (isLoaded && !isSignedIn) {
      syncedRef.current = false;
      setApiTokenGetter(null);
    }
  }, [getToken, isLoaded, isSignedIn]);

  return <>{children}</>;
}
