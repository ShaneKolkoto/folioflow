/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useWishlist.ts
'use client';

import { useState, useCallback } from 'react';
import { 
  joinWishlist as joinWishlistApi,
  getWishlistEntry as getWishlistEntryApi,
  canjoinWishlist as canjoinWishlistApi,
  joinWishlistData,
  WishlistItem,
  // WishlistResponse
} from '@/lib/firebase/wishlist';

export const useWishlist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [waitlistItem, setWaitlistItem] = useState<WishlistItem | null>(null);

  const joinWishlist = useCallback(async (data: joinWishlistData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Add metadata if available
      const enhancedData = {
        ...data,
        metadata: {
          ...data.metadata,
          landingPage: window.location.pathname,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
        }
      };

      const result = await joinWishlistApi(enhancedData);

      if (result.success && result.item) {
        setWaitlistItem(result.item);
        setSuccess(true);
        
        // Track conversion (Google Analytics, etc.)
        // if (window.gtag) {
        //   window.gtag('event', 'waitlist_signup', {
        //     event_category: 'engagement',
        //     event_label: data.interests?.join(', ') || 'general',
        //   });
        // }
      } else {
        setError(result.error?.message || 'Failed to join waitlist');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const checkWaitlistStatus = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getWishlistEntryApi(email);

      if (result.success && result.item) {
        setWaitlistItem(result.item);
        return result.item;
      } else {
        setError(result.error?.message || 'Not found in waitlist');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkEligibility = useCallback(async (email: string, ipAddress?: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await canjoinWishlistApi(email, ipAddress);
      
      if (!result.success) {
        setError(result.reason || 'Unable to check eligibility');
        return false;
      }

      return result.canJoin;
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setWaitlistItem(null);
  }, []);

  return {
    joinWishlist,
    checkWaitlistStatus,
    checkEligibility,
    loading,
    error,
    success,
    waitlistItem,
    reset
  };
};