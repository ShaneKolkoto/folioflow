// lib/firebase/wishlist.ts
import { 
  doc, 
  collection, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  getDocs,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db } from "./config";

// Types
export interface joinWishlistData {
  email: string;
  name: string;
  interests?: string[];
  useCase?: string;
  priority?: 'low' | 'medium' | 'high';
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    referrer?: string;
    landingPage?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
  };
}

export interface WishlistItem {
  id: string;
  userId: string;
  email: string;
  name: string;
  interests?: string[];
  useCase?: string;
  priority?: 'low' | 'medium' | 'high';
  status: 'pending' | 'contacted' | 'approved' | 'rejected';
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    referrer?: string;
    landingPage?: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  contactedAt?: Timestamp;
  notes?: string;
}

export interface WaitlistStats {
  total: number;
  pending: number;
  contacted: number;
  approved: number;
  rejected: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
  recentCount: number; // Last 7 days
  averageWaitTime: number; // In days
}

export interface WishlistResponse {
  success: boolean;
  item?: WishlistItem;
  error?: {
    code: string;
    message: string;
  };
}

// Email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate unique wishlist ID
const generateWishlistId = (email: string): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `wl_${timestamp}_${random}_${email.substring(0, 4)}`;
};

/**
 * Join the waitlist
 */
export const joinWishlist = async (
  data: joinWishlistData
): Promise<WishlistResponse> => {
  try {
    const { email, name, interests = [], useCase, priority = 'medium', metadata } = data;

    // Validate inputs
    if (!email || !name) {
      return {
        success: false,
        error: {
          code: 'validation-error',
          message: 'Email and name are required'
        }
      };
    }

    if (!isValidEmail(email)) {
      return {
        success: false,
        error: {
          code: 'invalid-email',
          message: 'Please enter a valid email address'
        }
      };
    }

    if (name.length < 2) {
      return {
        success: false,
        error: {
          code: 'invalid-name',
          message: 'Name must be at least 2 characters long'
        }
      };
    }

    // REMOVED: The duplicate check that requires read permission
    // Since we can't read from wishlist without admin permission,
    // we'll skip the duplicate check for now
    
    // Create new waitlist entry
    const wishlistId = generateWishlistId(email);
    const wishlistDoc = doc(db, "wishlist", wishlistId);

    const wishlistItem: WishlistItem = {
      id: wishlistId,
      userId: `waitlist_${Date.now()}`,
      email: email.toLowerCase().trim(),
      name: name.trim(),
      interests: interests || [],
      useCase,
      priority,
      status: 'pending',
      metadata: metadata || {},
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };

    await setDoc(wishlistDoc, wishlistItem);

    // Add to email collection for marketing (optional)
    const emailDoc = doc(db, "wishlist_emails", email.toLowerCase().trim());
    await setDoc(emailDoc, {
      email: email.toLowerCase().trim(),
      name: name.trim(),
      joinedAt: serverTimestamp(),
      source: 'wishlist_emails',
      interests,
    }, { merge: true });

    return {
      success: true,
      item: wishlistItem
    };

  } catch (error: any) {
    console.error("Error joining waitlist:", error);
    
    // More specific error messages
    let errorMessage = 'Failed to join waitlist. Please try again.';
    if (error.code === 'permission-denied') {
      errorMessage = 'Permission denied. Please check your Firestore rules.';
    } else if (error.code === 'unavailable') {
      errorMessage = 'Network error. Please check your internet connection.';
    }
    
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: errorMessage
      }
    };
  }
};

/**
 * Get waitlist entry by email
 */
export const getWishlistEntry = async (email: string): Promise<WishlistResponse> => {
  try {
    const wishlistRef = collection(db, "wishlist");
    const q = query(wishlistRef, where("email", "==", email.toLowerCase().trim()));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        success: false,
        error: {
          code: 'not-found',
          message: 'Email not found in waitlist'
        }
      };
    }

    const docSnapshot = querySnapshot.docs[0];
    const wishlistItem = docSnapshot.data() as WishlistItem;

    return {
      success: true,
      item: wishlistItem
    };

  } catch (error: any) {
    console.error("Error getting waitlist entry:", error);
    
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'Failed to fetch waitlist entry'
      }
    };
  }
};

