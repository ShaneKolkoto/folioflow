/* eslint-disable @typescript-eslint/no-explicit-any */
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Using YOUR project ID: react-uber-clone-73085
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "react-uber-clone-73085.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "react-uber-clone-73085",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "react-uber-clone-73085.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate environment variables in development
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase Config Check:');
  console.log('- API Key:', firebaseConfig.apiKey ? '✅ Set' : '❌ Missing');
  console.log('- Auth Domain:', firebaseConfig.authDomain);
  console.log('- Project ID:', firebaseConfig.projectId);
  console.log('- Storage Bucket:', firebaseConfig.storageBucket);
  console.log('- Messaging Sender ID:', firebaseConfig.messagingSenderId ? '✅ Set' : '❌ Missing');
  console.log('- App ID:', firebaseConfig.appId ? '✅ Set' : '❌ Missing');
}

// Initialize Firebase
let app;
let auth;
let db;

try {
  // Check if Firebase is already initialized
  const apps = getApps();
  
  if (apps.length > 0) {
    app = apps[0];
  } else {
    // Validate required config
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      throw new Error(
        'Missing Firebase configuration. Please check your environment variables:\n' +
        'Required: NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_PROJECT_ID\n' +
        'Optional: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, ' +
        'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, NEXT_PUBLIC_FIREBASE_APP_ID'
      );
    }
    
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized successfully');
  }
  
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Configure auth settings
  auth.useDeviceLanguage();
  
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  
  // Create mock/stub objects for development if Firebase fails
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Using mock Firebase for development. Real authentication will not work.');
    
    // Create mock objects
    app = { name: '[Mock Firebase App]' } as any;
    auth = {
      currentUser: null,
      onAuthStateChanged: () => () => {},
      signInWithPopup: () => Promise.reject(new Error('Mock Firebase')),
      signOut: () => Promise.resolve(),
      createUserWithEmailAndPassword: () => Promise.reject(new Error('Mock Firebase')),
      signInWithEmailAndPassword: () => Promise.reject(new Error('Mock Firebase')),
    } as any;
    db = {} as any;
  } else {
    // In production, re-throw the error
    throw error;
  }
}

export { app, auth, db };

// Helper function to check if Firebase is properly configured
export const isFirebaseConfigured = () => {
  return !!(firebaseConfig.apiKey && firebaseConfig.projectId);
};

// Helper function to get Firebase config for debugging
export const getFirebaseConfig = () => {
  return {
    ...firebaseConfig,
    apiKey: firebaseConfig.apiKey ? '***' + firebaseConfig.apiKey.slice(-4) : 'Not set',
  };
};