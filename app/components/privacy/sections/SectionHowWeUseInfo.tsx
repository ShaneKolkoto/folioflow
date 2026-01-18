"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BoltIcon,
  DocumentTextIcon,
  KeyIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ArrowRightIcon,
  CircleStackIcon,
  UserIcon,
  ChevronUpIcon,
  EyeIcon,
  ArrowLeftIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";

export interface SectionHowWeUseInfoProps {
  ref: (el: HTMLDivElement | null) => void;
}

export default function SectionHowWeUseInfo({ ref }: SectionHowWeUseInfoProps) {
  const [showDetailedUsage, setShowDetailedUsage] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="scroll-mt-24 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden relative group"
    >
      {/* Animated Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-8">
        <div className="flex items-center mb-8">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-4 shadow-lg"
          >
            <BoltIcon className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600">Putting your data to work for you</p>
          </div>
        </div>

        {/* Interactive Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: DocumentTextIcon,
              title: "Create & Store CV",
              description: "To create, store, and maintain your CV data",
              color: "from-blue-500 to-blue-600",
              hoverColor: "hover:from-blue-600 hover:to-blue-700",
            },
            {
              icon: KeyIcon,
              title: "API Access",
              description:
                "To provide API access for you to fetch your CV data",
              color: "from-purple-500 to-purple-600",
              hoverColor: "hover:from-purple-600 hover:to-purple-700",
            },
            {
              icon: ArrowDownTrayIcon,
              title: "CV Export",
              description:
                "To enable CV export functionality in multiple formats",
              color: "from-green-500 to-green-600",
              hoverColor: "hover:from-green-600 hover:to-green-700",
            },
            {
              icon: BoltIcon,
              title: "Improve Services",
              description: "To improve our services and develop new features",
              color: "from-yellow-500 to-yellow-600",
              hoverColor: "hover:from-yellow-600 hover:to-yellow-700",
            },
            {
              icon: EnvelopeIcon,
              title: "Communication",
              description: "To communicate with you about your account",
              color: "from-pink-500 to-pink-600",
              hoverColor: "hover:from-pink-600 hover:to-pink-700",
            },
            {
              icon: ShieldCheckIcon,
              title: "Security",
              description: "To ensure security and prevent unauthorized access",
              color: "from-red-500 to-red-600",
              hoverColor: "hover:from-red-600 hover:to-red-700",
            },
          ].map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group/card`}
            >
              {/* Animated Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover/card:opacity-5 rounded-xl transition-opacity duration-300`}
              />

              {/* Icon with Animation */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`h-14 w-14 rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-4 shadow-md group-hover/card:shadow-lg transition-shadow`}
              >
                <useCase.icon className="h-7 w-7 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="font-bold text-gray-900 mb-2 group-hover/card:text-gray-800 transition-colors">
                {useCase.title}
              </h3>
              <p className="text-sm text-gray-600 group-hover/card:text-gray-700 transition-colors">
                {useCase.description}
              </p>

              {/* Interactive Indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRightIcon className="h-5 w-5 text-gray-400" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data Flow Visualization */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <ChartBarIcon className="h-5 w-5 text-green-600 mr-2" />
            Data Flow Visualization
          </h3>
          <div className="relative h-32 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-gray-200 overflow-hidden">
            {/* Animated Data Points (Forward Flow) */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`forward-${i}`}
                className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                initial={{
                  x: -20,
                  y: Math.random() * 120 + 10,
                  opacity: 0,
                }}
                animate={{
                  x: "100vw",
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
                style={{
                  left: `${Math.random() * 20}%`,
                }}
              />
            ))}

            {/* Animated Data Points (Reverse Flow) */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`reverse-${i}`}
                className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{
                  x: "100vw",
                  y: Math.random() * 120 + 10,
                  opacity: 0,
                }}
                animate={{
                  x: -20,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2 + 1,
                  ease: "linear",
                }}
                style={{
                  left: `${Math.random() * 30 + 50}%`,
                }}
              />
            ))}

            {/* Flow Paths */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center space-x-6">
                {/* Database (Start) */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    repeatType: "reverse",
                  }}
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg relative z-10"
                >
                  <CircleStackIcon className="h-6 w-6 text-white" />
                  <motion.div
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <span className="text-xs font-bold text-white">DB</span>
                  </motion.div>
                </motion.div>

                {/* Forward Arrow */}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="relative"
                >
                  <ArrowRightIcon className="h-6 w-6 text-gray-400" />
                  <div className="absolute -top-3 left-0 text-xs text-green-600 font-medium">
                    Store
                  </div>
                </motion.div>

                {/* Processing (FolioFlow) */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    repeatType: "reverse",
                    delay: 0.2,
                  }}
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg relative z-10"
                >
                  <BoltIcon className="h-6 w-6 text-white" />
                  <motion.div
                    className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                  >
                    <span className="text-xs font-bold text-white">FF</span>
                  </motion.div>
                </motion.div>

                {/* Forward Arrow */}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                  className="relative"
                >
                  <ArrowRightIcon className="h-6 w-6 text-gray-400" />
                  <div className="absolute -top-3 left-0 text-xs text-blue-600 font-medium">
                    Process
                  </div>
                </motion.div>

                {/* User (End of Forward Flow) */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    repeatType: "reverse",
                    delay: 0.4,
                  }}
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg relative z-10"
                >
                  <UserIcon className="h-6 w-6 text-white" />
                  <motion.div
                    className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <span className="text-xs font-bold text-white">✓</span>
                  </motion.div>
                </motion.div>

                {/* Reverse Arrow (from User back to Processing) */}
                <motion.div
                  animate={{ x: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                  className="relative"
                >
                  <ArrowLeftIcon className="h-6 w-6 text-gray-400 ml-6" />
                  <div className="absolute -top-3 left-3 text-xs text-pink-600 font-medium">
                    Update
                  </div>
                </motion.div>

                {/* Reverse Processing (same Processing node, just showing reverse flow) */}
                <div className="relative">
                  {/* Small reverse indicator */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "linear",
                    }}
                    className="absolute -top-3 -left-3 h-6 w-6 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center opacity-50"
                  >
                    <ArrowPathIcon className="h-3 w-3 text-white" />
                  </motion.div>
                </div>

                {/* Reverse Arrow (from Processing back to Database) */}
                <motion.div
                  animate={{ x: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
                  className="relative"
                >
                  <ArrowLeftIcon className="h-6 w-6 text-gray-400 ml-6" />
                  <div className="absolute -top-3 left-3 text-xs text-indigo-600 font-medium">
                    Sync
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute inset-x-0 bottom-2 flex justify-between px-4">
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium text-green-600">
                  Database
                </span>
                <div className="flex items-center mt-1">
                  <div className="h-1 w-8 bg-gradient-to-r from-green-400 to-green-300 rounded-full"></div>
                  <ArrowRightIcon className="h-3 w-3 text-green-400 mx-1" />
                  <div className="h-1 w-8 bg-gradient-to-r from-green-300 to-blue-300 rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium text-blue-600">
                  Processing
                </span>
                <div className="flex items-center mt-1">
                  <div className="h-1 w-4 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full"></div>
                  <ArrowRightIcon className="h-3 w-3 text-blue-400 mx-1" />
                  <ArrowLeftIcon className="h-3 w-3 text-pink-400 mx-1" />
                  <div className="h-1 w-4 bg-gradient-to-r from-pink-300 to-blue-300 rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium text-purple-600">
                  User
                </span>
                <div className="flex items-center mt-1">
                  <div className="h-1 w-8 bg-gradient-to-r from-purple-400 to-pink-300 rounded-full"></div>
                  <ArrowLeftIcon className="h-3 w-3 text-pink-400 mx-1" />
                  <div className="h-1 w-8 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Loop Indicator */}
            <div className="absolute top-2 right-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="h-6 w-6 rounded-full border border-dashed border-gray-300 flex items-center justify-center"
              >
                <ArrowPathIcon className="h-3 w-3 text-gray-400" />
              </motion.div>
            </div>

            {/* Legend */}
            <div className="absolute top-2 left-2 flex items-center space-x-3">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mr-1"></div>
                <span className="text-xs text-gray-600">Forward Flow</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-1"></div>
                <span className="text-xs text-gray-600">Reverse Flow</span>
              </div>
            </div>
          </div>

          {/* Flow Description */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200"
            >
              <div className="flex items-center mb-2">
                <ArrowRightIcon className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">
                  Forward Flow
                </span>
              </div>
              <p className="text-xs text-green-700">
                Your data flows from our secure database to FolioFlow for
                processing, then to you.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
            >
              <div className="flex items-center mb-2">
                <BoltIcon className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">
                  Processing
                </span>
              </div>
              <p className="text-xs text-blue-700">
                FolioFlow processes your data securely, enabling CV creation and
                API access.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200"
            >
              <div className="flex items-center mb-2">
                <ArrowPathIcon className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-800">
                  Reverse Flow
                </span>
              </div>
              <p className="text-xs text-purple-700">
                You update your CV, changes sync back to FolioFlow and our
                database.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Legal Compliance Note */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.01 }}
          className="p-5 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl border border-gray-700 text-white"
        >
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mr-4">
              <ShieldCheckIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 flex items-center">
                Legal Compliance
                <span className="ml-2 px-2 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded text-xs">
                  Required
                </span>
              </h4>
              <p className="text-sm text-gray-300">
                We also use your information to comply with legal obligations
                and regulatory requirements. This ensures FolioFlow operates
                within all applicable laws and maintains the highest standards
                of data protection.
              </p>
            </div>
          </div>

          {/* Compliance Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            {["GDPR", "CCPA", "ISO 27001", "SOC 2"].map((badge, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full text-xs font-medium border border-gray-600"
              >
                {badge} Compliant
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Interactive Toggle for More Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDetailedUsage(!showDetailedUsage)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
          >
            <div className="flex items-center">
              <EyeIcon className="h-5 w-5 text-gray-600 mr-3" />
              <span className="font-medium text-gray-800">
                Show Detailed Usage Examples
              </span>
            </div>
            <motion.div
              animate={{ rotate: showDetailedUsage ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            </motion.div>
          </motion.button>

          {/* Detailed Content */}
          <AnimatePresence>
            {showDetailedUsage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-6 bg-blue-50 rounded-xl border border-blue-200 overflow-hidden"
              >
                <h4 className="font-semibold text-blue-900 mb-3">
                  Detailed Examples:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                    </div>
                    <p className="text-sm text-blue-800">
                      When you update your work experience, we process this data
                      to update your CV preview in real-time
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                    </div>
                    <p className="text-sm text-blue-800">
                      API calls to fetch your CV data are logged anonymously to
                      monitor system performance
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                    </div>
                    <p className="text-sm text-blue-800">
                      Usage patterns help us identify which export formats are
                      most popular for future improvements
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
