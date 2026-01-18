'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useCookies } from '@/contexts/CookieContext';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CookiePreferencesModal({ 
  isOpen, 
  onClose 
}: CookiePreferencesModalProps) {
  const { cookiePreferences, updatePreferences } = useCookies();
  const [preferences, setPreferences] = useState(cookiePreferences);

  const handleToggle = (key: keyof typeof preferences) => {
    if (key !== 'essential') { // Essential cookies cannot be disabled
      setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const handleSave = () => {
    updatePreferences(preferences);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                    <Cog6ToothIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Cookie Preferences</h3>
                    <p className="text-gray-600 text-sm">Customize your privacy settings</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500 mr-2" />
                      <span className="font-semibold text-blue-800">Essential Cookies</span>
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      Always Active
                    </div>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Required for the website to function properly. These cannot be disabled.
                  </p>
                  <div className="flex items-center text-xs text-blue-600">
                    <div className="h-2 w-2 rounded-full bg-blue-400 mr-2" />
                    User authentication and security
                  </div>
                  <div className="flex items-center text-xs text-blue-600 mt-1">
                    <div className="h-2 w-2 rounded-full bg-blue-400 mr-2" />
                    CV data storage and retrieval
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                      <span className="font-semibold text-gray-800">Analytics Cookies</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggle('analytics')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences.analytics ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 h-4 w-4 bg-white rounded-full"
                        animate={{ x: preferences.analytics ? 28 : 4 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    </motion.button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Help us understand how visitors interact with our website to improve user experience.
                  </p>
                </div>

                {/* Preference Cookies */}
                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-purple-500 mr-2" />
                      <span className="font-semibold text-gray-800">Preference Cookies</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggle('preferences')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences.preferences ? 'bg-purple-500' : 'bg-gray-300'
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 h-4 w-4 bg-white rounded-full"
                        animate={{ x: preferences.preferences ? 28 : 4 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    </motion.button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Remember your settings and preferences for a personalized experience.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-pink-500 mr-2" />
                      <span className="font-semibold text-gray-800">Marketing Cookies</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggle('marketing')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences.marketing ? 'bg-pink-500' : 'bg-gray-300'
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 h-4 w-4 bg-white rounded-full"
                        animate={{ x: preferences.marketing ? 28 : 4 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    </motion.button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Used to deliver relevant advertisements and measure campaign effectiveness.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                >
                  <CheckIcon className="h-5 w-5 mr-2" />
                  Save Preferences
                </motion.button>
                <button
                  onClick={onClose}
                  className="py-3 px-6 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Your preferences will be stored for 1 year. You can change them anytime in Settings.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}