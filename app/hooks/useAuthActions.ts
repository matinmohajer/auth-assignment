"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AuthService } from "../services/authService";
import { StorageService } from "../utils/storage";
import { ROUTES } from "../constants/routes";
import { useAuth } from "./useAuth";

export interface UseAuthActionsReturn {
  login: (phoneNumber: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useAuthActions(): UseAuthActionsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login: setAuthUser, logout: clearAuthUser } = useAuth();

  const login = useCallback(
    async (phoneNumber: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const user = await AuthService.login(phoneNumber);

        setAuthUser(user);
        StorageService.setUser(user);

        router.push(ROUTES.DASHBOARD);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Login failed";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [router, setAuthUser]
  );

  const logout = useCallback(async () => {
    clearAuthUser();
    StorageService.clearAuth();
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    router.replace(ROUTES.AUTH);
  }, [clearAuthUser, router]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    login,
    logout,
    isLoading,
    error,
    clearError,
  };
}
