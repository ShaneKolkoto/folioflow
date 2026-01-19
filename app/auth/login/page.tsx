'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  UserCircleIcon,
  // ShieldCheckIcon,
  CloudArrowUpIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

// CV image data with positions and animations
const cvImages = [
  {
    id: 1,
    rotation: -15,
    color: 'from-blue-100 to-blue-50',
    border: 'border-blue-200',
    title: 'Modern Tech CV',
    position: 'Software Engineer',
  },
  {
    id: 2,
    rotation: 15,
    color: 'from-green-100 to-green-50',
    border: 'border-green-200',
    title: 'Design Portfolio',
    position: 'UX Designer',
  },

];

// Floating CV Card Component
function FloatingCVCard({
  rotation,
  color,
  border,
  title,
  position,
  index,
}: {
  rotation: number;
  color: string;
  border: string;
  title: string;
  position: string;
  index: number;
}) {
  return (
    <div
      className={`absolute w-40 h-56 md:w-48 md:h-64 rounded-lg ${color} border ${border} shadow-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
      style={{
        transform: `rotate(${rotation}deg)`,
        animation: `float 8s ease-in-out infinite`,
        animationDelay: `${index * 1}s`,
      }}
    >
      <div className="h-2 w-full bg-gradient-to-r from-gray-300 to-gray-100 rounded mb-3"></div>
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
        <div>
          <div className="h-3 w-20 bg-gradient-to-r from-gray-400 to-gray-300 rounded">
            <p className="ml-1 text-[8px] font-bold">{title}</p>
          </div>
          <div className="h-2 w-16 bg-gradient-to-r from-gray-300 to-gray-200 rounded mt-1">
            <p className="ml-0 text-[6px] text-nowrap px-1">{position}</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-2 w-full bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
        <div className="h-2 w-4/5 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
        <div className="h-2 w-3/4 bg-gradient-to-r from-gray-300 to-gray-200 rounded"></div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-300">
        <div className="h-2 w-16 bg-gradient-to-r from-gray-400 to-gray-300 rounded"></div>
        <div className="h-2 w-12 bg-gradient-to-r from-gray-300 to-gray-200 rounded mt-1"></div>
      </div>
      {/* <div className="absolute -bottom-2 -right-2 w-12 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-[10px] font-medium text-white">API</span>
      </div> */}
      <div className="absolute -top-2 -left-2 w-8 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
        <span className="text-[10px] font-medium text-white">✓</span>
      </div>
    </div>
  );
}
export default function LoginPage() {
  const router = useRouter();
  const { 
    signInWithEmail, 
    signInWithGoogle, 
    isAuthenticated, 
    loading: authLoading,
    firebaseConfigured 
  } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated && !authLoading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    const result = await signInWithEmail(formData.email, formData.password);
    
    if (result.success) {
      setSuccessMessage('Login successful! Redirecting to dashboard...');
      
      // Store remember me preference
      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('userEmail', formData.email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('userEmail');
      }
      
      // Small delay to show success message
      // setTimeout(() => {
        router.push('/dashboard');
      // }, 1500);
    } else {
      setError(result.error || 'Login failed. Please check your credentials.');
    }
    
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleGoogleLogin = async () => {
    setError('');
    setSuccessMessage('');
    
    const result = await signInWithGoogle();
    
    if (!result.success) {
      setError(result.error || 'Google sign-in failed');
    }
  };

  const handleForgotPassword = () => {
    if (!formData.email.trim()) {
      setError('Please enter your email address first');
      return;
    }
    
    // Show informative message
    setSuccessMessage(`Password reset functionality coming soon. For now, please use the demo account.`);
    setError('');
  };

  const loadDemoCredentials = () => {
    setDemoMode(true);
    setFormData({
      email: 'demo@folioflow.com',
      password: 'demo123#',
      rememberMe: false,
    });
    setError('');
    setSuccessMessage('Demo credentials loaded. Click "Sign In" to continue.');
  };

  // Load remembered email on component mount
  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (rememberMe === 'true' && savedEmail) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        rememberMe: true,
      }));
    }
  }, []);

  // Check Firebase configuration
  useEffect(() => {
    if (!firebaseConfigured && process.env.NODE_ENV === 'development') {
      console.warn('Firebase is not configured. Authentication will not work.');
    }
  }, [firebaseConfigured]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-auto bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Add floating animation styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(var(--rotation));
          }
          50% {
            transform: translateY(-15px) rotate(var(--rotation));
          }
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating CV Images */}
     {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {cvImages.map((cv, index) => {
            // Calculate positions for login page
            let positionClass = '';
            let zIndex = '';
            
            switch(index) {
              case 0:
                positionClass = 'top-1/4 md:top-35 left-10 md:left-1/9';
                zIndex = 'z-0';
                break;
              case 1:
                positionClass = 'top-1/2 md:top-85 right-1/4 md:right-60';
                zIndex = 'z-0';
                break;
                  case 2:
                positionClass = "bottom-10 left-8 md:left-1/4";
                break;
              case 3:
                positionClass = "bottom-10 right-8 md:right-1/4";
                break;
            }

            return (
              <div
                key={cv.id}
                className={`absolute ${positionClass} ${zIndex}`}
                style={{ '--rotation': `${cv.rotation}deg` } as React.CSSProperties}
              >
                <FloatingCVCard {...cv} index={index} />
              </div>
            );
          })}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left Column - Login Form */}
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link 
                href="/" 
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-6 hover:scale-105 transition-transform"
              >
                <span className="text-2xl font-bold text-white">CV</span>
              </Link>
              {/* <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Welcome back to <span className="text-blue-600">FolioFlow</span>
              </h1> */}
              <p className="text-lg text-gray-600">
                Sign in to continue building your professional CV with API superpowers
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm py-8 px-8 shadow-2xl rounded-2xl border border-white/50">
              {/* Firebase Configuration Warning */}
              {!firebaseConfigured && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Firebase Not Configured</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Authentication is disabled. Please configure Firebase to enable login.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{successMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Demo Mode Indicator */}
              {demoMode && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <UserCircleIcon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Demo Mode Active</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Using demo credentials. Sign in to explore the platform.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Login Options */}
              <div className="space-y-3 mb-8">
                <GoogleSignInButton
                  onSuccess={handleGoogleLogin}
                  onError={(errorMsg) => setError(errorMsg)}
                  className="w-full"
                />
              </div>

              {/* Divider */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-gray-500 text-sm font-medium">
                    Or sign in with email
                  </span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!firebaseConfigured || isLoading}
                      className="block w-full pl-10 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 group-focus-within:border-blue-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      disabled={!firebaseConfigured}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      disabled={!firebaseConfigured || isLoading}
                      className="block w-full pl-10 pr-10 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 group-focus-within:border-blue-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      disabled={!firebaseConfigured || isLoading}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      disabled={!firebaseConfigured || isLoading}
                      className="h-5 w-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0 transition-colors disabled:opacity-50"
                    />
                    <label htmlFor="rememberMe" className="text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  
                  {demoMode && (
                    <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                      Demo Mode
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!firebaseConfigured || isLoading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      {demoMode ? 'Try Demo Account' : 'Sign In to Your Account'}
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link 
                    href="/auth/signup" 
                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </div>

            {/* Demo Account Card */}
            <div className="hidden md:block mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Demo</h3>
              <p className="text-sm text-gray-600 mb-4">
                Want to explore without signing up? Use our demo account:
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Email:</span>
                  <code className="text-sm font-mono bg-white px-2 py-1 rounded">demo@folioflow.com</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Password:</span>
                  <code className="text-sm font-mono bg-white px-2 py-1 rounded">demo123</code>
                </div>
              </div>
              <button
                onClick={loadDemoCredentials}
                className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:-translate-y-0.5"
              >
                Load Demo Credentials
              </button>
            </div>

            {/* Trust Badges */}
            <div className="hidden md:grid mt-8 grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">✓</div>
                <div className="text-xs text-gray-600">Free forever plan</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">⚡</div>
                <div className="text-xs text-gray-600">Instant API access</div>
              </div>
              {/* <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">🔒</div>
                <div className="text-xs text-gray-600">Bank-level security</div>
              </div> */}
              <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">🎯</div>
                <div className="text-xs text-gray-600">Professional templates</div>
              </div>
            </div>
          </div>

          {/* Right Column - Features Preview */}
          <div className="w-full max-w-lg hidden md:block">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What awaits you inside</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <CloudArrowUpIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Cloud CV Storage</h3>
                    <p className="text-gray-600">Your CV data securely stored and accessible from anywhere, anytime.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <CodeBracketIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">API Access Included</h3>
                    <p className="text-gray-600">Get instant API access to fetch your CV data programmatically.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">🚀</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Multiple Export Options</h3>
                    <p className="text-gray-600">Export your CV as PDF, JSON, DOCX, or XML with one click.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">🔄</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Real-time Updates</h3>
                    <p className="text-gray-600">Update once and see changes reflected across all exports and API responses.</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-blue-100 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-gray-600">CVs Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">5M+</div>
                  <div className="text-sm text-gray-600">API Requests</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">4.8★</div>
                  <div className="text-sm text-gray-600">User Rating</div>
                </div>
              </div>
            </div>

            {/* Security Card */}
            {/* <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <ShieldCheckIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Enterprise-grade Security</h3>
                  <p className="text-sm text-gray-600 mt-1">Your data is protected with 256-bit encryption</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">End-to-end encryption</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">GDPR compliant</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">SOC 2 Type II certified</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Regular security audits</span>
                </div>
              </div>
            </div> */}

            {/* Need Help */}
            <div className="mt-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-3">Need help signing in?</h3>
              <p className="text-gray-300 mb-4">
                Our support team is here to help you get started.
              </p>
              <div className="space-y-3">
                <Link
                  href="mailto:support@folioflow.com"
                  className="block py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-center"
                >
                  📧 Email Support
                </Link>
                <Link
                  href="/help"
                  className="block py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-center"
                >
                  📚 Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="relative z-10 mt-12 text-center">
        <p className="text-sm text-gray-500">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-blue-600 hover:text-blue-700">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}