/**
 * Get all waitlist entries (admin only)
 */
export const getAllWaitlistEntries = async (
  status?: WishlistItem['status'],
  priority?: WishlistItem['priority']
): Promise<{ success: boolean; items: WishlistItem[]; error?: any }> => {
  try {
    let wishlistRef = collection(db, "wishlist");
    let constraints = [];

    if (status) {
      constraints.push(where("status", "==", status));
    }

    if (priority) {
      constraints.push(where("priority", "==", priority));
    }

    const q = query(wishlistRef, ...constraints);
    const querySnapshot = await getDocs(q);

    const items: WishlistItem[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as WishlistItem);
    });

    // Sort by priority and creation date
    items.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityDiff = priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium'];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      return b.createdAt.toMillis() - a.createdAt.toMillis();
    });

    return {
      success: true,
      items
    };

  } catch (error: any) {
    console.error("Error getting waitlist entries:", error);
    
    return {
      success: false,
      items: [],
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'Failed to fetch waitlist entries'
      }
    };
  }
};

/**
 * Update waitlist entry status (admin only)
 */
export const updateWaitlistStatus = async (
  wishlistId: string,
  status: WishlistItem['status'],
  notes?: string
): Promise<WishlistResponse> => {
  try {
    const wishlistDoc = doc(db, "wishlist", wishlistId);
    const docSnapshot = await getDoc(wishlistDoc);

    if (!docSnapshot.exists()) {
      return {
        success: false,
        error: {
          code: 'not-found',
          message: 'Waitlist entry not found'
        }
      };
    }

    const updateData: any = {
      status,
      updatedAt: serverTimestamp(),
    };

    if (status === 'contacted') {
      updateData.contactedAt = serverTimestamp();
    }

    if (notes) {
      updateData.notes = notes;
    }

    await updateDoc(wishlistDoc, updateData);

    const updatedItem = {
      ...docSnapshot.data(),
      ...updateData
    } as WishlistItem;

    return {
      success: true,
      item: updatedItem
    };

  } catch (error: any) {
    console.error("Error updating waitlist status:", error);
    
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'Failed to update waitlist entry'
      }
    };
  }
};

/**
 * Get waitlist statistics (admin only)
 */
export const getWaitlistStats = async (): Promise<{
  success: boolean;
  stats: WaitlistStats;
  error?: any;
}> => {
  try {
    const wishlistRef = collection(db, "wishlist");
    const querySnapshot = await getDocs(wishlistRef);

    const items: WishlistItem[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as WishlistItem);
    });

    const now = Date.now();
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);

    const recentItems = items.filter(item => 
      item.createdAt.toMillis() > sevenDaysAgo
    );

    // Calculate average wait time for contacted/approved items
    const processedItems = items.filter(item => 
      item.status === 'contacted' || item.status === 'approved'
    );
    
    let totalWaitTime = 0;
    processedItems.forEach(item => {
      if (item.contactedAt) {
        const waitTime = item.contactedAt.toMillis() - item.createdAt.toMillis();
        totalWaitTime += waitTime;
      }
    });

    const averageWaitTime = processedItems.length > 0 
      ? totalWaitTime / processedItems.length / (24 * 60 * 60 * 1000)
      : 0;

    const stats: WaitlistStats = {
      total: items.length,
      pending: items.filter(item => item.status === 'pending').length,
      contacted: items.filter(item => item.status === 'contacted').length,
      approved: items.filter(item => item.status === 'approved').length,
      rejected: items.filter(item => item.status === 'rejected').length,
      byPriority: {
        high: items.filter(item => item.priority === 'high').length,
        medium: items.filter(item => item.priority === 'medium').length,
        low: items.filter(item => item.priority === 'low').length,
      },
      recentCount: recentItems.length,
      averageWaitTime: Math.round(averageWaitTime * 10) / 10, // Round to 1 decimal
    };

    return {
      success: true,
      stats
    };

  } catch (error: any) {
    console.error("Error getting waitlist stats:", error);
    
    return {
      success: false,
      stats: {
        total: 0,
        pending: 0,
        contacted: 0,
        approved: 0,
        rejected: 0,
        byPriority: { high: 0, medium: 0, low: 0 },
        recentCount: 0,
        averageWaitTime: 0,
      },
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'Failed to fetch waitlist statistics'
      }
    };
  }
};

