'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Check if we're in pre-release mode
const isPreRelease = process.env.NEXT_PUBLIC_STATUS === 'pre-release';

// Routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/cv-builder'];

// Routes that should redirect to dashboard if already authenticated
const AUTH_ROUTES = ['/auth/login', '/auth/signup', '/auth/register'];

export default function ProtectedRoute({ 
  children
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading && pathname) {
      const currentPath = pathname;
      
      // Check if user is trying to access an auth route during pre-release
      if (isPreRelease && currentPath.startsWith('/auth')) {
        router.push('/pre-release');
        setIsChecking(false);
        return;
      }

      // Check if current route requires authentication
      const isProtectedRoute = PROTECTED_ROUTES.some(route => 
        currentPath === route || currentPath.startsWith(route + '/')
      );

      // Check if current route is an auth route (login, signup, register)
      const isAuthRoute = AUTH_ROUTES.some(route => 
        currentPath === route || currentPath.startsWith(route + '/')
      );

      if (isProtectedRoute && !isAuthenticated) {
        // Redirect to login if trying to access protected route without auth
        router.push('/auth/login');
      } else if (isAuthRoute && isAuthenticated) {
        // Redirect to dashboard if already authenticated and trying to access auth pages
        router.push('/dashboard');
      }
      
      setIsChecking(false);
    }
  }, [isAuthenticated, loading, router, pathname]);

  // Show loading state
  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-blue-200 animate-pulse mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading your session...</p>
          <p className="text-sm text-gray-400 mt-2">Just a moment</p>
        </div>
      </div>
    );
  }

  // If in pre-release and trying to access auth, show nothing (will redirect)
  if (isPreRelease && pathname?.startsWith('/auth')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to pre-release page...</p>
        </div>
      </div>
    );
  }

  // Check if current route requires authentication
  const isProtectedRoute = pathname && PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // Check if current route is an auth route
  const isAuthRoute = pathname && AUTH_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // Handle auth requirements
  if (isProtectedRoute && !isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (isAuthRoute && isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}