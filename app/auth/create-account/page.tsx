"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon,
  CodeBracketIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

// CV image data with positions and animations
const cvImages = [
  {
    id: 1,
    rotation: -4,
    color: "from-blue-100 to-blue-50",
    border: "border-blue-200",
    title: "Modern Tech CV",
    position: "Software Engineer",
  },
  {
    id: 2,
    rotation: 3,
    color: "from-green-100 to-green-50",
    border: "border-green-200",
    title: "Design Portfolio",
    position: "UX Designer",
  }
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

export default function SignupPage() {
  const router = useRouter();
  const {
    signUpWithEmail,
    signInWithGoogle,
    isAuthenticated,
    loading: authLoading,
    firebaseConfigured,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    newsletter: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [activeTab, setActiveTab] = useState<"email" | "google">("email");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated && !authLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    if (passwordStrength < 75) {
      setError("Please use a stronger password");
      return;
    }

    setIsLoading(true);
    const result = await signUpWithEmail(
      formData.email,
      formData.password,
      formData.name
    );

    if (result.success) {
      setSuccessMessage(
        "Account created successfully! Redirecting to dashboard..."
      );

      // Store newsletter preference
      if (formData.newsletter) {
        localStorage.setItem("newsletterSubscribed", "true");
      }

      // Redirect will happen automatically via useEffect
    } else {
      setError(result.error || "Sign up failed. Please try again.");
    }

    setIsLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setSuccessMessage("");

    const result = await signInWithGoogle();

    if (!result.success) {
      setError(result.error || "Google sign-up failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500";
    if (passwordStrength < 50) return "bg-orange-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength < 25) return "Very Weak";
    if (passwordStrength < 50) return "Weak";
    if (passwordStrength < 75) return "Good";
    if (passwordStrength < 100) return "Strong";
    return "Very Strong";
  };

  // Check Firebase configuration
  useEffect(() => {
    if (!firebaseConfigured && process.env.NODE_ENV === "development") {
      console.warn("Firebase is not configured. Authentication will not work.");
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Add floating animation styles */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
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
            let positionClass = "";

            switch (index) {
              case 0:
                positionClass = "top-1/4 left-4 md:left-10";
                break;
              case 1:
                positionClass = "top-1/4 right-4 md:right-58";
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
                className={`absolute ${positionClass} z-0`}
                style={
                  { "--rotation": `${cv.rotation}deg` } as React.CSSProperties
                }
              >
                <FloatingCVCard {...cv} index={index} />
              </div>
            );
          })}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-6 hover:scale-105 transition-transform"
          >
            <span className="text-2xl font-bold text-white">CV</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Join <span className="text-blue-600">FolioFlow</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create your professional CV with API superpowers. Get started in
            seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Benefits Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Benefits Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Everything You Need
                  </h3>
                  <p className="text-gray-600">
                    Complete CV management solution
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                      <CloudArrowUpIcon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900">
                      Cloud Storage
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your CV data securely stored and accessible anywhere
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <CodeBracketIcon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900">
                      API Access
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Programmatic access to your CV data with API keys
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm col-span-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                        <ShieldCheckIcon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">
                        Trust & Security
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Enterprise-grade security with 256-bit encryption. Your
                        data is always protected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "Professional CV templates",
                  "Multiple export formats (PDF, JSON, DOCX)",
                  "Real-time updates across all platforms",
                  "Team collaboration features",
                  "Advanced analytics dashboard",
                  "Priority customer support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Free Tier Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">Free Forever Plan</h3>
                  <p className="text-gray-300">Perfect for getting started</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg px-4 py-2">
                  <span className="font-bold text-lg">$0</span>
                  <span className="text-gray-200 text-sm">/month</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
                  <span className="text-gray-300">Active CVs</span>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
                  <span className="text-gray-300">API Requests</span>
                  <span className="font-semibold">1,000/month</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
                  <span className="text-gray-300">Storage</span>
                  <span className="font-semibold">100MB</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-300">Export Formats</span>
                  <span className="font-semibold">PDF & JSON</span>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center mb-2">
                  <ShieldCheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="font-medium">
                    14-day free trial of Pro features
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Experience all premium features before deciding to upgrade.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Signup Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white">
                  Create Your Account
                </h2>
                <p className="text-blue-100 mt-1">
                  Start building your professional CV today
                </p>
              </div>

              <div className="p-8">
                {successMessage ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircleIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Account Created!
                    </h3>
                    <p className="text-gray-600 mb-6">{successMessage}</p>
                    <div className="animate-pulse">
                      <div className="h-2 w-48 bg-blue-200 rounded mx-auto"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Firebase Configuration Warning */}
                    {!firebaseConfigured && (
                      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-yellow-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                              Firebase Not Configured
                            </h3>
                            <p className="text-sm text-yellow-700 mt-1">
                              Authentication is disabled. Please configure
                              Firebase to enable sign-up.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Error Message */}
                    {error && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-red-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-red-600">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab Navigation */}
                    <div className="flex border-b border-gray-200 mb-8">
                      <button
                        onClick={() => setActiveTab("email")}
                        disabled={!firebaseConfigured}
                        className={`flex-1 py-3 text-center font-medium border-b-2 transition-colors ${
                          activeTab === "email"
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 disabled:text-gray-300"
                        }`}
                      >
                        Email Sign Up
                      </button>
                      <button
                        onClick={() => setActiveTab("google")}
                        disabled={!firebaseConfigured}
                        className={`flex-1 py-3 text-center font-medium border-b-2 transition-colors ${
                          activeTab === "google"
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 disabled:text-gray-300"
                        }`}
                      >
                        Google Sign Up
                      </button>
                    </div>

                    {/* Email Sign Up Form */}
                    {activeTab === "email" && (
                      <form onSubmit={handleEmailSignUp} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label
                              htmlFor="name"
                              className="block text-sm font-semibold text-gray-700"
                            >
                              Full Name
                            </label>
                            <div className="relative group">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                              </div>
                              <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!firebaseConfigured || isLoading}
                                className="block w-full pl-10 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 group-focus-within:border-blue-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="John Doe"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="email"
                              className="block text-sm font-semibold text-gray-700"
                            >
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label
                              htmlFor="password"
                              className="block text-sm font-semibold text-gray-700"
                            >
                              Password
                            </label>
                            <div className="relative group">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                              </div>
                              <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                disabled={!firebaseConfigured || isLoading}
                                className="block w-full pl-10 pr-10 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 group-focus-within:border-blue-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Create a strong password"
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

                            {formData.password && (
                              <div className="mt-3">
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm text-gray-600">
                                    Password strength
                                  </span>
                                  <span className="text-sm font-medium text-gray-900">
                                    {getStrengthText()}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${getStrengthColor()} transition-all duration-500`}
                                    style={{ width: `${passwordStrength}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="confirmPassword"
                              className="block text-sm font-semibold text-gray-700"
                            >
                              Confirm Password
                            </label>
                            <div className="relative group">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                              </div>
                              <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={!firebaseConfigured || isLoading}
                                className={`block w-full pl-10 pr-10 py-3.5 border-2 rounded-xl focus:ring-2 outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                                  formData.confirmPassword &&
                                  formData.password !== formData.confirmPassword
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    : "border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500"
                                }`}
                                placeholder="Confirm your password"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                disabled={!firebaseConfigured || isLoading}
                              >
                                {showConfirmPassword ? (
                                  <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
                                ) : (
                                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex items-center h-5 mt-0.5">
                              <input
                                id="acceptTerms"
                                name="acceptTerms"
                                type="checkbox"
                                required
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                disabled={!firebaseConfigured || isLoading}
                                className="h-5 w-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0 transition-colors disabled:opacity-50"
                              />
                            </div>
                            <label
                              htmlFor="acceptTerms"
                              className="text-sm text-gray-700"
                            >
                              I agree to the{" "}
                              <Link
                                href="/terms"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link
                                href="/privacy"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Privacy Policy
                              </Link>
                            </label>
                          </div>

                          <div className="flex items-start space-x-3">
                            <div className="flex items-center h-5 mt-0.5">
                              <input
                                id="newsletter"
                                name="newsletter"
                                type="checkbox"
                                checked={formData.newsletter}
                                onChange={handleChange}
                                disabled={!firebaseConfigured || isLoading}
                                className="h-5 w-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0 transition-colors disabled:opacity-50"
                              />
                            </div>
                            <label
                              htmlFor="newsletter"
                              className="text-sm text-gray-700"
                            >
                              Send me product updates, tips, and resources via
                              email
                            </label>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={!firebaseConfigured || isLoading}
                          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center">
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Creating Account...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center">
                              Create Account
                              <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </span>
                          )}
                        </button>
                      </form>
                    )}

                    {/* Google Sign Up */}
                    {activeTab === "google" && (
                      <div className="text-center">
                        <p className="text-gray-600 mb-8">
                          Sign up quickly with your Google account. Your
                          portfolio will be created automatically.
                        </p>

                        <button
                          onClick={handleGoogleSignUp}
                          disabled={!firebaseConfigured || isLoading}
                          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-500 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                            {isLoading
                              ? "Signing up..."
                              : "Continue with Google"}
                          </span>
                        </button>
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                      <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link
                          href="/auth/login"
                          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          Sign in here
                        </Link>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">✓</div>
                <div className="text-xs text-gray-600">
                  No credit card required
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">⚡</div>
                <div className="text-xs text-gray-600">
                  Get started in 60 seconds
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  🔒
                </div>
                <div className="text-xs text-gray-600">Bank-level security</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  🎯
                </div>
                <div className="text-xs text-gray-600">
                  Free API access included
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