/**
 * Delete waitlist entry (admin only)
 */
export const deleteWaitlistEntry = async (
  wishlistId: string
): Promise<WishlistResponse> => {
  try {
    const wishlistDoc = doc(db, "wishlist", wishlistId);
    const docSnapshot = await getDoc(wishlistDoc);

    if (!docSnapshot.exists()) {
      return {
        success: false,
        error: {
          code: 'not-found',
          message: 'Waitlist entry not found'
        }
      };
    }

    const wishlistItem = docSnapshot.data() as WishlistItem;

    await deleteDoc(wishlistDoc);

    return {
      success: true,
      item: wishlistItem
    };

  } catch (error: any) {
    console.error("Error deleting waitlist entry:", error);
    
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'Failed to delete waitlist entry'
      }
    };
  }
};

/**
 * Bulk export waitlist entries (admin only)
 */
export const exportWaitlist = async (): Promise<{
  success: boolean;
  data: WishlistItem[];
  error?: any;
}> => {
  try {
    const result = await getAllWaitlistEntries();

    if (!result.success) {
      return {
        success: false,
        data: [],
        error: result.error
      };
    }

    // Format for CSV/Excel export
    const formattedData = result.items.map(item => ({
      id: item.id,
      name: item.name,
      email: item.email,
      interests: item.interests?.join(', ') || '',
      useCase: item.useCase || '',
      priority: item.priority || 'medium',
      status: item.status,
      createdAt: item.createdAt.toDate().toISOString(),
      contactedAt: item.contactedAt?.toDate().toISOString() || '',
      notes: item.notes || '',
      metadata: JSON.stringify(item.metadata || {})
    })) as any[];

    return {
      success: true,
      data: formattedData
    };

  } catch (error: any) {
    console.error("Error exporting waitlist:", error);
    
    return {
      success: false,
      data: [],
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'Failed to export waitlist'
      }
    };
  }
};

/**
 * Send welcome email (to be integrated with email service)
 */
export const sendWelcomeEmail = async (
  email: string,
  name: string
): Promise<{ success: boolean; messageId?: string; error?: any }> => {
  try {
    // This would integrate with your email service (SendGrid, AWS SES, etc.)
    console.log(`Would send welcome email to ${email} (${name})`);
    
    // For now, just log and return success
    return {
      success: true,
      messageId: `simulated_${Date.now()}`
    };

  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    
    return {
      success: false,
      error: {
        code: error.code || 'unknown-error',
        message: error.message || 'Failed to send welcome email'
      }
    };
  }
};

/**
 * Check if user can join waitlist (rate limiting)
 */
export const canjoinWishlist = async (
  email: string,
  ipAddress?: string
): Promise<{
  success: boolean;
  canJoin: boolean;
  reason?: string;
  cooldown?: number;
}> => {
  try {
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);

    // Check by email
    const emailResult = await getWishlistEntry(email);
    if (emailResult.success && emailResult.item) {
      const itemTime = emailResult.item.createdAt.toMillis();
      if (itemTime > oneHourAgo) {
        return {
          success: true,
          canJoin: false,
          reason: 'You have already joined the waitlist recently',
          cooldown: Math.ceil((itemTime + (60 * 60 * 1000) - now) / (60 * 1000)) // minutes remaining
        };
      }
    }

    // Check by IP address (if provided)
    if (ipAddress) {
      const wishlistRef = collection(db, "wishlist");
      const q = query(
        wishlistRef,
        where("metadata.ipAddress", "==", ipAddress)
      );
      const querySnapshot = await getDocs(q);

      let recentFromIp = false;
      querySnapshot.forEach((doc) => {
        const item = doc.data() as WishlistItem;
        if (item.createdAt.toMillis() > oneHourAgo) {
          recentFromIp = true;
        }
      });

      if (recentFromIp) {
        return {
          success: true,
          canJoin: false,
          reason: 'Too many requests from this IP address',
          cooldown: 60 // 60 minutes
        };
      }
    }

    return {
      success: true,
      canJoin: true
    };

  } catch (error: any) {
    console.error("Error checking waitlist eligibility:", error);
    
    return {
      success: false,
      canJoin: false,
      reason: 'System error. Please try again later.'
    };
  }
};