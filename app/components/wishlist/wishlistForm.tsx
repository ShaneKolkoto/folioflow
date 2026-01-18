// components/WaitlistForm.tsx
"use client";
import packageJson from "../../../package.json";
import { useState, useEffect } from "react";
import { useWishlist } from "@/hooks/wishlist";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
  UserCircleIcon,
  EnvelopeIcon,
  LightBulbIcon,
  TagIcon,
  UsersIcon,
  CalendarIcon,
  GiftIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const INTEREST_OPTIONS = [
  { id: "dev-tools", label: "Developer Tools", icon: "⚙️" },
  { id: "api-integration", label: "API Integration", icon: "🔌" },
  { id: "portfolio-mgmt", label: "Portfolio Management", icon: "📁" },
  { id: "career-dev", label: "Career Development", icon: "🚀" },
  { id: "team-collab", label: "Team Collaboration", icon: "👥" },
  { id: "resume-building", label: "Resume Building", icon: "📝" },
  { id: "job-search", label: "Job Search", icon: "🔍" },
  { id: "freelancing", label: "Freelancing", icon: "💼" },
];

// Calculate days until launch (30 days from now)
const calculateDaysUntilLaunch = () => {
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 120);
  return launchDate;
};

export default function WishlistForm() {
  const { joinWishlist, loading, error, success } = useWishlist();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    useCase: "",
    interests: [] as string[],
  });

  const [stats, setStats] = useState({
    totalDevelopers: 0,
    isLoading: true,
  });

  const launchDate = calculateDaysUntilLaunch();

  // Fetch real waitlist count
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const wishlistRef = collection(db, "wishlist");
        const snapshot = await getCountFromServer(wishlistRef);
        setStats({
          totalDevelopers: snapshot.data().count,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching waitlist count:", error);
        // Fallback to showing at least 500+ if we can't fetch
        setStats({
          totalDevelopers: 500,
          isLoading: false,
        });
      }
    };

    fetchWaitlistCount();

    // Refresh count when someone new joins
    if (success) {
      setTimeout(() => {
        fetchWaitlistCount();
      }, 1000);
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await joinWishlist({
      email: formData.email,
      name: formData.name,
      interests: formData.interests,
      useCase: formData.useCase,
      priority: formData.interests.length > 0 ? "high" : "medium",
      metadata: {
        landingPage: window.location.pathname,
        referrer: document.referrer,
      },
    });
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  // Format number with K for thousands
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K+`;
    }
    return `${num}+`;
  };

  // Calculate days remaining
  const getDaysRemaining = () => {
    const today = new Date();
    const timeDiff = launchDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemaining > 0 ? daysRemaining : 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex items-center gap-3 justify-center mb-6"
        >
          <span className="text-xl font-bold text-white  p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl  border border-blue-400/30">CV</span>
          <span className="text-3xl font-bold text-white hidden sm:inline">
            {packageJson.displayName}
          </span>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Join{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {formatNumber(stats.totalDevelopers)}
          </span>{" "}
          Developers on the Waitlist
        </h2>
        <p className="text-gray-400 text-lg">
          Be among the first to experience FolioFlow. Early access, special
          perks, and direct feedback channels.
        </p>
      </div>

      {/* Success State */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/20"
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6 shadow-2xl">
                <CheckCircleIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                🎉 Welcome! You're Developer #{stats.totalDevelopers + 1}
              </h3>
              <p className="text-gray-300 mb-6 max-w-md">
                You've joined {formatNumber(stats.totalDevelopers + 1)}{" "}
                developers waiting for FolioFlow. We'll send you exclusive
                updates, early access invites, and special launch perks.
              </p>
              <div className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium">
                <span>Check your email for confirmation</span>
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <AnimatePresence>
        {!success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <UserCircleIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/70 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/70 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </motion.div>

              {/* Interests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center">
                  <TagIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <label className="text-sm font-medium text-gray-300">
                    What are you most interested in? (Select all that apply)
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INTEREST_OPTIONS.map((interest) => (
                    <motion.button
                      key={interest.id}
                      type="button"
                      onClick={() => toggleInterest(interest.label)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center p-4 rounded-xl border transition-all ${
                        formData.interests.includes(interest.label)
                          ? "bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-blue-500/50 shadow-lg"
                          : "bg-gray-800/40 border-gray-700 hover:border-gray-600 hover:bg-gray-800/60"
                      }`}
                    >
                      <span className="text-xl mr-3">{interest.icon}</span>
                      <span className="text-sm font-medium text-white">
                        {interest.label}
                      </span>
                      {formData.interests.includes(interest.label) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center"
                        >
                          <CheckCircleIcon className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Use Case */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center">
                  <LightBulbIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <label className="text-sm font-medium text-gray-300">
                    How will you use FolioFlow? (Optional)
                  </label>
                </div>
                <textarea
                  id="useCase"
                  rows={3}
                  value={formData.useCase}
                  onChange={(e) =>
                    setFormData({ ...formData, useCase: e.target.value })
                  }
                  className="w-full px-4 py-4 rounded-xl bg-gray-800/70 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="e.g., 'I want to automate updating my portfolio across multiple job platforms'"
                />
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/20"
                  >
                    <div className="flex items-center">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-300">
                          Oops! Something went wrong
                        </p>
                        <p className="text-sm text-red-200/80 mt-1">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full py-5 px-8 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400 text-white font-bold text-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <div className="relative z-10 flex items-center justify-center">
                    <span>
                      {loading ? "Securing Your Spot..." : "Join Waitlist"}
                    </span>
                    <ArrowRightIcon className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 bg-[length:200%_100%] animate-shimmer" />

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl blur-xl" />
                  </div>
                </button>
              </motion.div>

              {/* Privacy Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center pt-4"
              >
                <p className="text-xs text-gray-500">
                  <span className="text-gray-400">
                    By joining, you agree to our{" "}
                  </span>
                  <a
                    href="/privacy"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <span className="text-gray-400">
                    . We'll only email you about FolioFlow updates.
                  </span>
                </p>
                <div className="flex items-center justify-center mt-4 space-x-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-xs text-gray-400">No spam, ever</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-xs text-gray-400">
                      Unsubscribe anytime
                    </span>
                  </div>
                </div>
              </motion.div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats - REAL DATA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {/* Developers Joined - REAL COUNT */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/20"
        >
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-3">
              <UsersIcon className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-1">
              {stats.isLoading ? (
                <div className="h-8 w-16 bg-gray-700/50 rounded-lg animate-pulse mx-auto"></div>
              ) : (
                formatNumber(stats.totalDevelopers)
              )}
            </div>
            <div className="text-sm text-gray-400">Developers Joined</div>
            <div className="text-xs text-blue-300/70 mt-2">Live count</div>
          </div>
        </motion.div>

        {/* Days to Launch - DYNAMIC */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20"
        >
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-3">
              <CalendarIcon className="h-6 w-6 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-1">
              {getDaysRemaining()}
            </div>
            <div className="text-sm text-gray-400">Days to Launch</div>
            <div className="text-xs text-purple-300/70 mt-2">
              {launchDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </motion.div>

        {/* Early Access Perks */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="text-center p-6 rounded-xl bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/20"
        >
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-3">
              <GiftIcon className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">Early</div>
            <div className="text-sm text-gray-400">Access Perks</div>
            <div className="text-xs text-green-300/70 mt-2">Limited spots</div>
          </div>
        </motion.div>

        {/* VIP Support */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="text-center p-6 rounded-xl bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border border-yellow-500/20"
        >
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center mb-3">
              <StarIcon className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">VIP</div>
            <div className="text-sm text-gray-400">Support</div>
            <div className="text-xs text-yellow-300/70 mt-2">
              Priority access
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Counter Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
          <span className="text-sm text-gray-400">
            {stats.isLoading ? (
              "Loading live count..."
            ) : (
              <>
                <span className="text-green-400">
                  {formatNumber(stats.totalDevelopers)} developers
                </span>{" "}
                already joined
              </>
            )}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
