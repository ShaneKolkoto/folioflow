import Link from 'next/link';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface PrivacyHeaderProps {
  lastUpdated: string;
}

export default function PrivacyHeader({ lastUpdated }: PrivacyHeaderProps) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    > 
      <motion.h1 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4"
      >
        Privacy Policy
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full shadow-sm"
      >
        <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
        <span className="text-gray-700">
          Last Updated: <span className="font-semibold text-blue-600">{lastUpdated}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}