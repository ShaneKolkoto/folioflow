"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  UserIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  TrashIcon,
  BellSlashIcon,
  CheckCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export interface SectionYourRightsProps {
  ref: (el: HTMLDivElement | null) => void;
}

export default function SectionYourRights({ ref }: SectionYourRightsProps) {
  const [selectedRight, setSelectedRight] = useState<number | null>(null);

  const rightsData = [
    {
      icon: EyeIcon,
      title: "Access & Update",
      description: "Access, update, or delete your CV data at any time",
      details:
        "You can view all your stored data, make corrections, or remove outdated information directly from your account dashboard.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: ArrowDownTrayIcon,
      title: "Export CV",
      description: "Export your CV in various formats (PDF, DOCX, JSON)",
      details:
        "Download your CV in multiple formats suitable for job applications, portfolio websites, or API integration.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: ArrowPathIcon,
      title: "Manage API Keys",
      description: "Revoke or regenerate your API key anytime",
      details:
        "Control your API access by revoking compromised keys or generating new ones for different applications.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: TrashIcon,
      title: "Delete Account",
      description: "Delete your account and associated data",
      details:
        "Permanently remove your account and all associated data from our systems. This action is irreversible.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: BellSlashIcon,
      title: "Communication Preferences",
      description: "Opt-out of non-essential communications",
      details:
        "Control which emails and notifications you receive from us. Essential service communications will continue.",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const exerciseMethods = [
    {
      method: "Account Dashboard",
      description: "Access most rights directly from your account settings",
      icon: "⚙️",
    },
    {
      method: "Email Request",
      description: "Send requests to privacy@folioflow.com",
      icon: "📧",
    },
    {
      method: "API Endpoints",
      description: "Programmatic access via our REST API",
      icon: "🔧",
    },
    {
      method: "Support Portal",
      description: "Submit requests through our support system",
      icon: "🛟",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="scroll-mt-24 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <div className="flex items-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mr-4">
            <UserIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              7. Your Rights and Choices
            </h2>
            <p className="text-gray-600">You're in control of your data</p>
          </div>
        </div>

        {/* Interactive Rights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {rightsData.map((right, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                setSelectedRight(selectedRight === index ? null : index)
              }
              className={`p-5 rounded-xl border cursor-pointer transition-all ${
                selectedRight === index
                  ? "border-indigo-300 bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-md"
                  : "border-gray-200 bg-white hover:bg-gray-50 shadow-sm"
              }`}
            >
              <div className="flex items-start mb-3">
                <div
                  className={`h-10 w-10 rounded-lg bg-gradient-to-br ${right.color} flex items-center justify-center mr-3`}
                >
                  <right.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{right.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {right.description}
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {selectedRight === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-700">{right.details}</p>
                      {/* <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-3 w-full py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:shadow-md transition-shadow"
                      >
                        Exercise This Right
                      </motion.button> */}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {selectedRight !== index && (
                <div className="text-xs text-indigo-600 font-medium">
                  Click for details →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* How to Exercise Rights */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <DocumentTextIcon className="h-5 w-5 text-gray-600 mr-2" />
            How to Exercise Your Rights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exerciseMethods.map((method, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 text-center"
              >
                <div className="text-2xl mb-2">{method.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {method.method}
                </h4>
                <p className="text-xs text-gray-600">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Response Time & Process */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
          >
            <h3 className="font-semibold text-green-800 mb-3">Response Time</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Simple Requests</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Within 24 hours
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Data Exports</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Within 48 hours
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Account Deletion</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Within 30 days
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
          >
            <h3 className="font-semibold text-blue-800 mb-3">
              Verification Process
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              To protect your data, we verify your identity before processing
              rights requests. This may include:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-blue-700">
                <CheckCircleIcon className="h-4 w-4 text-blue-500 mr-2" />
                Account login confirmation
              </li>
              <li className="flex items-center text-sm text-blue-700">
                <CheckCircleIcon className="h-4 w-4 text-blue-500 mr-2" />
                Email verification
              </li>
              <li className="flex items-center text-sm text-blue-700">
                <CheckCircleIcon className="h-4 w-4 text-blue-500 mr-2" />
                Additional security questions for sensitive requests
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Contact for Rights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200"
        >
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mr-4">
              <UserIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-indigo-800 mb-2">
                Need Help Exercising Your Rights?
              </h4>
              <p className="text-sm text-indigo-700 mb-3">
                Contact our Data Protection Officer at{" "}
                <a
                  href="mailto:dpo@folioflow.com"
                  className="font-semibold underline"
                >
                  dpo@folioflow.com
                </a>{" "}
                for assistance with privacy-related requests.
              </p>
              <div className="flex items-center text-xs text-indigo-600">
                <div className="h-2 w-2 rounded-full bg-indigo-400 mr-2"></div>
                Average response time: 2 business days
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
