'use client';

import { motion } from 'framer-motion';
import { CircleStackIcon, UserIcon, ChartBarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export interface SectionInformationCollectProps {
  ref: (el: HTMLDivElement | null) => void;
}

export default function SectionInformationCollect({ ref }: SectionInformationCollectProps) {
  const personalInfoItems = [
    "Contact information (name, email, phone)",
    "Professional information (work experience, education)",
    "Skills and certifications",
    "CV content and formatting preferences",
    "Account credentials",
  ];

  const autoCollectItems = [
    "IP address and device information",
    "Browser type and version",
    "Usage data and analytics",
    "API usage logs and request frequency",
    "Error reports and performance metrics"
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
          <div className="h-12 w-12 rounded-xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-4">
            <CircleStackIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
            <p className="text-gray-600">What data we gather and how we gather it</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200"
          >
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3">
                <UserIcon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-800">Information You Provide</h3>
            </div>
            
            <div className="space-y-3">
              {personalInfoItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <CheckCircleIcon className="h-5 w-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                  <span className="text-sm text-blue-700">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Interactive Example */}
            {/* <div className="mt-6 p-4 bg-white/50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2 text-sm">Example CV Data:</h4>
              <div className="space-y-2">
                <div className="h-2 w-full bg-gradient-to-r from-blue-200 to-blue-100 rounded"></div>
                <div className="h-2 w-3/4 bg-gradient-to-r from-blue-200 to-blue-100 rounded"></div>
                <div className="h-2 w-1/2 bg-gradient-to-r from-blue-200 to-blue-100 rounded"></div>
              </div>
            </div> */}
          </motion.div>

          {/* Automated Collection Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-linear-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200"
          >
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-3">
                <ChartBarIcon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-purple-800">Automated Collection</h3>
            </div>
            
            <div className="space-y-3">
              {autoCollectItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <CheckCircleIcon className="h-5 w-5 text-purple-500 mr-3 shrink-0 mt-0.5" />
                  <span className="text-sm text-purple-700">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Animated Data Points */}
            {/* <div className="mt-6 relative h-24 bg-white/30 rounded-lg border border-purple-200 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-500"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  style={{
                    left: `${(i + 1) * 12}%`,
                    bottom: '20%'
                  }}
                />
              ))}
              <div className="absolute bottom-4 left-4 text-xs text-purple-600">
                Real-time data collection visualization
              </div>
            </div> */}
          </motion.div>
        </div>

        {/* Additional Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-5 bg-linear-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
        >
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center mr-3 mt-1">
              <span className="text-xs font-bold">i</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Note:</span> We only collect information necessary to provide our services. 
                You can control what information you provide and access automated collection settings in your account preferences.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}