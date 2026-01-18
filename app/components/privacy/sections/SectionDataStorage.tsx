'use client';

import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  ServerIcon,
  CloudArrowUpIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export interface SectionDataStorageProps {
  ref: (el: HTMLDivElement | null) => void;
}

export default function SectionDataStorage({ ref }: SectionDataStorageProps) {
  const storageFeatures = [
    {
      icon: LockClosedIcon,
      title: "Encryption at Rest",
      description: "All CV data is encrypted using AES-256 encryption",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: ServerIcon,
      title: "Secure Servers",
      description: "Hosted on SOC 2 compliant infrastructure with regular audits",
      color: "from-green-500 to-green-600"
    },
    {
      icon: CloudArrowUpIcon,
      title: "Regular Backups",
      description: "Automatic daily backups with 30-day retention",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: EyeIcon,
      title: "Access Monitoring",
      description: "Real-time monitoring for unauthorized access attempts",
      color: "from-red-500 to-red-600"
    }
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
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mr-4">
            <ShieldCheckIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">5. Data Storage and Security</h2>
            <p className="text-gray-600">Enterprise-grade protection for your CV data</p>
          </div>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {storageFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start">
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mr-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Visualization */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Security Layers</h3>
          <div className="relative h-40 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-4">
            {/* Animated Security Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute h-32 w-32 rounded-full border-2 border-blue-200 border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute h-24 w-24 rounded-full border-2 border-green-200 border-dashed"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute h-16 w-16 rounded-full border-2 border-red-200 border-dashed"
              />
              
              {/* Center Lock */}
              <div className="absolute h-12 w-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <LockClosedIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            
            {/* Security Labels */}
            <div className="absolute top-4 left-4 text-xs font-medium text-blue-600">Network Security</div>
            <div className="absolute top-4 right-4 text-xs font-medium text-green-600">Application Layer</div>
            <div className="absolute bottom-4 left-4 text-xs font-medium text-red-600">Data Encryption</div>
            <div className="absolute bottom-4 right-4 text-xs font-medium text-purple-600">Access Control</div>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Compliance & Certifications</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "GDPR", color: "from-blue-500 to-blue-600", desc: "EU Data Protection" },
              { name: "CCPA", color: "from-green-500 to-green-600", desc: "California Privacy" },
              { name: "ISO 27001", color: "from-purple-500 to-purple-600", desc: "Security Standard" },
              { name: "SOC 2", color: "from-red-500 to-red-600", desc: "Trust Services" },
              { name: "HIPAA", color: "from-yellow-500 to-yellow-600", desc: "Healthcare Data" }
            ].map((cert, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex-1 min-w-[120px] p-3 bg-white rounded-lg border border-gray-200 text-center"
              >
                <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center mx-auto mb-2`}>
                  <ShieldCheckIcon className="h-4 w-4 text-white" />
                </div>
                <div className="font-semibold text-gray-900 text-sm">{cert.name}</div>
                <div className="text-xs text-gray-500">{cert.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Backup Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
        >
          <div className="flex items-start">
            <CloudArrowUpIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Backup Strategy</h4>
              <p className="text-sm text-blue-700">
                We perform automated daily backups with 30-day retention. All backups are encrypted and stored 
                in geographically redundant locations. In case of data loss, we can restore your CV data within 24 hours.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}