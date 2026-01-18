/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  signInWithGoogle, 
  signOutUser, 
  getCurrentUser, 
  onAuthStateChange,
  getCurrentUserToken,
  checkAuthStatus,
  signUpWithEmail,
  signInWithEmail,
  getUserPortfolio,
  updateUserProfile,
  getUserApiKey,
  PortfolioUser
} from '@/lib/firebase/auth';
import { isFirebaseConfigured } from '@/lib/firebase/config';

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  portfolioData?: any;
  apiKey?: string;
  subscriptionTier?: 'free' | 'pro' | 'unlimted';
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  firebaseConfigured: boolean;
  signInWithGoogle: () => Promise<{success: boolean; error?: string}>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<{success: boolean; error?: string}>;
  signInWithEmail: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
  signOut: () => Promise<{success: boolean; error?: string}>;
  getToken: () => Promise<string | null>;
  getPortfolio: () => Promise<any>;
  updateProfile: (updates: any) => Promise<{success: boolean; error?: string}>;
  getApiKey: () => Promise<string | null>;
  refreshUserData: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [firebaseConfigured, setFirebaseConfigured] = useState(false);

  // Check Firebase configuration on mount
  useEffect(() => {
    const configured = isFirebaseConfigured();
    setFirebaseConfigured(configured);
    
    if (!configured && process.env.NODE_ENV === 'development') {
      console.warn('Firebase is not configured. Authentication will not work.');
    }
  }, []);

  // Load user portfolio data
  const loadUserPortfolio = useCallback(async (userId: string) => {
    if (!firebaseConfigured) {
      console.warn('Cannot load portfolio: Firebase not configured');
      return;
    }
    
    try {
      const portfolioResult = await getUserPortfolio(userId);
      if (portfolioResult.success && portfolioResult.portfolio) {
        setUser(prev => prev ? {
          ...prev,
          portfolioData: portfolioResult.portfolio,
          apiKey: portfolioResult.portfolio.apiKey,
          subscriptionTier: portfolioResult.portfolio.subscriptionTier,
        } : null);
        
        // Store portfolio data in localStorage for offline access
        try {
          localStorage.setItem(`portfolio_${userId}`, JSON.stringify(portfolioResult.portfolio));
        } catch (e) {
          console.warn('Could not store portfolio in localStorage:', e);
        }
      }
    } catch (err) {
      console.error('Error loading portfolio:', err);
      
      // Try to load from localStorage as fallback
      try {
        const cached = localStorage.getItem(`portfolio_${userId}`);
        if (cached) {
          const portfolioData = JSON.parse(cached);
          setUser(prev => prev ? {
            ...prev,
            portfolioData,
            apiKey: portfolioData.apiKey,
          } : null);
        }
      } catch (e) {
        console.warn('Could not load cached portfolio:', e);
      }
    }
  }, [firebaseConfigured]);

  // Check initial auth state
  useEffect(() => {
    const initializeAuth = async () => {
      if (!firebaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        const authStatus = await checkAuthStatus() as { isAuthenticated: boolean; user: AuthUser | null };
        
        if (authStatus.isAuthenticated && authStatus.user) {
          setUser(authStatus.user);
          // Load portfolio data
          await loadUserPortfolio(authStatus.user.uid);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setError('Failed to check authentication status');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (!firebaseConfigured) return;
      
      if (firebaseUser) {
        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
        };
        setUser(authUser);
        setError(null);
        
        // Load portfolio data
        await loadUserPortfolio(firebaseUser.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseConfigured, loadUserPortfolio]);

  const handleGoogleSignIn = async () => {
    if (!firebaseConfigured) {
      return { success: false, error: 'Firebase is not configured' };
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        const userData = {
          ...result.user,
          portfolioData: result.portfolio,
          apiKey: result.portfolio?.apiKey,
        };
        setUser(userData);
        
        return { success: true };
      } else {
        const errorMsg = result.error?.message || 'Google sign-in failed';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred';
      setError(errorMsg);
      console.error('Google sign-in error:', err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (email: string, password: string, name: string) => {
    if (!firebaseConfigured) {
      return { success: false, error: 'Firebase is not configured' };
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await signUpWithEmail(email, password, name);
      
      if (result.success) {
        const userData = {
          ...result.user,
          portfolioData: result.portfolio,
          apiKey: result.portfolio?.apiKey,
        };
        setUser(userData);
        
        return { success: true };
      } else {
        const errorMsg = result.error?.message || 'Sign up failed';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred';
      setError(errorMsg);
      console.error('Email sign-up error:', err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (email: string, password: string) => {
    if (!firebaseConfigured) {
      return { success: false, error: 'Firebase is not configured' };
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await signInWithEmail(email, password);
      
      if (result.success) {
        const userData = {
          ...result.user,
          portfolioData: result.portfolio,
          apiKey: result.portfolio?.apiKey,
        };
        setUser(userData);
        
        return { success: true };
      } else {
        const errorMsg = result.error?.message || 'Sign in failed';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred';
      setError(errorMsg);
      console.error('Email sign-in error:', err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (!firebaseConfigured) {
      return { success: false, error: 'Firebase is not configured' };
    }
    
    setLoading(true);
    
    try {
      const result = await signOutUser();
      
      if (result.success) {
        setUser(null);
        
        // Clear cached portfolio data
        if (user?.uid) {
          localStorage.removeItem(`portfolio_${user.uid}`);
        }
        
        return { success: true };
      } else {
        const errorMsg = result.error?.message || 'Sign out failed';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred';
      setError(errorMsg);
      console.error('Sign out error:', err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const handleGetPortfolio = async () => {
    if (!firebaseConfigured || !user) {
      return null;
    }
    
    try {
      const result = await getUserPortfolio(user.uid);
      console.log(result, 'result')
      if (result.success) {
        return result.portfolio;
      }
    } catch (err) {
      console.error('Error getting portfolio:', err);
    }
    return null;
  };

  const handleUpdateProfile = async (updates: any) => {
    if (!firebaseConfigured || !user) {
      return { success: false, error: 'Not authenticated or Firebase not configured' };
    }
    
    try {
      const result = await updateUserProfile(user.uid, updates);
      if (result.success) {
        // Update local state
        setUser(prev => prev ? {
          ...prev,
          portfolioData: {
            ...prev.portfolioData,
            userInfo: {
              ...prev.portfolioData?.userInfo,
              ...updates,
            },
          },
        } : null);
        
        // Update localStorage cache
        try {
          const cached = localStorage.getItem(`portfolio_${user.uid}`);
          if (cached) {
            const portfolioData = JSON.parse(cached);
            portfolioData.userInfo = { ...portfolioData.userInfo, ...updates };
            localStorage.setItem(`portfolio_${user.uid}`, JSON.stringify(portfolioData));
          }
        } catch (e) {
          console.warn('Could not update cached portfolio:', e);
        }
      }
      return result;
    } catch (err: any) {
      console.error('Error updating profile:', err);
      return { success: false, error: err.message };
    }
  };

  const handleGetApiKey = async () => {
    if (!firebaseConfigured || !user) {
      return null;
    }
    
    try {
      const result = await getUserApiKey(user.uid);
      if (result.success) {
        return result.apiKey;
      }
    } catch (err) {
      console.error('Error getting API key:', err);
    }
    return null;
  };

  const handleRefreshUserData = async () => {
    if (!firebaseConfigured || !user) {
      return;
    }
    
    await loadUserPortfolio(user.uid);
  };

  const getToken = async () => {
    if (!firebaseConfigured) {
      return null;
    }
    
    return await getCurrentUserToken();
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    firebaseConfigured,
    signInWithGoogle: handleGoogleSignIn,
    signUpWithEmail: handleEmailSignUp,
    signInWithEmail: handleEmailSignIn,
    signOut: handleSignOut,
    getToken,
    getPortfolio: handleGetPortfolio,
    updateProfile: handleUpdateProfile,
    getApiKey: handleGetApiKey,
    refreshUserData: handleRefreshUserData,
    isAuthenticated: !!user && firebaseConfigured,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper hook for checking auth state
export function useAuthGuard() {
  const { isAuthenticated, loading } = useAuth();
  
  return {
    isAuthenticated,
    loading,
    requireAuth: () => {
      if (!loading && !isAuthenticated) {
        window.location.href = '/auth/login';
        return false;
      }
      return isAuthenticated;
    },
  };
}