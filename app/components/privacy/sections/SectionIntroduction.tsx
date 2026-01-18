'use client';

import { motion } from 'framer-motion';
import { DocumentTextIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

export interface SectionIntroductionProps {
  ref: (el: HTMLDivElement | null) => void;
}

export default function SectionIntroduction({ ref }: SectionIntroductionProps) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="scroll-mt-24 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <div className="flex items-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4">
            <DocumentTextIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
            <p className="text-gray-600">Welcome to FolioFlow</p>
          </div>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            Welcome to <span className="font-semibold text-blue-600">FolioFlow</span>. We provide a platform that allows users to create, store, and export their CVs/resumes. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service, including through API access.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 mb-6"
          >
            <div className="flex items-start">
              <ShieldExclamationIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Your Privacy Matters</h3>
                <p className="text-blue-700 text-sm">
                  By using FolioFlow, you consent to the data practices described in this policy. 
                  We are committed to protecting your personal information and providing you with control over your CV data.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200"
            >
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                Secure Storage
              </h4>
              <p className="text-sm text-green-700">
                Your CV data is encrypted and stored on secure servers with regular backups.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200"
            >
              <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                <div className="h-2 w-2 rounded-full bg-purple-500 mr-2" />
                Full Control
              </h4>
              <p className="text-sm text-purple-700">
                You can access, update, or delete your data anytime through your account.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
            >
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
                API Access
              </h4>
              <p className="text-sm text-blue-700">
                Access your CV data programmatically through our secure API with unique keys.
              </p>
            </motion.div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 italic">
              <span className="font-semibold">Note:</span> This policy applies to all users of FolioFlow services, 
              including those accessing via web interface, mobile apps, or API. Please read carefully.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}