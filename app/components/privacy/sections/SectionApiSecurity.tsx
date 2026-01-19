"use client";

import { motion } from "framer-motion";
import {
  KeyIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
// import { useState } from "react";

export interface SectionApiSecurityProps {
  ref: (el: HTMLDivElement | null) => void;
}

export default function SectionApiSecurity({ ref }: SectionApiSecurityProps) {
  // const [apiKey, setApiKey] = useState("sk_live_••••••••••••••••••••••••");
  // const [showKey, setShowKey] = useState(false);
  // const [requestsToday, setRequestsToday] = useState(42);

  // const regenerateApiKey = () => {
  //   setApiKey(
  //     "sk_live_" + Math.random().toString(36).substring(2, 20) + "••••••••",
  //   );
  //   setRequestsToday(0);
  // };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="scroll-mt-24 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <div className="flex items-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-linear-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mr-4">
            <KeyIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              4. API Key Usage and Security
            </h2>
            <p className="text-gray-600">Your digital key to CV data</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          At <span className="font-semibold text-blue-600">FolioFlow</span>,
          security is built into our API architecture from the ground up. When
          you create an account, we automatically generate a{" "}
          <span className="font-semibold text-green-600">
            unique, cryptographically secure API key{" "}
          </span>
          that serves as your digital identity for programmatic access to your
          CV data.
        </p>

        <p className="text-gray-700 mb-6">
          Each API key is{" "}
          <span className="font-semibold text-purple-600">
            individually encrypted, rate-limited, and monitored
          </span>{" "}
          for suspicious activity. We implement industry-standard security
          protocols including HTTPS enforcement, request signing, and regular
          key rotation to ensure your CV data remains protected while being
          programmatically accessible.
        </p>

        <div className="bg-linear-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200 mb-6">
          <div className="flex items-start">
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center mr-3 shrink-0">
              <ShieldCheckIcon className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">
                Secure by Design
              </h4>
              <p className="text-sm text-yellow-700">
                Your API key grants access{" "}
                <span className="font-semibold">
                  only to your personal CV data
                </span>
                . Keys are never stored in plain text, and all API
                communications are encrypted end-to-end using TLS 1.3. We
                recommend rotating your API key every 90 days for optimal
                security.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive API Key Demo */}
        {/* <div className="mb-8 p-6 bg-linear-to-br from-gray-900 to-gray-800 rounded-xl text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <KeyIcon className="h-6 w-6 text-yellow-400 mr-3" />
              <div>
                <h3 className="font-semibold text-lg">Your API Key</h3>
                <p className="text-gray-400 text-sm">Keep this secret, like a password</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={regenerateApiKey}
              className="px-4 py-2 bg-linear-to-r from-yellow-500 to-orange-500 rounded-lg font-medium text-sm hover:shadow-lg transition-shadow flex items-center"
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Regenerate
            </motion.button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">API Key</span>
              <button
                onClick={() => setShowKey(!showKey)}
                className="text-yellow-400 hover:text-yellow-300 text-sm"
              >
                {showKey ? 'Hide' : 'Show'} key
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <code className="font-mono text-sm">
                  {showKey ? apiKey : 'sk_live_••••••••••••••••••••••••'}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(apiKey)}
                  className="text-gray-400 hover:text-white"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">Status</div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                <span className="font-semibold">Active</span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">Requests Today</div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xl">{requestsToday}</span>
                <div className="text-xs text-green-400">+12%</div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">Last Used</div>
              <div className="font-semibold">Just now</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Daily Limit</span>
              <span className="text-white">{requestsToday}/1000</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-linear-to-r from-green-500 to-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: `${(requestsToday / 1000) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-5 bg-linear-to-br from-red-50 to-orange-50 rounded-xl border border-red-200"
          >
            <div className="flex items-center mb-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="font-semibold text-red-800">What Not to Do</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start text-sm text-red-700">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2 mt-1.5" />
                Never share API key in client-side code
              </li>
              <li className="flex items-start text-sm text-red-700">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2 mt-1.5" />
                Don&apos;t commit keys to public repositories
              </li>
              <li className="flex items-start text-sm text-red-700">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2 mt-1.5" />
                Avoid embedding keys in mobile apps
              </li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-5 bg-linear-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
          >
            <div className="flex items-center mb-3">
              <LockClosedIcon className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="font-semibold text-green-800">Best Practices</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start text-sm text-green-700">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2 mt-1.5" />
                Store keys in environment variables
              </li>
              <li className="flex items-start text-sm text-green-700">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2 mt-1.5" />
                Use HTTPS for all API requests
              </li>
              <li className="flex items-start text-sm text-green-700">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2 mt-1.5" />
                Rotate keys regularly (every 90 days)
              </li>
            </ul>
          </motion.div>
        </div>

        {/* <div className="p-5 bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
          <div className="flex items-center mb-4">
            <ServerIcon className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-800">Secure API Endpoints</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-blue-200">
              <code className="text-sm text-blue-800">GET /api/v1/cv</code>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Read Only</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-blue-200">
              <code className="text-sm text-blue-800">PUT /api/v1/cv/update</code>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Write Access</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-blue-200">
              <code className="text-sm text-blue-800">POST /api/v1/cv/export</code>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Export</span>
            </div>
          </div>
        </div> */}
      </div>
    </motion.div>
  );
}
