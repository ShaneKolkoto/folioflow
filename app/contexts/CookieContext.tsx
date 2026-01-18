'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
}

interface CookieContextType {
  cookiesAccepted: boolean;
  cookiePreferences: CookiePreferences;
  acceptAllCookies: () => void;
  rejectNonEssential: () => void;
  updatePreferences: (preferences: CookiePreferences) => void;
  resetCookies: () => void;
  showCookieBanner: boolean;
  hideCookieBanner: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

// Default cookie preferences
const defaultPreferences: CookiePreferences = {
  essential: true, // Always required
  analytics: false,
  preferences: false,
  marketing: false
};

// Storage keys
const COOKIE_ACCEPTED_KEY = 'folioflow_cookies_accepted';
const COOKIE_PREFERENCES_KEY = 'folioflow_cookie_preferences';

export function CookieProvider({ children }: { children: ReactNode }) {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(defaultPreferences);
  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const initializeCookies = () => {
      try {
        // Check if cookies have been accepted before
        const accepted = localStorage.getItem(COOKIE_ACCEPTED_KEY);
        const preferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

        if (accepted === 'true') {
          setCookiesAccepted(true);
          setShowCookieBanner(false);
          
          if (preferences) {
            setCookiePreferences(JSON.parse(preferences));
          } else {
            // If accepted but no preferences stored, assume all accepted
            setCookiePreferences({
              essential: true,
              analytics: true,
              preferences: true,
              marketing: true
            });
          }
        } else {
          // Show banner if not accepted yet
          setShowCookieBanner(true);
        }
      } catch (error) {
        console.error('Error initializing cookies:', error);
        // If localStorage fails, show banner
        setShowCookieBanner(true);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeCookies();
  }, []);

  // Save to localStorage whenever preferences change
  useEffect(() => {
    if (isInitialized && cookiesAccepted) {
      try {
        localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(cookiePreferences));
      } catch (error) {
        console.error('Error saving cookie preferences:', error);
      }
    }
  }, [cookiePreferences, cookiesAccepted, isInitialized]);

  const acceptAllCookies = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      preferences: true,
      marketing: true
    };
    
    setCookiePreferences(allAccepted);
    setCookiesAccepted(true);
    setShowCookieBanner(false);
    
    try {
      localStorage.setItem(COOKIE_ACCEPTED_KEY, 'true');
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(allAccepted));
    } catch (error) {
      console.error('Error accepting cookies:', error);
    }
  };

  const rejectNonEssential = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      analytics: false,
      preferences: false,
      marketing: false
    };
    
    setCookiePreferences(onlyEssential);
    setCookiesAccepted(true);
    setShowCookieBanner(false);
    
    try {
      localStorage.setItem(COOKIE_ACCEPTED_KEY, 'true');
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(onlyEssential));
    } catch (error) {
      console.error('Error rejecting non-essential cookies:', error);
    }
  };

  const updatePreferences = (preferences: CookiePreferences) => {
    setCookiePreferences(preferences);
    setCookiesAccepted(true);
    setShowCookieBanner(false);
    
    try {
      localStorage.setItem(COOKIE_ACCEPTED_KEY, 'true');
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error updating cookie preferences:', error);
    }
  };

  const resetCookies = () => {
    setCookiesAccepted(false);
    setCookiePreferences(defaultPreferences);
    setShowCookieBanner(true);
    
    try {
      localStorage.removeItem(COOKIE_ACCEPTED_KEY);
      localStorage.removeItem(COOKIE_PREFERENCES_KEY);
    } catch (error) {
      console.error('Error resetting cookies:', error);
    }
  };

  const hideCookieBanner = () => {
    setShowCookieBanner(false);
  };

  const value = {
    cookiesAccepted,
    cookiePreferences,
    acceptAllCookies,
    rejectNonEssential,
    updatePreferences,
    resetCookies,
    showCookieBanner,
    hideCookieBanner
  };

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
}