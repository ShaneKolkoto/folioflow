'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCookies } from '@/contexts/CookieContext';
import Link from 'next/link';

interface CookieBannerProps {
  onCustomize?: () => void;
}

export default function CookieBanner({ onCustomize }: CookieBannerProps) {
  const { 
    showCookieBanner, 
    hideCookieBanner, 
    acceptAllCookies, 
    rejectNonEssential 
  } = useCookies();

  const handleAccept = () => {
    acceptAllCookies();
    hideCookieBanner();
  };

  const handleRejectNonEssential = () => {
    rejectNonEssential();
    hideCookieBanner();
  };

  return (
    <AnimatePresence>
      {showCookieBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-50"
        >
          <div className="relative bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 rounded-2xl border-2 border-yellow-200 shadow-2xl overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-100 to-transparent opacity-50 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100 to-transparent opacity-50 rounded-full translate-y-12 -translate-x-8" />
            
            {/* Cookie Emojis */}
            <div className="absolute top-4 right-4 text-2xl">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="inline-block mr-2"
              >
                🍪
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                className="inline-block"
              >
                🔒
              </motion.div>
            </div>
            
            <div className="relative p-6 md:p-8">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAccept}
                className="absolute top-4 right-4 p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition-colors"
                aria-label="Accept and close"
              >
                <XMarkIcon className="h-4 w-4" />
              </motion.button>
              
              {/* Header */}
              <div className="flex items-start mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mr-4 shadow-md">
                  <ExclamationTriangleIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-900 mb-1">
                    Cookies & Privacy Notice
                  </h3>
                  <p className="text-yellow-800 text-sm">
                    We care about your privacy experience
                  </p>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <p className="text-yellow-800 mb-3">
                  We use cookies to enhance your experience on FolioFlow. These help us:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-sm text-yellow-700">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mr-3" />
                    Remember your preferences and CV data
                  </li>
                  <li className="flex items-center text-sm text-yellow-700">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mr-3" />
                    Improve site performance and security
                  </li>
                  <li className="flex items-center text-sm text-yellow-700">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mr-3" />
                    Provide personalized CV recommendations
                  </li>
                </ul>
                <p className="text-sm text-yellow-600">
                  By continuing, you agree to our use of cookies as described in our{' '}
                  <Link 
                    href="/privacy" 
                    className="font-semibold text-yellow-700 hover:text-yellow-800 underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
              
              {/* Interactive Cookie Types */}
              <div className="mb-6 p-4 bg-white/50 rounded-xl border border-yellow-100">
                <h4 className="font-semibold text-yellow-800 mb-3 text-sm">Cookie Types Used:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200"
                  >
                    <div className="flex items-center mb-2">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                      <span className="text-xs font-semibold text-green-800">Essential</span>
                    </div>
                    <p className="text-xs text-green-700">Required for site functionality</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-center mb-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500 mr-2" />
                      <span className="text-xs font-semibold text-blue-800">Analytics</span>
                    </div>
                    <p className="text-xs text-blue-700">Help us improve our services</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                  >
                    <div className="flex items-center mb-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500 mr-2" />
                      <span className="text-xs font-semibold text-purple-800">Preferences</span>
                    </div>
                    <p className="text-xs text-purple-700">Remember your settings</p>
                  </motion.div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(251, 191, 36, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAccept}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                >
                  <span className="mr-2">🍪</span>
                  Accept All Cookies
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="ml-2"
                  >
                    →
                  </motion.span>
                </motion.button>
                
                {onCustomize && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCustomize}
                    className="flex-1 py-3 px-6 bg-white text-yellow-700 font-semibold rounded-xl border-2 border-yellow-300 hover:bg-yellow-50 transition-colors"
                  >
                    Customize Settings
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRejectNonEssential}
                  className="py-3 px-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-200 transition-colors text-sm"
                >
                  Reject Non-Essential
                </motion.button>
              </div>
              
              {/* Additional Info */}
              <div className="mt-4 pt-4 border-t border-yellow-200">
                <div className="flex items-center justify-between text-xs text-yellow-600">
                  <span>
                    You can change your preferences anytime in{' '}
                    <Link href="/settings" className="underline hover:text-yellow-700">
                      Settings
                    </Link>
                  </span>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center"
                  >
                    <div className="h-2 w-2 rounded-full bg-yellow-400 mr-1" />
                    <div className="h-2 w-2 rounded-full bg-yellow-400 mr-1" />
                    <div className="h-2 w-2 rounded-full bg-yellow-400" />
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Progress Bar Timer (Auto-accept) */}
            <div className="h-1 bg-yellow-100 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 10, ease: "linear" }}
                onAnimationComplete={handleAccept}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}