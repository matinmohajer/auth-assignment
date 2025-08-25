'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './useAuth';
import { ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from '../constants/routes';

export interface UseRouteProtectionOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

export function useRouteProtection(options: UseRouteProtectionOptions = {}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  const { redirectTo, requireAuth } = options;

  useEffect(() => {
    if (isLoading) return;

    const isProtectedRoute = PROTECTED_ROUTES.includes(pathname as typeof PROTECTED_ROUTES[number]);
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname as typeof PUBLIC_ROUTES[number]);
    const isAuthenticated = !!user;

    // Handle protected routes (require authentication)
    if (isProtectedRoute && !isAuthenticated) {
      router.push(redirectTo || ROUTES.AUTH);
      return;
    }

    // Handle public routes (redirect if already authenticated)
    if (isPublicRoute && isAuthenticated) {
      router.push(redirectTo || ROUTES.DASHBOARD);
      return;
    }

    // Handle custom requirements
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo || ROUTES.AUTH);
      return;
    }
  }, [user, isLoading, pathname, router, redirectTo, requireAuth]);

  return {
    isAuthenticated: !!user,
    isLoading,
    user,
  };
}
