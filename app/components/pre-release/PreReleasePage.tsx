/* eslint-disable react-hooks/purity */
"use client";

import {
  RocketLaunchIcon,
  CalendarIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import WishlistForm from "@/components/wishlist/wishlistForm";

export default function PreReleasePage() {
  const releaseDate = new Date();
  releaseDate.setDate(releaseDate.getDate() + 120); // 30 days from now

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mb-6 border border-blue-400/30"
            >
              <LockClosedIcon className="h-12 w-12 text-blue-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pre-Release Access
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              FolioFlow is currently in pre-release mode. We&apos;re polishing
              the experience before the official launch.
            </motion.p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <CalendarIcon className="h-8 w-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Launch Date</h3>
                    <p className="text-gray-300">
                      We&apos;re targeting a full launch on{" "}
                      <span className="text-blue-300 font-semibold">
                        {releaseDate.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <RocketLaunchIcon className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      What&apos;s Coming
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                        <span>Full authentication system</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                        <span>Real-time CV editing</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                        <span>API integration dashboard</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                        <span>Team collaboration features</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-900/30 to-cyan-900/30 border border-green-500/20">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <EnvelopeIcon className="h-8 w-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Get Early Access</h3>
                    <p className="text-gray-300 mb-4">
                      Want to be among the first to try FolioFlow? Join our
                      waitlist for exclusive early access.
                    </p>
                    {/* <Link
                      href="mailto:hello@folioflow.dev?subject=Early%20Access%20Request"
                      className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 font-medium"
                    >
                      <EnvelopeIcon className="h-5 w-5 mr-2" />
                      Request Early Access
                    </Link> */}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Demo Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    Preview What&apos;s Coming
                  </h3>
                  <p className="text-gray-400">
                    While you wait, explore our API demo to see what FolioFlow
                    can do.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
                          <span className="text-white font-bold">API</span>
                        </div>
                        <div>
                          <h4 className="font-bold">Live API Demo</h4>
                          <p className="text-sm text-gray-400">
                            Test our endpoints with real data
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/api-demo"
                      className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 font-medium"
                    >
                      Try API Demo
                      <RocketLaunchIcon className="h-4 w-4 ml-2" />
                    </Link>
                  </div>

                  {/* <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                          <span className="text-white font-bold">CV</span>
                        </div>
                        <div>
                          <h4 className="font-bold">Sample Portfolio</h4>
                          <p className="text-sm text-gray-400">
                            See what your portfolio could look like
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/portfolio/demo"
                      className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 font-medium"
                    >
                      View Demo Portfolio
                      <RocketLaunchIcon className="h-4 w-4 ml-2" />
                    </Link>
                  </div> */}

                  <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-3">
                          <span className="text-white font-bold">DOCS</span>
                        </div>
                        <div>
                          <h4 className="font-bold">Documentation</h4>
                          <p className="text-sm text-gray-400">
                            Learn how FolioFlow works
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/api-docs"
                      className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 font-medium"
                    >
                      Read API Documentation
                      <RocketLaunchIcon className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl"
              >
                <RocketLaunchIcon className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>
          </div>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 mx-auto"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700">
              <WishlistForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
