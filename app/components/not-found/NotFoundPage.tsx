"use client";
import Link from "next/link";
import {
  HomeIcon,
  ArrowLeftIcon,
  DocumentMagnifyingGlassIcon,
  ServerStackIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className=" mx-auto bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-gray-900 opacity-10">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              404
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Oops! The page you're looking for seems to have wandered off into the
          digital void.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <DocumentMagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for pages..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600">
              Search
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Back to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Popular Links Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Popular Pages You Might Like
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/api-docs"
              className="group bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 hover:border-blue-300 transition-all hover:shadow-md"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <ServerStackIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                API Documentation
              </h3>
              <p className="text-gray-600 text-sm">
                Complete API reference and integration guide
              </p>
            </Link>

            <Link
              href="/dashboard"
              className="group bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 hover:border-green-300 transition-all hover:shadow-md"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600">
                Dashboard
              </h3>
              <p className="text-gray-600 text-sm">
                Manage your portfolio and API settings
              </p>
            </Link>

            <Link
              href="/playground"
              className="group bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100 hover:border-purple-300 transition-all hover:shadow-md"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <BeakerIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600">
                API Playground
              </h3>
              <p className="text-gray-600 text-sm">
                Test API endpoints in real-time
              </p>
            </Link>
          </div>
        </div>

        {/* Error Details (for developers) */}
        <details className="mt-12 max-w-3xl mx-auto text-left">
          <summary className="text-gray-700 hover:text-blue-600 cursor-pointer font-medium">
            Technical Details
          </summary>
          <div className="mt-4 bg-gray-900 text-gray-300 rounded-lg p-6">
            <pre className="text-sm overflow-x-auto">
              <code>
                {`404 Not Found
Path: ${typeof window !== "undefined" ? window.location.pathname : "Unknown"}
Timestamp: ${new Date().toISOString()}
User-Agent: ${typeof navigator !== "undefined" ? navigator.userAgent : "Unknown"}

Possible reasons:
1. The page has been moved or deleted
2. There's a typo in the URL
3. The link you followed is broken
4. The page is temporarily unavailable

What to try:
• Check the URL for typos
• Use the search bar above
• Return to the homepage
• Contact support if the issue persists`}
              </code>
            </pre>
          </div>
        </details>
      </div>
    </div>
  );
}
