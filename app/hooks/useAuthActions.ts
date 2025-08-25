'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { AuthService } from '../services/authService';
import { StorageService } from '../utils/storage';
import { ROUTES } from '../constants/routes';

export interface UseAuthActionsReturn {
  login: (phoneNumber: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useAuthActions(): UseAuthActionsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = useCallback(async (phoneNumber: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await AuthService.login(phoneNumber);
      
      // Store user data
      StorageService.setUser(user);
      
      // Redirect to dashboard
      router.push(ROUTES.DASHBOARD);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    // Clear stored data
    StorageService.clearAuth();
    
    // Redirect to auth page
    router.push(ROUTES.AUTH);
  }, [router]);

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
