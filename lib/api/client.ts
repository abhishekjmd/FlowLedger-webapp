import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ApiResponse } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is required to configure the FlowLedger API client.");
}

let tokenGetter: (() => Promise<string | null>) | null = null;

export const setApiTokenGetter = (getter: (() => Promise<string | null>) | null) => {
  tokenGetter = getter;
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  let token: string | null = null;

  if (tokenGetter) {
    try {
      token = await tokenGetter();
    } catch (error) {
      console.error("[API Client] Failed to retrieve auth token from getter:", error);
    }
  }

  // Fallback to window.Clerk session if tokenGetter not yet registered
  if (!token && typeof window !== "undefined") {
    const clerk = (window as unknown as { Clerk?: { session?: { getToken: () => Promise<string | null> } } }).Clerk;
    if (clerk?.session) {
      try {
        token = await clerk.session.getToken();
      } catch (error) {
        console.error("[API Client] Fallback Clerk token error:", error);
      }
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    const errorData = error.response?.data;
    const message = errorData?.message || error.message || "An unexpected error occurred";
    
    if (process.env.NODE_ENV === "development") {
      console.warn(`[API Error ${error.response?.status || "Network"}]:`, message, error.config?.url);
    }

    return Promise.reject(new Error(message));
  }
);

export const getApiErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected error occurred. Please try again.";
};
