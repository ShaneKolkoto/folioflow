'use client';

import { motion } from 'framer-motion';

interface PrivacyProgressBarProps {
  activeSection: number;
}

export default function PrivacyProgressBar({ activeSection }: PrivacyProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-40">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ width: "0%" }}
        animate={{ width: `${(activeSection / 13) * 100}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}