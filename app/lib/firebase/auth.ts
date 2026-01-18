/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  User,
  onAuthStateChanged,
  getIdToken,
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import { auth, db } from "./config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: "select_account"
});

googleProvider.addScope('profile');
googleProvider.addScope('email');

// User interface
export interface PortfolioUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  userInfo?: {
    name?: string;
    title?: string;
    phone?: string;
    location?: string;
    summary?: string;
  };
  subscriptionTier?: 'free' | 'pro' | 'enterprise';
  apiKey?: string;
}

// Generate a simple API key
const generateApiKey = () => {
  return `ff_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
};

/**
 * Create or update user portfolio document
 */
export const createUserPortfolio = async (userData: {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}) => {
  try {
    const userRef = doc(db, "portfolios", userData.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Create new portfolio document
      const portfolioData = {
        userId: userData.uid,
        userInfo: {
          name: userData.displayName,
          email: userData.email,
          title: "",
          phone: "",
          location: "",
          summary: "",
          photoURL: userData.photoURL || "",
        },
        skills: {
          technical: [],
          soft: [],
          languages: [],
        },
        workExperience: [],
        education: [],
        projects: [],
        socialLinks: {
          linkedin: "",
          github: "",
          twitter: "",
          website: "",
        },
        certifications: [],
        achievements: [],
        apiKey: generateApiKey(),
        subscriptionTier: "free",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(userRef, portfolioData);
      console.log("Portfolio document created for user:", userData.uid);
      
      return {
        success: true,
        portfolioId: userData.uid,
        apiKey: portfolioData.apiKey,
      };
    } else {
      // Update existing portfolio with user info if needed
      await updateDoc(userRef, {
        "userInfo.email": userData.email,
        "userInfo.name": userData.displayName,
        "userInfo.photoURL": userData.photoURL || "",
        updatedAt: new Date(),
      });
      
      return {
        success: true,
        portfolioId: userData.uid,
        message: "Portfolio updated",
      };
    }
  } catch (error) {
    console.error("Error creating/updating portfolio:", error);
    throw error;
  }
};

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (
  email: string, 
  password: string, 
  name: string
) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with display name
    await updateProfile(user, {
      displayName: name,
    });

    // Send email verification
    await sendEmailVerification(user);

    // Create portfolio document in Firestore
    const portfolioResult = await createUserPortfolio({
      uid: user.uid,
      email: user.email!,
      displayName: name,
    });

    // Get ID token
    const idToken = await getIdToken(user);

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: name,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      },
      portfolio: portfolioResult,
      idToken,
    };
  } catch (error: any) {
    console.error("Email sign-up error:", error);
    
    // Handle specific errors
    let errorMessage = "Sign up failed";
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = "Email is already registered";
        break;
      case 'auth/invalid-email':
        errorMessage = "Invalid email address";
        break;
      case 'auth/weak-password':
        errorMessage = "Password is too weak";
        break;
      case 'auth/operation-not-allowed':
        errorMessage = "Email/password sign-up is not enabled";
        break;
    }

    return {
      success: false,
      error: {
        code: error.code,
        message: errorMessage,
      },
    };
  }
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if portfolio exists, create if not
    let portfolioResult;
    try {
      const userRef = doc(db, "portfolios", user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Create portfolio if it doesn't exist
        portfolioResult = await createUserPortfolio({
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName || "User",
          photoURL: user.photoURL || "",
        });
      }
    } catch (portfolioError) {
      console.error("Portfolio check error:", portfolioError);
    }

    const idToken = await getIdToken(user);

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      },
      portfolio: portfolioResult,
      idToken,
    };
  } catch (error: any) {
    console.error("Email sign-in error:", error);
    
    let errorMessage = "Sign in failed";
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = "Invalid email address";
        break;
      case 'auth/user-disabled':
        errorMessage = "This account has been disabled";
        break;
      case 'auth/user-not-found':
        errorMessage = "No account found with this email";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password";
        break;
      case 'auth/too-many-requests':
        errorMessage = "Too many attempts. Try again later";
        break;
    }

    return {
      success: false,
      error: {
        code: error.code,
        message: errorMessage,
      },
    };
  }
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    // Create or update portfolio document
    const portfolioResult = await createUserPortfolio({
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || "User",
      photoURL: user.photoURL || "",
    });

    const idToken = await getIdToken(user);

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      },
      portfolio: portfolioResult,
      token,
      idToken,
    };
  } catch (error: any) {
    console.error("Google Sign-In Error:", error);
    
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData?.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

    let userErrorMessage = "Google sign-in failed";
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        userErrorMessage = "Sign-in popup was closed";
        break;
      case 'auth/cancelled-popup-request':
        userErrorMessage = "Sign-in was cancelled";
        break;
      case 'auth/popup-blocked':
        userErrorMessage = "Pop-up was blocked by your browser";
        break;
    }

    return {
      success: false,
      error: {
        code: errorCode,
        message: userErrorMessage,
        email,
        credential,
      },
    };
  }
};

/**
 * Sign out current user
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error("Sign out error:", error);
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    };
  }
};

/**
 * Get current user portfolio data
 */
export const getUserPortfolio = async (userId: string) => {
  try {
    const userRef = doc(db, "portfolios", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return {
        success: false,
        error: "Portfolio not found",
      };
    }

    return {
      success: true,
      portfolio: userDoc.data(),
    };
  } catch (error) {
    console.error("Error getting portfolio:", error);
    return {
      success: false,
      error: "Failed to fetch portfolio",
    };
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: string, 
  updates: Partial<PortfolioUser['userInfo']>
) => {
  try {
    const userRef = doc(db, "portfolios", userId);
    
    const updateData: any = {
      updatedAt: new Date(),
    };

    // Build nested update structure
    Object.keys(updates).forEach(key => {
      updateData[`userInfo.${key}`] = (updates as any)[key];
    });

    await updateDoc(userRef, updateData);

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      error: "Failed to update profile",
    };
  }
};

/**
 * Get user API key
 */
export const getUserApiKey = async (userId: string) => {
  try {
    const userRef = doc(db, "portfolios", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const data = userDoc.data();
    
    return {
      success: true,
      apiKey: data.apiKey,
    };
  } catch (error) {
    console.error("Error getting API key:", error);
    return {
      success: false,
      error: "Failed to get API key",
    };
  }
};

// Existing functions (keep these)
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const getCurrentUserToken = async (): Promise<string | null> => {
  const user = getCurrentUser();
  if (!user) return null;
  
  try {
    return await getIdToken(user);
  } catch (error) {
    console.error("Error getting user token:", error);
    return null;
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const checkAuthStatus = async () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve({
        isAuthenticated: !!user,
        user: user ? {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
        } : null,
      });
    });
  });
};