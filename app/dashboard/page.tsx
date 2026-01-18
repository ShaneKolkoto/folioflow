"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  UserCircleIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  CogIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const { user, signOut, getApiKey } = useAuth();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    const loadApiKey = async () => {
      if (user) {
        const key = await getApiKey();
        setApiKey(key);
      }
    };
    loadApiKey();
  }, [user, getApiKey]);

  if (!user) return null;

  return (
    <ProtectedRoute>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.displayName}!
              </h1>
              <p className="text-blue-100">
                Manage your professional CV and API access
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* API Key Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <CodeBracketIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Your API Key
                    </h2>
                    <p className="text-gray-600">
                      Use this key to access your CV data via API
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-gray-300 font-mono text-sm">
                    {showApiKey ? apiKey : "•".repeat(apiKey?.length || 32)}
                  </code>
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    {showApiKey ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p className="mb-2">
                  📋 Use this key in the Authorization header:
                </p>
                <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/cv-builder"
                  className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                      <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        CV Builder
                      </h3>
                      <p className="text-sm text-gray-600">Edit your CV</p>
                    </div>
                  </div>
                </a>

                <a
                  href="/api-docs"
                  className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                      <ArrowTopRightOnSquareIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        API Documentation
                      </h3>
                      <p className="text-sm text-gray-600">
                        Learn how to use the API
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="/settings"
                  className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                      <CogIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Settings</h3>
                      <p className="text-sm text-gray-600">
                        Manage your account
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="/export"
                  className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                      <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Export CV</h3>
                      <p className="text-sm text-gray-600">
                        Download in multiple formats
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Profile */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                    <UserCircleIcon className="h-8 w-8 text-white" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {user.displayName}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    {user.emailVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Subscription</span>
                  <span
                    className={
                      (
                      user.subscriptionTier === 'unlimted'
                        ? 'font-bold text-yellow-600'
                        : user.subscriptionTier === 'pro'
                        ? 'font-bold text-red-500'
                        : 'font-bold text-blue-600')
                    }
                  >
                    {user.subscriptionTier}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">CVs Created</span>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold">
                    {new Date().toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* API Usage */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">API Usage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Requests this month</span>
                    <span className="font-semibold">0/1,000</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
                <div className="text-center pt-4 border-t border-gray-700">
                  <a
                    href="/upgrade"
                    className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Upgrade to Pro
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
